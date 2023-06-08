<script setup lang="ts">
  import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
  #nprogress .bar {
    background: rgb(39,187,154) !important; //自定义进度条颜色
  }
</style>
