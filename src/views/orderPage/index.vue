<template>
  <div class="orderPage">
    <div class="content" v-if="!orderListLoading && orderListErrorInfo === '' && !orderListError">
      <cAddress :order-list="orderList" @change-address="changeAddress" ref="cAddressRef"></cAddress>
      <cGoodList :order-list="orderList"></cGoodList>
      <cTimeAndpay @pay-fn="payFn" @send-time="sendTime"></cTimeAndpay>
      <cAmountDetails :order-list="orderList" @submint="submint"></cAmountDetails>
    </div>
    <div class="content" v-if="orderListLoading">
      <div style="padding-top: 20px">
        <el-skeleton :rows="3" animated />
      </div>
    </div>

    <div class="content" v-if="!orderListLoading && orderListErrorInfo !== ''">
      <el-empty>
        <el-button type="primary" @click="goHome" description="商品失效">返回首页</el-button>
      </el-empty>
    </div>
    <div class="content" v-if="time">
      <el-empty description="未登录"> </el-empty>
    </div>
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
  import { getOrder, type IorderResult, subOrder } from '@/api/orderPage'
  import { useRouter, useRoute } from 'vue-router'
  import { ref, type Ref } from 'vue'
  import cAddress from './components/address.vue'
  import cGoodList from './components/goodList.vue'
  import cTimeAndpay from './components/timeAndpay.vue'
  import cAmountDetails from './components/amountDetails.vue'

  const router = useRouter()
  const route = useRoute()

  const orderList: Ref<IorderResult | any> = ref({})
  const tokenErrorDialog = ref(false)
  const time: Ref<any> = ref(null)
  const countdown = ref(5)
  const orderListError = ref(false)
  const orderListErrorInfo = ref('')
  const orderListLoading = ref(false)
  const cAddressRef = ref()

  const submintQuery = {
    deliveryTimeType: 1, //配送时间
    payType: 1, //支付方式
    payChannel: 1, //支付渠道
    buyerMessage: '', //买家留言
    goods: [],
    addressId: '',
  }

  const goHome = () => {
    router.replace({ name: 'layout' })
  }

  const changeAddress = (id: string) => {
    submintQuery.addressId = id
  }

  const payFn = (val: number) => {
    submintQuery.payType = val
  }

  const sendTime = (val: number) => {
    submintQuery.deliveryTimeType = val
  }

  const submint = async () => {
    submintQuery.goods = orderList.value.goods.map((item: any, ids: number) => {
      return {
        skuId: item.skuId,
        count: item.count,
      }
    })
    if (submintQuery.addressId === '') {
      submintQuery.addressId = cAddressRef.value.address.id
    }
    try {
      const { msg, code, result } = await subOrder(submintQuery)
      router.replace({ name: 'pay', params: { id: result.id } })
    } catch (err) {
    } finally {
    }
  }

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
            time.value = null
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

<style lang="scss" scoped>
  .orderPage {
    min-width: 1200px;
    .content {
      background-color: #ffffff;
      padding: 0px 20px;
      box-sizing: border-box;
      margin: 20px auto;
      min-height: calc(100vh - 192px);
    }
  }
</style>
