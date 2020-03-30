import base from './baseUrl'; // 导入接口域名列表
import axios from './AxiosInstance'; // 导入http中创建的axios实例
import Qs from 'qs'; // 根据需求是否导入qs模块

const task = {
  taskList(apiPath, params, successCallback, errorCallback){
    axios({
      method: 'post',
      url: apiPath,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: Qs.stringify(params)
    }).then((response)=>{
      if(response.data.result.amount > 0){
        successCallback(response)
      }else{
        errorCallback(response)
      }
    }).catch((error)=>{
      errorCallback(error)
    })
  }
}

  // function ajax(url, params, list, scroll, wrapElement, orderNum){
  //   switch (orderNum) {
  //     case 1: {
  //       this.showLoadingWrap1 = true
  //       this.showLoadingImg1 = true
  //       break
  //     }
  //     case 2: {
  //       this.showLoadingWrap2 = true
  //       this.showLoadingImg2 = true
  //       break
  //     }
  //     case 3: {
  //       this.showLoadingWrap3 = true
  //       this.showLoadingImg3 = true
  //       break
  //     }
  //     case 4: {
  //       this.showLoadingWrap4 = true
  //       this.showLoadingImg4 = true
  //       break
  //     }
  //     case 5: {
  //       this.showLoadingWrap5 = true
  //       this.showLoadingImg5 = true
  //       break
  //     }
  //     case 6: {
  //       this.showLoadingWrap6 = true
  //       this.showLoadingImg6 = true
  //       break
  //     }
  //     case 7: {
  //       this.showLoadingWrap7 = true
  //       this.showLoadingImg7 = true
  //       break
  //     }
  //     case 8: {
  //       this.showLoadingWrap8 = true
  //       this.showLoadingImg8 = true
  //       break
  //     }
  //     case 9: {
  //       this.showLoadingWrap9 = true
  //       this.showLoadingImg9 = true
  //       break
  //     }
  //     default: {
  //       break
  //     }
  //   }
  //
  //   task.taskList(url, params,
  //     (response)=>{
  //       switch (orderNum) {
  //         case 1: {
  //           this.showLoadingWrap1 = false
  //           break
  //         }
  //         case 2: {
  //           this.showLoadingWrap2 = false
  //           break
  //         }
  //         case 3: {
  //           this.showLoadingWrap3 = false
  //           break
  //         }
  //         case 4: {
  //           this.showLoadingWrap4 = false
  //           break
  //         }
  //         case 5: {
  //           this.showLoadingWrap5 = false
  //           break
  //         }
  //         case 6: {
  //           this.showLoadingWrap6 = false
  //           break
  //         }
  //         case 7: {
  //           this.showLoadingWrap7 = false
  //           break
  //         }
  //         case 8: {
  //           this.showLoadingWrap8 = false
  //           break
  //         }
  //         case 9: {
  //           this.showLoadingWrap9 = false
  //           break
  //         }
  //         default: {
  //           break
  //         }
  //       }
  //       let newlist = response.data.result.data;
  //       newlist.forEach((item) => {
  //         // item.$set('folded',true)
  //         this.$set(item,'folded',true)
  //         list.push(item)
  //       })
  //
  //       if (scroll) {
  //         scroll.finishPullUp()
  //         scroll.refresh()
  //       }
  //       this.$initScroll(scroll, wrapElement, (scroll) => {
  //         params.page += 1
  //         ajax(url, params, list, scroll, wrapElement, orderNum)
  //       })
  //     },
  //     (response)=>{
  //       switch (orderNum) {
  //         case 1: {
  //           this.showLoadingImg1 = false
  //           break
  //         }
  //         case 2: {
  //           this.showLoadingImg2 = false
  //           break
  //         }
  //         case 3: {
  //           this.showLoadingImg3 = false
  //           break
  //         }
  //         case 4: {
  //           this.showLoadingImg4 = false
  //           break
  //         }
  //         case 5: {
  //           this.showLoadingImg5 = false
  //           break
  //         }
  //         case 6: {
  //           this.showLoadingImg6 = false
  //           break
  //         }
  //         case 7: {
  //           this.showLoadingImg7 = false
  //           break
  //         }
  //         case 8: {
  //           this.showLoadingImg8 = false
  //           break
  //         }
  //         case 9: {
  //           this.showLoadingImg9 = false
  //           break
  //         }
  //         default: {
  //           break
  //         }
  //       }
  //     }
  //   )
  // }



export default task;