<template>
    <div class="">
        <div class="control">
            <div class="head-wrap">
                <div class="tab-outer-wrap">
                    <c-tab v-if="titlebar.length>0"
                           :titlebar="titlebar"
                           @update:currentIndex="getCurrentIndex"
                           :currentIndex="currentIndex"
                           :element.sync="element" :show-num="false"></c-tab>
                </div>

                <div class="statistics">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="item in titlebar">
                                <div class="block-wrapper">
                                    <router-link
                                            class="block"
                                            tag="div"
                                            :to="{name:'list-clerk',params:{taskType:'charge',timeRange:0,taskStatus:0}}"
                                            @click.native="$store.commit('setTaskType','charge')"
                                    >
                                        <span class="num blue">{{item.charge.all || 0}}</span>
                                        <span class="des">本月工作</span>
                                    </router-link>
                                    <router-link
                                            class="block"
                                            tag="div"
                                            :to="{name:'list-clerk',params:{taskType:'charge',timeRange:0,taskStatus:1}}"
                                            @click.native="$store.commit('setTaskType','charge')"
                                    >
                                        <span class="num green">{{item.charge.finished || 0}}</span>
                                        <span class="des">本月已完成</span>
                                    </router-link>
                                    <router-link
                                            class="block"
                                            tag="div"
                                            :to="{name:'list-clerk',params:{taskType:'charge',timeRange:0,taskStatus:2}}"
                                            @click.native="$store.commit('setTaskType','charge')"
                                    >
                                        <span class="num cyan">{{item.charge.doing || 0}}</span>
                                        <span class="des">本月推进中</span>
                                    </router-link>
                                    <router-link
                                            class="block"
                                            tag="div"
                                            :to="{name:'list-clerk',params:{taskType:'charge',timeRange:0,taskStatus:3}}"
                                            @click.native="$store.commit('setTaskType','charge')"
                                    >
                                        <span class="num orange">{{item.charge.unfinish || 0}}</span>
                                        <span class="des">未完成</span>
                                    </router-link>
                                </div>
                            </div>
                            <!--<div class="swiper-slide">-->
                            <!--<div class="block-wrapper">-->
                            <!--<router-link-->
                            <!--class="block"-->
                            <!--tag="div"-->
                            <!--:to="{name:'list-clerk',params:{taskType:'sign',timeRange:0,taskStatus:0}}"-->
                            <!--@click.native="$store.commit('setTaskType','sign')"-->
                            <!--&gt;-->
                            <!--<span class="num blue">{{sign.all || 0}}</span>-->
                            <!--<span class="des">本月工作</span>-->
                            <!--</router-link>-->
                            <!--<router-link-->
                            <!--class="block"-->
                            <!--tag="div"-->
                            <!--:to="{name:'list-clerk',params:{taskType:'sign',timeRange:0,taskStatus:1}}"-->
                            <!--@click.native="$store.commit('setTaskType','sign')"-->
                            <!--&gt;-->
                            <!--<span class="num green">{{sign.finished || 0}}</span>-->
                            <!--<span class="des">本月已完成</span>-->
                            <!--</router-link>-->
                            <!--<router-link-->
                            <!--class="block"-->
                            <!--tag="div"-->
                            <!--:to="{name:'list-clerk',params:{taskType:'sign',timeRange:0,taskStatus:2}}"-->
                            <!--@click.native="$store.commit('setTaskType','sign')"-->
                            <!--&gt;-->
                            <!--<span class="num cyan">{{sign.doing || 0}}</span>-->
                            <!--<span class="des">本月推进中</span>-->
                            <!--</router-link>-->
                            <!--<router-link-->
                            <!--class="block"-->
                            <!--tag="div"-->
                            <!--:to="{name:'list-clerk',params:{taskType:'sign',timeRange:0,taskStatus:3}}"-->
                            <!--@click.native="$store.commit('setTaskType','sign')"-->
                            <!--&gt;-->
                            <!--<span class="num orange">{{sign.unfinished || 0}}</span>-->
                            <!--<span class="des">未完成</span>-->
                            <!--</router-link>-->
                            <!--</div>-->
                            <!--</div>-->
                        </div>
                    </div>
                </div>
            </div>

            <div class="entrys">
                <router-link
                        class="btn1"
                        tag="div"
                        :to="{name:'list-clerk',params:{taskType:'charge',timeRange:0,taskStatus:0}}"
                        @click.native="$store.commit('setTaskType','charge')"
                >
                    <p>
                        <i class="icon"></i>
                        <span>全部工作</span>
                    </p>
                </router-link>
                <router-link
                        class="btn2"
                        tag="div"
                        :to="{name:'taskadd'}"
                >
                    <p>
                        <i class="icon"></i>
                        <span>工作新增</span>
                    </p>
                </router-link>
                <router-link
                        class="btn3"
                        tag="div"
                        :to="{name:'process-center-clerk',params:{process_taskType:'charge',process_taskStatus:'审批中'}}"
                >
                    <p>
                        <i class="icon"></i>
                        <span>流程中心</span>
                    </p>
                </router-link>
            </div>
        </div>
        <FullPageLoading :loading="loading1"></FullPageLoading>
        <FullPageLoading :loading="loading2"></FullPageLoading>

    </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import axios from 'axios'
  import util from '../../util'

  // const titlebar = [
  //   {
  //     name: '张领导',
  //     charge: {
  //       all: 0,
  //       finished: 0,
  //       doing: 0,
  //       unfinished: 0
  //     }
  //   },
  //   {
  //     name: '张领导',
  //     charge: {
  //       all: 0,
  //       finished: 0,
  //       doing: 0,
  //       unfinished: 0
  //     }
  //   }
  // ]
  import Qs from 'qs'

  export default {
    name: "index",
    data() {
      return {
        titlebar: [],
        detailSwiper: null,
        currentIndex: 0,
        element: null,
        // openId:"57c6350ce4b02a66facea7b8",
        // openId: "YKe/l6JCuuHgUz3QqMDT1vSvTwQ=",
        openId: '',
        avatar: '',
        name: '',
        charge: {},
        sign: {},
        loading1:false,
        loading2:false
      }
    },
    beforeRouteEnter(to, from, next) {
      qing.call('setWebViewTitle',{'title':'办事员首页'})

      next((vm) => {

        let today = new Date()

        let range = [util.getFirstDateOfMonthHMS(today), util.getLastDateOfMonthHMS(today)]

        // let getNumURL = vm.$url + "/taskSystem/task/getAmount"
        let getNumURL = "http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getAmount"

        vm.loading1 = true
        axios({
          method: 'post',
          // url: vm.$url + '/taskSystem/rule/getLeader',
          url: 'http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getLeader',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          // headers: {
          //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          // },
          // data: JSON.stringify([vm.$store.getters.openId]),
          data: JSON.stringify([vm.$store.getters.openID]),
          // data: Qs.stringify({
          //   workerIDs: JSON.stringify([vm.$store.getters.openID]),
          // })
        })
          .then((response) => {
            vm.loading1 = false
            vm.loading2 = true
            let leaderArr = response.data.result

            vm.$store.commit('setLeaderArr', leaderArr)

            let queryListMonth = vm.createQueryList('', 'charge', 0)

            // let today = new Date()
            //
            // let queryTask1 = {
            //   starttime: ['1970-01-01 00:00:00 00:00:00', util.getLastDateOfMonthHMS(today)],
            //   endtime: [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
            //   state: undefined,
            //   chargerID: 'xxx',
            //   signerID: undefined,
            //   life_done_type: undefined,
            //   helperID: undefined,
            //   level: 1
            // }
            //
            // let queryTaskHelper1 = {
            //   starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
            //   endtime: [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
            //   state: undefined,
            //   chargerID: undefined,
            //   signerID: undefined,
            //   life_done_type: undefined,
            //   helperID: 'xxx',
            //   level: 1
            // }
            //
            // queryTask1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
            // queryTask1.life_done_type = undefined
            // queryTask1.state = [2, 3, 4]
            //
            // queryTaskHelper1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
            // queryTaskHelper1.life_done_type = undefined
            // queryTaskHelper1.state = [2, 3, 4]
            //
            // let all = {
            //   name: 'all',
            //   param: [queryTask1,queryTaskHelper1],
            // }
            //
            // let queryTask2 = {
            //   starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
            //   endtime: [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
            //   state: undefined,
            //   chargerID: 'xxx',
            //   signerID: undefined,
            //   life_done_type: undefined,
            //   helperID: undefined,
            //   level: 1
            // }
            //
            // let queryTaskHelper2 = {
            //   starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
            //   endtime: [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
            //   state: undefined,
            //   chargerID: undefined,
            //   signerID: undefined,
            //   life_done_type: undefined,
            //   helperID: 'xxx',
            //   level: 1
            // }
            // queryTask2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
            // queryTask2.life_done_type = 1
            // queryTask2.state = [3]
            // queryTask2.life_state = 3
            //
            // queryTaskHelper2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
            // queryTaskHelper2.life_done_type = 1
            // queryTaskHelper2.state = [3]
            // queryTaskHelper2.life_state = 3
            //
            // let finished = {
            //   name: 'finished',
            //   param: [queryTask2,queryTaskHelper2],
            // }
            //
            // let queryTask3 = {
            //   starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
            //   endtime: [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
            //   state: undefined,
            //   chargerID: 'xxx',
            //   signerID: undefined,
            //   life_done_type: undefined,
            //   helperID: undefined,
            //   level: 1
            // }
            //
            // let queryTaskHelper3 = {
            //   starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
            //   endtime: [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
            //   state: undefined,
            //   chargerID: undefined,
            //   signerID: undefined,
            //   life_done_type: undefined,
            //   helperID: 'xxx',
            //   level: 1
            // }
            // queryTask3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
            // queryTask3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
            // queryTask3.life_done_type = undefined
            // queryTask3.state = [2]
            //
            // queryTaskHelper3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
            // queryTaskHelper3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
            // queryTaskHelper3.life_done_type = undefined
            // queryTaskHelper3.state = [2]
            //
            // let doing = {
            //   name: 'doing',
            //   param: [queryTask3,queryTaskHelper3],
            // }
            //
            // let queryTask4 = {
            //   starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
            //   endtime: [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
            //   state: undefined,
            //   chargerID: 'xxx',
            //   signerID: undefined,
            //   life_done_type: undefined,
            //   helperID: undefined,
            //   level: 1
            // }
            //
            // let queryTaskHelper4 = {
            //   starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
            //   endtime: [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
            //   state: undefined,
            //   chargerID: undefined,
            //   signerID: undefined,
            //   life_done_type: undefined,
            //   helperID: 'xxx',
            //   level: 1
            // }
            // queryTask4.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
            // queryTask4.life_done_type = 0
            // queryTask4.state = [3]
            // queryTask4.life_state = 3
            //
            // queryTaskHelper4.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
            // queryTaskHelper4.life_done_type = 0
            // queryTaskHelper4.state = [3]
            // queryTaskHelper4.life_state = 3
            //
            // let queryTask4_2 = {
            //   state: [2],
            //   starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
            //   endtime: [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)],
            //   chargerID: 'xxx',
            //   level: 1
            // }
            //
            // let queryTaskHelper4_2 = {
            //   state: [2],
            //   starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
            //   endtime: [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)],
            //   helperID: 'xxx',
            //   level: 1
            // }
            //
            // let unfinish = {
            //   name: 'unfinish',
            //   param: [queryTask4,queryTaskHelper4,queryTask4_2,queryTaskHelper4_2],
            // }
            // let queryList = [all,finished,doing,unfinish]



            let p = leaderArr.map(leader => {
              // return axios.get(getNumURL, {
              //   params: {
              //     openIDStr: leader.fleaderID,
              //     rangeStr: range.join(',')
              //   }
              // })
              queryListMonth.forEach((query)=>{
                query.param.forEach((item)=>{
                  if (item.chargerID !== undefined) {
                    item.chargerID = leader.fleaderID
                  }
                  if (item.helperID !== undefined) {
                    item.helperID = leader.fleaderID
                  }
                })
              })

              return axios({
                method: 'post',
                url: getNumURL,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: Qs.stringify({
                  jsonStr: JSON.stringify(queryListMonth),
                })
              })
            })

            Promise.all(p)
              .then((values) => {
                if (values.length > 0) {
                  values.forEach((response, index) => {
                    if (response.data.success) {
                      let data = response.data.result
                      // vm.charge = data.charge
                      // vm.sign = data.dispatch

                      let obj = {}
                      obj.charge = data
                      vm.titlebar.push(obj)
                    }
                  })
                  if(vm.titlebar.length>0){
                    vm.loading2 = false
                  }
                  for (let i = 0; i < leaderArr.length; i++) {
                    vm.titlebar[i].name = leaderArr[i].fleaderName
                  }

                  vm.$nextTick(() => {
                    vm.detailSwiper = new Swiper('.swiper-container', {
                      pagination: {
                        el: '.swiper-pagination'
                      },
                      on: {
                        slideChangeTransitionStart: function () {
                          console.log(vm.detailSwiper.activeIndex)
                          vm.currentIndex = vm.detailSwiper.activeIndex
                        }
                      },
                    })
                  })

                }
              })

          }).catch((error) => {
          alert('error')
        })


      })
    },
    beforeDestroy() {
      console.log('beforeDestroy')
    },
    beforeRouteLeave(to, from, next) {
      console.log('beforeRouteLeave')
      next()
    },
    mounted() {
      console.log('mounted')


    },
    methods: {
      getCurrentIndex(e) {
        this.currentIndex = e;
        this.detailSwiper.slideTo(this.currentIndex);
        console.log('e', e)
      },
      createQueryList(openID, taskType, timeRange) {
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

          queryTask1.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
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
          // queryTask1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          //
          // queryTask2.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          // queryTask2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          //
          // queryTask3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
          // queryTask3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          //
          // queryTask4.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          // queryTask4.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          //
          // queryTask4_2.endtime = [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)]
          // queryTask4_2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          //
          // queryTask5.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          // queryTask5.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          //
          //
          // queryTaskHelper1.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          // queryTaskHelper1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          //
          // queryTaskHelper2.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          // queryTaskHelper2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          //
          // queryTaskHelper3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
          // queryTaskHelper3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          //
          // queryTaskHelper4.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          // queryTaskHelper4.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          //
          // queryTaskHelper4_2.endtime = [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)]
          // queryTaskHelper4_2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          //
          // queryTaskHelper5.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          // queryTaskHelper5.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']

          queryTask1.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTask1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

          queryTask2.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTask2.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

          queryTask3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
          queryTask3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

          queryTask4.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTask4.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

          queryTask4_2.endtime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          queryTask4_2.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

          queryTask5.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTask5.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']


          queryTaskHelper1.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTaskHelper1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

          queryTaskHelper2.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTaskHelper2.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

          queryTaskHelper3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
          queryTaskHelper3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

          queryTaskHelper4.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTaskHelper4.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

          queryTaskHelper4_2.endtime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          queryTaskHelper4_2.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

          queryTaskHelper5.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
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
            param: [queryTask1, queryTaskHelper1],
          }
          finished = {
            name: 'finished',
            param: [queryTask2, queryTaskHelper2],
          }
          doing = {
            name: 'doing',
            param: [queryTask3, queryTaskHelper3],
          }
          unfinish = {
            name: 'unfinish',
            param: [queryTask4, queryTaskHelper4, queryTask4_2, queryTaskHelper4_2],
          }
          abolish = {
            name: 'abolish',
            param: [queryTask5, queryTaskHelper5],
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
      },

    }
  }
</script>

<style scoped lang="scss">

    header {
        background-image: linear-gradient(-156deg, #367be7 49%, #5394f8 100%);
        .rank {
            padding: 0 0.3rem;
            padding-bottom: 0.9rem;
            padding-top: 0.22rem;
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            .block {
                display: inline-flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                .num {
                    padding-bottom: 0.12rem;
                    font-size: 0.18rem;
                    color: #ffffff;
                }
                .des {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;

                    span {
                        padding-left: 0.04rem;
                        font-size: 0.12rem;
                        color: #ffffff;
                        opacity: 0.62;
                    }
                }
                &.left {
                    .icon {
                        display: inline-block;
                        width: 0.14rem;
                        height: 0.14rem;
                        background: url("../../assets/排行.png") no-repeat !important;
                        background-size: contain !important;
                    }
                }
                &.right {
                    .icon {
                        display: inline-block;
                        width: 0.14rem;
                        height: 0.14rem;
                        background: url("../../assets/积分.png") no-repeat !important;
                        background-size: contain !important;
                    }
                }
            }
            .middle {
                .user_pic_wrap {
                    position: relative;
                    .icon {
                        position: absolute;
                        top: -0.04rem;
                        right: -0.04rem;
                        z-index: 999;
                        display: inline-block;
                        width: 0.2rem;
                        height: 0.2rem;
                        /*background: url("../../assets/Group 3.png") no-repeat !important;*/
                        background: url("../../assets/huangguan.png") no-repeat !important;
                        background-size: contain !important;
                        transform: rotate(45deg);
                    }
                }
                .user_pic {
                    margin-bottom: 0.12rem;
                    width: 0.5rem;
                    height: 0.5rem;
                    border-radius: 50%;
                    border: 0.02rem solid #fff;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .name {
                    font-size: 0.14rem;
                    color: #ffffff;
                    text-align: center;
                }
            }
        }
    }

    .control {
        /*margin: 0 0.12rem 0;*/
        box-shadow: 0 0.03rem 0.03rem 0 #e3eef5;
        /*border-radius: 0.08rem;*/
        overflow: hidden;
        background-color: #F2F6F9;
        & ::v-deep .tab-title-wrap {
            .tab-title {
                justify-content: center;
            }
        }
        .head-wrap {
            padding: 0.24rem 0 0.12rem;
            background-image: linear-gradient(-156deg, #367be7 49%, #5394f8 100%);
            .tab-outer-wrap {
                margin: 0 0.12rem 0;
                border-top-left-radius: 0.08rem;
                border-top-right-radius: 0.08rem;
                overflow: hidden;
            }
            .statistics {
                margin: 0 0.12rem 0;
                /*padding-top: 0.15rem;*/
                /*padding-bottom: 0.25rem;*/

                border-radius: 0.08rem;
                .swiper-slide {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    flex-direction: column;
                    .block-wrapper {
                        padding-top: 0.15rem;
                        padding-bottom: 0.25rem;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        width: 100%;
                        border-bottom-left-radius: 0.08rem;
                        border-bottom-right-radius: 0.08rem;
                        background: #ffffff;
                        .block {
                            display: inline-flex;
                            flex-direction: column;
                            align-items: center;
                            .num {
                                display: inline-flex;
                                justify-content: center;
                                align-items: center;
                                width: 0.44rem;
                                height: 0.44rem;
                                font-size: 0.2rem;
                                color: #ffffff;
                                border-radius: 50%;
                                &.blue {
                                    background: #4186ef;
                                }
                                &.green {
                                    background: #16b181;
                                }
                                &.cyan {
                                    background: #feb30d;
                                }
                                &.orange {
                                    background-image: linear-gradient(-150deg, #fd7519 0%, #eb3d07 100%);
                                }
                            }
                            .des {
                                padding-top: 0.14rem;
                                font-size: 0.12rem;
                                color: #3f3f3f;
                            }
                        }
                    }

                }
            }
        }

        .entrys {
            margin: 0 0.12rem 0;
            width: calc(100% - 0.24rem);
            div {
                margin-top: 0.1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #ffffff;
                box-shadow: 0 2px 4px 0 #e3eef5;
                border-radius: 8px;
                width: 100%;
                height: 0.66rem;
                p {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    i {
                        position: absolute;
                        left: -0.3rem;
                        top: 50%;
                        transform: translateY(-50%);

                    }
                    span {
                        font-size: 0.14rem;
                        color: #3f3f3f;
                    }
                }
                &.btn1 {
                    i.icon {
                        display: inline-block;
                        width: 0.14rem;
                        height: 0.14rem;
                        background: url("../../assets/全部任务.png") no-repeat !important;
                        background-size: contain !important;
                    }
                }
                &.btn2 {
                    i.icon {
                        display: inline-block;
                        width: 0.14rem;
                        height: 0.14rem;
                        background: url("../../assets/新增.png") no-repeat !important;
                        background-size: contain !important;
                    }
                }
                &.btn3 {
                    i.icon {
                        display: inline-block;
                        width: 0.14rem;
                        height: 0.14rem;
                        background: url("../../assets/流程中心.png") no-repeat !important;
                        background-size: contain !important;
                    }
                }
            }
        }
    }
</style>