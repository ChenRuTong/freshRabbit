<template>
  <div class="cartList">
    <div class="content">
      <el-table
        v-loading="useShoppingCart.carListLoading"
        ref="multipleTableRef"
        :data="useShoppingCart.carList"
        style="width: 100%"
        @select-all="selectAll"
        :header-row-style="{ height: '100px' }"
        @select="select">
        <el-table-column type="selection" width="55" />

        <el-table-column width="150" :align="'center'">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-image :preview-src-list="[scope.row.picture]" :src="scope.row.picture" preview-teleported />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="商品信息" width="180" :align="'center'">
          <template #default="scope">
            <span class="tXtOverFlow">{{ scope.row.name.cloned || scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column width="180" label="单价" :align="'center'">
          <template #default="scope">
            <span>￥{{ scope.row.price.cloned || scope.row.price }}</span>
          </template>
        </el-table-column>

        <el-table-column width="180" label="数量" :align="'center'">
          <template #default="scope">
            <el-input-number v-model="scope.row.count" :min="1" :max="10" @change="changeCount(scope.row)" />
          </template>
        </el-table-column>

        <el-table-column width="180" label="小计" :align="'center'">
          <template #default="scope">
            <span class="subtotal">
              ￥ {{ (scope.row.count * (scope.row.price.cloned || scope.row.price)).toFixed(2) }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="操作" :align="'center'">
          <template #default="scope">
            <el-button type="primary" :loading="useShoppingCart.delCartLoading" link @click="delGoods(scope.row.skuId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flexBox">
        <div class="left">
          共 {{ useShoppingCart.allGoodNum }} 件商品，已选择 {{ useShoppingCart.allSeleGoodNum }} 商品共计：
          <span class="price">￥ {{ useShoppingCart.allprice.toFixed(2) }}</span>
        </div>
        <el-button type="primary" @click="goOrderPage">下单结算</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useShoppingCartStore } from '@/stores/shoppingCart'
  import { nextTick, onMounted, ref, watch, type Ref } from 'vue'
  import { useRouter } from 'vue-router'

  const useShoppingCart = useShoppingCartStore()
  const router = useRouter()
  const multipleTableRef = ref()

  const multipleSelection: Ref<any> = ref([])
  watch(
    () => useShoppingCart.carList,
    () => {
      nextTick(() => {
        useShoppingCart.carList.forEach((row: any) => {
          multipleTableRef.value.toggleRowSelection(row, row.selected)
        })
      })
    },
    {
      immediate: true
    }
  )

  const selectAll = (selection: any) => {
    multipleSelection.value = selection
    if (selection.length !== 0) {
      useShoppingCart.changeSele(true, true)
    } else {
      useShoppingCart.changeSele(true, false)
    }
  }

  const delGoods = (skuId: string) => {
    useShoppingCart.delCart(skuId)
  }

  const select = (selection: any, row: any) => {
    useShoppingCart.changeSele(false, row.skuId, row.selected)
  }

  const goOrderPage = () => {
    router.push({ name: 'orderPage' })
  }

  const changeCount = (val: any)=> {
    useShoppingCart.changeCount(val.skuId, { count: val.count })
  }
</script>

<style lang="scss" scoped>
  .cartList {
    margin: 10px 0px;
    .subtotal {
      color: #cf4444;
      font-size: 16px;
    }
    .flexBox {
      display: flex;
      padding: 20px;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffff;
      margin: 10px 0px;
      .left {
        .price {
          font-size: 18px;
          color: #cf4444;
          font-weight: bold;
        }
      }
    }
  }
</style>
