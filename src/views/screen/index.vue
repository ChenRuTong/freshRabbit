<template>
  <div class="screen">
    <div class="content">
      <div class="mt-10 mb-10">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/layout/category/${breadcrumbList.parentId}` }">
            <RouterLink :to="`/layout/category/${breadcrumbList.parentId}`">{{ breadcrumbList.parentName }}</RouterLink>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ breadcrumbList.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="goodsQuery.sortField" class="box-tabs" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div v-if="goodsLoading">
        <div style="background-color: aliceblue; padding: 10px 20px" v-for="(item, index) in 3" :key="index">
          <cLoading></cLoading>
        </div>
      </div>
      <cError v-if="goodsList.length === 0 && !goodsLoading && !goodsError"></cError>
      <cError v-if="goodsError" error-info="请求错误"></cError>
      <div
        class="flexBox"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabledScroll"
        v-if="!goodsLoading && !goodsError && goodsList.length !== 0">
        <cGoodItem :category-item="goodsList"></cGoodItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { getGoods, getbreadcrumb, type IgoodsQuery, type IgoodsItem, type IbreadcrumbResult } from '@/api/screen'
  import cGoodItem from '@/components/goodItem/index.vue'
  import cLoading from '@/components/loading/index.vue'
  import cError from '@/components/error/index.vue'
  import { ref, type Ref } from 'vue'
  const route = useRoute()

  const goodsQuery: Ref<IgoodsQuery> = ref({
    categoryId: '',
    page: 1,
    pageSize: 20,
    sortField: 'publishTime',
  })
  const goodsLoading = ref(true)
  const goodsError = ref(false)
  const goodsList: Ref<IgoodsItem[]> = ref([])
  const breadcrumbLoading = ref(false)
  const breadcrumbError = ref(false)
  const breadcrumbList: Ref<IbreadcrumbResult> = ref({
    id: '',
    name: '',
    picture: '',
    parentId: '',
    parentName: '',
    goods: [],
    categories: [],
    brands: [],
    saleProperties: [],
  })
  const disabledScroll = ref(false)
  const getGoodsList = async (isload = false) => {
    try {
      goodsError.value = false
      goodsQuery.value.categoryId = route.params.id
      const { code, result, msg } = await getGoods(goodsQuery.value)
      if (!isload) {
        goodsLoading.value = true
        goodsList.value = result.items
      } else {
        if (result.items.length === 0) {
          disabledScroll.value = true
        }
        goodsList.value = goodsList.value.concat(result.items)
      }
    } catch (err) {
      goodsError.value = true
    } finally {
      goodsLoading.value = false
    }
  }

  const getbreadcrumbList = async () => {
    try {
      breadcrumbLoading.value = true
      breadcrumbError.value = false
      const { code, result, msg } = await getbreadcrumb(route.params.id)
      breadcrumbList.value = result
    } catch (err) {
      breadcrumbError.value = true
    } finally {
      breadcrumbLoading.value = false
    }
  }
  const tabChange = (val: string) => {
    goodsQuery.value.sortField = val
    disabledScroll.value = false
    goodsQuery.value.page = 1
    getGoodsList()
  }

  const load = () => {
    goodsQuery.value.page++
    getGoodsList(true)
  }
  getGoodsList()
  getbreadcrumbList()
</script>

<style scoped lang="scss">
  .screen {
    min-height: calc(100vh - 683px);
    .content {
      .box-tabs {
        background-color: #ffffff;
        padding: 10px 20px;
        box-sizing: border-box;
      }
      .flexBox {
        display: flex;
        flex-wrap: wrap;
        background-color: #ffffff;
        margin-bottom: 10px;
        padding: 30px 0px;
        box-sizing: border-box;
      }
    }
  }
</style>
