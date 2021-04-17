<template>
    <el-pagination
        :page-size.sync="paginationParams.pageSize"
        :current-page.sync="paginationParams.pageNum"
        :total="paginationParams.total"
        :background="defaultOptions.background"
        :page-sizes="defaultOptions['page-sizes']"
        :layout="defaultOptions['layout']"
        :pager-count="defaultOptions['pager-count']"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        paginationOptionsProps: {
            type: Object,
            default: () => {}
        },
        paginationParams: {
            type: Object,
            default: () => ({
                pageNum: 1,
                pageSize: 10,
                total: 0
            })
        }
    },
    data () {
        return {
            defaultOptions: {
                background: true,
                'page-sizes': [5, 10, 20, 50, 100, 200],
                layout: `total, sizes, prev, pager, next, jumper`,
                'pager-count': 7 // 最大页码按钮数
            }
        }
    },
    computed: {
        currentPage: {
            get () {
                return this.current
            },
            set (value) {
                this.$emit('update:current', value)
            }
        },
        pageSize: {
            get () {
                return this.limit
            },
            set (value) {
                this.$emit('update:limit', value)
            }
        }
    },
    mounted () {
        this.initPaginationOptions()
    },
    methods: {
        initPaginationOptions () {
            if (this.paginationOptionsProps) {
                Object.keys(this.defaultOptions).forEach(key => {
                    if (this.paginationOptionsProps.hasOwnProperty(key)) {
                        this.$set(this.defaultOptions, key, this.paginationOptionsProps[key])
                    }
                })
            }
        },
        // 每页条数改变
        handleSizeChange (value) {
            this.paginationParams.pageNum = 1
            this.paginationParams.pageSize = value
            this.$emit('paginationChange', 'page-size', value)
        },
        // 选中页改变
        handleCurrentChange (value) {
            this.paginationParams.pageNum = value
            this.$emit('paginationChange', 'current-page', value)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>