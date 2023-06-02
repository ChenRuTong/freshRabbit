<template>
  <div
    :class="[
      { goodItem: !isNormal },
      {
        active:
          index > Math.floor(categoryItem.length / 4) * 4 - 1 || index >= (Math.ceil(categoryItem.length / 4) - 1) * 4,
      },
      { goodItemNormal: isNormal },
    ]"
    v-for="(categoryGoodsItem, index) in categoryItem"
    :key="categoryGoodsItem.id">
    <img v-lazy="categoryGoodsItem.picture" :alt="categoryGoodsItem.name" />
    <span class="oneTxt tXtOverFlow">{{ categoryGoodsItem.name }}</span>
    <span class="twoTxt tXtOverFlow">{{ categoryGoodsItem.desc }}</span>
    <span class="threeTxt">￥{{ categoryGoodsItem.price }}</span>
  </div>
</template>

<script setup lang="ts">
  import type { IsecondCategoryGood } from '@/api/category'
  import type { IcategoryGood } from '@/api/home'
  import type { IgoodsItem } from '@/api/screen'

  const props = withDefaults(
    defineProps<{
      categoryItem?: IsecondCategoryGood[] | IcategoryGood[] | IgoodsItem[]
      isNormal: boolean
    }>(),
    {
      categoryItem: () => [],
      isNormal: false,
    }
  )
</script>

<style scoped lang="scss">
  .goodItemNormal {
    width: 160px;
    height: 239px;
    flex-shrink: 0;
    margin-bottom: 10px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      box-shadow: 0 -1px 10px rgba(41, 186, 155, $alpha: 1);
    }
    img {
      display: block;
      width: 160px;
      height: 160px;
      margin-bottom: 8px;
      border-radius: 5px;
    }
    .oneTxt {
      margin-bottom: 5px;
    }
    .twoTxt {
      font-size: 14px;
      color: #cccc;
      margin-bottom: 5px;
    }
    .threeTxt {
      color: red;
    }
  }
  .goodItem {
    width: 160px;
    height: 239px;
    flex-shrink: 0;
    margin: 0px 35px 10px 35px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      box-shadow: 0 -1px 10px rgba(41, 186, 155, $alpha: 1);
    }
    &.active {
      margin: 0px 35px 0px 35px;
    }
    img {
      display: block;
      width: 160px;
      height: 160px;
      margin-bottom: 8px;
      border-radius: 5px;
    }
    .oneTxt {
      margin-bottom: 5px;
    }
    .twoTxt {
      font-size: 14px;
      color: #cccc;
      margin-bottom: 5px;
    }
    .threeTxt {
      color: red;
    }
  }
</style>
