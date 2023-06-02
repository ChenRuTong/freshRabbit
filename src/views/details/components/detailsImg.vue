<template>
  <div class="detailsImg">
    <div class="title">商品详情</div>
    <div class="flexBox">
      <div v-for="(item, index) in GoodsDetailsList.details.properties" :key="index">
        <span class="left">{{ item.name }}</span>
        <span class="right">{{ item.value }}</span>
      </div>
    </div>
    <div class="imgBox" v-for="(ImgItem, index) in GoodsDetailsList.details.pictures" :key="index">
      <img v-lazy="ImgItem" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { IgoodsDetailsResult } from '@/api/details'

  const props = withDefaults(
    defineProps<{
      GoodsDetailsList: IgoodsDetailsResult
    }>(),
    {}
  )
</script>

<style scoped lang="scss">
  .detailsImg {
    flex-shrink: 0;
    background-color: #ffffff;
    .title {
      padding: 20px 30px;
      box-sizing: border-box;
      border-bottom: 1px solid #cccc;
      font-size: 20px;
    }
    .flexBox {
      padding: 20px 30px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      div {
        width: 49%;
        flex-shrink: 0;
        margin-bottom: 20px;
        font-size: 15px;
        display: flex;
        .left {
          width: 100px;
          flex-shrink: 0;
          color: #999;
        }
        .right {
          color: #666;
        }
      }
    }
    .imgBox {
      padding: 0px 30px 0px 30px;
      box-sizing: border-box;
      img {
        width: 860px;
        display: block;
      }
    }
  }
</style>
