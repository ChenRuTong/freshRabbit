<template>
  <div class="home">
    <div class="content">
      <div class="bannerBox" ref="bannerRef">
        <el-carousel height="500px" arrow="never" v-if="!bannerListError">
          <el-carousel-item v-for="(bannerItem, index) in bannerList" :key="bannerItem.id">
            <RouterLink :to="bannerItem.hrefUrl">
              <img :src="bannerItem.imgUrl" />
            </RouterLink>
          </el-carousel-item>
        </el-carousel>
        <cError v-else error-info="请求失败" height="500"></cError>
        <div class="leftBox" @mouseleave="mouseleave">
          <ul class="roll" v-if="!CategoryStore.categoryError && CategoryStore.categoryList.length !== 0">
            <li
              @mouseenter="mouseenter(categoryItem)"
              v-for="(categoryItem, index) in CategoryStore.categoryList"
              :key="categoryItem.id">
              <span class="mr-10" @click="mouseenterItemize(categoryItem)" :tabindex="categoryItem.id"
                >{{ categoryItem.name }}
              </span>
              <div class="mr-10" v-for="(childrenItem, childremIndex) in categoryItem.children">
                <span v-if="childremIndex <= 1" :tabindex="childrenItem.id" @click="mouseenterItemize(childrenItem)">{{
                  childrenItem.name
                }}</span>
              </div>
            </li>
          </ul>
          <cError v-if="CategoryStore.categoryError" error-info="请求失败" height="500" width="320"></cError>
          <cError
            v-if="CategoryStore.categoryList.length == 0 && !CategoryStore.categoryError"
            :error-info="CategoryStore.categoryLoading ? '加载中': '空数据'"
            height="500"
            width="320"></cError>
          <Transition
            enter-active-class="animate__animated animate__zoomIn"
            leave-active-class="animate__animated animate__zoomOut">
            <div
              :class="['hoverBox', 'roll', { noGrid: secondCategoryList.length === 0 }]"
              ref="hoverBoxRef"
              v-if="isSecondhoverBox">
              <div
                :class="['hoverItem', 'tXtOverFlow', { 'mr-20': index !== secondCategoryList.length - 1 }]"
                :tabindex="secondCategoryItem.id"
                v-for="(secondCategoryItem, index) in secondCategoryList"
                :key="secondCategoryItem.id"
                @click="mouseenterItemize(secondCategoryItem)">
                <img :src="secondCategoryItem.picture" :alt="secondCategoryItem.name" />
                <span>
                  {{ secondCategoryItem.name }}
                </span>
              </div>
              <el-empty description="暂时没有数据" v-if="secondCategoryList.length === 0" />
            </div>
          </Transition>
          <Transition
            enter-active-class="animate__animated animate__zoomIn"
            leave-active-class="animate__animated animate__zoomOut">
            <div
              :class="['hoverBox', 'roll', { noGrid: thirdCategoryList.length === 0 }]"
              ref="hoverBoxRef"
              v-if="isThirdhoverBox">
              <div
                :class="['hoverItem', 'tXtOverFlow', { 'mr-20': index !== thirdCategoryList.length - 1 }]"
                v-for="(thirdCategoryItem, index) in thirdCategoryList"
                :key="thirdCategoryItem.id">
                <img :src="thirdCategoryItem.picture" :alt="thirdCategoryItem.name" />
                <span>
                  {{ thirdCategoryItem.name }}
                </span>
              </div>
              <el-empty description="暂时没有数据" v-if="thirdCategoryList.length === 0" />
            </div>
          </Transition>
        </div>
      </div>
    </div>
    <productCard title="新鲜好物" txt="新鲜出炉，品质靠谱"></productCard>
    <productCard title="人气推荐" txt="人气爆款，不容错过"></productCard>
    <productSort
      :categoryItem="categoryItem"
      v-for="(categoryItem, index) in CategoryStore.categoryList"
      :key="categoryItem.id"></productSort>
  </div>
</template>

<script setup lang="ts">
  import { ref, type Ref, onMounted } from 'vue'
  import { RouterLink } from 'vue-router'
  import productCard from './components/productCard.vue'
  import productSort from './components/productSort.vue'
  import cError from '@/components/error/index.vue'
  import { useCategoryStore } from '@/stores/category'
  import { getBanner, type IbannerResult, type IcategoryResult, type IcategoryChildren } from '@/api/home'

  const CategoryStore = useCategoryStore()
  const bannerList: Ref<IbannerResult[]> = ref([])
  const secondCategoryList: Ref<IcategoryChildren[]> = ref([])
  const thirdCategoryList: Ref<IcategoryChildren[]> = ref([])
  const bannerRef = ref()
  const isSecondhoverBox = ref(false)
  const isThirdhoverBox = ref(false)
  const bannerListError = ref(false)

  onMounted(() => {
    getBannerList()
  })
  const getBannerList = async () => {
    //@ts-ignore
    const loadingBanner = ElLoading.service({
      target: bannerRef.value,
      background: 'rgba(0,0,0, 0.5)',
      text: '加载中',
    })
    try {
      const { code, result, msg } = await getBanner()
      bannerList.value = result
    } catch (err) {
      bannerListError.value = true
    } finally {
      loadingBanner.close()
    }
  }

  const mouseenter = (categoryItem: IcategoryResult) => {
    secondCategoryList.value = categoryItem.children.slice(2)
    thirdCategoryList.value = []
    isSecondhoverBox.value = true
    isThirdhoverBox.value = false
  }

  const mouseenterItemize = (childrenItem: IcategoryChildren) => {
    thirdCategoryList.value = childrenItem.goods ? childrenItem.goods : []
    isThirdhoverBox.value = true
  }

  const mouseleave = () => {
    isSecondhoverBox.value = false
    isThirdhoverBox.value = false
  }
</script>

<style scoped lang="scss">
  .home {
    min-height: calc(100% - 673px);
    .content {
      .bannerBox {
        position: relative;
        .leftBox {
          position: absolute;
          left: 0px;
          top: 0px;
          height: 100%;
          display: flex;
          ul {
            width: 320px;
            flex-shrink: 0;
            margin: 0px;
            padding: 10px 0px;
            box-sizing: border-box;
            list-style: none;
            background-color: rgba($color: #000000, $alpha: 0.5);
            color: #ffffff;
            overflow-y: auto;
            overflow: overlay;
            li {
              display: flex;
              height: 53px;
              line-height: 53px;
              padding: 0px 20px;
              box-sizing: border-box;
              transition: all 0.3s;
              cursor: pointer;
              span {
                &:hover {
                  color: red;
                }
                &:focus {
                  color: red;
                }
              }
              &:hover {
                background-color: rgba($color: #635f5f, $alpha: 0.9);
              }
            }
          }
          .hoverBox {
            width: 440px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 78px 78px 78px;
            grid-row-gap: 30px;
            padding: 10px 20px;
            box-sizing: border-box;
            background-color: rgba($color: #353333, $alpha: 0.8);
            color: #ffffff;
            overflow-y: auto;
            overflow: overlay;
            text-align: center;
            &.noGrid {
              display: block;
            }
            .hoverItem {
              width: 80px;
              text-align: center;
              height: 78px;
              cursor: pointer;
              transition: all 0.5s;
              &:hover {
                transform: scale(1.2);
              }
              &:focus {
                color: red;
              }
              img {
                display: block;
                width: 50px;
                height: 50px;
                margin: 0 auto;
                margin-bottom: 8px;
              }
            }
          }
        }
      }
    }
  }
</style>
