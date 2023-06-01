<template>
  <div class="goodCard">
    <div class="goodCardBox content">
      <div class="topBox">
        <span class="leftTxt">{{ title }}</span>
        <span class="rightTxt">{{ txt }}</span>
      </div>
      <div class="cardItemBox" v-if="newList.length !== 0 && !statusInfo?.loading && !statusInfo?.error">
        <div class="cardItem" v-for="(newItem, index) in newList" :key="newItem.id" @click="goDetails(newItem.id)">
          <img v-lazy="newItem.picture" :alt="newItem.name" />
          <span class="titleBox tXtOverFlow" v-if="newItem.name">{{ newItem.name }}</span>
          <span class="titleBox tXtOverFlow" v-else>{{ newItem.title }}</span>
          <span class="moneyBox" v-if="newItem.price">￥{{ newItem.price }}</span>
        </div>
      </div>
      <cError v-if="newList.length === 0 && !statusInfo?.loading && !statusInfo?.error" errorInfo="空数据"></cError>
      <cLoading v-if="statusInfo?.loading"></cLoading>
      <cError v-if="statusInfo?.error" errorInfo="请求失败"></cError>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getNew, getHot } from '@/api/home'
  import cLoading from '@/components/loading/index.vue'
  import cError from '@/components/error/index.vue'
  import { reactive, ref, watch, type Ref, onMounted } from 'vue'

  const props = withDefaults(
    defineProps<{
      title?: string
      txt?: string
    }>(),
    {
      title: '',
      txt: '',
    }
  )

  const emit = defineEmits(['goDetails'])

  const newList: Ref<any[]> = ref([])
  const statusInfo = reactive({
    loading: false,
    error: false,
  })

  onMounted(() => {
    init()
  })

  const init = () => {
    if (props.title === '新鲜好物') {
      getNewList()
    } else {
      getHotList()
    }
  }

  const goDetails = (id: string)=> {
    emit('goDetails', id)
  }

  const getNewList = async () => {
    try {
      statusInfo.loading = true
      const { code, result, msg } = await getNew()
      newList.value = result
    } catch (err) {
      statusInfo.error = true
    } finally {
      statusInfo.loading = false
    }
  }

  const getHotList = async () => {
    try {
      statusInfo.loading = true
      const { code, result, msg } = await getHot()
      newList.value = result
    } catch (err) {
      statusInfo.error = true
    } finally {
      statusInfo.loading = false
    }
  }
</script>

<style scoped lang="scss">
  .goodCard {
    background-color: #ffffff;
    .goodCardBox {
      padding-top: 40px;
      .topBox {
        margin-bottom: 10px;
        .leftTxt {
          font-size: 35px;
          font-weight: 700;
          margin-right: 10px;
        }
        .rightTxt {
          font-size: 12px;
          color: #ccc;
        }
      }
      .cardItemBox {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        .cardItem {
          width: 280px;
          height: 370px;
          flex-shrink: 0;
          text-align: center;
          cursor: pointer;
          transition: all .5s;
          &:hover {
            box-shadow: 0 -1px 10px rgba(41, 186, 155, $alpha: 1.0);
            transform: scale(1.01)
          }
          img {
            display: block;
            width: 280px;
            height: 300px;
            margin-bottom: 10px;
            border-radius: 5px;
          }
          .titleBox {
            font-size: 17px;
            font-weight: 700;
            margin-bottom: 10px;
          }
          .moneyBox {
            color: red;
          }
        }
      }
    }
  }
</style>
