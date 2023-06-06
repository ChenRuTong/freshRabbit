import type { IloginResult } from '@/api/login'
import { useShoppingCartStore } from './shoppingCart'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: JSON.parse(localStorage.getItem('freshRabbitUser') || '{}') || ({} as IloginResult),
  }),
  actions: {
    setUserInfo(val: IloginResult) {
      return new Promise((resolve, reject) => {
        const useShopping = useShoppingCartStore()
        this.userInfo = val
        localStorage.setItem('freshRabbitUser', JSON.stringify(this.userInfo))
        useShopping.mergeCart().then((res)=> {
          resolve(true)
        }).catch((err)=> {
          reject(false)
        })
      })
    },
    clearUserInfo(){
      const useShopping = useShoppingCartStore()
      useShopping.carList = []
      localStorage.removeItem('freshRabbitUser')
      this.userInfo = {}
    }
  },
})
