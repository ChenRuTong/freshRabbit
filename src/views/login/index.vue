<template>
  <div class="login">
    <lHeader></lHeader>
    <div class="bg" :style="`background-image: url(${bg})`"> 
        <LoginForm></LoginForm>
    </div>
    <lFooter></lFooter>
  </div>
</template>

<script setup lang="ts">
  import bg from '@/assets/login-bg.png'
  import lHeader from './components/header.vue'
  import LoginForm from './components/loginForm.vue'
  import lFooter from './components/footer.vue'

</script>

<style scoped lang="scss">
  .bg {
    position: relative;
    min-width: 1200px;
    height: 488px;
  }
</style>
