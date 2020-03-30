import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Calendar from 'vue-mobile-calendar'
Vue.use(Calendar);

Vue.config.productionTip = false
Vue.config.devtools = true
import rem from './rem'
import './reset.css'

rem()
// import jsBridge from './jsBridge'
import qing from './qing'
import FastClick from 'fastclick'

FastClick.attach(document.body);

import Datepicker from '@nutui/nutui/dist/packages/datepicker/datepicker.js';  // 加载构建后的JS
import Rate from '@nutui/nutui/dist/packages/rate/rate';  // 加载构建后的JS
import Picker from '@nutui/nutui/dist/packages/picker/picker';  // 加载构建后的JS
import '@nutui/nutui/dist/packages/datepicker/datepicker.css';  //加载构建后的CSS
import '@nutui/nutui/dist/packages/rate/rate.css';  //加载构建后的CSS
import '@nutui/nutui/dist/packages/picker/picker.css';  //加载构建后的CSS

// import '@nutui/nutui/dist/packages/datepicker/datepicker.scss';  //加载构建后的CSS
//主题定制等场景需要加载SCSS,而不是构建后的CSS
//import '@nutui/nutui/dist/packages/button/button.scss';

Datepicker.install(Vue);
Rate.install(Vue);
Picker.install(Vue);
import BScroll from 'better-scroll'
import Validator from './components/public/validator'
import CTextarea from './components/public/CTextarea'
import fieldTitle from './components/public/Title'
import FullPageLoading from './components/public/FullPageLoading'
import imagePanel from './components/public/Image-panel'
import StatePage from './components/public/StatePage'
import CInput from './components/public/CInput'
import CSelected from './components/public/CSelected'
import tabs from './components/public/Tabs'
import changeBtn from './components/public/Change-button'
import Loading from './components/public/Loading'
import Radio from './components/public/radio/radio'

Vue.component('Validator', Validator)
Vue.component('c-textarea', CTextarea)
Vue.component('field-title', fieldTitle)
Vue.component('FullPageLoading', FullPageLoading)
Vue.component('image-panel', imagePanel)
Vue.component('StatePage', StatePage)
Vue.component('c-input', CInput)
Vue.component('c-select', CSelected)
Vue.component('c-tab', tabs)
Vue.component('change-btn', changeBtn)
Vue.component('Loading', Loading)
Vue.component('c-radio', Radio)

let urlOptions = {
  domain: '192.168.0.106',
  port: '8080',
}
// Vue.prototype.$url = `http://${urlOptions.domain}:${urlOptions.port}/taskSystem`
// Vue.prototype.$url = '/taskSystem'
//正式团队测试环境
// Vue.prototype.$url = 'http://111.160.97.27:8060'
// Vue.prototype.$url = 'http://111.160.97.27:9000'
//冯冀轩zcb_5g
// Vue.prototype.$url = 'http://192.168.31.202:9000'
// Vue.prototype.$url = 'httpå://192.168.0.102:9000'
//8huiyi_5g
// Vue.prototype.$url = 'http://192.168.0.174:9000'
//7huiyi_5g
// Vue.prototype.$url = 'http://192.168.0.174:9000'
//309
// Vue.prototype.$url = 'http://192.168.0.118:9000'
//刘开毅zcb_5g
// Vue.prototype.$url = 'http://192.168.31.109:8080'
Vue.prototype.$url = ''

Vue.prototype.$initScroll = function (scroll, element, callback) {

  this.$nextTick(() => {
    if (!scroll) {
      scroll = new BScroll(element, {
        click: true,
        pullUpLoad: {
          threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
        }
      })
      // if(callback){
      //   callback(scroll)
      // }
      scroll.on('pullingUp', () => {
        console.log('callback!!!!!!!!!', callback)
        if (callback) {
          callback(scroll)
        }
        // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次

      })

      console.log('scrollscrollscroll', scroll)
    } else {
      // scroll.finishPullUp()
      scroll.refresh()
    }

    return scroll

    // if(callback){
    //   scroll.on('pullingUp', () => {
    //     callback(scroll)
    //     // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
    //     scroll.finishPullUp()
    //     scroll.refresh()
    //   })
    // }
    console.log(scroll)
  })
}

import $d from './devices.js'

let isReset = true;//是否归位
let h = document.documentElement.clientHeight || document.body.clientHeight;
if ($d.device() === 'ios') {
  document.body.addEventListener('focusin', (e) => {
    //软键盘弹出的事件处理
    isReset = false;

  });
  document.body.addEventListener('focusout', () => {
    //软键盘收起的事件处理
    isReset = true;
    setTimeout(() => {
      //当焦点在弹出层的输入框之间切换时先不归位
      if (isReset) {
        window.scroll(0, 0);//失焦后强制让页面归位
      }
    }, 300);
  });
}
// else if ($d.device() === 'android') {
//   // alert('android in')
//
//   window.onresize = function () {
//     // alert(22)
//     //键盘弹起与隐藏都会引起窗口的高度发生变化
//     let resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
//     if (resizeHeight < h) {
//       //当软键盘弹起，在此处操作
//       // alert(1)
//       isReset = false;
//       setTimeout(function () {
//         document.body.scrollTop = document.body.scrollHeight;
//       }, 300);
//     } else {
//       //当软键盘收起，在此处操作
//       isReset = true;
//       setTimeout(() => {
//         if (isReset) {
//           window.scroll(0, 0);//失焦后强制让页面归位
//         }
//       }, 300);
//     }
//   }
// }


import api from './HttpRequest/api'

Vue.prototype.$api = api

import Qs from 'qs'


Vue.prototype.$getOrgID = function(openID) {
  let getpersonQueryObj = {
    "eid": "8738001",
    "openId": openID,
  }

  let yunzhijiaURL = Vue.prototype.$url + "/taskSystem/intf/cloud"

  return axios.get(yunzhijiaURL, {
    params: {
      url: '/gateway/opendata-control/data/getperson',
      dataStr: JSON.stringify(getpersonQueryObj),
      authorize: 'app'
    }
  })
}
Vue.prototype.$getChairMan = function() {
  let url = this.$url + '/taskSystem/role/getChairMan'
  return axios({
    method: 'get',
    url: url
  })
}
Vue.prototype.$getInCharger = function (orgId) {
  let getorgpersonsQueryObj = {
    "eid": "8738001",
    "orgId": orgId,
  }
  let yunzhijiaURL = this.$url + "/taskSystem/intf/cloud"

  return axios.get(yunzhijiaURL, {
    params: {
      url: '/gateway/opendata-control/data/getorg',
      dataStr: JSON.stringify(getorgpersonsQueryObj),
      authorize: 'app'
    }
  })
}

Vue.prototype.$getPersonInfoByOpenID = function(openID) {
  let getpersonQueryObj = {
    "eid": "8738001",
    "type": 1,
    "array": [openID]
  }
  let yunzhijiaURL = this.$url + "/taskSystem/intf/cloud2"

  return axios({
    method: 'post',
    url: yunzhijiaURL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: Qs.stringify({
      url: '/gateway/openimport/open/person/get',
      dataStr: JSON.stringify(getpersonQueryObj),
      authorize: 'resGroupSecret'
    })
  })
}

Vue.prototype.$judgeUndefined = function(value){
  if(value === undefined || value === null || value === '' || value === 'undefined' || value === 'null'){
    return '暂无数据'
  }else{
    return value
  }
}

Vue.prototype.$showReward = function(reward) {
  return reward !== null && reward !== undefined && reward !== 0 && reward !== "0"
}

import util from '../src/util'

Vue.prototype.$createQueryList = function(openID, taskType, timeRange, needHelper) {
  // let getNumURL = this.$url + "/taskSystem/task/getAmount"

  let today = new Date()

  let queryTask1 = {
    state: [2, 3, 4],
    level: 1
  }

  let queryTaskHelper1 = {
    state: [2, 3, 4],
    level: 1
  }

  let queryTask2 = {
    state: [3],
    life_done_type: 1,
    level: 1,
    life_state: 3
  }

  let queryTaskHelper2 = {
    state: [3],
    life_done_type: 1,
    level: 1,
    life_state: 3
  }

  let queryTask3 = {
    state: [2],
    level: 1
  }

  let queryTaskHelper3 = {
    state: [2],
    level: 1
  }

  let queryTask4 = {
    state: [3],
    life_done_type: 0,
    level: 1,
    life_state: 3
  }

  let queryTaskHelper4 = {
    state: [3],
    life_done_type: 0,
    level: 1,
    life_state: 3
  }

  let queryTask4_2 = {
    state: [2],
    level: 1
  }

  let queryTaskHelper4_2 = {
    state: [2],
    level: 1
  }

  let queryTask5 = {
    state: [4],
    level: 1
  }

  let queryTaskHelper5 = {
    state: [4],
    level: 1
  }

  if (taskType === 'charge') {
    queryTask1.chargerID = openID
    queryTask2.chargerID = openID
    queryTask3.chargerID = openID
    queryTask4.chargerID = openID
    queryTask4_2.chargerID = openID
    queryTask5.chargerID = openID

    queryTaskHelper1.helperID = openID
    queryTaskHelper2.helperID = openID
    queryTaskHelper3.helperID = openID
    queryTaskHelper4.helperID = openID
    queryTaskHelper4_2.helperID = openID
    queryTaskHelper5.helperID = openID

    queryTask1.signerID = undefined
    queryTask2.signerID = undefined
    queryTask3.signerID = undefined
    queryTask4.signerID = undefined
    queryTask4_2.signerID = undefined
    queryTask5.signerID = undefined
  }
  else if (taskType === 'sign') {
    queryTask1.chargerID = undefined
    queryTask2.chargerID = undefined
    queryTask3.chargerID = undefined
    queryTask4.chargerID = undefined
    queryTask4_2.chargerID = undefined
    queryTask5.chargerID = undefined

    queryTaskHelper1.helperID = undefined
    queryTaskHelper2.helperID = undefined
    queryTaskHelper3.helperID = undefined
    queryTaskHelper4.helperID = undefined
    queryTaskHelper4_2.helperID = undefined
    queryTaskHelper5.helperID = undefined

    queryTask1.signerID = openID
    queryTask2.signerID = openID
    queryTask3.signerID = openID
    queryTask4.signerID = openID
    queryTask4_2.signerID = openID
    queryTask5.signerID = openID
  }

  if (timeRange === 0) {

    queryTask1.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
    queryTask1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

    queryTask2.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
    queryTask2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]

    queryTask3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
    queryTask3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

    queryTask4.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
    queryTask4.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]

    queryTask4_2.endtime = [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)]
    queryTask4_2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]

    queryTaskHelper1.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
    queryTaskHelper1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

    queryTaskHelper2.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
    queryTaskHelper2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]

    queryTaskHelper3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
    queryTaskHelper3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

    queryTaskHelper4.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
    queryTaskHelper4.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]

    queryTaskHelper4_2.endtime = [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)]
    queryTaskHelper4_2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]

    queryTask5.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
    queryTask5.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']

    queryTaskHelper5.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
    queryTaskHelper5.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
  }
  else if (timeRange === 1) {

    // queryTask1.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
    queryTask1.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
    queryTask1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

    // queryTask2.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
    queryTask2.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
    // queryTask2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
    queryTask2.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

    queryTask3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
    queryTask3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

    // queryTask4.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
    queryTask4.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
    // queryTask4.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
    queryTask4.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

    // queryTask4_2.endtime = [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)]
    queryTask4_2.endtime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
    // queryTask4_2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
    queryTask4_2.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

    // queryTask5.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
    queryTask5.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
    // queryTask5.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
    queryTask5.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']


    // queryTaskHelper1.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
    queryTaskHelper1.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
    queryTaskHelper1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

    // queryTaskHelper2.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
    queryTaskHelper2.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
    // queryTaskHelper2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
    queryTaskHelper2.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

    queryTaskHelper3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
    queryTaskHelper3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

    // queryTaskHelper4.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
    queryTaskHelper4.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
    // queryTaskHelper4.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
    queryTaskHelper4.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

    // queryTaskHelper4_2.endtime = [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)]
    queryTaskHelper4_2.endtime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
    // queryTaskHelper4_2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
    queryTaskHelper4_2.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

    // queryTaskHelper5.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
    queryTaskHelper5.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
    // queryTaskHelper5.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
    queryTaskHelper5.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
  }
  let all = {}
  let finished = {}
  let doing = {}
  let unfinish = {}
  let abolish = {}
  if (taskType === 'charge') {
    all = {
      name: 'all',
      // param: [queryTask1, queryTaskHelper1],
      param: [queryTask1],
    }
    finished = {
      name: 'finished',
      // param: [queryTask2, queryTaskHelper2],
      param: [queryTask2],
    }
    doing = {
      name: 'doing',
      // param: [queryTask3, queryTaskHelper3],
      param: [queryTask3],
    }
    unfinish = {
      name: 'unfinish',
      // param: [queryTask4, queryTaskHelper4, queryTask4_2, queryTaskHelper4_2],
      param: [queryTask4, queryTask4_2],
    }
    abolish = {
      name: 'abolish',
      // param: [queryTask5, queryTaskHelper5],
      param: [queryTask5],
    }
  }
  else if (taskType === 'sign') {
    all = {
      name: 'all',
      param: [queryTask1],
    }
    finished = {
      name: 'finished',
      param: [queryTask2],
    }
    doing = {
      name: 'doing',
      param: [queryTask3],
    }
    unfinish = {
      name: 'unfinish',
      param: [queryTask4, queryTask4_2],
    }
    abolish = {
      name: 'abolish',
      param: [queryTask5],
    }
  }

  let queryList = []
  if (timeRange === 0) {
    queryList = [all, finished, doing, unfinish, abolish]
  }
  else if (timeRange === 1) {
    queryList = [all, finished, doing, unfinish, abolish]
  }

  return queryList
}
Array.prototype.duplicate = function(num){
  let len = this.length
  for (let i = 0; i < num-1; i++) {
    for (let j = 0; j < len; j++) {
      this.push(this[j])
    }
  }
}
Vue.prototype.$duplicate = function(arr,num){
  let len = arr.length
  for (let i = 0; i < num-1; i++) {
    for (let j = 0; j < len; j++) {
      arr.push(arr[j])
    }
  }
  return arr
}




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



