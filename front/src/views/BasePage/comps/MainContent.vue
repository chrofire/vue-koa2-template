<template>
    <div class="main-content">
        <!-- 面包屑 -->
        <Breadcrumb />
        <!-- 内容 -->
        <router-view class="content"></router-view>
    </div>
</template>

<script>
import Breadcrumb from './Breadcrumb'
export default {
    components: {
        Breadcrumb
    }
        
}
</script>

<style lang="scss" scoped>
.main-content {
    width: calc(100% - 200px);
    padding: 14px;
    display: flex;
    flex-direction: column;
    background-color: #f5f5fb;
    display: flex;
    flex-direction: column;
    .content {
        background-color: #fff;
        padding: 20px 20px 10px;
        // 非限定高度
        // min-height: calc(100% - 35px - 14px);
        // 限定高度
        height: calc(100% - 35px - 14px);
        overflow: auto;
    }
}
</style>