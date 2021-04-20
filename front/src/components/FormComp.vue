<template>
    <div class="form-comp">
        <el-form
            ref="FormComp"
            :model="formData"
            :rules="rules"
            label-width="110px"
            class="form"
            size="mini"
        >
            <template v-for="(item, index) in formInfo">
                <el-form-item
                    :key="index"
                    v-if="item.itemType === `input`"
                    :label="item.label"
                    :prop="item.model"
                >
                    <el-input
                        v-model="formData[item.model]"
                        :placeholder="item.placeholder"
                        :clearable="item.clearable"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    :key="index"
                    v-if="item.itemType === `select`"
                    :label="item.label"
                    :prop="item.model"
                >
                    <el-select
                        v-model="formData[item.model]"
                        :clearable="item.clearable"
                        :placeholder="item.placeholder"
                        size="mini"
                    >
                        <el-option
                            v-for="option in item.options"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    :key="index"
                    v-if="item.itemType === `cascader`"
                    :label="item.label"
                    :prop="item.model"
                >
                    <el-cascader
                        :options="item.options"
                        v-model="formData[item.model]"
                        :clearable="item.clearable"
                        :placeholder="item.placeholder"
                        :show-all-levels="item.showAllLevels || true"
                    >
                    </el-cascader>
                </el-form-item>
            </template>
        </el-form>
    </div>
</template>

<script>
import cloneDeep from 'lodash.cloneDeep'
export default {
    components: {
    },
    props: {
        formInfo: {
            type: Array,
            required: true
        },
        formData: {
            type: Object,
            required: false
        },
        rules: {
            type: Object,
            required: false
        }
    },
    data () {
        return {
            routerKey: +new Date()
        }
    },
    created () {
    },
    mounted () {
    },
    methods: {
        formSubmit () {
            this.$refs['FormComp'].validate(valid => {
                if (valid) {
                    for (const key in this.formData) {
                        if (!this.formData[key]) {
                            this.formData[key] = null
                        }
                    }
                    this.$emit('formSubmit', cloneDeep(this.formData))
                } else {
                    return false
                }
            })
        },
        formReset () {
            for (const key in this.formData) {
                this.formData[key] = null
            }
            this.$refs['FormComp'].resetFields()
        }
    }
}
</script>

<style lang="scss" scoped>
.form-comp {
    width: 100%;
}
</style>
