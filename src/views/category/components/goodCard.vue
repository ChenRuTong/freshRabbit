<template>
  <div class="goodCard">
    <div class="title">- {{ secondCategoryGood?.name }} -</div>
    <div class="flexBox" v-if="secondCategoryGood.goods.length !== 0 && !loading && !error">
      <cGoodItme :category-item="secondCategoryGood?.goods"></cGoodItme>
    </div>
    <cLoading v-if="loading"></cLoading>
    <cError v-if="error" error-info="请求失败"></cError>
    <cError v-if="secondCategoryGood.goods.length === 0 && !loading && !error" error-info="空数据"></cError>
  </div>
</template>

<script setup lang="ts">
  import type { IsecondCategoryChildren } from '@/api/category'
  import cGoodItme from '@/components/goodItem/index.vue'
  import cError from '@/components/error/index.vue'
  import cLoading from '@/components/loading/index.vue'

  const props = withDefaults(
    defineProps<{
      secondCategoryGood?: IsecondCategoryChildren
      loading: boolean
      error: boolean
    }>(),
    {
      secondCategoryGood: () => ({} as IsecondCategoryChildren),
    }
  )
</script>

<style scoped lang="scss">
  .goodCard {
    padding: 20px 20px;
    box-sizing: border-box;
    margin: 20px 0px;
    background-color: #ffffff;
    .title {
      text-align: center;
      font-size: 25px;
      color: rgb(102, 102, 102);
      margin-bottom: 20px;
    }
    .flexBox {
      display: flex;
      justify-content: space-around;
    }
  }
</style>
