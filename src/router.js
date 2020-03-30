import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import store from './store'

// import Index from './components/index'
// import List from './components/list'
// import TaskDetail from './components/taskDetail'
// import TaskAdd from './components/taskAdd'
// import ProcessCenter from './components/process-center'
// import ProcessDetail from './components/processDetail'


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/index.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('./components/list.vue')
    },
    {
      path: '/taskdetail',
      name: 'taskdetail',
      meta: {
        keepAlive: true
      },
      component: () => import('./components/taskDetail.vue')
    },
    {
      path: '/abolish',
      name: 'abolish',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/abolish.vue')
    },
    {
      path: '/feedback',
      name: 'feedback',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/feedback.vue')
    },
    {
      path: '/end',
      name: 'end',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/end.vue')
    },
    {
      path: '/taskLifeDetail',
      name: 'taskLifeDetail',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/taskLifeDetail.vue')
    },
    {
      path: '/taskAdd',
      name: 'taskadd',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/taskAdd.vue')
    },
    {
      path: '/tempAdd',
      name: 'tempAdd',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/tempAdd.vue')
    },
    {
      path: '/change',
      name: 'change',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/change.vue')
    },
    {
      path: '/processCenter',
      name: 'processcenter',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/process-center.vue')

    },
    {
      path: '/processDetail',
      name: 'processdetail',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/processDetail.vue')
    },
    {
      path: '/rejectretry',
      name: 'rejectretry',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/reject-retry.vue')
    },
    {
      path: '/entry',
      name: 'entry',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/entry.vue')
    },
    {
      path: '/chairmanIndex',
      name: 'chairmanIndex',
      meta: { allowBack: false, keepAlive: false },
      component: () => import('./components/chairman/index.vue')
    },
    {
      path: '/chairmanList',
      name: 'chairmanList',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/chairman/chairmanList.vue')
    },
    {
      path: '/instructions',
      name: 'instructions',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/chairman/instructions.vue')
    },
    {
      path: '/process-center-cm',
      name: 'process-center-cm',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/chairman/process-center-cm.vue')

    },
    {
      path: '/clerkIndex',
      name: 'clerkIndex',
      component: () => import('./components/clerk/index.vue')
    },
    {
      path: '/list-clerk',
      name: 'list-clerk',
      component: () => import('./components/clerk/list.vue')
    },
    {
      path: '/process-center-clerk',
      name: 'process-center-clerk',
      component: () => import('./components/clerk/process-center-clerk')
    },
    {
      path: '/source-admin-index',
      name: 'source-admin-index',
      component: () => import('./components/sourceAdmin/index')
    },
    {
      path: '/process-center-source-admin',
      name: 'process-center-source-admin',
      component: () => import('./components/sourceAdmin/process-center-source-admin')
    },
    {
      path: '/listSourceAdmin',
      name: 'listSourceAdmin',
      component: () => import('./components/sourceAdmin/list')
    },
    {
      path: '/processCenterSourceAdmin',
      name: 'processCenterSourceAdmin',
      component: () => import('./components/sourceAdmin/process-center-source-admin')
    },
    {
      path: '/system-admin-index',
      name: 'system-admin-index',
      component: () => import('./components/systemAdmin/index')
    },
    {
      path: '/rulesList',
      name: 'rulesList',
      component: () => import('./components/systemAdmin/rulesList')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./components/systemAdmin/settings')
    },

    {
      path: '/ranking',
      name: 'ranking',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/ranking.vue')
    },
    {
      path: '/transfer',
      name: 'transfer',
      meta: {
        keepAlive: false
      },
      component: () => import('./components/public/transfer.vue')
    },


    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
import Qs from 'qs'


function getOrgID(openID) {
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

function getInCharger(orgId) {
  let getorgpersonsQueryObj = {
    "eid": "8738001",
    "orgId": orgId,
  }
  let yunzhijiaURL = Vue.prototype.$url + "/taskSystem/intf/cloud"

  return axios.get(yunzhijiaURL, {
    params: {
      url: '/gateway/opendata-control/data/getorg',
      dataStr: JSON.stringify(getorgpersonsQueryObj),
      authorize: 'app'
    }
  })
}

function getChairMan() {
  let url = Vue.prototype.$url + '/taskSystem/role/getChairMan'
  return axios({
    method: 'get',
    url: url
  })
}

router.beforeEach((to, from, next) => {
  store.commit('setAllowBack', true)
  if (to.name === 'list') {
    store.commit('keepAlive', 'list')
    // debugger
  }
  if (to.name === 'chairmanList') {
    store.commit('keepAlive', 'chairmanList')
  }
  if (to.name === 'index' && from.name === null) {
    let url = 'http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getUserInfo'
    // let url = '/taskSystem/user/user'

    localStorage.setItem('keepShowResultOpen','0')

    getChairMan().then((response) => {
      let chairmanId = response.data.result || '57c0f003e4b01de693d5205f'
      localStorage.setItem('chairmanId', chairmanId)

      this.$getPersonInfoByOpenID(chairmanId).then((response) => {
        let data = response.data.result.data[0]

        let chairmanName = data.name || '张荣华'
        let chairmanAvatarUrl = data.photoUrl || ''

        localStorage.setItem('chairmanName', chairmanName)
        localStorage.setItem('chairmanAvatarUrl', chairmanAvatarUrl)
      }).catch(() => {
        localStorage.setItem('chairmanId', '57c0f003e4b01de693d5205f')
        localStorage.setItem('chairmanName', '张荣华')
        localStorage.setItem('chairmanAvatarUrl', '')
        // alert('获取主席姓名失败，请重试')
      })
    })
      .catch(() => {
        localStorage.setItem('chairmanId', '57c0f003e4b01de693d5205f')
        localStorage.setItem('chairmanName', '张荣华')
        localStorage.setItem('chairmanAvatarUrl', '')
        // alert('获取主席ID失败，请重试')
      })


    axios.get(url)
      .then((response) => {
        console.log(response.data.success)
        if (response.data.success === true) {
          let data = response.data.result
          let openID = data.openID

          let roles = data.roles
          let name = data.name
          let avatarUrl = data.avatarUrl
          let sourceIDs = data.sourceIDs
          console.log('-------------')
          console.log(roles)
          console.log(sourceIDs)
          store.commit('setRoles', roles)
          store.commit('setOpenID', openID)
          store.commit('setName', name)
          store.commit('setAvatarUrl', avatarUrl)
          store.commit('setSourceIDs', JSON.stringify(sourceIDs))


          getOrgID(store.getters.openID)
            .then((response) => {

              if (response.data.result.success) {
                let orgId = response.data.result.data[0].orgId
                let department = response.data.result.data[0].department

                store.commit('setUnitID', orgId)
                store.commit('setUnitName', department)

                // vm.unitID = store.getters.unitID
                // vm.unitName = store.getters.unitName


                getInCharger(orgId).then((response) => {

                  let inChargers = response.data.result.data.inChargers
                  let parentId = response.data.result.data.parentId
                  if (inChargers[0]) {
                    let inCharger = inChargers[0]
                    // alert(inCharger.name)
                    if (store.getters.openID === inCharger.openId && (parentId !== '' || parentId !== null)) {
                      vm.getInCharger(parentId).then((response) => {

                        let inChargers = response.data.result.data.inChargers
                        if (inChargers[0]) {
                          store.commit('setLeaderOpenID', inCharger.openId)
                          store.commit('setLeaderName', inCharger.name)
                          store.commit('setLeaderAvatarUrl', inCharger.photoUrl)

                          // vm.approverID = store.getters.leaderOpenID
                          // vm.approverName = store.getters.leaderName
                          // vm.approverAvatarUrl = store.getters.leaderAvatarUrl
                        }

                      })
                    }
                    else {
                      store.commit('setLeaderOpenID', inCharger.openId)
                      store.commit('setLeaderName', inCharger.name)
                      store.commit('setLeaderAvatarUrl', inCharger.photoUrl)

                      // vm.approverID = store.getters.leaderOpenID
                      // vm.approverName = store.getters.leaderName
                      // vm.approverAvatarUrl = store.getters.leaderAvatarUrl
                    }

                  } else {

                  }
                })
              }

            })


          // if (name === '赵启建'||name === '冯冀轩'||name === '杨妮'||name === '贾敏'|| name === '刘开毅') {
          //   store.commit('setCurrentRole', 4)
          //   next({ name: 'clerkIndex' })
          // }
          // else{
          //   if (roles.length === 0) {
          //     if (name === '贾敏') {
          //       store.commit('setCurrentRole', 4)
          //       next({ name: 'clerkIndex' })
          //     } else {
          //       store.commit('setCurrentRole', 0)
          //       next()
          //     }
          //   }
          //   else if (roles.length === 1) {
          //     let currentRole = roles[0]
          //     switch (currentRole) {
          //       case 1: {
          //         console.log(1111111111111)
          //         store.commit('setCurrentRole', currentRole)
          //         next({ name: 'chairmanIndex' })
          //         // store.commit('setCurrentRole', 0)
          //         // next()
          //         break
          //       }
          //       case 2: {
          //         next()
          //         break
          //       }
          //       case 3: {
          //         if (name === '贾敏') {
          //           store.commit('setCurrentRole', 4)
          //           next({ name: 'clerkIndex' })
          //         }else{
          //           next()
          //         }
          //         break
          //       }
          //       case 4: {
          //         store.commit('setCurrentRole', currentRole)
          //         next({ name: 'clerkIndex' })
          //         break
          //       }
          //       default: {
          //         break
          //       }
          //     }
          //     if (currentRole > 20 && currentRole < 30) {
          //       next()
          //     }
          //   }
          //   else {
          //     next({ name: 'entry' })
          //     // store.commit('setCurrentRole', 1)
          //     // next({ name: 'chairmanIndex' })
          //   }
          // }

          if (roles.length === 0) {
            if (name === 'xxx') {
              store.commit('setCurrentRole', 4)
              next({ name: 'clerkIndex' })
            } else {
              store.commit('setCurrentRole', 0)
              next()
              // next({ name: 'settings' })
            }
          }
          else if (roles.length === 1) {
            let currentRole = roles[0]
            store.commit('setCurrentRole', currentRole)
            switch (currentRole) {
              case 1: {
                next({ name: 'chairmanIndex' })
                // store.commit('setCurrentRole', 0)
                // next()
                break
              }
              case 2: {
                // next({ name: 'source-admin-index' })
                next({ name: 'entry' })
                break
              }
              case 3: {
                // if (name === '贾敏') {
                //   store.commit('setCurrentRole', 4)
                //   next({ name: 'clerkIndex' })
                // } else {
                //   next()
                // }
                // next({ name: 'clerkIndex' })
                next({ name: 'entry' })
                break
              }
              case 4: {
                // next({ name: 'source-admin-index' })
                next({ name: 'entry' })
                break
              }
              default: {
                break
              }
            }
          }
          else {
            next({ name: 'entry' })
          }


          // if (roles.length>1){
          //   console.log(roles.length)
          //
          //   next({ name: 'entry' })
          //
          // }else if(roles.length === 0){
          //   next()
          // }else if(roles.length === 1){
          //   if(roles[0] === 1){
          //     // next({ name: 'chairmanIndex' })
          //     // next({ name: 'index' })
          //     next()
          //   }
          // }
        }
      }).finally(() => {
    })
  }
  else {
    // if (to.name === 'index' && from.name === 'chairmanIndex'){
    //   alert('to.name === \'index\' && from.name === \'chairmanIndex\'')
    //   let allowBack = true //    给个默认值true
    //   alert('from.meta.allowBack')
    //   alert(from.meta.allowBack)
    //   if (from.meta.allowBack !== undefined) {
    //     allowBack = from.meta.allowBack
    //   }
    //   alert('allowBack')
    //   alert(allowBack)
    //   if (!allowBack) {
    //     store.commit('setAllowBack', false)
    //     history.pushState(null, null, location.href)
    //   }
    // }
    next()

    // if (to.name === 'index' && from.name === 'chairmanIndex') {
    //   store.commit('setAllowBack', true)
    //
    //   let allowBack = true //    给个默认值true
    //   alert('from.meta.allowBack')
    //   alert(from.meta.allowBack)
    //   if (from.meta.allowBack !== undefined) {
    //     allowBack = from.meta.allowBack
    //   }
    //   alert('allowBack')
    //   alert(allowBack)
    //   if (!allowBack) {
    //     store.commit('setAllowBack', false)
    //     history.pushState(null, null, location.href)
    //   }
    // }

  }
})

// router.beforeResolve((to, from, next)=>{
//   // pushHistory()
//   console.log('router.routesArr',router.routesArr)
//   window.addEventListener("popstate", function(e) {
//     // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
//     // e.preventDefault()
//     router.backward(1)
//   }, false);
//   next()
// })

// 记录用户浏览页面的地址的轨迹
router.routesArr = []
// 后退到上一层页面，不是上一个历史
router.backward = function (stepNum) {
  // typeof stepNum !== 'number' && (stepNum = 1)
  stepNum = Math.abs(stepNum)
  let index = router.routesArr.length - 1 - stepNum
  let route = router.routesArr[0]
  if (index > 0) {
    route = router.routesArr[index]
  }
  router.push({
    name: route.name,
    // path: route.path,
    params: { isBack: true },
    query: route.query
  })
}
// 判断某一个路由是否在轨迹中出现
router.getIndexOf = path => {
  for (let i in router.routesArr) {
    let route = router.routesArr[i]
    if (route.path === path) {
      return i
    }
  }
  return -1
}
// 记录用户浏览页面的地址的轨迹，只保留单一节点
router.afterEach((to, from) => {
  let index = router.getIndexOf(to.path)
  // debugger
  if (index !== -1) {
    router.routesArr.splice(index, 900)
  }
  router.routesArr.push(to)
  console.log('router.routesArr', router.routesArr)
})

function pushHistory() {
  let state = {
    title: "title",
    url: "#"
  };
  window.history.pushState(state, "title", "#");
}

export default router

