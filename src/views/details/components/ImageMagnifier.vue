<template>
  <div class="ImageMagnifier">
    <div>
      <div class="bannerBox" @mousemove="mousemove" @mouseenter="bannerMouseenter" @mouseleave="bannerMouseleave">
        <el-carousel
          :autoplay="autoplay"
          height="400px"
          arrow="never"
          indicator-position="none"
          @change="changeBanner"
          ref="elBannerRef">
          <el-carousel-item v-for="(item, index) in GoodsDetailsList.mainPictures" :key="index">
            <img v-lazy="item" style="width: 400px; height: 400px" />
          </el-carousel-item>
        </el-carousel>
        <div class="Mask" ref="maskRef" v-if="isMask"></div>
      </div>
      <div class="flexBox">
        <div>
          <span class="top">销量人气</span>
          <span class="center">{{ GoodsDetailsList.salesCount }}+</span>
          <span class="bottom">
            <i class="iconfont icon-task-filling" style="color: #27ba9b"></i>
            销量人气
          </span>
        </div>
        <div>
          <span class="top">商品评价</span>
          <span class="center"> {{ GoodsDetailsList.commentCount }} +</span>
          <span class="bottom">
            <i class="iconfont icon-comment-filling" style="color: #27ba9b"></i>
            查看评价
          </span>
        </div>
        <div>
          <span class="top">收藏人气</span>
          <span class="center"> {{ GoodsDetailsList.collectCount }} +</span>
          <span class="bottom">
            <i class="iconfont icon-favorite-filling" style="color: #27ba9b"></i>
            收藏商品
          </span>
        </div>
        <div>
          <span class="top">品牌信息</span>
          <span class="center">{{ GoodsDetailsList.brand.name }}</span>
          <span class="bottom">
            <i class="iconfont icon-dynamic-filling" style="color: #27ba9b"></i>
            品牌主页
          </span>
        </div>
      </div>
    </div>
    <div class="bigImg" v-if="isMask">
      <img ref="bigImgRef" :src="GoodsDetailsList.mainPictures[bannerIndex]" />
    </div>

    <ul>
      <li
        @mouseenter="mouseenter(index)"
        v-for="(item, index) in GoodsDetailsList.mainPictures"
        class="liBox"
        :class="index === 0 ? 'liBox active' : 'liBox'"
        :key="index">
        <img v-lazy="item" />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import type { IgoodsDetailsResult } from '@/api/details'
  import { ref } from 'vue'

  const props = withDefaults(
    defineProps<{
      GoodsDetailsList: IgoodsDetailsResult
    }>(),
    {}
  )

  const bannerIndex = ref(0)
  const elBannerRef = ref()
  const maskRef = ref()
  const autoplay = ref(true)
  const isMask = ref(false)
  const bigImgRef = ref()

  const changeBanner = (index: number) => {
    bannerIndex.value = index
    const domList = document.querySelectorAll('.liBox')
    domList.forEach((item, index) => {
      item.className = 'liBox'
    })
    domList[index].className = 'liBox active'
  }

  const mouseenter = (index: number) => {
    elBannerRef.value.setActiveItem(index)
  }

  const bannerMouseenter = () => {
    isMask.value = true
    autoplay.value = false
  }

  const bannerMouseleave = () => {
    isMask.value = false
    autoplay.value = true
  }

  const mousemove = (e: any) => {
    const maxX = 400 - 75
    const maxY = 400 - 75
    const x = e.layerX > 400 - 75 ? maxX : e.layerX < 75 ? 75 : e.layerX
    const y = e.layerY > 400 - 75 ? maxY : e.layerY < 75 ? 75 : e.layerY
    maskRef.value ? maskRef.value.style.transform = `translate(${x - 75}px, ${y - 75}px)` : ''
    bigImgRef.value ? bigImgRef.value.style.transform = `translate(${-e.layerX}px, ${-e.layerY}px)` : ''
  }
</script>

<style scoped lang="scss">
  .ImageMagnifier {
    display: flex;
    width: 530px;
    position: relative;
    .bigImg {
      width: 400px;
      height: 400px;
      position: absolute;
      left: 420px;
      top: 0px;
      z-index: 999;
      overflow: hidden;
      img {
        width: 800px;
        height: 800px;
      }
    }
    .bannerBox {
      width: 400px;
      height: 400px;
      position: relative;
      .Mask {
        width: 150px;
        height: 150px;
        background-color: rgba($color: #000000, $alpha: 0.3);
        position: absolute;
        top: 0px;
        left: 0px;
      }
    }
    .flexBox {
      display: flex;
      justify-content: space-between;
      padding: 20px 0px;
      div {
        min-width: 90px;
        text-align: center;
        position: relative;
        font-size: 14px;
        &:nth-last-child(1) {
          &::after {
            display: none;
          }
        }
        &::after {
          display: block;
          content: '';
          width: 1px;
          height: 50px;
          background-color: #e4e4e4;
          position: absolute;
          right: -5px;
          top: 50%;
          transform: translate(0, -50%);
        }
        .top {
          display: block;
          color: #999;
          margin-bottom: 10px;
        }
        .center {
          display: block;
          color: #cf4444;
          margin-bottom: 10px;
        }
        .bottom {
          color: #666;
          &:hover {
            color: #27ba9b
          }
        }
      }
    }
    ul {
      list-style: none;
      margin: 0px;
      padding: 0px;
      margin-left: 10px;
      .liBox {
        width: 64px;
        height: 64px;
        margin-bottom: 20px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
        &:nth-last-child(1) {
          margin-bottom: 0px;
        }
        &.active {
          border: 2px solid rgb(39, 186, 155);
          box-sizing: border-box;
        }
      }
    }
  }
</style>
