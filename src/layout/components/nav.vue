<template>
  <div class="header">
    <div class="navBox" v-if="useUser.userInfo.token">
      <el-button :icon="User" class="cbutton" link>{{ useUser.userInfo.nickname }}</el-button> |
      <el-popconfirm
        title="确定要退出登录吗？"
        confirm-button-text="是"
        cancel-button-text="否"
        @confirm="logout">
        <template #reference>
          <el-button class="cbutton" link>退出登录</el-button>
        </template>
      </el-popconfirm>
      |
      <el-button class="cbutton" link>我的订单</el-button> | <el-button class="cbutton" link>会员中心</el-button>
    </div>
    <div class="navBox" v-else>
      <el-button class="cbutton" link @click="goLogin">请先登录</el-button> | <el-button class="cbutton" link>帮助中心</el-button> |
      <el-button class="cbutton" link>关于我们</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { User } from '@element-plus/icons-vue'
  import { useUserStore } from '@/stores/user'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const useUser = useUserStore()
  const logout = () => {
    useUser.clearUserInfo()
    router.replace({ name: 'login' })
  }

  const goLogin = ()=> {
    router.push({name: 'login'})
  }
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
      .cbutton,
      :deep(.el-button) {
        margin: 0px;
        span {
          color: rgb(145, 145, 144);
        }
        .el-icon {
          font-size: 15px;
        }
      }
      .cbutton,
      :deep(.el-button.is-link):hover {
        span {
          color: rgb(41, 186, 155);
        }
        .el-icon {
          color: rgb(41, 186, 155);
        }
      }
    }
  }
</style>
