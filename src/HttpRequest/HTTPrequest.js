import axios from 'axios'
import qs from 'qs'

let baseurl = 'http://localhost:8081/api'

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'https://www.baidu.com';
}
else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = 'https://www.ceshi.com';
}
else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://www.production.com';
}

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// axios.interceptors.request.use(
//   config => {
//     // 每次发送请求之前判断vuex中是否存在token
//     // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
//     // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
//     const token = store.state.token;
//     token && (config.headers.Authorization = token);
//     return config;
//   },
//   error => {
//     return Promise.error(error);
//   })

function getRequest(apiPath, params, successCallback, errorCallback) {
  let url = baseurl + apiPath
  let req = axios.get(url, {
    params: params,
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
  thenResponse(req, successCallback, errorCallback)
}

function postRequest(apiPath, params, successCallback, errorCallback) {
  let url = baseurl + apiPath
  let req = axios.post(url, qs.stringify(params, { indices: false }))
  thenResponse(req, successCallback, errorCallback)
}

function putRequest(apiPath, params, successCallback, errorCallback) {
  let url = baseurl + apiPath
  // var params = new URLSearchParams()
  // params.append('status', 0)
  let req = axios.put(url, qs.stringify(params, { indices: false }))
  thenResponse(req, successCallback, errorCallback)
}

function deleteRequest(apiPath, params, successCallback, errorCallback) {
  let url = baseurl + apiPath
  let req = axios.delete(url, {
    params: params,
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
  thenResponse(req, successCallback, errorCallback)
}

/**
 * 请求结果处理
 * @param axiosRequest
 * @param successCallback
 * @param errorCallback
 */
function thenResponse(axiosRequest, successCallback, errorCallback) {
  axiosRequest.then((res) => {
    if (res.status === 200) {
      res = res.data
      if (res.code === 0) {
        if (successCallback) successCallback(res)
      } else {
        if (errorCallback) errorCallback(res.code, res.msg)
      }
    }
  }).catch((error) => {
    if (errorCallback) errorCallback(-1, error.message)
  })
}

export {getRequest, postRequest, putRequest, deleteRequest}