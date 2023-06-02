<template>
  <div class="SearchBox">
    <el-input
      @input="input"
      v-model="SearchInfoComponents"
      placeholder="搜一搜"
      class="input-with-select"
      :prefix-icon="Search">
    </el-input>
    <el-badge :value="useShoppingCart.carList.length" :class="['badgeItem', { active: useShoppingCart.isAddCar }]">
      <el-icon size="30"><ShoppingCart /></el-icon>
      <div class="cartBox" @click="abc">
        
      </div>
    </el-badge>
  </div>
</template>

<script setup lang="ts">
  import { Search } from '@element-plus/icons-vue'
  import { useShoppingCartStore } from '@/stores/shoppingCart'
  import { ref } from 'vue'

  const useShoppingCart = useShoppingCartStore()
  const props = defineProps<{
    modelValue?: string
  }>()
  const SearchInfoComponents = ref('')
  const emit = defineEmits(['update:modelValue'])

  const input = (e: Event) => {
    emit('update:modelValue', e)
  }
  const abc =()=> {
    console.log('aaaa')
  }
</script>

<style scoped lang="scss">
  .SearchBox {
    width: 200px;
    display: flex;
    .badgeItem {
      margin-left: 10px;
      position: relative;
      &:hover .cartBox{
        transform: translateY(10px);
        height: 100px;
        opacity: 1;
      }
      .cartBox {
        position: absolute;
        top: 20px;
        width: 100px;
        height: 0px;
        background-color: red;
        transition: all .5s;
        opacity: 0;
      }
      &.active {
        animation: headShake; /* referring directly to the animation's @keyframe declaration */
        animation-duration: 1s;
      }
    }
  }
</style>
