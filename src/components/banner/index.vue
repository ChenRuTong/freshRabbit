<template>
  <div class="bannerBox">
    <el-carousel height="500px" arrow="never" v-if="!useBanner.bannerListError">
      <el-carousel-item v-for="(bannerItem, index) in useBanner.bannerList" :key="bannerItem.id">
        <RouterLink :to="`/layout/category/${ bannerItem.hrefUrl.slice(bannerItem.hrefUrl.lastIndexOf('/')+1)}`">
          <img :src="bannerItem.imgUrl" />
        </RouterLink>
      </el-carousel-item>
    </el-carousel>
    <cError v-else error-info="请求失败" height="500"></cError>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import cError from '@/components/error/index.vue'
  import { useBannerStore } from '@/stores/banner'
  const useBanner = useBannerStore()
</script>

<style scoped lang="scss">
  .bannerBox {
    position: relative;
  }
</style>
