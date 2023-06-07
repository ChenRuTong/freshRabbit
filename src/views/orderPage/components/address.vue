<template>
  <div class="topTitle"> 收货地址 </div>
  <el-divider class="mydivider" />
  <el-card class="box-card" shadow="never">
    <div class="flexbox">
      <ul>
        <li
          >收&nbsp;&nbsp;货&nbsp;&nbsp;人：<span>{{ address.receiver }}</span></li
        >
        <li
          >联系方式：<span>{{ address.contact }}</span></li
        >
        <li
          >收货地址：<span>{{ address.fullLocation }} {{ address.address }}</span></li
        >
      </ul>
      <div>
        <el-button @click="changeAddress">切换地址</el-button>
        <el-button @click="addressAdd(true)">添加地址</el-button>
      </div>
    </div>
  </el-card>

  <!-- 切换地址 -->
  <el-dialog v-model="addressDialogchange" title="切换收货地址" width="30%" center>
    <div class="flexboxDialog">
      <el-scrollbar height="400px">
        <ul
          v-for="(addressItem, index) in orderList.userAddresses"
          class="adderssUl"
          :data-id="addressItem.id"
          @click="changeAddressItem(addressItem, index)">
          <li
            >收&nbsp;&nbsp;货&nbsp;&nbsp;人：<span>{{ addressItem.receiver }}</span></li
          >
          <li
            >联系方式：<span>{{ addressItem.contact }}</span></li
          >
          <li
            >收货地址：<span>{{ addressItem.fullLocation }} {{ addressItem.address }}</span></li
          >
        </ul>
      </el-scrollbar>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addressDialogchange = false">取消</el-button>
        <el-button type="primary" @click="seleAddress"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { type IorderResult, type IorderUserAddresse } from '@/api/orderPage'
  import { nextTick, ref, type Ref } from 'vue'

  const props = withDefaults(
    defineProps<{
      orderList?: IorderResult
    }>(),
    {
      orderList: () => ({} as IorderResult),
    }
  )

  const addressDialogchange = ref(false)
  const address: Ref<IorderUserAddresse | any> = ref({})
  const addressAlternate: Ref<IorderUserAddresse | any> = ref({})

  address.value = props.orderList.userAddresses[0]

  const emit = defineEmits(['changeAddress'])

  const changeAddress = () => {
    addressDialogchange.value = true
    nextTick(() => {
      const domlist = document.querySelectorAll('.adderssUl')
      domlist.forEach((item, ids) => {
        if (item.getAttribute('data-id') === address.value.id) {
          item.className = 'adderssUl active'
        } else {
          item.className = 'adderssUl'
        }
      })
    })
  }

  const addressAdd = (isAdd: boolean) => {
    
  }

  const changeAddressItem = (val: IorderUserAddresse, index: number) => {
    const domlist = document.querySelectorAll('.adderssUl')
    domlist.forEach((item, ids) => {
      item.className = 'adderssUl'
    })
    domlist[index].className = 'adderssUl active'
    addressAlternate.value = val
  }

  const seleAddress = () => {
    address.value = addressAlternate.value
    emit('changeAddress', address.value.id)
    addressDialogchange.value = false
  }

  defineExpose({ address })
</script>

<style scoped lang="scss">
  .topTitle {
    padding: 20px 0px 0px 0px;
    box-sizing: border-box;
  }

  .flexboxDialog {
    ul {
      padding: 10px;
      margin: 0px;
      margin-bottom: 10px;
      list-style: none;
      border: 1px solid #e4e4e4;
      cursor: pointer;
      &:hover {
        border-color: #27ba9b;
        background-color: rgba(#27ba9b, 0.2);
      }
      &.active {
        border-color: #27ba9b;
        background-color: rgba(#27ba9b, 0.2);
      }
      li {
        margin-bottom: 10px;
        color: #999;
        font-size: 14px;
        span {
          color: #666;
        }
      }
    }
  }
  .mydivider,
  ::v-deep(.el-divider--horizontal) {
    background-color: #f5f5f5;
    border-top: 1px #f5f5f5;
  }
  .flexbox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      padding: 0px;
      margin: 0px;
      list-style: none;
      li {
        margin-bottom: 10px;
        color: #999;
        font-size: 14px;
        span {
          color: #666;
        }
      }
    }
  }
</style>
