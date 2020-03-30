import base from './baseUrl'; // 导入接口域名列表
import axios from './AxiosInstance'; // 导入http中创建的axios实例
import Qs from 'qs'; // 根据需求是否导入qs模块

const rank = {
  rankList(apiPath, params, successCallback, errorCallback){
    axios.get(base.none+apiPath, {
      params
    }).then((response)=>{
      console.log(response.data)
      console.log('typeof response.data',typeof response.data)
      console.log(response.data.success)
      console.log(typeof response.data.success)
      // let data = JSON.parse(response.data)
      // console.log(typeof data.success)
      if(response.data.success === true){
        console.log('response.data.success === true')
        successCallback(response)
      }else{
        console.log('response.data.success !== true')
        errorCallback(response)
      }
    }).catch((error)=>{
      console.log('catch error')
      errorCallback(error)
    })
  }
}

export default rank