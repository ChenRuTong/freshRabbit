<template>
  <div class="productSort">
    <div class="content">
      <div class="title">{{ categoryItem.name }}</div>
      <div class="contenBox">
        <div class="leftBox">
          <img v-lazy="categoryItem.goods[0].picture" :alt="categoryItem.name" />
        </div>
        <div class="rightBox">
          <div class="flexBox">
            <div
              :class="[
                'goodItem',
                {
                  active:
                    index > Math.floor(categoryItem.goods.length / 4) * 4 - 1 ||
                    index >= (Math.ceil(categoryItem.goods.length / 4) - 1) * 4,
                },
              ]"
              v-for="(categoryGoodsItem, index) in categoryItem.goods"
              :key="categoryGoodsItem.id">
              <img v-lazy="categoryGoodsItem.picture" :alt="categoryGoodsItem.name" />
              <span class="oneTxt tXtOverFlow">{{ categoryGoodsItem.name }}</span>
              <span class="twoTxt tXtOverFlow">{{ categoryGoodsItem.desc }}</span>
              <span class="threeTxt">￥{{ categoryGoodsItem.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { IcategoryResult } from '@/api/home'

  const props = withDefaults(
    defineProps<{
      categoryItem: IcategoryResult
    }>(),
    {
      categoryItem: () => ({} as IcategoryResult),
    }
  )
</script>

<style scoped lang="scss">
  .productSort {
    background-color: #ffffff;
    padding-bottom: 30px;
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
            .goodItem {
              width: 210px;
              height: 226px;
              flex-shrink: 0;
              margin: 0px 10px 10px 10px;
              text-align: center;
              cursor: pointer;
              &.active {
                margin: 0px 10px 0px 10px;
              }
              img {
                display: block;
                width: 210px;
                height: 150px;
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
          }
        }
      }
    }
  }
</style>
