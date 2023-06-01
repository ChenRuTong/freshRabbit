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
      <div class="detailsTop" v-if="GoodsDetailsList.brand">
        <ImageMagnifier :GoodsDetailsList="GoodsDetailsList"></ImageMagnifier>
        <shoppingCartForm :GoodsDetailsList="GoodsDetailsList"></shoppingCartForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getGoodsDetails } from '@/api/details'
  import { ref, type Ref } from 'vue'
  import ImageMagnifier from './components/ImageMagnifier.vue'
  import shoppingCartForm from './components/shoppingCartForm.vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const GoodsDetailsList: Ref<any> = ref({})

  const getGoodsDetailsList = async () => {
    try {
      const { code, msg, result } = await getGoodsDetails(route.params.id)
      GoodsDetailsList.value = result
    } catch {
    } finally {
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
    }
  }
</style>
