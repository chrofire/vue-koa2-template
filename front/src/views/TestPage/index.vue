<template>
    <div>
        <el-button @click="dialogInfo.dialogVisible = true">表单测试</el-button>
        <el-dialog
            :title="dialogInfo.title"
            :visible.sync="dialogInfo.dialogVisible"
            append-to-body
            class="dialog-style"
            @close="dialogClose"
        >
            <FormComp
                ref="FormComp"
                :form-info="dialogInfo.formInfo"
                :form-data="dialogInfo.formData"
                :rules="dialogInfo.rules"
                @formSubmit="formSubmit"
            ></FormComp>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="ensureDialog">确 定</el-button>
                <el-button size="mini" @click="dialogInfo.dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import FormComp from '@/components/FormComp'
export default {
    components: {
        FormComp
    },
    data () {
        return {
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
                formInfo: [
                    {
                        itemType: 'input',
                        label: '输入框：',
                        model: 'inputContent',
                        clearable: true,
                        placeholder: '请输入'
                    },
                    {
                        itemType: 'select',
                        model: 'selectContent',
                        clearable: true,
                        label: '选择框：',
                        value: null,
                        placeholder: '选择',
                        options: [
                            {
                                value: 1, label: '测试1'
                            },
                            {
                                value: 2, label: '测试2'
                            }
                        ]
                    },
                    {
                        itemType: 'cascader',
                        model: 'cascaderContent',
                        clearable: true,
                        label: '级联：',
                        value: null,
                        placeholder: '选择',
                        options: []
                    }
                ],
                formData: {
                    inputContent: null,
                    selectContent: null
                },
                rules: {
                    selectContent: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ]
                }
            }
        }
    },
    methods: {
        dialogClose () {
            this.$refs['FormComp'].formReset()
        },
        ensureDialog () {
            this.$refs['FormComp'].formSubmit()
        },
        formSubmit (data) {
            console.log(data)
            this.dialogInfo.dialogVisible = false
        }
    }
}
</script>

<style lang="scss" scoped>

</style>