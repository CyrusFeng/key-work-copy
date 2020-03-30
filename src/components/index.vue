<template>
    <div class="">
        <header>
            <div class="rank">
                <div class="block left">
                    <p class="num">{{pointObj.index === undefined?'-':pointObj.index}}</p>
                    <p class="des">
                        <i class="icon"></i>
                        <span>排名</span>
                    </p>
                </div>
                <div class="middle">
                    <router-link
                            class="user_pic_wrap"
                            tag="div"
                            :to="{name:'ranking',params:{}}"
                            @click.native=""
                    >
                        <p class="user_pic">
                            <!--<img src="../assets/logo.png" alt="">-->
                            <img :src="$store.state.avatarUrl" alt="" v-if="$store.state.avatarUrl">
                            <img src="../assets/defaultAvator.png" v-else>
                        </p>
                        <!--<i class="icon"></i>-->
                    </router-link>
                    <p class="name">{{$store.state.name}}</p>
                </div>
                <div class="block right">
                    <p class="num">{{pointObj.score === undefined?'-':pointObj.score}}</p>
                    <p class="des">
                        <i class="icon"></i>
                        <span>积分</span>
                    </p>
                </div>
            </div>
        </header>
        <div class="control">
            <c-tab :titlebar="titlebar"
                   @update:currentIndex="getCurrentIndex"
                   :currentIndex="currentIndex"
                   :element.sync="element" :show-num="false"></c-tab>
            <div class="statistics">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="block-wrapper">
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'list',params:{taskType:'charge',timeRange:0,taskStatus:0}}"
                                        @click.native="$store.commit('setTaskType','charge')"
                                >
                                    <!--<span class="num blue">{{charge.finished + charge.doing + charge.unfinish + charge.abolish || 0}}</span>-->
                                    <span class="num blue">{{charge.all || 0}}</span>
                                    <span class="des">本月工作</span>
                                </router-link>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'list',params:{taskType:'charge',timeRange:0,taskStatus:1}}"
                                        @click.native="$store.commit('setTaskType','charge')"
                                >
                                    <span class="num green">{{charge.finished || 0}}</span>
                                    <span class="des">本月已完成</span>
                                </router-link>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'list',params:{taskType:'charge',timeRange:0,taskStatus:2}}"
                                        @click.native="$store.commit('setTaskType','charge')"
                                >
                                    <span class="num cyan">{{charge.doing || 0}}</span>
                                    <span class="des">本月推进中</span>
                                </router-link>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'list',params:{taskType:'charge',timeRange:0,taskStatus:3}}"
                                        @click.native="$store.commit('setTaskType','charge')"
                                >
                                    <span class="num orange">{{charge.unfinish || 0}}</span>
                                    <span class="des">未完成</span>
                                </router-link>
                            </div>
                            <div class="entrys">
                                <router-link
                                        class="btn1"
                                        tag="div"
                                        :to="{name:'list',params:{taskType:'charge',timeRange:0,taskStatus:0}}"
                                        @click.native="$store.commit('setTaskType','charge')"
                                >
                                    <p>
                                        <i class="icon"></i>
                                        <span class="title">全部工作</span>
                                    </p>
                                </router-link>
                                <router-link
                                        class="btn2"
                                        tag="div"
                                        :to="{name:'taskadd'}"
                                >
                                    <p>
                                        <i class="icon"></i>
                                        <span class="title">工作新增</span>
                                    </p>
                                </router-link>
                                <router-link
                                        class="btn3"
                                        tag="div"
                                        :to="{name:'processcenter',params:{process_taskType:'approval',process_taskStatus:'审批中'}}"
                                >
                                    <p>
                                        <i class="icon"></i>
                                        <span class="title">流程中心</span>
                                        <span class="hint" v-if="showHint"></span>
                                    </p>
                                </router-link>
                                <router-link
                                        class="btn4"
                                        tag="div"
                                        :to="{name:'ranking',params:{}}"
                                >
                                    <p>
                                        <i class="icon"></i>
                                        <span class="title">排行查看</span>
                                    </p>
                                </router-link>
                            </div>

                        </div>
                        <div class="swiper-slide">
                            <div class="block-wrapper">
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'list',params:{taskType:'sign',timeRange:0,taskStatus:0}}"
                                        @click.native="$store.commit('setTaskType','sign')"
                                >
                                    <!--<span class="num blue">{{sign.finished + sign.doing + sign.unfinish + sign.abolish  || 0}}</span>-->
                                    <span class="num blue">{{sign.all  || 0}}</span>
                                    <span class="des">本月工作</span>
                                </router-link>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'list',params:{taskType:'sign',timeRange:0,taskStatus:1}}"
                                        @click.native="$store.commit('setTaskType','sign')"
                                >
                                    <span class="num green">{{sign.finished || 0}}</span>
                                    <span class="des">本月已完成</span>
                                </router-link>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'list',params:{taskType:'sign',timeRange:0,taskStatus:2}}"
                                        @click.native="$store.commit('setTaskType','sign')"
                                >
                                    <span class="num cyan">{{sign.doing || 0}}</span>
                                    <span class="des">本月推进中</span>
                                </router-link>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'list',params:{taskType:'sign',timeRange:0,taskStatus:3}}"
                                        @click.native="$store.commit('setTaskType','sign')"
                                >
                                    <span class="num orange">{{sign.unfinished || 0}}</span>
                                    <span class="des">未完成</span>
                                </router-link>
                            </div>
                            <div class="entrys">
                                <router-link
                                        class="btn1"
                                        tag="div"
                                        :to="{name:'list',params:{taskType:'sign',timeRange:0,taskStatus:0}}"
                                        @click.native="$store.commit('setTaskType','sign')"
                                >
                                    <p>
                                        <i class="icon"></i>
                                        <span class="title">全部工作</span>
                                    </p>
                                </router-link>
                                <router-link
                                        class="btn2"
                                        tag="div"
                                        :to="{name:'tempAdd',params:{}}"
                                >
                                    <p>
                                        <i class="icon"></i>
                                        <span class="title">临时下发</span>
                                    </p>
                                </router-link>
                                <router-link
                                        class="btn3"
                                        tag="div"
                                        :to="{name:'processcenter',params:{process_taskType:'approval',process_taskStatus:'审批中'}}"
                                >
                                    <p>
                                        <i class="icon"></i>
                                        <span class="title">流程中心</span>
                                        <span class="hint" v-if="showHint"></span>
                                    </p>
                                </router-link>
                                <router-link
                                        class="btn4"
                                        tag="div"
                                        :to="{name:'ranking',params:{}}"
                                >
                                    <p>
                                        <i class="icon"></i>
                                        <span class="title">排行查看</span>
                                    </p>
                                </router-link>
                            </div>

                        </div>
                    </div>
                </div>

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
  import Qs from 'qs'
  import util from '../util'

  const titlebar = [
    {
      name: '我负责的'
    },
    {
      name: '我下发的'
    }
  ]
  export default {
    name: "index",
    data() {
      return {
        titlebar,
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
        pointObj:{
          score:undefined,
          index:undefined
        },
        loading1:false,
        loading2:false,
        showHint:false
      }
    },
    beforeRouteEnter(to, from, next) {
      qing.call('setWebViewTitle',{'title':'首页'})

      next((vm) => {
        console.log(vm.$store.state.openID)

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
    },
    created() {
      console.log('created')
    },
    beforeDestroy() {
      console.log('beforeDestroy')
      // alert('beforeDestroy')
    },
    beforeRouteLeave(to, from, next) {
      console.log('beforeRouteLeave')
      // alert(to.name)
      next()
    },
    mounted() {
      console.log('mounted')

      let today = new Date()
      let range = [util.getFirstDateOfMonthHMS(today), util.getLastDateOfMonthHMS(today)]

      // let getNumURL = this.$url + "/taskSystem/task/getAmount"
      let getNumURL = "http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getAmount"


      let queryTask1 = {
        endtime: [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
        starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
        state: undefined,
        chargerID: 'xxx',
        signerID: 'xxx',
        life_done_type: undefined,
        helperID: undefined,
        level: 1
      }

      let queryTaskHelper1 = {
        endtime: [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
        starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
        state: undefined,
        chargerID: undefined,
        signerID: undefined,
        life_done_type: undefined,
        helperID: 'xxx',
        level: 1
      }
      // queryTask1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
      queryTask1.life_done_type = undefined
      queryTask1.state = [2, 3, 4]

      // queryTaskHelper1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
      queryTaskHelper1.life_done_type = undefined
      queryTaskHelper1.state = [2, 3, 4]

      let all = {
        name: 'all',
        param: [queryTask1, queryTaskHelper1],
      }

      let queryTask2 = {
        endtime: [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
        starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
        state: undefined,
        chargerID: 'xxx',
        signerID: 'xxx',
        life_done_type: undefined,
        helperID: undefined,
        level: 1
      }

      let queryTaskHelper2 = {
        endtime: [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
        starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
        state: undefined,
        chargerID: undefined,
        signerID: undefined,
        life_done_type: undefined,
        helperID: 'xxx',
        level: 1
      }

      queryTask2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
      queryTask2.life_done_type = 1
      queryTask2.state = [3]
      queryTask2.life_state = 3

      queryTaskHelper2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
      queryTaskHelper2.life_done_type = 1
      queryTaskHelper2.state = [3]
      queryTaskHelper2.life_state = 3
      let finished = {
        name: 'finished',
        param: [queryTask2, queryTaskHelper2],
      }

      let queryTask3 = {
        endtime: [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
        starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
        state: undefined,
        chargerID: 'xxx',
        signerID: 'xxx',
        life_done_type: undefined,
        helperID: undefined,
        level: 1
      }

      let queryTaskHelper3 = {
        endtime: [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
        starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
        state: undefined,
        chargerID: undefined,
        signerID: undefined,
        life_done_type: undefined,
        helperID: 'xxx',
        level: 1
      }
      queryTask3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
      queryTask3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
      queryTask3.life_done_type = undefined
      queryTask3.state = [2]

      queryTaskHelper3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
      queryTaskHelper3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
      queryTaskHelper3.life_done_type = undefined
      queryTaskHelper3.state = [2]

      let doing = {
        name: 'doing',
        param: [queryTask3, queryTaskHelper3],
      }

      let queryTask4 = {
        endtime: [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
        starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
        state: undefined,
        chargerID: 'xxx',
        signerID: 'xxx',
        life_done_type: undefined,
        helperID: undefined,
        level: 1
      }

      let queryTaskHelper4 = {
        endtime: [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59'],
        starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
        state: undefined,
        chargerID: undefined,
        signerID: undefined,
        life_done_type: undefined,
        helperID: 'xxx',
        level: 1
      }

      queryTask4.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
      queryTask4.life_done_type = 0
      queryTask4.state = [3]
      queryTask4.life_state = 3

      queryTaskHelper4.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
      queryTaskHelper4.life_done_type = 0
      queryTaskHelper4.state = [3]
      queryTaskHelper4.life_state = 3

      let queryTask4_2 = {
        state: [2],
        starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
        endtime: [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)],
        chargerID: 'xxx',
        signerID: 'xxx',
        level: 1
      }

      let queryTaskHelper4_2 = {
        state: [2],
        starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
        endtime: [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)],
        helperID: 'xxx',
        level: 1
      }

      let unfinish = {
        name: 'unfinish',
        param: [queryTask4, queryTaskHelper4, queryTask4_2, queryTaskHelper4_2],
      }
      let queryList = [all, finished, doing, unfinish]


      const promise = ['charge', 'sign'].map(type => {

        queryList.forEach((query) => {
          query.param.forEach((item, index) => {
            if (type === 'charge') {
              item.signerID = undefined
              // 第一个对象给chargerID赋值
              // 第二个对象给helperID赋值 以此类推
              if (index % 2 === 0) {
                item.chargerID = this.$store.state.openID
                item.helperID = undefined
              } else {
                item.chargerID = undefined
                item.helperID = this.$store.state.openID
              }
            } else if (type === 'sign') {
              item.chargerID = undefined
              item.signerID = this.$store.state.openID
              item.helperID = undefined

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
            jsonStr: JSON.stringify(queryList),
          })
        })
      })

      this.loading1 = true

      Promise.all(promise)
        .then((values) => {
          this.loading1 = false
          if (values.length > 0) {
            values.forEach((response, index) => {
              if (response.data.success) {
                let data = response.data.result

                if (index === 0) {
                  this.charge = data
                } else if (index === 1) {
                  this.sign = data
                }
              }
            })
            // for (let i = 0; i < leaderArr.length; i++) {
            //   vm.titlebar[i].name = leaderArr[i].fleaderName
            // }

            // vm.$nextTick(() => {
            //   vm.detailSwiper = new Swiper('.swiper-container', {
            //     pagination: {
            //       el: '.swiper-pagination'
            //     },
            //     on: {
            //       slideChangeTransitionStart: function () {
            //         console.log(vm.detailSwiper.activeIndex)
            //         vm.currentIndex = vm.detailSwiper.activeIndex
            //       }
            //     },
            //   })
            // })

          }
        })

      // this.loading2 = true
      // this.$api.rank.rankList(this.$url + '/taskSystem/score/byTime',{type:'year'},
        this.$api.rank.rankList('http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/rankingCopy',{},
          (response)=>{
          this.loading2 = false

          console.log(response)
          this.list = response.data.result.pointsList

          this.list.forEach((item,index)=>{
            if(item.personID === this.$store.getters.openID){
              this.pointObj.score = item.score
              this.pointObj.index = item.rank
            }
          })
        },
        ()=>{})

      // axios.get(getNumURL, {
      //   params: {
      //     openIDStr: this.$store.state.openID,
      //     rangeStr: range.join(',')
      //   }
      // })
      //   .then((response) => {
      //     // alert("getNumURL调用成功")
      //     console.log(response.data)
      //     console.log('typeof response.data',typeof response.data)
      //
      //     if (response.data.result.length > 0) {
      //       let data = response.data.result[0]
      //       this.charge = data.charge
      //       this.sign = data.dispatch
      //     }
      //   })


      let queryTask = {
        point_state: [1],
        point_approverID: this.$store.getters.openID,
      }
      let queryTaskList = []
      queryTaskList.push(queryTask)
      // let url = this.$url + '/taskSystem/task/flowList'
      let url = 'http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getList'

      let params = { page:1, pageAmount:1, queryTaskList: JSON.stringify(queryTaskList) }
      axios({
        method: 'post',
        url: url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: Qs.stringify(params)
      })
        .then((response) => {
          console.log(response.data)
          if (response.data.result.amount > 0) {
            this.showHint = true
          }
        }).catch(()=>{

      })
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
                        background: url("../assets/排行.png") no-repeat !important;
                        background-size: contain !important;
                    }
                }
                &.right {
                    .icon {
                        display: inline-block;
                        width: 0.14rem;
                        height: 0.14rem;
                        background: url("../assets/积分.png") no-repeat !important;
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
                        /*background: url("../assets/Group 3.png") no-repeat !important;*/
                        background: url("../assets/huangguan.png") no-repeat !important;
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
        margin: -0.7rem 0.12rem 0;
        box-shadow: 0 0.03rem 0.03rem 0 #e3eef5;
        border-radius: 0.08rem;
        overflow: hidden;
        background-color: #F2F6F9;
        & ::v-deep .tab-title-wrap {
            .tab-title {
                justify-content: center;
            }
        }
        .statistics {
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
                .entrys {
                    width: 100%;
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
                            span.title {
                                font-size: 0.14rem;
                                color: #3f3f3f;
                            }
                            span.hint{
                                position: absolute;
                                right: -0.3rem;
                                top: 50%;
                                transform: translateY(-50%);
                                display: inline-block;
                                width: 0.1rem;
                                height: 0.1rem;
                                border-radius: 50%;
                                background-color: #f1403c;
                            }
                        }
                        &.btn1 {
                            i.icon {
                                display: inline-block;
                                width: 0.14rem;
                                height: 0.14rem;
                                background: url("../assets/全部任务.png") no-repeat !important;
                                background-size: contain !important;
                            }
                        }
                        &.btn2 {
                            i.icon {
                                display: inline-block;
                                width: 0.14rem;
                                height: 0.14rem;
                                background: url("../assets/新增.png") no-repeat !important;
                                background-size: contain !important;
                            }
                        }
                        &.btn3 {
                            i.icon {
                                display: inline-block;
                                width: 0.14rem;
                                height: 0.14rem;
                                background: url("../assets/流程中心.png") no-repeat !important;
                                background-size: contain !important;
                            }
                        }
                        &.btn4 {
                            i.icon {
                                display: inline-block;
                                width: 0.14rem;
                                height: 0.14rem;
                                background: url("../assets/首页排行.png") no-repeat !important;
                                background-size: contain !important;
                            }
                        }
                    }
                }
            }
        }
    }
</style>