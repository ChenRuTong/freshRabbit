import { defineStore } from 'pinia'
export const useShoppingCartStore = defineStore('shoppingCart', {
  state: () => ({
    carList: [] as any[],
    isAddCar: false as boolean,
  }),
  actions: {
    addCart(val: any) {
      this.isAddCar = true
      if (this.carList.length !== 0) {
        const iSset = this.carList.some((item, index) => {
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
  },
  getters: {
    allprice(): number {
      return this.carList.reduce((num: number, item: any, index: number) => {
        return num += (Number(item.price.cloned) * Number(item.count))
      }, 0)
    },
    allGoodNum():number {
      return this.carList.reduce((num: number, item: any, index: number) => {
        return num +=  Number(item.count)
      }, 0)
    }
  },
})
