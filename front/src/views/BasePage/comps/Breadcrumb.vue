
<template>
    <div class="breadcrumb" v-if="isShow">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
                {{item.title}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data () {
        return {
            breadcrumbList: [],
            isShow: false,
            blackList: ['/main/overview']
        }
    },
    watch: {
        $route: {
            handler () {
                this.init()
            },
            deep: true,
            immediate: true
        }
    },
    mounted (){
    },
    methods: {
        async init () {
            await this.getBreadcrumb()
            this.changeShow()
        },
        async getBreadcrumb () {
            let matched = [...this.$route.matched].slice(1)
            const result = matched.reduce((prev, item) => {
                const { path, meta } = item
                const data = {
                    path,
                    ...meta
                }
                if (meta.hasOwnProperty('showTitle') && !meta.showTitle) {
                    return [...prev]
                }
                return [...prev, data]
            }, [])
            this.breadcrumbList = result
        },
        changeShow () {
            this.isShow = this.blackList.some(item => item === this.$route.path) ? false : true
        }
    }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
    width: 100%;
    min-height: 35px;
    background-color: #ffffff;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    user-select: none;
    ::v-deep .el-breadcrumb__inner,
    ::v-deep .el-breadcrumb__separator {
        font-size: 16px;
        cursor: default !important;
    }
}
</style>