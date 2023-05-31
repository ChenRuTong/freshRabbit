<template>
  <template
    v-if="CategoryStore.categoryList.length !== 0 && !CategoryStore.categoryLoading && !CategoryStore.categoryError">
    <div class="productSort" v-for="(categoryItem, index) in CategoryStore.categoryList" :key="categoryItem.id">
      <div class="content">
        <div class="title">{{ categoryItem.name }}</div>
        <div class="contenBox">
          <div class="leftBox">
            <img v-lazy="categoryItem.goods[0].picture" :alt="categoryItem.name" />
          </div>
          <div class="rightBox">
            <div class="flexBox">
              <cGoddItem :category-item="categoryItem.goods"></cGoddItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <div class="productSort">
    <div class="content">
      <cLoading v-if="CategoryStore.categoryLoading" :loading-way="lodingType.Second"></cLoading>
    </div>
  </div>
  <div
    class="productSort"
    v-if="CategoryStore.categoryList.length == 0 && !CategoryStore.categoryLoading && !CategoryStore.categoryError">
    <div class="content">
      <cError error-info="空数据"></cError>
    </div>
  </div>
  <div class="productSort" v-if="!CategoryStore.categoryLoading && CategoryStore.categoryError">
    <div class="content">
      <cError error-info="请求失败"></cError>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCategoryStore } from '@/stores/category'
  import cError from '@/components/error/index.vue'
  import cLoading from '@/components/loading/index.vue'
  import cGoddItem from '@/components/goodItem/index.vue'
  import { lodingType } from '@/enum/index'

  const CategoryStore = useCategoryStore()
</script>

<style scoped lang="scss">
  .productSort {
    background-color: #ffffff;
    padding-bottom: 30px;
    padding-top: 30px;
    .content {
      .title {
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 10px;
      }
      .contenBox {
        display: flex;
        .leftBox {
          img {
            width: 280px;
            height: 100%;
            border-radius: 5px;
            cursor: pointer;
          }
        }
        .rightBox {
          flex-grow: 1;
          .flexBox {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
          }
        }
      }
    }
  }
</style>
