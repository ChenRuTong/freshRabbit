<template>
  <div :class="['layout', { active: !isNav }]">
    <cNav v-if="isNav"></cNav>
    <cHeader @changeW="changeW" ref="cHeaderRef" :iscHeader="iscHeader" />
    <RouterView />
    <cFooter></cFooter>
  </div>
</template>

<script setup lang="ts">
  import cHeader from '@/components/header/index.vue'
  import cFooter from './components/footer.vue'
  import cNav from './components/nav.vue'
  import { useCategoryStore } from '@/stores/category'
  import { useShoppingCartStore } from '@/stores/shoppingCart'
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  const cHeaderRef = ref()
  const iscHeader = ref(false)
  const isNav = ref(true)

  const CategoryStore = useCategoryStore()
  const useShoppingCart = useShoppingCartStore()
  useShoppingCart.getCartList()
  CategoryStore.getCategoryList()

  onMounted(() => {
    window.addEventListener('scroll', getScroll)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', getScroll)
  })

  const getScroll = () => {
    if (window.scrollY >= 157) {
      iscHeader.value = true
    } else {
      iscHeader.value = false
    }
  }

  const changeW = (e: boolean) => {
    isNav.value = e
  }
</script>

<style scoped lang="scss">
  .layout {
    min-height: 100%;
    background-color: rgb(243, 243, 243);
    &.active {
      padding-top: 84px;
    }
  }
</style>
