<template>
  <div class="header">
    <div class="navBox">
      <el-button :icon="User" class="cbutton" link>周杰伦</el-button> | <el-button class="cbutton" link>退出登录</el-button> |
      <el-button class="cbutton" link>我的订单</el-button> | <el-button class="cbutton" link>会员中心</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
  .header {
    .navBox {
      width: 100%;
      min-width: 1200px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: end;
      background-color: #000000;
      color: rgb(70, 71, 72);
      padding: 0px 20px;
      box-sizing: border-box;
      line-height: 50px;
      .cbutton, :deep(.el-button) {
        margin: 0px;
        span {
          color: rgb(145, 145, 144);
        }
      }
      .cbutton, :deep(.el-button.is-link):hover {
        span {
          color: #ffffff;
        }
      }
    }
  }
</style>
