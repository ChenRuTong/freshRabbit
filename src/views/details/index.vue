<template>
  <div class="details">
    <div class="content">
      <div class="mt-20 mb-20">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/layout/category/${GoodsDetailsList?.categories?.[1].id}` }">
            <RouterLink :to="`/layout/category/${GoodsDetailsList.categories?.[1].id}`">{{
              GoodsDetailsList?.categories?.[1].name
            }}</RouterLink>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ GoodsDetailsList?.categories?.[0].name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="detailsTop">
        <cLoading :num="1" width="1150" height="517" v-if="GoodsDetailsLoading"></cLoading>
        <cError errorInfo="请教失败" width="1150" height="517" v-if="GoodsDetailsError"></cError>
        <ImageMagnifier
          :GoodsDetailsList="GoodsDetailsList"
          v-if="!GoodsDetailsLoading && !GoodsDetailsError"></ImageMagnifier>
        <shoppingCartForm
          :GoodsDetailsList="GoodsDetailsList"
          v-if="!GoodsDetailsLoading && !GoodsDetailsError"></shoppingCartForm>
      </div>
      <div class="detailsBottom">
        <div style="padding: 30px; background-color: #ffffff" v-if="GoodsDetailsLoading">
          <cLoading :num="1" width="860" height="562"></cLoading>
        </div>
        <div style="padding: 30px; background-color: #ffffff" v-if="GoodsDetailsError">
        <cError errorInfo="请教失败" width="860" v-if="GoodsDetailsError"></cError>
        </div>
        <detailsImg :GoodsDetailsList="GoodsDetailsList" v-if="!GoodsDetailsLoading && !GoodsDetailsError"></detailsImg>
        <hotGood></hotGood>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getGoodsDetails } from '@/api/details'
  import { ref, type Ref } from 'vue'
  import ImageMagnifier from './components/ImageMagnifier.vue'
  import shoppingCartForm from './components/shoppingCartForm.vue'
  import detailsImg from './components/detailsImg.vue'
  import hotGood from './components/hotGood.vue'
  import cLoading from '@/components/loading/index.vue'
  import cError from '@/components/error/index.vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const GoodsDetailsList: Ref<any> = ref({})
  const GoodsDetailsLoading = ref(false)
  const GoodsDetailsError = ref(false)

  const getGoodsDetailsList = async () => {
    try {
      GoodsDetailsLoading.value = true
      const { code, msg, result } = await getGoodsDetails(route.params.id)
      GoodsDetailsList.value = result
    } catch {
      GoodsDetailsError.value = true
    } finally {
      GoodsDetailsLoading.value = false
    }
  }

  getGoodsDetailsList()
</script>

<style scoped lang="scss">
  .details {
    margin-bottom: 10px;
    .content {
      .detailsTop {
        background-color: #ffffff;
        padding: 20px 25px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .detailsBottom {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
