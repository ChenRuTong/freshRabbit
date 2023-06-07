<template>
  <div class="pay">
    <div class="content" v-if="!DetailsListLoading && !DetailsListError">
      <div class="top">
        <div class="left">
          <i class="icon iconfont icon-queren2"></i>
          <div class="txt">
            <span class="txtTop">订单提交成功！请尽快完成支付</span>
            <span class="txtBottom"
              >支付还剩 <el-countdown :value="new Date(DetailsList.payLatestTime)" />
              超时后将取消订单
            </span>
          </div>
        </div>
        <div class="right">
          应付总额：<span>￥{{ DetailsList.payMoney }}</span>
        </div>
      </div>

      <div class="bottom">
        <div class="title"> 选择以下支付方式支付 </div>
        <el-divider class="mydivider" />
        <div class="title">支付平台</div>
        <ul>
          <li class="wx" @click="showQr"></li>
          <li class="zf" @click="showQr"></li>
        </ul>
        <div class="title">支付方式</div>
        <ul>
          <li class="payItem" @click="payFn(0)">招商银行</li>
          <li class="payItem" @click="payFn(1)">工商银行</li>
          <li class="payItem" @click="payFn(2)">建设银行</li>
          <li class="payItem" @click="payFn(3)">农业银行</li>
          <li class="payItem" @click="payFn(4)">交通银行</li>
        </ul>
      </div>
    </div>
    <div class="content" v-if="DetailsListLoading">
      <div style="background-color: #ffffff; min-height: calc(100vh - 192px); padding: 50px"
        ><el-skeleton :rows="3" animated
      /></div>
    </div>
    <div class="content" style="background-color: #ffffff; min-height: calc(100vh - 192px)" v-if="DetailsListError">
      <el-empty description="商品失效">
        <el-button type="primary" @click="goHome">返回首页</el-button>
      </el-empty>
    </div>

    <el-dialog v-model="codeDialog" title="打赏作者" width="600px" align-center show-close center>
      <img src="@/assets/code.jpg" style="display: block; width: 500px; height: 500px; margin: 0 auto" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { ref, type Ref } from 'vue'
  import { getDetails } from '@/api/orderPage'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()
  const codeDialog = ref(false)
  const DetailsList: Ref<any> = ref({})
  const DetailsListLoading = ref(false)
  const DetailsListError = ref(false)

  const goHome = () => {
    router.replace({ name: 'layout' })
  }

  const getDetailsList = async () => {
    try {
      DetailsListLoading.value = true
      const { msg, code, result } = await getDetails(route.params.id)
      DetailsList.value = result
    } catch (err) {
      DetailsListError.value = true
    } finally {
      DetailsListLoading.value = false
    }
  }
  getDetailsList()
  const showQr = () => {
    codeDialog.value = true
  }
  const payFn = (index: number) => {
    const domlist = document.querySelectorAll('.payItem')
    domlist.forEach((item, index) => {
      item.className = 'payItem'
    })
    domlist[index].className = 'payItem active'
  }
</script>

<style scoped lang="scss">
  .pay {
    min-width: 1200px;
    ::v-deep(.el-statistic__content) {
      color: #666;
      font-size: 16px;
    }
    .content {
      margin: 10px auto;
      .mydivider,
      ::v-deep(.el-divider--horizontal) {
        background-color: #f5f5f5;
        border-top: 1px #f5f5f5;
      }
      .top {
        padding: 50px 50px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #ffffff;
        .left {
          display: flex;
          align-items: center;
          i {
            color: rgb(29, 199, 121);
            font-size: 60px;
          }
          .txt {
            margin-left: 10px;
            span {
              display: block;
            }
            .txtTop {
              font-size: 20px;
              margin-bottom: 5px;
            }
            .txtBottom {
              display: flex;
              align-items: center;
              color: #999;
              font-size: 16px;
            }
          }
        }
        .right {
          color: #999;
          span {
            color: #cf4444;
            font-size: 20px;
          }
        }
      }
      .bottom {
        padding: 20px 0px;
        box-sizing: border-box;
        margin-top: 10px;
        background-color: #ffffff;
        ul {
          margin: 0px;
          padding: 20px 20px 20px 20px;
          list-style: none;
          display: flex;
          li,
          .payItem {
            width: 150px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            color: #666;
            border: 1px solid #e4e4e4;
            cursor: pointer;
            margin-right: 30px;
            &.active {
              border-color: rgb(29, 199, 121);
            }
            &:hover {
              border-color: rgb(29, 199, 121);
            }
          }
          .wx {
            background: url('https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg')
              no-repeat center/contain;
          }
          .zf {
            background: url('https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png')
              no-repeat center/contain;
          }
        }
        .title {
          padding: 0px 20px 0px 20px;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
