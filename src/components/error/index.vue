<template>
  <div class="error" :style="{ 'height': height+'px', 'width' :width+'px' }">
    <el-empty :description="errorInfo" />
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      errorInfo: string
      height?: string
      width?: string
    }>(),
    {
      errorInfo: '空数据',
    }
  )
</script>

<style scoped lang="scss">
  .error {
    background-color: rgba($color: #9c8d8d, $alpha: 0.3);
  }
</style>
