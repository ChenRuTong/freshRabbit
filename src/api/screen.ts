import { request } from '@/utils/request'

export interface IbreadcrumbGood {
  id: string
  name: string
  desc?: any
  price: string
  picture: string
  orderNum: number
}

export interface IbreadcrumbCategory {
  id: string
  name: string
  layer: number
  parent?: any
}

export interface IbreadcrumbResult {
  id: string
  name: string
  picture?: any
  parentId: string
  parentName: string
  goods: IbreadcrumbGood[]
  categories: IbreadcrumbCategory[]
  brands: any[]
  saleProperties: any[]
}

export interface Ibreadcrumb {
  code: string
  msg: string
  result: IbreadcrumbResult
}

export const getbreadcrumb = (id: string | string[]):Promise<Ibreadcrumb> => {
  return request({
    method: 'get',
    url: '/category/sub/filter',
    params: { id },
  })
}

export interface IgoodsQuery {
  categoryId: string | string[]
  page: number
  pageSize: number
  sortField: string
}

export interface IgoodsItem {
  id: string
  name: string
  desc?: any
  price: string
  picture: string
  orderNum: number
}

export interface IgoddsResult {
  counts: number
  pageSize: number
  pages: number
  page: number
  items: IgoodsItem[]
}

export interface Igoods {
  code: string
  msg: string
  result: IgoddsResult
}

export const getGoods = (data: IgoodsQuery): Promise<Igoods> => {
  return request({
    method: 'post',
    url: '/category/goods/temporary',
    data,
  })
}
