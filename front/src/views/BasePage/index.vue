<template>
    <div class="base-page">
        <!-- 顶部 -->
        <TopBar />
        <!-- 主容器 -->
        <MainContainer />
    </div>
</template>

<script>
import TopBar from './comps/TopBar'
import MainContainer from './comps/MainContainer'
export default {
    components: {
        TopBar,
        MainContainer
    },
    data () {
        return {

        }
    },
    watch: {
    },
    methods: {
        
    }
        
}
</script>

<style lang="scss" scoped>
.base-page {
    min-width: 1200px;
    width: 100%;
    height: 100%;
}
</style>