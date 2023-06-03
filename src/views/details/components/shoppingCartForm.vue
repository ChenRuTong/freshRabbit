<template>
  <div class="shoppingCartForm">
    <span class="name">{{ GoodsDetailsList.name }}</span>
    <span class="goodTxt">{{ GoodsDetailsList.desc }}</span>
    <div class="priceBox"
      ><span class="now">￥{{ GoodsDetailsList.price }}</span>
      <span class="old">￥{{ GoodsDetailsList.oldPrice }}</span></div
    >
    <div class="promotionalSerBox">
      <div class="top"
        ><span class="left">促销</span> <span class="right">12月好物放送，App领券购买直降120元</span></div
      >
      <div class="bottom">
        <span class="left">服务</span>
        <div class="flexBox">
          <div>无忧退货</div>
          <div>快速退款</div>
          <div>免费包邮</div>
        </div>
        <span class="right">了解更多</span>
      </div>
    </div>

    <div class="normsBox" v-for="(item, index) in GoodsDetailsList.specs" :key="item.id">
      <div class="textBox">{{ item.name }}</div>
      <div class="flexBox">
        <div v-for="(valuesItem, index) in item.values">
          <div :class="['imgBox', `imgBox${item.id}`]" @click="changeColor(valuesItem, item.name, `imgBox${item.id}`,  $event)" v-if="valuesItem.picture"
            ><img v-lazy="valuesItem.picture"
          /></div>
          <div v-else :class="['sizeItem', `sizeItem${item.id}`]" @click="changeSize(valuesItem, item.name, `sizeItem${item.id}`, $event)">{{ valuesItem.name }}</div>
        </div>
      </div>
    </div>
    <div class="mb-20"> <el-input-number v-model="goodNum" :min="1" :max="10" @change="handleChange" /></div>
    <el-button type="primary" @click="addCard">加入购物车</el-button>
  </div>
</template>

<script setup lang="ts">
  import type { IgoodsDetailsResult, IgoodsDetailsValue } from '@/api/details'
  import { useCloned } from '@vueuse/core'
  import { getToken } from '@/utils/auth'
  import { useShoppingCartStore } from '@/stores/shoppingCart'
  import { ref, type Ref } from 'vue'

  const props = withDefaults(
    defineProps<{
      GoodsDetailsList: IgoodsDetailsResult
    }>(),
    {}
  )
  const useShoppingCart = useShoppingCartStore()
  const goodNum = ref(1)
  const cardInfo: Ref<any> = ref({
    id: '',
    skuId: '',
    name: '',
    attrsText: '',
    specs: [],
    picture: '',
    price: '',
    nowPrice: '',
    nowOriginalPrice:'',
    selected: true,
    stock: 0,
    count: 1,
    isEffective: true,
    discount:null,
    isCollect: false,
    postFee: 0,
    skuName: [],
  })

  cardInfo.value.skuName = useCloned(props.GoodsDetailsList.specs)
  cardInfo.value.price = useCloned(props.GoodsDetailsList.price)
  cardInfo.value.name = useCloned(props.GoodsDetailsList.name)

  const changeColor = (val: IgoodsDetailsValue, skuName: string, className: string, e: any) => {
    const domList = document.querySelectorAll(`.${className}`)
    if (e.target.className.includes('active')) {
      setSkuName(skuName, null)
      e.target.className = `imgBox ${className}`
    } else {
      setSkuName(skuName, val.name)
      domList.forEach((item, index) => {
        item.className = `imgBox ${className}`
      })
      e.target.className = `imgBox ${className} active`
    }
  }

  const setSkuName = (skuName: string, val: string | null) => {
    cardInfo.value.skuName.cloned.some((item: any, index: number) => {
      if (item.name === skuName) {
        item.values = val
        return true
      }
    })
  }

  const changeSize = (val: IgoodsDetailsValue, skuName: string, className: string, e: any) => {
    const domList = document.querySelectorAll(`.${className}`)
    if (e.target.className.includes('active')) {
      setSkuName(skuName, null)
      e.target.className = `sizeItem ${className}`
    } else {
      setSkuName(skuName, val.name)
      domList.forEach((item, index) => {
        item.className = `sizeItem ${className}`
      })
      e.target.className = `sizeItem ${className} active`
    }
  }

  const addCard = () => {
    if (getToken()) {
      console.log('aa')
    } else {
      props.GoodsDetailsList.skus.forEach((skusItem, sindex) => {
        if (compareArrays(skusItem.specs, cardInfo.value.skuName.cloned)) {
          cardInfo.value.skuId = skusItem.id
          cardInfo.value.picture = skusItem.picture
          useShoppingCart.addCart(cardInfo.value)
        }
      })
    }
  }
  const compareArrays = (arr1: any, arr2: any) => {
    // 如果数组长度不相等，则两个数组不相等
    if (arr1.length !== arr2.length) {
      return false
    }

    // 逐个比较元素是否相等
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].valueName !== arr2[i].values) {
        return false
      }
    }

    return true
  }

  const handleChange = (val: number) => {
    cardInfo.value.count = val
  }
</script>

<style scoped lang="scss">
  .shoppingCartForm {
    flex: 1;
    .name {
      display: block;
      font-size: 20px;
      color: rgb(110, 51, 51);
      margin-bottom: 10px;
    }
    .goodTxt {
      display: block;
      font-size: 15px;
      color: rgb(153, 181, 215);
      margin-bottom: 10px;
    }
    .priceBox {
      margin-bottom: 10px;
      .now {
        font-size: 20px;
        color: rgb(207, 68, 110);
      }
      .old {
        font-size: 16px;
        color: rgb(153, 153, 153);
        text-decoration: line-through;
      }
    }
    .promotionalSerBox {
      padding: 20px 10px;
      box-sizing: border-box;
      background-color: rgb(245, 245, 245);
      color: rgb(125, 102, 125);
      font-size: 14px;
      margin-bottom: 20px;
      .top {
        margin-bottom: 15px;
        .left {
          color: rgb(176, 153, 153);
          margin-right: 20px;
        }
        .right {
          color: rgb(199, 150, 102);
        }
      }
      .bottom {
        display: flex;
        .left {
          width: 32px;
          color: rgb(176, 153, 153);
          margin-right: 30px;
        }
        .flexBox {
          display: flex;
          div {
            margin-right: 20px;
            position: relative;
            &::after {
              display: block;
              content: '';
              position: absolute;
              left: -8px;
              top: 50%;
              transform: translate(0, -50%);
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background-color: rgb(39, 186, 155);
            }
          }
        }
        .right {
          color: rgb(39, 191, 193);
        }
      }
    }
    .normsBox {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .textBox {
        width: 50px;
        padding: 5px 0px;
        box-sizing: border-box;
        flex-shrink: 0;
        margin-right: 20px;
        text-align: center;
        color: rgb(176, 153, 176);
      }
      .flexBox {
        display: flex;
        flex-wrap: wrap;
        .imgBox {
          width: 50px;
          height: 50px;
          margin-right: 20px;
          margin-bottom: 10px;
          background-color: rgb(185, 205, 213);
          cursor: pointer;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          &.active {
            border: 2px solid rgb(39, 186, 155);
            box-sizing: border-box;
          }
        }
        .sizeItem {
          padding: 8px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          margin-right: 20px;
          margin-bottom: 10px;
          cursor: pointer;
          &.active {
            border: 1px solid rgb(39, 186, 155);
            box-sizing: border-box;
          }
        }
      }
    }
  }
</style>
