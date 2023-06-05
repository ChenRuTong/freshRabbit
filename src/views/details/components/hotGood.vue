<template>
  <div class="hotGood">
    <div class="title"> 24小时热榜 </div>

    <div class="GoodBox">
      <cLoading :num="1" width="160" height="160" v-if="GoodsHotListLoading"></cLoading>
      <cError error-info="请教失败" v-if="GoodsHotListError"></cError>
      <cError
        error-info="空数据"
        v-if="GoodsHotList.length === 0 && !GoodsHotListLoading && !GoodsHotListError"></cError>
      <cGoodItem
        :category-item="GoodsHotList"
        is-normal
        v-if="GoodsHotList.length !== 0 && !GoodsHotListLoading && !GoodsHotListError"></cGoodItem>
    </div>

    <div class="weektitle"> 周热榜 </div>
    <div class="GoodBox">
      <cLoading :num="1" width="160" height="160" v-if="GoodsHotListLoading"></cLoading>
      <cError error-info="请教失败" v-if="GoodsHotListError"></cError>
      <cError
        error-info="空数据"
        v-if="GoodsHotweekList.length === 0 && !GoodsHotListLoading && !GoodsHotListError"></cError>
      <cGoodItem
        :category-item="GoodsHotweekList"
        is-normal
        v-if="GoodsHotweekList.length !== 0 && !GoodsHotListLoading && !GoodsHotListError"></cGoodItem>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getGoodHot, type IgoodHotResult } from '@/api/details'
  import cGoodItem from '@/components/goodItem/index.vue'
  import { ref, type Ref } from 'vue'
  import { useRoute } from 'vue-router'
  import cLoading from '@/components/loading/index.vue'
  import cError from '@/components/error/index.vue'

  const route = useRoute()

  const GoodsHotList: Ref<IgoodHotResult[]> = ref([])
  const GoodsHotweekList: Ref<IgoodHotResult[]> = ref([])
  const GoodsHotListLoading = ref(false)
  const GoodsHotListError = ref(false)

  const getGoodsHotList = async (type: number) => {
    const goodHotQuery = {
      id: route.params.id,
      type,
      limit: 3,
    }
    GoodsHotListLoading.value = true
    const { code, msg, result } = await getGoodHot(goodHotQuery)
    if (type === 1) {
      GoodsHotList.value = result
    } else {
      GoodsHotweekList.value = result
    }
  }

  const getGoodHotInit = () => {
    const requestArray = [getGoodsHotList(1), getGoodsHotList(2)]
    Promise.all(requestArray)
      .then(() => {
        GoodsHotListLoading.value = false
      })
      .catch((err) => {
        GoodsHotListError.value = true
        GoodsHotListLoading.value = false
      })
  }
  getGoodHotInit()
</script>

<style scoped lang="scss">
  .hotGood {
    width: 265px;
    margin-left: 10px;
    .title {
      background-color: rgb(226, 98, 55);
      padding: 20px;
      box-sizing: border-box;
      color: #ffffff;
      font-size: 20px;
      margin-bottom: 10px;
    }
    .weektitle {
      background-color: rgb(226, 98, 55);
      padding: 20px;
      box-sizing: border-box;
      color: #ffffff;
      font-size: 20px;
      margin: 10px 0px;
    }
    .GoodBox {
      background-color: #ffffff;
      padding: 20px 45px;
      box-sizing: border-box;
    }
  }
</style>
