import { getBanner, type IbannerResult } from '@/api/home'
import { defineStore } from 'pinia'

export const useBannerStore = defineStore('banner', {
  state: () => ({
    bannerList: [] as IbannerResult[],
    bannerListError: false as boolean,
  }),
  actions: {
    async getBannerList(cb1: Function) {
      let loadingBanner = null
      try {
        if (this.bannerList.length === 0) {
          loadingBanner = cb1()
          const { code, result, msg } = await getBanner()
          this.bannerList = result
        }
      } catch (err) {
        this.bannerListError = true
      } finally {
        loadingBanner?.close()
      }
    },
  },
})
