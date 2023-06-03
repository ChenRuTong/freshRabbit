<template>
  <div class="SearchBox">
    <el-input
      @input="input"
      v-model="SearchInfoComponents"
      placeholder="搜一搜"
      class="input-with-select"
      :prefix-icon="Search">
    </el-input>
    <el-badge :value="useShoppingCart.carList.length" @mouseleave="mouseleave" :class="['badgeItem', { active: useShoppingCart.isAddCar }]">
      <el-icon size="30" @mouseenter="mouseenter"><ShoppingCart /></el-icon>
      <div class="cartBox" @click="abc" v-if="isCart">
        <ul class="roll">
          <li v-for="(cartItem, index) in useShoppingCart.carList" :key="index">
            <img v-lazy="cartItem.picture" />
            <div class="centerBox">
              <span class="top">{{ cartItem.name.cloned }}</span>
              <span class="bottom">xxxxxxxx</span>
            </div>
            <div class="rightBox">
              <span class="top">{{ cartItem.price.cloned }}</span>
              <span class="bottom">x {{ cartItem.count }}</span>
            </div>
            <div class="delBox">
              <el-button type="danger" :icon="Delete" circle />
            </div>
          </li>
        </ul>
        <div class="footer">
          <div>
            <span class="top">共计 {{ useShoppingCart.allGoodNum }} 商品</span>
            <span class="bottom">￥{{ useShoppingCart.allprice }}</span>
          </div>
          <el-button>去购物车结算</el-button>
        </div>
      </div>
    </el-badge>
  </div>
</template>

<script setup lang="ts">
  import { Search, Delete } from '@element-plus/icons-vue'
  import { useShoppingCartStore } from '@/stores/shoppingCart'
  import { ref } from 'vue'

  const useShoppingCart = useShoppingCartStore()
  const isCart = ref(false)
  const props = defineProps<{
    modelValue?: string
  }>()
  const SearchInfoComponents = ref('')
  const emit = defineEmits(['update:modelValue'])

  const input = (e: Event) => {
    emit('update:modelValue', e)
  }
  const abc = () => {
    console.log('aaaa')
  }
  const mouseenter = () => {
    isCart.value = true
  }

  const mouseleave = () => {
    isCart.value = false
  }
</script>

<style scoped lang="scss">
  .SearchBox {
    width: 200px;
    display: flex;
    .badgeItem {
      margin-left: 10px;
      position: relative;
      .cartBox {
        position: absolute;
        top: 37px;
        left: -355px;
        width: 390px;
        transition: all 0.5s;
        background-color: #ffffff;
        box-sizing: border-box;
        box-shadow: 0 0 5px;
        ul {
          list-style: none;
          height: 400px;
          overflow-y: auto;
          overflow: overlay;
          margin: 0px;
          padding: 0px;

          li {
            display: flex;
            padding: 0px 10px;
            box-sizing: border-box;
            align-items: center;
            img {
              width: 100px;
              height: 100px;
              flex-shrink: 0;
            }
            .centerBox {
              width: 170px;
              flex-shrink: 0;
              span {
                display: block;
              }
              .top {
                color: #666;
                margin-bottom: 10px;
              }
              .bottom {
                color: #999;
                font-size: 15px;
              }
            }
            .rightBox {
              flex: 1;
              flex-shrink: 0;
              .top {
                color: red;
                margin-bottom: 10px;
                display: block;
              }
              .bottom {
                color: #999;
                display: block;
              }
            }
            .delBox {
              width: 50px;
              height: 50px;
              flex-shrink: 0;
              text-align: center;
              line-height: 50px;
              flex-shrink: 0;
            }
          }
        }
        .footer {
          padding: 20px 20px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: rgb(248, 248, 248);
          .top {
            display: block;
            color: #999;
            margin-bottom: 6px;
          }
          .bottom {
            display: block;
            color: red;
            font-size: 20px;
          }
        }
      }
      &.active {
        animation: headShake; /* referring directly to the animation's @keyframe declaration */
        animation-duration: 1s;
      }
    }
  }
</style>
