<template>
  <div class="orderPage">
    <el-dialog
      v-model="tokenErrorDialog"
      title="token失效"
      width="30%"
      align-center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="orderListErrorInfo !== ''">
      <span v-if="orderListErrorInfo">{{ orderListErrorInfo }}</span>
      <span v-else>token失效 {{ countdown }} 秒后返回登录页 ......</span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { getOrder } from '@/api/orderPage'
  import { useRouter, useRoute } from 'vue-router'
  import { ref } from 'vue'

  const router = useRouter()
  const route = useRoute()
  const orderList = ref({})
  const tokenErrorDialog = ref(false)
  const time = ref(0)
  const countdown = ref(5)
  const orderListError = ref(false)
  const orderListErrorInfo = ref('')
  const orderListLoading = ref(false)

  const getOrderList = async () => {
    try {
      orderListLoading.value = true
      const { msg, code, result } = await getOrder()
      orderList.value = result
    } catch (err: any) {
      tokenErrorDialog.value = true
      orderListError.value = true
      if (err.code === '10019') {
        time.value = setInterval(() => {
          countdown.value--
          if (countdown.value <= 0) {
            clearInterval(time.value)
            tokenErrorDialog.value = false
            router.replace({ name: 'login', params: { fromPath: `${route.fullPath}` } })
          }
        }, 1000)
      } else {
        orderListErrorInfo.value = err.msg
      }
    } finally {
      orderListLoading.value = false
    }
  }
  getOrderList()
</script>

<style lang="scss" scoped></style>
