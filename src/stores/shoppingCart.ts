import { defineStore } from 'pinia'
export const useShoppingCartStore = defineStore('shoppingCart', {
  state: () => ({
    carList: [] as any[],
    isAddCar: false as boolean,
  }),
  actions: {
    addCart(val: any) {
      this.isAddCar = true
      console.log(val.skuId, this.carList.length !== 0)
      if (this.carList.length !== 0) {
        const iSset = this.carList.some((item, index) => {
          if (item.skuId === val.skuId) {
            item.count++
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
      setTimeout(()=> {
        this.isAddCar = false
      },1000)
    },
  },
})
