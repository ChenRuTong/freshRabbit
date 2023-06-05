<template>
  <el-badge
    @mouseleave="mouseleave"
    :value="useShoppingCart.carList.length"
    :class="['badgeItem', { active: useShoppingCart.isAddCar }]">
    <el-icon size="30" @mouseenter="mouseenter"><ShoppingCart /></el-icon>
    <Transition name="layer">
      <div class="cartBox" v-if="isCart">
        <ul class="myroll" v-if="useShoppingCart.carList.length!==0">
          <TransitionGroup name="list">
            <li v-for="(cartItem, index) in useShoppingCart.carList" :key="cartItem.skuId">
              <img v-lazy="cartItem.picture" />
              <div class="centerBox">
                <span class="top tXtOverFlow2">{{ cartItem.name.cloned }}</span>
                <span class="bottom tXtOverFlow">{{ cartItem.attrsText }}</span>
              </div>
              <div class="rightBox">
                <span class="top">￥{{ cartItem.price.cloned }}</span>
                <span class="bottom">x {{ cartItem.count }}</span>
              </div>
              <div class="delBox">
                <el-button type="danger" :icon="Delete" circle @click="delgoods(cartItem.skuId)" />
              </div>
            </li>
          </TransitionGroup>
        </ul>
        <div class="myroll" v-if="useShoppingCart.carList.length === 0">
            <el-empty description="空数据" />
        </div>
        <div class="footer">
          <div>
            <span class="top">共计 {{ useShoppingCart.allGoodNum }} 商品</span>
            <span class="bottom">￥{{ useShoppingCart.allprice.toFixed(2) }}</span>
          </div>
          <el-button type="primary" @click="goCartList">去购物车结算</el-button>
        </div>
      </div>
    </Transition>
  </el-badge>
</template>

<script setup lang="ts">
  import { Delete } from '@element-plus/icons-vue'
  import { useShoppingCartStore } from '@/stores/shoppingCart'
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
 
  const useShoppingCart = useShoppingCartStore()
  const router = useRouter()
  const isCart = ref(false)

  const mouseenter = () => {
    isCart.value = true
  }

  const mouseleave = () => {
    isCart.value = false
  }
  const delgoods = (val: any) => {
    useShoppingCart.delCart(val)
  }

  const goCartList = ()=> {
    router.push({ name: 'cartList' })
  }
</script>

<style scoped lang="scss">
  .badgeItem {
    margin-left: 10px;
    position: relative;
    .cartBox {
      position: absolute;
      top: 47px;
      left: -348px;
      width: 390px;
      transition: all 0.5s;
      background-color: #ffffff;
      box-sizing: border-box;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      z-index: 99999;
      &::after {
        content: '';
        position: absolute;
        right: 14px;
        top: -10px;
        width: 20px;
        height: 20px;
        background: #fff;
        transform: scale(0.6, 1) rotate(45deg);
        box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
      }
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: -20px;
        width: 100%;
        height: 20px;
        background-color: transparent;
      }
      .myroll {
        list-style: none;
        height: 400px;
        overflow-y: auto;
        // overflow: overlay;
        overflow-x: hidden;
        margin: 0px;
        padding: 0px;
        &::-webkit-scrollbar {
          width: 10px;
        }
        /* 滚动槽 */
        &::-webkit-scrollbar-track {
          border-radius: 5px;
          background-color: rgba(0, 0, 0, 0.1);
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
          border-radius: 5px;
          background: rgba(197, 191, 191, 0.5);
        }

        li {
          display: flex;
          padding: 10px 10px;
          box-sizing: border-box;
          align-items: center;
          cursor: pointer;
          &:hover {
            background-color: rgb(248, 248, 248);
            .delBox {
              opacity: 1;
            }
          }
          img {
            width: 72px;
            height: 72px;
            flex-shrink: 0;
            margin-right: 10px;
          }
          .centerBox {
            width: 170px;
            flex-shrink: 0;
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
            width: 68px;
            flex-shrink: 0;
            text-align: center;
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
            opacity: 0;
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

  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .layer-enter-active,
  .layer-leave-active {
    transition: all 0.5s ease;
  }
  .layer-leave-active {
    transition-delay: 0.25s;
  }

  .layer-enter-active .myroll,
  .layer-leave-active .myroll {
    transition: all 0.3s ease-in-out;
  }

  .layer-enter-active .myroll {
    transition-delay: 0.25s;
  }

  .layer-enter-from .myroll,
  .layer-leave-to .myroll {
    transform: translateX(10px);
    opacity: 0.001;
  }

  .layer-enter-active .footer,
  .layer-leave-active .footer {
    transition: all 0.3s ease-in-out;
  }

  .layer-enter-active .footer {
    transition-delay: 0.25s;
  }

  .layer-enter-from .footer,
  .layer-leave-to .footer {
    opacity: 0.001;
  }

  .layer-enter-from {
    height: 0px;
  }
  .layer-enter-to {
    height: 493px;
  }

  .layer-leave-from {
    height: 493px;
  }
  .layer-leave-to {
    height: 0px;
  }
</style>
