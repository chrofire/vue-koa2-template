<template>
    <div class="table-comp">
        <div class="top-content">
            <div class="top-left">
                <slot name="top-left"></slot>
            </div>
            <div class="top-right">
                <slot name="top-right"></slot>
            </div>
        </div>
        <slot name="dialog"></slot>
        <Table :tableDataProps="pageDataProps.tableDataProps">
            <template #everyOneGeneral="{ scope }">
                <!-- <span
                    @click="handleClick(scope)"
                    :class="{
                        'enable-click': (pageDataProps.tableDataProps.enableClickList || []).indexOf(scope._prop) !== -1
                    }"
                >
                    {{scope.scope.row[scope._prop]}}
                </span> -->
                <slot name="everyOneGeneral" :scope="scope"></slot>
            </template>
            <template #operateContent="{ scope }">
                <slot name="operateContent" :scope="scope"></slot>
            </template>
        </Table>
        <div class="pagination-box">
            <Pagination
                :paginationParams="pageDataProps.paginationParams"
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
        }
    },
    mounted () {
    },
    methods: {
        paginationChange (type, value) {
            this.$emit('paginationChange', type, value)
        },
        handleClick (scope) {
            const list = this.pageDataProps.tableDataProps.enableClickList
            if (list) {
                const res = list.some(item => scope._prop === item)
                if (res) {
                    console.log(scope)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.table-comp {
    .top-content {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .top-left {
            display: flex;
            > .el-input {
                margin-right: 10px;
                width: 140px;
            }
            > .el-select {
                margin-right: 10px;
                width: 140px;
            }
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
</style>