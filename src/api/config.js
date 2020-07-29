import axios from 'axios'

//创建实例
const service = axios.create({
  //请求超时时间
  timeout: 3000
})

//添加请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  err => {
    console.log(err)
  }
)

//添加响应拦截器(在这里可以拦截后台返回的状态码)
service.interceptors.response.use(
  response => {
    let res = {}
    //在这里可以写判断 判断是不是200 或者404
    //if(res.status == 200)
    res.status = response.status
    res.data = response.data
    return res
  },
  err => {
    console.log(err)
  }
)

export default service
