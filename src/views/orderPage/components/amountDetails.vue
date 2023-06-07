<template>
  <div class="topTitle" style="margin-top: 20px"> 金额明细 </div>
  <el-divider class="mydivider" />
  <div class="priceBox">
    <ul>
      <li>
        <span>商品件数：</span>
        <span>{{ orderList.summary.goodsCount }}件</span>
      </li>
      <li>
        <span>商品总价：</span>
        <span> ￥{{ orderList.summary.totalPrice }}</span>
      </li>
      <li>
        <span>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：</span>
        <span>￥{{ orderList.summary.postFee }}</span>
      </li>
      <li>
        <span>应付总额：</span>
        <span style="font-size: 20px; color: #cf4444">￥{{ orderList.summary.totalPayPrice }}</span>
      </li>
    </ul>
  </div>
  <el-divider class="mydivider" />
  <div class="btn"><el-button type="primary" @click="submint">提交订单</el-button></div>
</template>

<script setup lang="ts">
  import { type IorderResult } from '@/api/orderPage'

  const props = withDefaults(
    defineProps<{
      orderList?: IorderResult
    }>(),
    {
      orderList: () => ({} as IorderResult),
    }
  )
  const emit = defineEmits(['submint'])
  const submint = () => {
    emit('submint')
  }
</script>

<style scoped lang="scss">
  .mydivider,
  ::v-deep(.el-divider--horizontal) {
    background-color: #f5f5f5;
    border-top: 1px #f5f5f5;
  }
  .topTitle {
    padding: 20px 0px 0px 0px;
    box-sizing: border-box;
  }

  .priceBox {
    display: flex;
    justify-content: end;
    font-size: 14px;
    color: #333333;
    ul {
      width: 300px;
      margin: 0px;
      padding: 0px;
      list-style: none;
      li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }
    }
  }
  .btn {
    display: flex;
    justify-content: end;
    padding-bottom: 30px;
  }
</style>
