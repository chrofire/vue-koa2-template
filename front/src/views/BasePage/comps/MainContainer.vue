<template>
    <div class="main-container">
        <!-- 侧边栏 -->
        <SideBar />
        <!-- 主内容 -->
        <MainContent />
    </div>
</template>

<script>
import SideBar from './SideBar'
import MainContent from './MainContent'
export default {
    components: {
        SideBar,
        MainContent
    }
}
</script>

<style lang="scss" scoped>
.main-container {
    display: flex;
    // 非限定高度
    // min-height: calc(100% - 60px);
    // 限定高度
    height: calc(100% - 60px);
}
</style>