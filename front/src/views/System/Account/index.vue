<template>
    <div class="account" v-loading="loading">
        <TableComp
            :pageDataProps="pageDataProps"
            @paginationChange="paginationChange"
        >
            <template #top-left>
                <el-input
                    size="mini"
                    v-model="pageDataProps.tableDataProps.selectParams.username"
                    placeholder="搜索用户名"
                    @blur="getDataList()"
                ></el-input>
            </template>
            <template #top-right>
                <el-button type="primary" size="mini" @click="openDialog('create')">新建帐号</el-button>
                <el-dialog
                    :title="dialogInfo.title"
                    :visible.sync="dialogInfo.dialogVisible"
                    append-to-body
                    class="dialog-style"
                    @close="dialogClose"
                >
                    <el-form ref="dialogForm" :model="dialogInfo.form" :rules="dialogInfo.rules" size="mini">
                        <el-form-item label="用户名：" :label-width="dialogInfo.formLabelWidth" prop="username">
                            <el-input
                                size="mini"
                                placeholder="请输入用户名"
                                v-model="dialogInfo.form.username"
                                autocomplete="off"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item label="密码：" :label-width="dialogInfo.formLabelWidth" prop="password" v-if="dialogInfo.type === `create`">
                            <el-input
                                size="mini"
                                type="password"
                                placeholder="请输入密码"
                                v-model="dialogInfo.form.password"
                                autocomplete="off"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item label="类型：" :label-width="dialogInfo.formLabelWidth" prop="userType" v-if="dialogInfo.type === `create`">
                            <el-select v-model="dialogInfo.form.userType" placeholder="请选择类型" clearable>
                                <el-option
                                    v-for="item in dialogInfo.userTypeSelect"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" size="mini" @click="ensureDialog">确 定</el-button>
                        <el-button size="mini" @click="dialogInfo.dialogVisible = false">取 消</el-button>
                    </span>
                </el-dialog>
            </template>
            <template #everyOneGeneral="{ scope }">
                <span>{{transShowData(scope) | replaceNullData}}</span>
            </template>
            <template #operateContent="{ scope }">
                <div class="operate-content-default">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="primary" size="mini" @click="updateUserStatus(scope.row)">
                        {{scope.row.status === 1 ? '禁用' : '启用'}}
                    </el-button>
                </div>
            </template>
        </TableComp>
    </div>
</template>

<script>
import TableComp from '@/components/TableComp'
export default {
    components: {
        TableComp
    },
    data () {
        return {
            loading: false,
            dialogInfo: {
                type: null,
                dialogVisible: false,
                title: '帐号',
                formLabelWidth: '80px',
                form: {
                    username: null,
                    password: null,
                    userType: null
                },
                extraForm: null,
                rules: {
                    username: [
                        { required: true, message: '用户名必填', trigger: 'blur' },
                        { validator: this.isExistsUsername, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码必填', trigger: 'blur' },
                        { min: 5, message: '密码最少5位', trigger: 'blur' },
                        { max: 10, message: '密码最多10位', trigger: 'blur' }
                    ],
                    userType: [
                        { required: true, message: '类型必填', trigger: 'change' }
                    ]
                },
                userTypeSelect: [
                    {
                        value: 1, label: '管理员'
                    },
                    {
                        value: 2, label: '普通用户'
                    }
                ]
            },
            pageDataProps: {
                tableDataProps: {
                    tableHeader: [
                        {
                            prop: 'username',
                            label: '用户名'
                        },
                        {
                            prop: 'userType',
                            label: '用户类型',
                            width: '100'
                        },
                        {
                            prop: 'createdAt',
                            label: '创建时间',
                            width: '180'
                        },
                        {
                            prop: 'updatedAt',
                            label: '修改时间',
                            width: '180'
                        },
                        {
                            prop: 'status',
                            label: '状态',
                            width: '70'
                        },
                        {
                            type: 'operate',
                            label: '操作',
                            width: '160'
                        }
                    ],
                    tableData: [],
                    hasIndex: false,
                    selectParams: {
                        username: ''
                    }
                },
                paginationParams: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                }
            }
        }
    },
    mounted () {
        this.getDataList()
    },
    methods: {
        transShowData (scope) {
            const row = scope.row
            const prop = scope.column.property
            switch (prop) {
                case 'userType':

                    const [userType] = this.dialogInfo.userTypeSelect.filter(item => item.value === row[prop])
                    return userType.label || null
                case 'status':
                    return row[prop] === 1 ? `已启用` : `已禁用`
                default:
                    break
            }
            return row[prop]
        },
        async updateUserStatus (data) {
            let { id, status } = data
            status = status === 1 ? 2 : 1
            const params = {
                id,
                status
            }
            await this.updateAccount(params)
        },
        handleEdit (row) {
            this.openDialog('edit', row)
        },
        openDialog (type, data) {
            switch (type) {
                case 'create':
                    this.dialogInfo.title = `新建帐号`
                    this.dialogInfo.type = `create`
                    break
                case 'edit':
                    this.dialogInfo.title = `编辑帐号`
                    this.dialogInfo.type = `edit`
                    const { id, password, userType, createdAt, updatedAt, ...rest } = _.cloneDeep(data)
                    this.dialogInfo.extraForm = _.cloneDeep(data)
                    this.dialogInfo.form = {
                        id,
                        ...rest
                    }
                    break
                default:
                    break
            }
            this.dialogInfo.dialogVisible = true
        },
        dialogClose () {
            this.dialogInfo.form = {
                username: null,
                password: null,
                userType: null
            }
            this.dialogInfo.extraForm = null
            this.$refs['dialogForm'].resetFields()
        },
        ensureDialog () {
            this.$refs['dialogForm'].validate(valid => {
                if (valid) {
                    switch (this.dialogInfo.type) {
                        case 'create':
                            this.createAccount(this.dialogInfo.form)
                            break
                        case 'edit':
                            this.updateAccount(this.dialogInfo.form)
                            break
                        default:
                            break
                    }
                    this.dialogInfo.dialogVisible = false
                } else {
                    return false
                }
            })
        },
        async createAccount (data) {
            try {
                const url = 'enter/create'
                const params = data
                await this.$store.dispatch(url, params)
                this.$message({
                    type: 'success',
                    message: '创建成功'
                })
                this.getDataList()
            } catch (e) {
                this.$message.error(e.data.message)
            }
        },
        async updateAccount (data) {
            try {
                const url = 'system/updateUser'
                const params = data
                await this.$store.dispatch(url, params)
                this.$message({
                    type: 'success',
                    message: '修改成功'
                })
                this.getDataList()
            } catch (e) {
                this.$message.error(e.data.message)
            }
        },
        async getDataList () {
            try {
                this.loading = true
                const url = `system/selectUser`
                const { pageNum, pageSize } = this.pageDataProps.paginationParams
                const { username } = this.pageDataProps.tableDataProps.selectParams
                const params = {
                    username,
                    pageNum,
                    pageSize
                }
                const res = await this.$store.dispatch(url, params)
                this.pageDataProps.tableDataProps.tableData = res.rows
                this.pageDataProps.paginationParams.total = res.count
            } catch (e) {
                this.$message.error(e.data.message)
            } finally {
                this.loading = false
            }
        },
        paginationChange (type, value) {
            this.getDataList()
        },
        async isExistsUsername (rule, value, callback) {
            try {
                if (this.dialogInfo.type === `edit` && value === this.dialogInfo.extraForm.username) {
                    callback()
                    return
                }
                const url = 'enter/isExistsUser'
                const params = {
                    username: this.dialogInfo.form.username
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
.account {
    // display: flex;
    // flex-direction: column;
}
.pagination-box {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
}
.dialog-style {
    ::v-deep .el-dialog {
        width: 500px;
        // margin-top: calc(50vh - 225px / 2) !important;
        .el-dialog__body {
            padding: 20px 20px 10px !important;
        }
        .el-dialog__footer {
            padding-top: 0 !important;
        }
    }
}
</style>