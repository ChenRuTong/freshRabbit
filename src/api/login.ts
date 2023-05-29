import { request } from '@/utils/request'

const login = (data: any) => {
    return request({
        method: 'post',
        url:'/login',
        data
    })
}