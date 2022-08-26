// import axios from 'axios'
// function http () {
//   return axios({
//     url: `https://m.maizuo.com/gateway?filmId=${this.$route.params.myid}&k=1448743`,
//     headers: {
//       'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1650332674195927818108929"}',
//       'X-Host': 'mall.film-ticket.film.info'
//     }
//   })
// }
// export default http
// 2.对于数据请求进行封装
import axios from 'axios'
import { ImagePreview, Toast } from 'vant'
// axios.create({
//   baseURL: 'http://xbvuestudy.top/',
//   timeout: 10000,
// })
// 发请求前拦截 --showLoading
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 在成功之后拦截  -- hideloading
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  Toast.clear()
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
