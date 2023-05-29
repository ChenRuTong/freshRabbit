import { getCategory, type IcategoryResult } from '@/api/home'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categoryList: [] as IcategoryResult[],
    categoryError: false,
    categoryLoading: false,
  }),
  actions: {
    async getCategoryList(){
      try {
        this.categoryLoading = true
        const { code, result, msg } = await getCategory()
        this.categoryList = result
      } catch (err) {
        this.categoryError = true
      } finally {
        this.categoryLoading = false
      }
    },
  },
})
