<template>
    <div class="top-bar">
        <div class="title">管理系统</div>
        <div class="info">
            <div class="user-info">
                {{user ? user.name : null}} {{user ? userTypeMap[user.userType] : null}}
            </div>
            <div class="option-box">
                <el-dropdown
                    class="dowm-item"
                    :placement="`bottom`"
                    @command="handleCommand"
                >
                    <i class="el-icon-arrow-down el-icon--right dowm-icon"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="updatePassowrd">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-dialog
            :title="dialogInfo.title"
            :visible.sync="dialogInfo.dialogVisible"
            append-to-body
            class="dialog-style"
            @close="dialogClose"
        >
            <el-form ref="dialogForm" :model="dialogInfo.form" :rules="dialogInfo.rules" size="mini">
                <el-form-item label="旧密码：" :label-width="dialogInfo.formLabelWidth" prop="oldPassword">
                    <el-input
                        size="mini"
                        type="password"
                        maxlength="15"
                        placeholder="请输入旧密码"
                        v-model="dialogInfo.form.oldPassword"
                        autocomplete="off"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="新密码：" :label-width="dialogInfo.formLabelWidth" prop="newPassword">
                    <el-input
                        size="mini"
                        type="password"
                        maxlength="15"
                        placeholder="请输入新密码"
                        v-model="dialogInfo.form.newPassword"
                        autocomplete="off"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="ensureDialog">确 定</el-button>
                <el-button size="mini" @click="dialogInfo.dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    components: {
    },
    data () {
        return {
            dialogInfo: {
                dialogVisible: false,
                title: '修改密码',
                formLabelWidth: '80px',
                form: {
                    oldPassword: null,
                    newPassword: null
                },
                rules: {
                    oldPassword: [
                        { required: true, message: '旧密码不能为空', trigger: 'blur' },
                        { min: 5, message: '密码最少5位', trigger: 'blur' },
                        { max: 15, message: '密码最多15位', trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, message: '新密码不能为空', trigger: 'blur' },
                        { min: 5, message: '密码最少5位', trigger: 'blur' },
                        { max: 15, message: '密码最多15位', trigger: 'blur' }
                    ]
                }
            },
            userTypeMap: {
                1: '管理员',
                2: '普通用户'
            }
        }
    },
    computed: {
        ...mapState(['user'])
    },
    mounted () {
    },
    methods: {
        handleCommand (command) {
            switch (command) {
                case 'updatePassowrd':
                    this.openDialog()
                    break
                case 'logout':
                    this.logout()
                    break
                default:
                    break
            }
        },
        openDialog () {
            this.dialogInfo.dialogVisible = true
        },
        dialogClose () {
            this.dialogInfo.form = {
                oldPassword: null,
                newPassword: null
            }
            this.$refs['dialogForm'].resetFields()
        },
        ensureDialog () {
            this.$refs['dialogForm'].validate(valid => {
                if (valid) {
                    const id = this.$store.state.user.id
                    const params = {
                        id,
                        ...this.dialogInfo.form
                    }
                    this.updateUserPassword(params)
                } else {
                    return false
                }
            })
        },
        async updateUserPassword (data) {
            try {
                const url = 'system/updateUserPassword'
                const params = data
                await this.$store.dispatch(url, params)
                this.$message.success('修改成功')
                this.dialogInfo.dialogVisible = false
            } catch (e) {
                this.$message.error(e.data.message)
            }
        },
        logout () {
            this.$store.commit('removeToken')
            this.$router.resetRouter()
            this.$router.push({
                path: '/'
            })
            this.$message({
                type: 'success',
                message: '退出成功'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.top-bar {
    height: 60px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 50px 0px 30px;
    .title {
        color: #333333;
        font-size: 22px;
    }
    .info {
        display: flex;
        align-items: center;
        .user-info {
            margin-right: 5px;
        }
    }
    .dowm-icon {
        cursor: pointer;
    }
}
.dialog-style {
    ::v-deep .el-dialog {
        width: 500px;
        margin-top: calc(50vh - 225px / 2) !important;
        .el-dialog__body {
            padding: 20px 20px 10px !important;
        }
        .el-dialog__footer {
            padding-top: 0 !important;
        }
    }
}
</style>