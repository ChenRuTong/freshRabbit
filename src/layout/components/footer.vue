<template>
  <div class="footer">
    <div class="content">
      <div class="top">
        <div class="leftBox">
          <div class="txtBox">客服服务</div>
          <div class="iconBox">
            <div class="leftIcon">
              <svg
                t="1685276795380"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1084"
                width="40"
                height="40">
                <path :d="weixinPath" fill="#2c2c2c" p-id="1085"></path>
              </svg>
              <span>在线客服</span>
            </div>
            <div class="rightIcon">
              <svg
                t="1685277838821"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1223"
                width="40"
                height="40">
                <path :d="problemPath" fill="#272636" p-id="1224"></path>
              </svg>
              <span>问题反馈</span>
            </div>
          </div>
        </div>
        <div class="centerBox">
          <div class="txtBox">关于我们</div>
          <div class="iconBox">
            <div class="leftIcon">
              <svg
                t="1685276046960"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="945"
                width="40"
                height="40">
                <path :d="customerServicePath" fill="#272636" p-id="946"></path>
              </svg>
              <span>公众号</span>
            </div>
            <div class="rightIcon">
              <svg
                t="1685277995068"
                class="icon"
                viewBox="0 0 1138 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1362"
                width="40"
                height="40">
                <path :d="microBlogPath" p-id="1363"></path>
              </svg>
              <span>微博</span>
            </div>
          </div>
        </div>
        <div class="rightBox">
          <div class="txtBox">下载app</div>
          <div class="iconBox">
            <div class="leftIcon">
              <img src="" alt="" />
            </div>
            <div class="rightIcon">
              <span>扫描二维码</span>
              <span class="mb-10">立马下载app</span>
              <el-button>下载页面</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="content">
        <div class="flexBox">
          <div class="leftBox">
            <span>价格亲名</span>
          </div>
          <div class="rightBox">
            <span>物流快捷</span>
          </div>
        </div>
      </div>
      <hr />
      <div class="txtBox">
        <div class="floatBox">
          <span>关于我们</span> | <sapn>帮助中心</sapn> | <span>售后服务</span> | <span>配送与验收</span> |
          <span>商务合作</span> | <span>搜索推荐</span> | <span>友情链接</span>
          <div class="mt-10">小兔新鲜</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { customerServicePath, weixinPath, problemPath, microBlogPath } from '@/svg/index.ts'
</script>

<style scoped lang="scss">
  .footer {
    background-color: #ffffff;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 50px 0px;
      .leftBox,
      .centerBox {
        width: 200px;
        .txtBox {
          text-align: center;
          color: rgb(132, 132, 132);
          font-size: 20px;
          margin-bottom: 10px;
        }
        .iconBox {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .leftIcon,
          .rightIcon {
            width: 95px;
            height: 90px;
            border: 1px solid #ccc;
            text-align: center;
            padding: 10px;
            box-sizing: border-box;
            span {
              display: block;
              color: rgb(132, 132, 132);
              font-size: 18px;
            }
          }
        }
      }
      .rightBox {
        text-align: center;
        .txtBox {
          color: rgb(132, 132, 132);
          font-size: 20px;
          margin-bottom: 10px;
        }
        .iconBox {
          width: 210px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .leftIcon {
            text-align: center;
            img {
              display: block;
              width: 95px;
              height: 90px;
            }
          }
          .rightIcon {
            display: flex;
            height: 100px;
            flex-direction: column;
            text-align: center;
            justify-content: start;
            span {
              display: block;
              color: rgb(132, 132, 132);
              font-size: 18px;
            }
          }
        }
      }
    }
    .bottom {
      min-width: 1200px;
      background-color: rgb(44, 44, 44);
      color: rgb(126, 126, 126);
      padding: 30px 0px;

      .content {
        .flexBox {
          display: flex;
          justify-content: center;
          padding: 30px 0px;
          .leftBox,
          .rightBox {
            margin: 20px;
            span {
              font-size: 25px;
            }
          }
        }
      }
      .txtBox {
        .floatBox {
          padding-top: 20px;
          text-align: center;
        }
      }
    }
  }
</style>
