<template>
  <div class="flexbox" v-if="loadingWay === lodingType.One">
    <div :style="{ 'width': width+'px', 'height': height+'px' }" v-for="item, index in num" :key="index">
      <span>加载中</span>
    </div>
  </div>

  <div class="flexboxTwo" v-if="loadingWay === lodingType.Second">
    <div class="left">
      <span>加载中</span>
    </div>
    <div class="right">
      <div class="flexBox">
        <div
          v-for="(item, index) in 9"
          :key="index"
          :class="[
            'goodItem',
            {
              active: index > Math.floor(9 / 4) * 4 - 1 || index >= (Math.ceil(9 / 4) - 1) * 4,
            },
          ]">
          <span>加载中</span>
        </div>
      </div>
    </div>
  </div>

  <el-row :gutter="30" v-if="loadingWay === lodingType.Third">
    <el-col :span="2.5" v-for="(item, index) in 5" :key="index">
      <div class="flexboxThree">
        <div>
            <span>加载中</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
  import { lodingType } from '@/enum'
  const props = withDefaults(
    defineProps<{
      loadingWay?: lodingType,
      width?:string,
      height?:string,
      num?:number
    }>(),
    {
      loadingWay: lodingType.One,
      num: 4
    }
  )
</script>
<style scoped lang="scss">
  .flexbox {
    display: flex;
    justify-content: space-between;
    div {
      width: 280px;
      height: 280px;
      background-color: #cccc;
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      span {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgba(98, 86, 86, 0.9);
      }
      &::after {
        /* 内容区域空状态时追加骨架屏样式 */
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        background: linear-gradient(90deg, transparent, rgba(225, 225, 225, 0.753), transparent);
        animation: loading 1.5s infinite;
      }
    }
  }
  .flexboxTwo {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    .left {
      width: 280px;
      height: 700px;
      background-color: #cccc;
      overflow: hidden;
      position: relative;
      span {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgba(98, 86, 86, 0.9);
      }
      &::after {
        /* 内容区域空状态时追加骨架屏样式 */
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        background: linear-gradient(90deg, transparent, rgba(225, 225, 225, 0.753), transparent);
        animation: loading 1.5s infinite;
      }
    }
    .right {
      flex: 1;
      .flexBox {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        .goodItem {
          width: 210px;
          height: 226px;
          flex-shrink: 0;
          margin: 0px 10px 10px 10px;
          text-align: center;
          cursor: pointer;
          background-color: #cccc;
          overflow: hidden;
          position: relative;
          span {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: rgba(98, 86, 86, 0.9);
          }
          &.active {
            margin: 0px 10px 0px 10px;
          }
          &::after {
            /* 内容区域空状态时追加骨架屏样式 */
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            transform: translateX(-100%);
            background: linear-gradient(90deg, transparent, rgba(225, 225, 225, 0.753), transparent);
            animation: loading 1.5s infinite;
          }
        }
      }
    }
  }
  .flexboxThree {
    display: flex;
    justify-content: space-between;
    div {
      width: 96px;
      height: 40px;
      background-color: #cccc;
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      span {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgba(98, 86, 86, 0.9);
      }
      &::after {
        /* 内容区域空状态时追加骨架屏样式 */
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        background: linear-gradient(90deg, transparent, rgba(225, 225, 225, 0.753), transparent);
        animation: loading 1.5s infinite;
      }
    }
  }

  @keyframes loading {
    /* 骨架屏的动画 */
    100% {
      transform: translateX(100%);
    }
  }
</style>
