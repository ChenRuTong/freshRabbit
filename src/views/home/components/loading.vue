<template>
  <div class="flexbox">
    <div>
      <span>加载中</span>
    </div>
    <div>
      <span>加载中</span>
    </div>
    <div>
      <span>加载中</span>
    </div>
    <div>
      <span>加载中</span>
    </div>
  </div>
</template>

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
        color: rgba(98, 86, 86, 0.9)
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
