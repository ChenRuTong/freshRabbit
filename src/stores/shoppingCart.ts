import { getToken } from '@/utils/auth'
import { defineStore } from 'pinia'
export const useShoppingCartStore = defineStore('shoppingCart', {
  state: () => ({
    carList: JSON.parse(localStorage.getItem('freshrabbitCart') || '[]') || ([] as any[]),
    isAddCar: false as boolean,
  }),
  actions: {
    addCart(val: any) {
      this.isAddCar = true
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
      setTimeout(() => {
        this.isAddCar = false
      }, 1000)
    },

    //删除商品
    delCart(SkuId: string) {
      if (getToken()) {
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
    changeSele(isAll: boolean, SkuId?: string| boolean) {
      if (getToken()) {
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
  },

  getters: {
    allprice(): number {
      return this.carList
        .filter((item: any) => item.selected)
        .reduce((num: number, item: any, index: number) => {
          return (num += Number(item.price.cloned) * Number(item.count))
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
