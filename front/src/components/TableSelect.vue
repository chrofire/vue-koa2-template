<template>
    <div class="table-select">
        <div class="top-content">
            <div class="top-left">
                <slot name="top-left" :refreshData="getDataList"></slot>
            </div>
            <div class="top-right">
                <slot name="top-right"></slot>
            </div>
        </div>
        <Table
            :tableDataProps="pageDataProps.tableDataProps"
            @singleSelectChange="singleSelectChange"
            @multipleSelectChange="multipleSelectChange"
            ref="selectTable"
        >
            <template #everyOneGeneral="{ scope }">
                <slot name="everyOneGeneral" :scope="scope"></slot>
            </template>
            <template #operateContent="{ scope }">
                <slot name="operateContent" :scope="scope"></slot>
            </template>
        </Table>
        <div class="pagination-box">
            <Pagination
                :paginationParams="paginationParams"
                @paginationChange="paginationChange"
            ></Pagination>
        </div>
    </div>
</template>

<script>
import Table from '@/components/Table'
import Pagination from '@/components/Pagination'
export default {
    components: {
        Table,
        Pagination
    },
    props: {
        pageDataProps: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            loading: false,
            paginationParams: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    mounted () {
        this.getDataList()
    },
    methods: {
        paginationChange (type, value) {
            this.getDataList()
        },
        handleClick (scope) {
            const list = this.pageDataProps.tableDataProps.enableClickList
            if (list) {
                const res = list.some(item => scope._prop === item)
                if (res) {
                    console.log(scope)
                }
            }
        },
        initSetSelect () {
            const selectType = this.pageDataProps.tableDataProps.selectType
            const selectProp = this.pageDataProps.tableDataProps.selectProp
            const selectData = this.pageDataProps.tableDataProps.selectData
            const tableData = this.pageDataProps.tableDataProps.tableData
            if (selectData) {
                switch (selectType) {
                    case 'single':
                        tableData.forEach(item => {
                            if (item[selectProp] === selectData[selectProp]) {
                                this.$refs['selectTable'].$refs['table'].setCurrentRow(item)
                            }
                        })
                        break
                    case 'multiple':
                        break
                    default:
                        break
                }
            }

        },
        setSingleSelect (row) {
            this.$nextTick(() => {
                this.$refs.selectTable.$refs.table.setSingleSelect(row)
            })
        },
        setMultipleSelect (rows) {
            this.$nextTick(() => {
                this.$refs.selectTable.$refs.table.setMultipleSelect(rows)
            })
        },
        singleSelectChange (currentRow, oldCurrentRow) {
            if (currentRow) {
                this.$emit('singleSelectChange', currentRow, oldCurrentRow)
            }
        },
        multipleSelectChange (selection) {
            this.$emit('multipleSelectChange', selection)
        },
        async getDataList () {
            try {
                this.loading = true
                const url = this.pageDataProps.urlInfo.table
                const { pageNum, pageSize } = this.paginationParams
                const selectParams = this.pageDataProps.tableDataProps.selectParams
                const params = {
                    ...selectParams,
                    pageNum,
                    pageSize
                }
                const res = await this.$store.dispatch(url, params)
                this.pageDataProps.tableDataProps.tableData = res.rows
                this.paginationParams.total = res.count
                this.$nextTick (() => {
                    this.initSetSelect()
                })
            } catch (e) {
                this.$message.error(e.data.message)
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.table-select {
    .top-content {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .top-left {
        display: flex;
        > .el-input {
            margin-right: 10px;
            width: 140px;
        }
    }
}
.pagination-box {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
}
.enable-click {
    color: #61cad7;
    cursor: pointer;
}
::v-deep .el-table {
    .el-table__body tr.current-row > td {
        background-color: #f4f4f5;
    }
}
</style>