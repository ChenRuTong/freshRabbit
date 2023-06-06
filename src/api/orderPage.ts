import { request } from '@/utils/request'

export interface IorderUserAddresse {
  id: string
  receiver: string
  contact: string
  provinceCode: string
  cityCode: string
  countyCode: string
  address: string
  isDefault: number
  fullLocation: string
  postalCode?: any
  addressTags?: any
}

export interface IorderGood {
  id: string
  name: string
  picture: string
  count: number
  skuId: string
  attrsText: string
  price: string
  payPrice: string
  totalPrice: string
  totalPayPrice: string
}

export interface IorderSummary {
  goodsCount: number
  totalPrice: number
  totalPayPrice: number
  postFee: number
  discountPrice: number
}

export interface IorderResult {
  userAddresses: IorderUserAddresse[]
  goods: IorderGood[]
  summary: IorderSummary
}

export interface Iorder {
  code: string
  msg: string
  result: IorderResult
}
export const getOrder = ():Promise<Iorder> => {
  return request({
    url: '/member/order/pre',
    method: 'get',
  })
}
