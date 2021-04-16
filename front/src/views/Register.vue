<template>
    <div class="register">
        <div class="main-box">
            <div class="title">注册</div>
            <div class="change-box">
                <div
                    class="change-item current-change-item"
                >
                    普通用户
                </div>
            </div>
            <div class="form-box">
                <el-form
                    ref="form"
                    :model="formInfo.formData"
                    :rules="formInfo.rules"
                    :label-width="formInfo.labelWidth"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input size="large" v-model="formInfo.formData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" size="large" v-model="formInfo.formData.password"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btn-box">
                <el-button
                    size="medium"
                    @click="$router.push('/login')"
                    plain
                >登录</el-button>
                <el-button
                    type="primary"
                    size="medium"
                    @click="validForm('form')"
                >注册</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            formInfo: {
                labelWidth: '66px',
                formData: {
                    username: null,
                    password: null
                },
                rules: {
                    username: [
                        { required: true, message: '用户名必填', trigger: 'blur' },
                        { validator: this.isExistsUsername, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码必填', trigger: 'blur' },
                        { min: 5, message: '密码最少5位', trigger: 'blur' },
                        { max: 15, message: '密码最多15位', trigger: 'blur' }
                    ]
                }
            }
        }
    },
    computed: {
    },
    methods: {
        validForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.register()
                } else {
                    return false
                }
            })
        },
        async register () {
            try {
                const url = 'enter/create'
                const params = {
                    ...this.formInfo.formData,
                    userType: 2
                }
                const res = await this.$store.dispatch(url, params)
                this.$router.push({
                    path: '/login'
                })
                this.$message({
                    type: 'success',
                    message: '注册成功'
                })
            } catch (e) {
                this.$message.error(e.data.message)
            }
        },
        async isExistsUsername (rule, value, callback) {
            try {
                const url = 'enter/isExistsUser'
                const params = {
                    username: this.formInfo.formData.username
                }
                const res = await this.$store.dispatch(url, params)
                if (res.isExists) {
                    callback(new Error('用户名已存在'))
                } else {
                    callback()
                }
            } catch (e) {
                this.$message.error(e.data.message)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.register {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.main-box {
    width: 400px;
    // height: 350px;
    box-shadow: 0px 0px 71px -32px #00000021;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    .title {
        font-size: 25px;
        width: 220px;
        text-align: center;
        margin-top: 30px;
    }
    .change-box {
        margin-top: 10px;
        width: 280px;
        display: flex;
        .change-item {
            font-size: 17px;
            height: 50px;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 2px solid rgba(131, 131, 131, 0.233);
            // cursor: pointer;
            user-select: none;
        }
    }
    .form-box {
        margin-top: 30px;
        width: 280px;
        ::v-deep .el-form-item__content {
        }
        ::v-deep .el-input__inner {
            padding: 10px;
        }
    }
    .btn-box {

    }
}
.current-change-item {
    color: #66b1ff;
    border-color: #66b1ff!important;
}
</style>