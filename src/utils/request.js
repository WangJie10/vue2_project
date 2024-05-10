import axios from 'axios'
import { getToken } from '@/utils/auth'

const opt = {
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 600000 // request timeout
}

// create an axios instance
const service = axios.create(opt)
// request interceptor
service.interceptors.request.use(
  config => {
    let token = getToken()
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service

