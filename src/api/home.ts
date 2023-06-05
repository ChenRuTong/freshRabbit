import { request } from '@/utils/request'

export interface IbannerResult {
  id: string
  imgUrl: string
  hrefUrl: string
  type: string
}

export interface Ibanner {
  code: string
  msg: string
  result: IbannerResult[]
}

export const getBanner = (id:string = '1'): Promise<Ibanner> => {
  return request({
    url: '/home/banner',
    method: 'get',
    params: { distributionSite: id }
  })
}

export interface IcategoryChildren {
  id: string
  name: string
  picture: string
  children?: any
  goods?: any
}

export interface IcategoryGood {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  discount?: any
  orderNum?: any
}

export interface IcategoryResult {
  id: string
  name: string
  picture: string
  children: IcategoryChildren[]
  goods: IcategoryGood[]
}

export interface ICategory {
  code: string
  msg: string
  result: IcategoryResult[]
}
export const getCategory = (): Promise<ICategory> => {
  return request({
    url: '/home/category/head',
    method: 'get',
  })
}

export interface InewResult {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  discount?: any
  orderNum: number
}

export interface Inew {
  code: string
  msg: string
  result: InewResult[]
}
export const getNew = (): Promise<Inew> => {
  return request({
    url: '/home/new',
    method: 'get',
  })
}

export interface IhotResult {
  id: string
  picture: string
  title: string
  alt: string
}

export interface Ihot {
  code: string
  msg: string
  result: IhotResult[]
}

export const getHot = (): Promise<Ihot> => {
  return request({
    url: '/home/hot',
    method: 'get',
  })
}
