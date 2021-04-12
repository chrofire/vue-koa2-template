async function jsonErrorResponse (ctx, next) {
    try {
        await next()
        switch (ctx.status) {
            case 200:
                if (!ctx.response.body) {
                    ctx.body = {
                        code: 1,
                        message: 'success',
                        data: null
                    }
                }
                if (ctx.response.body && ctx.response.body.message === `SequelizeForeignKeyConstraintError`) {
                    ctx.body = {
                        code: -1,
                        message: `已被关联，无法删除`
                    }
                }
                break
            default:
                ctx.status = ctx.status
                ctx.body = {
                    code: -1,
                    message: ctx.response.message || 'error'
                }
                break
        }
    } catch (e) {
        switch (e.status) {
            case 401:
                ctx.status = e.status
                ctx.body = {
                    code: -1,
                    message: 'Unauthorized鉴权未通过'
                }
                break
            default:
                ctx.status = e.status
                ctx.body = {
                    code: -1,
                    message: e.message || e.name
                }
                break
        }
    }
}

module.exports = jsonErrorResponse