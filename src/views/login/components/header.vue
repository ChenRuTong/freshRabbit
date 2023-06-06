<template>
  <div class="header">
    <div class="content">
      <div class="top">
        <img src="@/assets/logo.jpg" />
        <div class="leftBox" @click="goHome">
          <span>进入网站首页</span>
          <i class="iconfont icon-angle-right"></i><i class="iconfont icon-angle-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const goHome = () => {
    router.push({ name: 'home' })
  }
</script>
<style scoped lang="scss">
  .header {
    margin-bottom: 30px;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: end;
      img {
        display: block;
        width: 200px;
        height: 100px;
      }
      .leftBox {
        cursor: pointer;
        &:hover {
          color: #27ba9b;
        }
        i {
          font-size: 14px;
          color: #27ba9b;
        }
      }
    }
  }
</style>
