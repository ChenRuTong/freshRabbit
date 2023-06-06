import { defineStore } from 'pinia'
import { mergeCart, getCart, changeCart, changeAllCartSele, memberCart, add } from '@/api/cart'
import { useUserStore } from './user'
export const useShoppingCartStore = defineStore('shoppingCart', {
  state: () => ({
    carList: JSON.parse(localStorage.getItem('freshrabbitCart') || '[]') || ([] as any[]),
    addCartLoading: false, //添加购物车loding
    delCartLoading: false, //删除购物车loding
    carListLoading: false, //购物车列表页loding
    isAddCar: false as boolean,
  }),
  actions: {
    //添加购物车
    addCart(val: any) {
      this.isAddCar = true
      const useUser = useUserStore()
      if (useUser.userInfo.token) {
        add({ skuId: val.skuId, count: val.count })
          .then(() => {
            //@ts-ignore
            ElMessage({
              message: `加入成功`,
              type: 'success',
            })
            this.getCartList()
          })
          .catch(() => {
            this.addCartLoading = false
          })
      } else {
        if (this.carList.length !== 0) {
          const iSset = this.carList.some((item: any, index: string) => {
            if (item.skuId === val.skuId) {
              item.count += val.count
              return true
            }
          })
          if (!iSset) {
            this.carList = [...this.carList, { ...val }]
          }
        } else {
          this.carList = [...this.carList, { ...val }]
        }
        localStorage.setItem('freshrabbitCart', JSON.stringify(this.carList))
        this.addCartLoading = false
        //@ts-ignore
        ElMessage({
          message: `加入成功`,
          type: 'success',
        })
      }
      setTimeout(() => {
        this.isAddCar = false
      }, 1000)
    },

    //合并购物车
    async mergeCart() {
      if (this.carList.length !== 0) {
        const mergeCartQuery = this.carList.map((item: any, index: number) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          }
        })
        try {
          const { msg, code, result } = await mergeCart(mergeCartQuery)
          this.clearCart()
        } catch (err) {
        } finally {
        }
      }
    },

    //删除商品
    delCart(SkuId: string) {
      const useUser = useUserStore()
      if (useUser.userInfo.token) {
        this.delCartLoading = true
        const query = {
          ids: [SkuId],
        }
        memberCart(query)
          .then(() => {
            this.getCartList()
          })
          .catch((err) => {
            this.delCartLoading = false
          })
      } else {
        this.carList.forEach((item: any, index: number) => {
          if (item.skuId === SkuId) {
            this.carList.splice(index, 1)
            localStorage.setItem('freshrabbitCart', JSON.stringify(this.carList))
          }
        })
      }
    },

    //改变商品选中状态
    changeSele(isAll: boolean, SkuId?: string | boolean, selected?: boolean) {
      const useUser = useUserStore()
      if (useUser.userInfo.token) {
        if (isAll) {
          const changeSeleAll = {
            selected: SkuId as boolean,
            ids: [] as string[],
          }
          this.carList.forEach((item: any, index: number) => {
            changeSeleAll.ids.push(item.skuId)
          })
          changeAllCartSele(changeSeleAll).then(() => {
            this.getCartList()
          })
        } else {
          changeCart(SkuId as string, { selected: !selected }).then((res) => {
            this.getCartList()
          })
        }
      } else {
        if (isAll) {
          this.carList.forEach((item: any, index: number) => {
            item.selected = SkuId
          })
        } else {
          this.carList.forEach((item: any, index: number) => {
            if (item.skuId === SkuId) {
              item.selected = !item.selected
            }
          })
        }
        localStorage.setItem('freshrabbitCart', JSON.stringify(this.carList))
      }
    },

    //改变商品数量
    changeCount(skuId: string, query: { count: number }) {
      const useUser = useUserStore()
      if (useUser.userInfo.token) {
        changeCart(skuId, query)
          .then((res) => {
            this.getCartList()
          })
          .catch((err) => {})
      } else {
        localStorage.setItem('freshrabbitCart', JSON.stringify(this.carList))
      }
    },

    //清空本地购物车
    clearCart() {
      localStorage.removeItem('freshrabbitCart')
      this.carList = []
    },

    //获取购物车列表（登录后）
    async getCartList() {
      const useUser = useUserStore()
      if (useUser.userInfo.token) {
        try {
          this.carListLoading = true
          const { msg, code, result } = await getCart()
          this.carList = result
        } catch (err) {
        } finally {
          this.carListLoading = false
          this.addCartLoading = false
          this.delCartLoading = false
        }
      }
    },
  },

  getters: {
    allprice(): number {
      return this.carList
        .filter((item: any) => item.selected)
        .reduce((num: number, item: any, index: number) => {
          return (num += (Number(item.price.cloned) || Number(item.price)) * Number(item.count))
        }, 0)
    },
    allGoodNum(): number {
      return this.carList.reduce((num: number, item: any, index: number) => {
        return (num += Number(item.count))
      }, 0)
    },
    allSeleGoodNum(): number {
      return this.carList
        .filter((item: any) => item.selected)
        .reduce((num: number, item: any, index: number) => {
          return (num += Number(item.count))
        }, 0)
    },
  },
})
