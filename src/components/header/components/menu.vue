<template>
  <el-row :gutter="30">
    <el-col :span="2.5" v-for="(tabsItem, index) in tabsData" :key="index">
      <RouterLink class="linkBox" :to="tabsItem.path">
        <span>{{ tabsItem.name }}</span>
      </RouterLink>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
  const props = defineProps<{
    tabsData?: {
      name: string
      path: string,
    }[]
  }>()
</script>

<style scoped lang="scss">
  .linkBox {
    text-decoration: none;
    color: #000000;
    &.router-link-exact-active {
      color: green;
      text-decoration: underline green;
    }
  }
</style>
