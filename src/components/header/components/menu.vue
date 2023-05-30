<template>
  <el-row
    :gutter="30"
    v-if="CategoryStore.categoryList.length !== 0 && !CategoryStore.categoryLoading && !CategoryStore.categoryError">
    <el-col :span="2.5">
      <RouterLink class="linkBox" to="/layout/home">
        <span>首页</span>
      </RouterLink>
    </el-col>
    <el-col :span="2.5" v-for="(tabsItem, index) in CategoryStore.categoryList" :key="tabsItem.id">
      <RouterLink class="linkBox" :to="'/layout/category/' + tabsItem.id">
        <span>{{ tabsItem.name }}</span>
      </RouterLink>
    </el-col>
  </el-row>
  <el-row
    :gutter="30"
    v-if="CategoryStore.categoryList.length == 0 && !CategoryStore.categoryLoading && !CategoryStore.categoryError">
    <el-col :span="2.5">
      <RouterLink class="linkBox" to="/layout/home">
        <span>首页</span>
      </RouterLink>
    </el-col>
    <el-col :span="2.5" v-for="(item, index) in 5" :key="index">
      <div class="flexbox">
        <span>空数据</span>
      </div>
    </el-col>
  </el-row>
  <cLoading :loading-way="lodingType.Third" v-if="CategoryStore.categoryLoading"></cLoading>

  <div class="errorBox" v-if="CategoryStore.categoryError">请求失败</div>
</template>

<script setup lang="ts">
  import { useCategoryStore } from '@/stores/category'
  import { lodingType } from '@/enum/index'
  import cLoading from '@/components/loading/index.vue'

  const CategoryStore = useCategoryStore()
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
  .errorBox {
    width: 500px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: rgba(225, 225, 225, 0.753);
  }
  .flexbox {
    background-color: #cccc;
    color: rgba(98, 86, 86, 0.9);
    padding: 0px 10px;
  }
</style>
