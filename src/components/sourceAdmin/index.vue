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
                                            :to="{name:'listSourceAdmin',params:{taskType:'sign',timeRange:0,taskStatus:0}}"
                                            @click.native="$store.commit('setTaskType','sign')"
                                    >
                                        <span class="num blue">{{item.charge.all || 0}}</span>
                                        <span class="des">本月工作</span>
                                    </router-link>
                                    <router-link
                                            class="block"
                                            tag="div"
                                            :to="{name:'listSourceAdmin',params:{taskType:'sign',timeRange:0,taskStatus:1}}"
                                            @click.native="$store.commit('setTaskType','sign')"
                                    >
                                        <span class="num green">{{item.charge.finished || 0}}</span>
                                        <span class="des">本月已完成</span>
                                    </router-link>
                                    <router-link
                                            class="block"
                                            tag="div"
                                            :to="{name:'listSourceAdmin',params:{taskType:'sign',timeRange:0,taskStatus:2}}"
                                            @click.native="$store.commit('setTaskType','sign')"
                                    >
                                        <span class="num cyan">{{item.charge.doing || 0}}</span>
                                        <span class="des">本月推进中</span>
                                    </router-link>
                                    <router-link
                                            class="block"
                                            tag="div"
                                            :to="{name:'listSourceAdmin',params:{taskType:'sign',timeRange:0,taskStatus:3}}"
                                            @click.native="$store.commit('setTaskType','sign')"
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
                            <!--:to="{name:'listSourceAdmin',params:{taskType:'sign',timeRange:0,taskStatus:0}}"-->
                            <!--@click.native="$store.commit('setTaskType','sign')"-->
                            <!--&gt;-->
                            <!--<span class="num blue">{{sign.all || 0}}</span>-->
                            <!--<span class="des">本月工作</span>-->
                            <!--</router-link>-->
                            <!--<router-link-->
                            <!--class="block"-->
                            <!--tag="div"-->
                            <!--:to="{name:'listSourceAdmin',params:{taskType:'sign',timeRange:0,taskStatus:1}}"-->
                            <!--@click.native="$store.commit('setTaskType','sign')"-->
                            <!--&gt;-->
                            <!--<span class="num green">{{sign.finished || 0}}</span>-->
                            <!--<span class="des">本月已完成</span>-->
                            <!--</router-link>-->
                            <!--<router-link-->
                            <!--class="block"-->
                            <!--tag="div"-->
                            <!--:to="{name:'listSourceAdmin',params:{taskType:'sign',timeRange:0,taskStatus:2}}"-->
                            <!--@click.native="$store.commit('setTaskType','sign')"-->
                            <!--&gt;-->
                            <!--<span class="num cyan">{{sign.doing || 0}}</span>-->
                            <!--<span class="des">本月推进中</span>-->
                            <!--</router-link>-->
                            <!--<router-link-->
                            <!--class="block"-->
                            <!--tag="div"-->
                            <!--:to="{name:'listSourceAdmin',params:{taskType:'sign',timeRange:0,taskStatus:3}}"-->
                            <!--@click.native="$store.commit('setTaskType','sign')"-->
                            <!--&gt;-->
                            <!--<span class="num orange">{{sign.unfinish || 0}}</span>-->
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
                        :to="{name:'listSourceAdmin',params:{taskType:'sign',timeRange:0,taskStatus:0}}"
                        @click.native="$store.commit('setTaskType','sign')"
                >
                    <p>
                        <i class="icon"></i>
                        <span>全部工作</span>
                    </p>
                </router-link>
                <router-link
                        class="btn2"
                        tag="div"
                        :to="{name:'tempAdd'}"
                >
                    <p>
                        <i class="icon"></i>
                        <span>临时下发</span>
                    </p>
                </router-link>
                <router-link
                        class="btn3"
                        tag="div"
                        :to="{name:'processCenterSourceAdmin',params:{process_taskType:'charge',process_taskStatus:'审批中'}}"
                >
                    <p>
                        <i class="icon"></i>
                        <span>流程中心</span>
                    </p>
                </router-link>
                <router-link
                        class="btn5"
                        tag="div"
                        :to="{name:'ranking',params:{}}"
                >
                    <p>
                        <i class="icon"></i>
                        <span>排行查看</span>
                    </p>
                </router-link>
                <router-link
                        class="btn4"
                        tag="div"
                        :to="{name:'rulesList'}"
                        v-if="$store.getters.currentRole === 2"
                >
                    <p>
                        <i class="icon"></i>
                        <span>设置</span>
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

  const titlebar = [
    {
      name: '本月',
      charge: {
        all: 0,
        finished: 0,
        doing: 0,
        unfinish: 0
      }
    },
    {
      name: '全部',
      charge: {
        all: 0,
        finished: 0,
        doing: 0,
        unfinish: 0
      }
    }
  ]
  import Qs from 'qs'

  export default {
    name: "source-admin-index",
    data() {
      return {
        titlebar: [],
        sourceArr: [],
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
        canLoadIndex: 0,
        loading1: false,
        loading2: false
      }
    },
    mounted() {
      this.titlebar = [
        {
          name: '本月',
          charge: {
            all: 0,
            finished: 0,
            doing: 0,
            unfinish: 0
          }
        },
        {
          name: '全部',
          charge: {
            all: 0,
            finished: 0,
            doing: 0,
            unfinish: 0
          }
        }
      ]
    },
    beforeRouteEnter(to, from, next) {


      next((vm) => {
        if (vm.$store.getters.currentRole === 4) {
          qing.call('setWebViewTitle', { 'title': '业务管理员首页' })
        } else if (vm.$store.getters.currentRole === 2) {
          qing.call('setWebViewTitle', { 'title': '系统管理员首页' })
        }

        console.log(typeof vm.$store.getters.sourceIDs)
        console.log(vm.$store.getters.sourceIDs)
        vm.sourceArr = JSON.parse(vm.$store.getters.sourceIDs)

        let today = new Date()
        let rangeCurrentMonth = [util.getFirstDateOfMonthHMS(today), util.getLastDateOfMonthHMS(today)]
        let rangeCurrentYear = [util.getFirstDateOfYearHMS(today), util.getLastDateOfYearHMS(today)]

        // let getNumURL = vm.$url + "/taskSystem/task/getAmount"
        let getNumURL = "http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getAmount"


        // let sourceStr = vm.$store.getters.sourceIDs.join(',')
        // axios.get(getNumURL, {
        //   params: {
        //     sourceStr: sourceStr,
        //     rangeStr: rangeCurrentMonth.join(',')
        //   }
        // })
        //   .then((response) => {
        //     if (response.data.result.length > 0) {
        //       // let obj = {
        //       //   name:'本月'
        //       // }
        //       // obj.charge = {}
        //       response.data.result.forEach((item) => {
        //
        //         // obj.charge.all += Number(item.all.all)
        //         // obj.charge.finished += Number(item.all.finished)
        //         // obj.charge.doing += Number(item.all.doing)
        //         // obj.charge.unfinish += Number(item.all.unfinish)
        //         vm.titlebar[0].charge.all += Number(item.all.all)
        //         vm.titlebar[0].charge.finished += Number(item.all.finished)
        //         vm.titlebar[0].charge.doing += Number(item.all.doing)
        //         vm.titlebar[0].charge.unfinish += Number(item.all.unfinish)
        //       })
        //
        //     }
        //   })
        // axios.get(getNumURL, {
        //   params: {
        //     sourceStr: sourceStr,
        //     rangeStr: rangeCurrentYear.join(',')
        //   }
        // })
        //   .then((response) => {
        //     if (response.data.result.length > 0) {
        //       response.data.result.forEach((item) => {
        //         vm.titlebar[1].charge.all += Number(item.all.all)
        //         vm.titlebar[1].charge.finished += Number(item.all.finished)
        //         vm.titlebar[1].charge.doing += Number(item.all.doing)
        //         vm.titlebar[1].charge.unfinish += Number(item.all.unfinish)
        //       })
        //     }
        //   })


        let queryTask1 = {
          endtime: undefined,
          starttime: undefined,
          state: undefined,
          life_done_type: undefined,
          level: 1
        }
        // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
        queryTask1.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
        queryTask1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
        queryTask1.life_done_type = undefined
        queryTask1.state = [2, 3, 4]
        queryTask1.level = 1


        let allMonth = {
          name: 'all',
          param: [],
        }

        let queryTask2 = {}
        queryTask2.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
        queryTask2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
        queryTask2.life_done_type = 1
        queryTask2.state = [3]
        queryTask2.life_state = 3
        queryTask2.level = 1

        let finishedMonth = {
          name: 'finished',
          param: [],
        }

        let queryTask3 = {}
        queryTask3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
        queryTask3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
        queryTask3.life_done_type = undefined
        queryTask3.state = [2]
        queryTask3.level = 1

        let doingMonth = {
          name: 'doing',
          param: [],
        }

        let queryTask4 = {}
        queryTask4.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
        queryTask4.life_done_type = 0
        queryTask4.state = [3]
        queryTask4.life_state = 3
        queryTask4.level = 1

        let queryTask4_2 = {
          state: [2],
          starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
          endtime: [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)],
          level: 1
        }

        let unfinishedMonth = {
          name: 'unfinish',
          param: [],
        }
        vm.sourceArr.forEach((source) => {
          let obj1 = { ...queryTask1 }
          obj1.sourceID = source
          allMonth.param.push(obj1)

          let obj2 = { ...queryTask2 }
          obj2.sourceID = source
          finishedMonth.param.push(obj2)

          let obj3 = { ...queryTask3 }
          obj3.sourceID = source
          doingMonth.param.push(obj3)

          let obj4 = { ...queryTask4 }
          let obj4_2 = { ...queryTask4_2 }
          obj4.sourceID = source
          obj4_2.sourceID = source
          unfinishedMonth.param.push(obj4)
          unfinishedMonth.param.push(obj4_2)
        })

        // let queryListMonth = [allMonth, finishedMonth, doingMonth, unfinishedMonth]
        let queryListMonth = vm.$createQueryList(undefined, 'charge', 0)
        // queryListMonth.forEach((query)=>{
        //   query.param.forEach((queryTask)=>{
        //     vm.sourceArr.forEach((source) => {
        //       queryTask.sourceID = source
        //     })
        //   })
        // })

        if (vm.sourceArr.length > 0) {
          queryListMonth.forEach((query) => {
            let originLength = query.param.length
            let paramList = vm.$duplicate(query.param, vm.sourceArr.length)
            vm.sourceArr.forEach((source, index) => {
              paramList.forEach((queryTask, index2) => {
                if (index2 < (index + 1) * originLength && index2 >= index * originLength) {
                  queryTask.sourceID = source
                  queryTask = JSON.parse(JSON.stringify(queryTask))
                  console.log(queryTask)
                  paramList[index2] = queryTask
                }
              })
            })
          })
        }


        vm.loading1 = true
        axios({
          method: 'post',
          url: getNumURL,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: Qs.stringify({
            jsonStr: JSON.stringify(queryListMonth),
          })
        }).then((response) => {
          vm.loading1 = false

          if (response.data.success) {
            let data = response.data.result

            vm.titlebar[0].charge.all = data.all
            vm.titlebar[0].charge.finished = data.finished
            vm.titlebar[0].charge.doing = data.doing
            vm.titlebar[0].charge.unfinish = data.unfinish
          } else {
            alert('获取本月数量失败，请重新登录')
          }
        }).catch(() => {
          alert('获取本月数量失败，请重新登录')
          vm.loading1 = false
        })


        let queryTask11 = {}
        queryTask11.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
        queryTask11.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
        queryTask11.life_done_type = undefined
        queryTask11.state = [2, 3, 4]
        queryTask11.level = 1

        let allYear = {
          name: 'all',
          param: [],
        }

        let queryTask22 = {}
        queryTask22.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
        queryTask22.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
        queryTask22.life_done_type = 1
        queryTask22.state = [3]
        queryTask22.life_state = 3
        queryTask22.level = 1

        let finishedYear = {
          name: 'finished',
          param: [],
        }

        let queryTask33 = {}
        queryTask33.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
        queryTask33.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
        queryTask33.life_done_type = undefined
        queryTask33.state = [2]
        queryTask33.level = 1

        let doingYear = {
          name: 'doing',
          param: [],
        }

        let queryTask44 = {}
        queryTask44.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
        queryTask44.life_done_type = 0
        queryTask44.state = [3]
        queryTask44.life_state = 3
        queryTask44.level = 1

        let queryTask44_2 = {
          state: [2],
          starttime: ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)],
          endtime: [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)],
          level: 1
        }

        let unfinishedYear = {
          name: 'unfinish',
          param: [],
        }


        let queryTask55 = {}
        queryTask55.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
        queryTask55.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
        queryTask55.state = [4]
        queryTask55.level = 1

        let abolishYear = {
          name: 'abolish',
          param: [],
        }

        vm.sourceArr.forEach((source) => {
          let obj1 = { ...queryTask11 }
          obj1.sourceID = source
          allYear.param.push(obj1)

          let obj2 = { ...queryTask22 }
          obj2.sourceID = source
          finishedYear.param.push(obj2)

          let obj3 = { ...queryTask33 }
          obj3.sourceID = source
          doingYear.param.push(obj3)

          let obj4 = { ...queryTask44 }
          let obj4_2 = { ...queryTask44_2 }
          obj4.sourceID = source
          obj4_2.sourceID = source
          unfinishedYear.param.push(obj4)
          unfinishedYear.param.push(obj4_2)

          let obj5 = { ...queryTask55 }
          obj5.sourceID = source
          abolishYear.param.push(obj5)

        })

        // let queryListYear = [allYear, finishedYear, doingYear, unfinishedYear, abolishYear]
        let queryListYear = vm.$createQueryList(undefined, 'charge', 1)

        if (vm.sourceArr.length > 0) {
          queryListYear.forEach((query) => {
            let originLength = query.param.length
            let paramList = vm.$duplicate(query.param, vm.sourceArr.length)
            vm.sourceArr.forEach((source, index) => {
              paramList.forEach((queryTask, index2) => {
                if (index2 < (index + 1) * originLength && index2 >= index * originLength) {
                  queryTask.sourceID = source
                  queryTask = JSON.parse(JSON.stringify(queryTask))
                  console.log(queryTask)
                  paramList[index2] = queryTask
                }
              })
            })
          })
        }


        vm.loading2 = true
        axios({
          method: 'post',
          url: getNumURL,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: Qs.stringify({
            jsonStr: JSON.stringify(queryListYear),
          })
        })
          .then((response) => {
            vm.loading2 = false
            if (response.data.success) {
              let data = response.data.result

              vm.titlebar[1].charge.all = data.all
              vm.titlebar[1].charge.finished = data.finished
              vm.titlebar[1].charge.doing = data.doing
              vm.titlebar[1].charge.unfinish = data.unfinish
            }
            else {
              alert('获取年度数量失败，请重新登录')
            }
          })
          .catch(() => {
            vm.loading2 = false
            alert('获取全部数量失败，请重新登录')
          })


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
      })
    },
    beforeDestroy() {
      console.log('beforeDestroy')
    },
    beforeRouteLeave(to, from, next) {
      console.log('beforeRouteLeave')
      this.titlebar = []
      next()
    },
    methods: {
      getCurrentIndex(e) {
        this.currentIndex = e;
        this.detailSwiper.slideTo(this.currentIndex);
        console.log('e', e)
      }
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
                &.btn4 {
                    i.icon {
                        display: inline-block;
                        width: 0.14rem;
                        height: 0.14rem;
                        background: url("../../assets/设置.png") no-repeat !important;
                        background-size: contain !important;
                    }
                }
                &.btn5 {
                    i.icon {
                        display: inline-block;
                        width: 0.14rem;
                        height: 0.14rem;
                        background: url("../../assets/首页排行.png") no-repeat !important;
                        background-size: contain !important;
                    }
                }
            }
        }
    }
</style>