<template>
  <div class="topTitle"> 商品信息 </div>
  <el-divider class="mydivider" />
  <el-table ref="multipleTableRef" :data="orderList.goods" style="width: 100%" :header-row-style="{ height: '60px' }">
    <el-table-column width="300" :align="'left'" label="商品信息">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-image
            :preview-src-list="[scope.row.picture]"
            :src="scope.row.picture"
            preview-teleported
            style="width: 90px" />
          <div style="margin-left: 10px">
            <span class="tXtOverFlow">{{ scope.row.name }}</span>
            <span class="tXtOverFlow">{{ scope.row.attrsText }}</span>
          </div>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="单价" width="180" :align="'center'">
      <template #default="scope">
        <span class="tXtOverFlow">￥{{ scope.row.price }}</span>
      </template>
    </el-table-column>

    <el-table-column width="180" label="数量" :align="'center'">
      <template #default="scope">
        <span>{{ scope.row.count }}</span>
      </template>
    </el-table-column>

    <el-table-column width="180" label="小计" :align="'center'">
      <template #default="scope">
        <span>￥{{ scope.row.totalPrice }}</span>
      </template>
    </el-table-column>

    <el-table-column label="实付" :align="'center'">
      <template #default="scope">
        <span>￥{{ scope.row.totalPayPrice }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
  import { type IorderResult, type IorderUserAddresse } from '@/api/orderPage'

  const props = withDefaults(
    defineProps<{
      orderList?: IorderResult
    }>(),
    {
      orderList: () => ({} as IorderResult),
    }
  )
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
</style>
