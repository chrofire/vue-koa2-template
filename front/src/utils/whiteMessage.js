// import Vue from 'vue'
import { Message } from 'element-ui'

const offset = 70
const message = options => {
    if (typeof options === 'string') {
        return Message({
            type: `info`,
            message: options,
            customClass: `el-message-white-theme`,
            offset,
            showClose: true
        })
    }
    return Message({
        customClass: `el-message-white-theme`,
        offset,
        showClose: true,
        ...options
    })
}

['success', 'warning', 'info', 'error'].forEach(type => {
    message[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options,
                customClass: `el-message-white-theme`,
                offset,
                showClose: true
            }
        }
        options.type = type
        return Message(options)
    }
})
// Vue.prototype.$whiteMessage = message
// Vue.prototype.$whiteMessage.closeAll = Message.closeAll

export default message
