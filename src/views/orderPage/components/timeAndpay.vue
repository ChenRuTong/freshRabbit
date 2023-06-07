<template>
  <div class="topTitle"> 配送时间 </div>
  <el-divider class="mydivider" />
  <div class="timeBox" style="margin-bottom: 20px">
    <div class="timeItem active" @click="senTime(1, 0)">不限送货时间：周一到周五</div>
    <div class="timeItem" @click="senTime(1, 1)">工作日送货：周一到周五</div>
    <div class="timeItem" @click="senTime(1, 2)">双休日、假日送货：周六到周日</div>
  </div>

  <div class="topTitle"> 支付方式 </div>
  <el-divider class="mydivider" />
  <div class="timeBox">
    <div class="PayItem active" @click="onPayFn(1, 0)">在线支付</div>
    <div class="PayItem" @click="onPayFn(1, 1)">货到付款</div>
    <div class="text">货到付款需要5快手续费</div>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['sendTime', 'payFn'])
  const senTime = (type: number, index: number) => {
    const domlist = document.querySelectorAll('.timeItem')
    domlist.forEach((item, ids) => {
      item.className = 'timeItem'
    })
    domlist[index].className = 'timeItem active'
    emit('sendTime', type)
  }

  const onPayFn = (type: number, index: number) => {
    const domlist = document.querySelectorAll('.PayItem')
    domlist.forEach((item, ids) => {
      item.className = 'PayItem'
    })
    domlist[index].className = 'PayItem active'
    emit('payFn', type)
  }
</script>

<style scoped lang="scss">
  .topTitle {
    padding: 20px 0px 0px 0px;
    box-sizing: border-box;
  }
  .timeBox {
    display: flex;
    .timeItem,
    .PayItem {
      min-width: 234px;
      padding: 0px 20px;
      color: #666666;
      font-size: 14px;
      text-align: center;
      height: 50px;
      line-height: 50px;
      margin-right: 20px;
      border: 1px solid #e4e4e4;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        border-color: #27ba9b;
      }
      &.active {
        border-color: #27ba9b;
      }
    }
    .text {
      min-width: 234px;
      padding: 0px 20px;
      text-align: center;
      height: 50px;
      line-height: 50px;
      margin-right: 20px;
      box-sizing: border-box;
      font-size: 14px;
      color: #999;
    }
  }
</style>
