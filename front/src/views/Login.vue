<template>
    <div class="login">
        <div class="main-box">
            <div class="title">登录</div>
            <div class="change-box">
                <div
                    class="change-item"
                    :class="[currentItem === 'user' ? 'current-change-item' : '']"
                    @click="handleChangeItem('user')"
                >
                    普通用户
                </div>
                <div
                    class="change-item"
                    :class="[currentItem === 'admin' ? 'current-change-item' : '']"
                    @click="handleChangeItem('admin')"
                >
                    管理员
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
                    @click="$router.push('/register')"
                    v-if="currentItem ===`user`"
                    plain
                >注册</el-button>
                <el-button
                    size="medium"
                    type="primary"
                    @click="validForm('form')"
                >登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            currentItem: 'user',
            formInfo: {
                labelWidth: '66px',
                formData: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '用户名必填', trigger: 'blur' }
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
        userType () {
            let type
            switch (this.currentItem) {
                case 'user':
                    type = 2
                    break
                case 'admin':
                    type = 1
                    break
                default:
                    type = 2
                    break
            }
            return type
        }
    },
    methods: {
        handleChangeItem (value) {
            this.$refs['form'].resetFields()
            this.currentItem = value
        },
        validForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.login()
                } else {
                    return false
                }
            })
        },
        async login () {
            try {
                const url = 'enter/login'
                const params = {
                    ...this.formInfo.formData,
                    userType: this.userType
                }
                const res = await this.$store.dispatch(url, params)
                this.$store.commit('setToken', res.token)
                this.$router.push({
                    path: '/main'
                })
                this.$message({
                    type: 'success',
                    message: '登录成功'
                })
                
            } catch (e) {
                this.$message.error(e.data.message)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.main-box {
    width: 400px;
    height: 350px;
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
            cursor: pointer;
            user-select: none;
            transition: all .2s;
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