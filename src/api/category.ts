import { request } from '@/utils/request'

export interface IsecondCategoryGood {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  discount?: any
  orderNum: number
}

export interface IsecondCategoryChildren {
  id: string
  name: string
  picture: string
  parentId?: any
  parentName?: any
  goods: IsecondCategoryGood[]
  categories?: any
  brands?: any
  saleProperties?: any
}

export interface IsecondCategoryResult {
  id: string
  name: string
  picture?: any
  children: IsecondCategoryChildren[]
}

export interface IsecondCategory  {
  code: string
  msg: string
  result: IsecondCategoryResult
}
export const getSecondCategory = (id: string | string[]): Promise<IsecondCategory> => {
  return  request({
    url: '/category',
    method: 'get',
    params: { id },
  })
}
