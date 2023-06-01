<template>
  <div class="tabs" v-if="!isThirdTabs">
    <div class="tabsBox content">
      <clogo />
      <cMenu/>
      <cSearch v-model="SearchInfo"></cSearch>
    </div>
  </div>

  <Transition enter-active-class="animate__animated animate__pulse">
    <div class="secondTabs" v-if="iscHeader && !isThirdTabs">
      <cMenu/>
      <cSearch v-model="SearchInfo"></cSearch>
    </div>
  </Transition>

  <div class="thirdTabs" v-if="isThirdTabs">
    <clogo />
    <el-button type="primary" :icon="Operation" size="large" circle @click="openMeu" />
  </div>

  <el-drawer v-model="menuDrawer" direction="rtl" class="roll">
    <template #header>
      <h4>分类</h4>
    </template>
    <template #default>
      <el-scrollbar height="400px">
        <ul class="ulMenu">
          <li>
            <RouterLink class="linkBox" to="/layout/home">
              <span>首页</span>
            </RouterLink>
          </li>
          <li v-for="(tabsItem, index) in CategoryStore.categoryList" :key="index">
            <RouterLink class="linkBox" :to="'/layout/category/' + tabsItem.id">
              <span>{{ tabsItem.name }}</span>
            </RouterLink>
          </li>
        </ul>
      </el-scrollbar>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { Operation } from '@element-plus/icons-vue'
  import { RouterLink } from 'vue-router'
  import { useCategoryStore } from '@/stores/category'
  import clogo from './components/logo.vue'
  import cMenu from './components/menu.vue'
  import cSearch from './components/search.vue'

  onMounted(() => {
    window.addEventListener('resize', resize)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
  })

  const CategoryStore = useCategoryStore()
  const props = defineProps<{
    iscHeader?: boolean
  }>()
  const emit = defineEmits(['changeW'])
  const SearchInfo = ref('')
  const isThirdTabs = ref(false)
  const menuDrawer = ref(false)

  const resize = (e: Event) => {
    const w = (e?.target as any).innerWidth
    if (w < 870) {
      isThirdTabs.value = true
      emit('changeW', false)
    } else {
      isThirdTabs.value = false
      menuDrawer.value = false
      emit('changeW', true)
    }
  }

  const openMeu = () => {
    menuDrawer.value = true
  }
</script>

<style scoped lang="scss">
  .ulMenu {
    margin: 0px;
    padding: 0px;
    list-style: none;
    overflow-y: auto;
    li {
      padding: 10px 0px;
      .linkBox {
        text-decoration: none;
        color: #000000;
        &.router-link-exact-active {
          color: green;
          text-decoration: underline green;
        }
      }
    }
  }
  .tabs {
    background-color: #ffffff;
    padding: 10px 0px;
    .tabsBox {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .secondTabs {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    height: 70px;
    background-color: #ffffff;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0px;
    z-index: 999;
    box-shadow: 0 0 15px #000000;
  }

  .thirdTabs {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    padding: 0px 20px;
    box-sizing: border-box;
    position: fixed;
    top: 0px;
    z-index: 999;
    box-shadow: 0 0 15px #000000;
  }
</style>
