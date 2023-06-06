import { request } from '@/utils/request'

export interface ImergeCart {
  skuId: string
  selected: string
  count: number
}

export const mergeCart = (data: ImergeCart[]): Promise<any> => {
  return request({
    url: '/member/cart/merge',
    method: 'post',
    data,
  })
}

export interface IcartResult {
  id: string
  skuId: string
  name: string
  attrsText: string
  specs: any[]
  picture: string
  price: string
  nowPrice: string
  nowOriginalPrice: string
  selected: boolean
  stock: number
  count: number
  isEffective: boolean
  discount?: any
  isCollect: boolean
  postFee: number
}

export interface Icart {
  code: string
  msg: string
  result: IcartResult[]
}
export const getCart = (): Promise<Icart> => {
  return request({
    url: '/member/cart',
    method: 'get',
  })
}

export interface IchangeCartResult {
  id: string
  skuId: string
  name: string
  attrsText: string
  specs: any[]
  picture: string
  price: string
  nowPrice: string
  nowOriginalPrice: string
  selected: boolean
  stock: number
  count: number
  isEffective: boolean
  discount?: any
  isCollect: boolean
  postFee: number
}

export interface IchangeCart {
  code: string
  msg: string
  result: IchangeCartResult
}
export interface IchangeCartQuery {
  selected?: boolean
  count?: number
}

export const changeCart = (id: string, data: IchangeCartQuery): Promise<IchangeCart> => {
  return request({
    url: `/member/cart/${id}`,
    method: 'put',
    data,
  })
}

export interface IchangeAllCartSele {
  selected: boolean
  ids: string[]
}

export const changeAllCartSele = (data: IchangeAllCartSele): Promise<any> => {
  return request({
    url: `/member/cart/selected`,
    method: 'put',
    data,
  })
}

export interface ImemberCart {
  ids: string[]
}
export const memberCart = (data: ImemberCart): Promise<any> => {
  return request({
    url: `/member/cart`,
    method: 'delete',
    data,
  })
}

export interface IaddQuery {
  skuId: string
  count: number
}

export interface IaddResult {
  id: string
  skuId: string
  name: string
  attrsText: string
  specs: any[]
  picture: string
  price: string
  nowPrice: string
  nowOriginalPrice: string
  selected: boolean
  stock: number
  count: number
  isEffective: boolean
  discount?: any
  isCollect: boolean
  postFee: number
}

export interface Iadd {
  code: string
  msg: string
  result: IaddResult
}

export const add = (data: IaddQuery): Promise<Iadd> => {
  return request({
    url: `/member/cart`,
    method: 'post',
    data,
  })
}
