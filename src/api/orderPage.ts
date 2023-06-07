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
export const getOrder = (): Promise<Iorder> => {
  return request({
    url: '/member/order/pre',
    method: 'get',
  })
}

export interface IsubOrderGood {
  skuId: string
  count: number
}

export interface IsubOrder {
  deliveryTimeType: number
  payType: number
  payChannel: number
  buyerMessage: string
  goods: IsubOrderGood[]
  addressId: string
}

export interface IpostOrderResult {
  id: string
  createTime: string
  payType: number
  orderState: number
  payLatestTime: string
  postFee: number
  payMoney: number
  totalMoney: number
  totalNum: number
  skus?: any
  payChannel: number
  countdown?: any
}

export interface IpostOrder {
  code: string
  msg: string
  result: IpostOrderResult
}

export const subOrder = (data: IsubOrder): Promise<IpostOrder> => {
  return request({
    url: '/member/order',
    method: 'post',
    data,
  })
}

export interface Property {
  propertyMainName: string
  propertyValueName: string
}

export interface IorderDetailsSku {
  id: string
  spuId: string
  name: string
  quantity: number
  image: string
  realPay: number
  curPrice: number
  totalMoney?: any
  properties: Property[]
  attrsText: string
}

export interface IorderDetailsResult {
  id: string
  createTime: string
  payType: number
  orderState: number
  payLatestTime: string
  countdown: number
  postFee: number
  payMoney: number
  payChannel: number
  payState: number
  totalMoney: number
  totalNum: number
  deliveryTimeType: number
  receiverContact: string
  receiverMobile: string
  provinceCode: string
  cityCode: string
  countyCode: string
  receiverAddress: string
  payTime?: any
  consignTime?: any
  endTime?: any
  closeTime: string
  evaluationTime?: any
  skus: IorderDetailsSku[]
  arrivalEstimatedTime?: any
}

export interface IorderDetails {
  code: string
  msg: string
  result: IorderDetailsResult
}

export const getDetails = (id: string | string[]): Promise<IorderDetails> => {
  return request({
    url: `/member/order/${id}`,
    method: 'get',
  })
}
