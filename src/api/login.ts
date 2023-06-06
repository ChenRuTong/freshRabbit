import { request } from '@/utils/request'

export interface IloginResult {
  id: string
  account: string
  mobile: string
  token: string
  avatar: string
  nickname: string
  gender: string
  birthday: string
  cityCode: string
  provinceCode: string
  profession: string
}

export interface Ilogin {
  code: string
  msg: string
  result: IloginResult
}
export const loginFn = (data: any): Promise<Ilogin> => {
  return request({
    method: 'post',
    url: '/login',
    data,
  })
}
