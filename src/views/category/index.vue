<template>
    <div class="category">
      <div class="content">
        <div class="mt-10 mb-10">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ SecondCategoryList.name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="content" ref="bannerRef">
        <cBanner></cBanner>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import { getSecondCategory, type IsecondCategoryResult } from '@/api/category'
    import { onMounted, ref, type Ref } from 'vue'
    import { useRoute, onBeforeRouteUpdate } from 'vue-router'
    import cBanner from '@/components/banner/index.vue'
    import { useBannerStore } from '@/stores/banner'
  
    const route = useRoute()
    const useBanner = useBannerStore()
    const bannerRef = ref()
    const SecondCategoryList: Ref<IsecondCategoryResult> = ref({
      id: '',
      children: [],
      name: '',
    })
    const SecondCategoryLoading = ref(false)
    const SecondCategoryError = ref(false)
  
    onMounted(() => {
      useBanner.getBannerList(() => {
        //   @ts-ignore
        const loadingBanner = ElLoading.service({
          target: bannerRef.value,
          background: 'rgba(0,0,0, 0.5)',
          text: '加载中',
        })
        return loadingBanner
      })
    })
  
    onBeforeRouteUpdate((e) => {
      getSecondCategoryList(e.params.id)
    })
  
    const getSecondCategoryList = async (id = route.params.id) => {
      try {
        SecondCategoryLoading.value = true
        const { code, result, msg } = await getSecondCategory(id)
        SecondCategoryList.value = result
      } catch (err) {
        SecondCategoryError.value = true
      } finally {
        SecondCategoryLoading.value = false
      }
    }
  
    getSecondCategoryList()
  </script>
  
  <style scoped lang="scss">
    .category {
      min-width: 1200px;
      min-height: calc(100% - 673px);
    }
  </style>
  