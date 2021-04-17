<template>
    <div class="table">
        <el-table
            ref="table"
            :data="tableDataProps.tableData"
            @cell-click="handleCellClick"
            :border="true"
            :highlight-current-row="singleSelect"
            @current-change="singleSelectChange"
            @selection-change="multipleSelectChange"
            header-row-class-name="header-row-class"
        >
            <template>
                <template v-if="tableDataProps.hasIndex">
                    <el-table-column
                        label="序号"
                        type="index"
                        width="50"
                    >
                    </el-table-column>
                </template>
                <template v-if="multipleSelect">
                    <el-table-column
                        type="selection"
                        width="55"
                    >
                    </el-table-column>
                </template>
                <!-- 遍历表头 -->
                <template v-for="(item, index) in tableDataProps.tableHeader">
                    <!-- 操作列 -->
                    <template v-if="item.type === `operate`">
                        <el-table-column
                            :key="index"
                            :label="item.label"
                            :width="item.width"
                            :fixed="item.fixed"
                        >
                            <template #default="scope">
                                <slot name="operateContent" :scope="scope"></slot>
                            </template>
                        </el-table-column>
                    </template>
                    <!-- 普通列 -->
                    <template v-else>
                        <el-table-column
                            :key="index"
                            :prop="item.prop"
                            :label="item.label"
                            :width="item.width"
                            :fixed="item.fixed"
                            show-overflow-tooltip
                        >
                            <template #header="scope">
                                <slot name="everyOneGeneralHeader" :scope="scope">
                                    <span>{{scope.column.label}}</span>
                                </slot>
                            </template>
                            <template #default="scope">
                                <slot name="everyOneGeneral" :scope="scope">
                                    <span @click="handleClick(scope)">{{scope.row[scope.column.property]}}</span>
                                </slot>
                            </template>
                        </el-table-column>
                    </template>
                </template>
            </template>
        </el-table>
    </div>
</template>

<script>
export default {
    props: {
        tableDataProps: {
            type: Object,
            default: () => ({})
        }
    },
    data () {
        return {
            singleSelect: false,
            multipleSelect: false
        }
    },
    mounted () {
        this.initTable()
    },
    methods: {
        initTable () {
            if (this.tableDataProps.selectType) {
                switch (this.tableDataProps.selectType) {
                    case 'single':
                        this.singleSelect = true
                        break
                    case 'multiple':
                        this.multipleSelect = true
                        break
                    default:
                        break
                }
            }
        },
        handleClick (scope) {
            // console.log(scope)
        },
        handleCellClick (row, column, cell, event) {
            // console.log(row, column, cell, event)
        },
        // 单选
        setSingleSelect (row) {
            // console.log(row)
            this.$refs.table.setCurrentRow(row)
        },
        singleSelectChange (currentRow, oldCurrentRow) {
            if (this.singleSelect) {
                this.$emit('singleSelectChange', currentRow, oldCurrentRow)
            }
        },
        // 多选
        setMultipleSelect (rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.table.toggleRowSelection(row)
                })
            } else {
                this.$refs.table.clearSelection()
            }
        },
        multipleSelectChange (selection) {
            if (this.multipleSelect) {
                this.$emit('multipleSelectChange', selection)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .table {
    // overflow: hidden;
}

::v-deep .header-row-class {
    th {
        background-color: #ecf5ff;
    }
}
</style>