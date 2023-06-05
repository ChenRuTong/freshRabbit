import { getBanner, type IbannerResult } from '@/api/home'
import { defineStore } from 'pinia'

export const useBannerStore = defineStore('banner', {
  state: () => ({
    bannerList: [] as IbannerResult[],
    bannerListError: false as boolean,
  }),
  actions: {
    async getBannerList(cb1: Function, id: string = '1') {
      let loadingBanner = null
      try {
        loadingBanner = cb1()
        const { code, result, msg } = await getBanner(id)
        this.bannerList = result
      } catch (err) {
        this.bannerListError = true
      } finally {
        loadingBanner?.close()
      }
    },
  },
})
