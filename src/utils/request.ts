import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores/user'

export const request = axios.create({
  baseURL: import.meta.env.VITE_API,
})

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const useUser = useUserStore()
    if (useUser.userInfo.token) {
      config.headers.Authorization = 'Bearer ' + useUser.userInfo.token
    }
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error.response.data)
  }
)
