import { request } from '@/utils/request'

export interface IgoodsDetailsBrand {
  id: string
  name: string
  nameEn: string
  logo: string
  picture: string
  type?: any
  desc?: any
  place?: any
}

export interface IgoodsDetailsValue {
  name: string
  picture: string
  desc: string
}

export interface IgoodsDetailsSpec {
  name: string
  id: string
  values: IgoodsDetailsValue[]
}

export interface IgoodsDetailsSpec {
  name: string
  valueName: string
}

export interface IgoodsDetailsSku {
  id: string
  skuCode: string
  price: string
  oldPrice: string
  picture: string
  inventory: number
  specs: IgoodsDetailsSpec[]
}

export interface IgoodsDetailsParent {
  id: string
  name: string
  layer: number
  parent?: any
}

export interface IgoodsDetailsCategory {
  id: string
  name: string
  layer: number
  parent: IgoodsDetailsParent
}

export interface IgoodsDetailsProperty {
  name: string
  value: string
}

export interface Detail {
  pictures: string[]
  properties: IgoodsDetailsProperty[]
}

export interface IgoodsDetailsSimilarProduct {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  discount?: any
  orderNum: number
}

export interface IgoodsDetailsHotByDay {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  discount?: any
  orderNum: number
}

export interface IgoodsDetailsEvaluationInfo {
  id: string
  orderInfo?: any
  member?: any
  score: number
  tags?: any
  content: string
  pictures?: any
  officialReply?: any
  praiseCount: number
  createTime: string
  praisePercent: number
}

export interface IgoodsDetailsResult {
  id: string
  name: string
  spuCode: string
  desc: string
  price: string
  oldPrice: string
  discount: number
  inventory: number
  brand: IgoodsDetailsBrand
  salesCount: number
  commentCount: number
  collectCount: number
  mainVideos: any[]
  videoScale: number
  mainPictures: string[]
  specs: IgoodsDetailsSpec[]
  skus: IgoodsDetailsSku[]
  categories: IgoodsDetailsCategory[]
  details: Detail
  isPreSale: boolean
  isCollect?: any
  recommends?: any
  userAddresses?: any
  similarProducts: IgoodsDetailsSimilarProduct[]
  hotByDay: IgoodsDetailsHotByDay[]
  evaluationInfo: IgoodsDetailsEvaluationInfo
}

export interface IgoodsDetails {
  code: string
  msg: string
  result: IgoodsDetailsResult
}

export const getGoodsDetails = (id: string | string[]): Promise<IgoodsDetails> => {
  return request({
    method: 'get',
    url: '/goods',
    params: { id },
  })
}

export interface IgoodHotQuery {
  id: string | string[]
  type: number
  limit: number
}
export interface IgoodHotResult {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  orderNum: number
}

export interface IgoodHot {
  code: string
  msg: string
  result: IgoodHotResult[]
}

export const getGoodHot = (params: IgoodHotQuery): Promise<IgoodHot> => {
  return request({
    url: '/goods/hot',
    method: 'get',
    params,
  })
}
