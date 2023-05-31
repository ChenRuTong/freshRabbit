<template>
  <div class="categoryCard" v-if="!loading && !error && SecondCategoryList.length !== 0">
    <div class="title">全部分类</div>
    <div class="flexBox">
      <div class="cardBox" v-for="(SecondCategoryItem, index) in SecondCategoryList" :key="SecondCategoryItem.id" @click="goSub(SecondCategoryItem.id)">
        <img v-lazy="SecondCategoryItem.picture" :alt="SecondCategoryItem.name" />
        <span>{{ SecondCategoryItem.name }}</span>
      </div>
    </div>
  </div>
  <div class="categoryCard" v-if="loading"><cLoading width="100" height="130" :num=7></cLoading></div>
  <div class="categoryCard" v-if="!loading && error"><cError error-info="请求失败"></cError></div>
  <div class="categoryCard" v-if="SecondCategoryList.length === 0 && !loading && !error"><cError error-info="空数据"></cError></div>
</template>

<script lang="ts" setup>
  import type { IsecondCategoryChildren } from '@/api/category'
  import cLoading from '@/components/loading/index.vue'
  import cError from '@/components/error/index.vue'

  const emit = defineEmits(['goSub'])
  const props = withDefaults(
    defineProps<{
      loading?: boolean
      error?: boolean
      SecondCategoryList: IsecondCategoryChildren[]
    }>(),
    {
      SecondCategoryList: () => [],
    }
  )

  const goSub = (id: string)=> {
    emit('goSub', id)
  }
</script>

<style scoped lang="scss">
  .categoryCard {
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
      .cardBox {
        width: 100px;
        height: 130px;
        text-align: center;
        cursor: pointer;
        &:hover {
          color: rgb(41,186,155);
        }
        img {
          display: block;
          width: 100px;
          height: 100px;
          margin-bottom: 8px;
        }
      }
    }
  }
</style>
