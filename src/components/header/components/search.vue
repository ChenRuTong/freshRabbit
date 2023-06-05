<template>
  <div class="SearchBox">
    <el-input
      @input="input"
      v-model="SearchInfoComponents"
      placeholder="搜一搜"
      class="input-with-select"
      :prefix-icon="Search">
    </el-input>
  </div>
</template>

<script setup lang="ts">
  import { Search } from '@element-plus/icons-vue'
  import { ref } from 'vue'

  const props = defineProps<{
    modelValue?: string
  }>()
  const SearchInfoComponents = ref('')
  const emit = defineEmits(['update:modelValue'])

  const input = (e: Event) => {
    emit('update:modelValue', e)
  }

</script>

<style scoped lang="scss">
  .SearchBox {
    width: 200px;
  }
</style>
