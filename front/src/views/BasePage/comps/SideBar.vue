<template>
    <div class="side-bar">
        <el-scrollbar style="height: calc(100vh - 60px);" :wrapStyle="[{'overflow-x':'hidden'}]">
            <Menu
                :route="route"
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect"
            />
        </el-scrollbar>
    </div>
</template>

<script>
import { _adminRoutes } from '@/router/adminRoutes'
import Menu from '@/components/Menu'
export default {
    components: {
        Menu
    },
    data () {
        return {
            route: []
        }
    },
    computed: {
    },
    mounted () {
        this.route = _adminRoutes[0].children.slice(1)
    },
    methods: {
        handleOpen (key, keyPath) {
            // console.log(key, keyPath)
        },
        handleSelect (key, keyPath) {
            // console.log(key, keyPath)
        },
        handleClose (key, keyPath) {
            // console.log(key, keyPath)
        }
    }
}
</script>

<style lang="scss" scoped>
.side-bar {
    min-width: 200px;
    // min-height: 100%;
    height: calc(100% - 60px);
    background-color: #ffffff;
}
</style>