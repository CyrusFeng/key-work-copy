<template>
    <div style="height: 100%">
        <div class="parent-tabwrap">
            <c-tab :titlebar="titlebar1"
                   @update:currentIndex="getCurrentIndex($event)"
                   :currentIndex="tabCurrentIndex" :show-num="true"></c-tab>
        </div>

        <div class="swiper-container first-container swiper-no-swiping">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="list-wrap 111" ref="wrapper1_1">
                        <ul class="task">
                            <router-link tag="li"
                                         :to="{name:'processdetail',params:{detailObj:JSON.stringify(item),canWrite:true}}"
                                         v-for="item in list1" :key="item.id">
                                <div class="head">
                                    <div class="title">{{item.projectName}}</div>
                                    <div class="date">{{getLifeType(item.type)}}</div>
                                </div>
                                <div class="middle">
                                    <span>责任人：</span>
                                    <span>{{item.chargerName}}</span>
                                    <span>{{item.coOperation?'（协办中）':''}}</span>
                                </div>
                                <div class="bottom">
                                    <div class="tags">
                                        <p v-if="judgeTarget(item) === 0">
                                            <span>待审批</span>
                                        </p>
                                        <p v-if="judgeTarget(item) === 1">
                                            <span>审批中</span>
                                        </p>
                                        <p v-if="judgeTarget(item) === 2">
                                            <span>通过</span>
                                        </p>
                                        <p v-if="judgeTarget(item) === 3">
                                            <span>未通过</span>
                                        </p>
                                        <p v-if="judgeTarget(item) === 4">
                                            <span>被退回</span>
                                        </p>
                                        <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 0">-->
                                            <!--<span>待审批</span>-->
                                        <!--</p>-->
                                        <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 1">-->
                                            <!--<span>审批中</span>-->
                                        <!--</p>-->
                                        <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 2">-->
                                            <!--<span>通过</span>-->
                                        <!--</p>-->
                                        <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 3">-->
                                            <!--<span>未通过</span>-->
                                        <!--</p>-->
                                        <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 4">-->
                                            <!--<span>被退回</span>-->
                                        <!--</p>-->
                                    </div>
                                </div>
                            </router-link>
                            <div v-if="showLoadingWrap1">
                                <Loading :showloadingwrap="showLoadingWrap1"
                                         :showloadingimg="showLoadingImg1"></Loading>
                            </div>
                        </ul>
                        <!--<Loading :showloadingwrap="showLoadingWrap1"-->
                                 <!--:showloadingimg="showLoadingImg1"></Loading>-->
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="list-wrap 222" ref="wrapper1_2">
                        <ul class="task">
                            <router-link tag="li"
                                         :to="{name:'processdetail',params:{detailObj:JSON.stringify(item),canWrite:false}}"
                                         v-for="item in list2" :key="item.id">
                                <div class="head">
                                    <div class="title">
                                        {{item.projectName}}
                                        <span class="reward" v-if="$showReward(item.reward) && item.type === 3 && item.state === 3">(+{{item.reward}}分)</span>
                                    </div>
                                    <div class="date">{{getLifeType(item.type)}}</div>
                                </div>
                                <div class="middle">
                                    <span>责任人：</span>
                                    <span>{{item.chargerName}}</span>
                                </div>
                                <div class="bottom">
                                    <div class="tags">
                                        <p v-if="judgeTarget(item) === 0">
                                            <span>待审批</span>
                                        </p>
                                        <p v-if="judgeTarget(item) === 1">
                                            <span>审批中</span>
                                        </p>
                                        <p v-if="judgeTarget(item) === 2">
                                            <span>通过</span>
                                        </p>
                                        <p v-if="judgeTarget(item) === 3">
                                            <span>未通过</span>
                                        </p>
                                        <p v-if="judgeTarget(item) === 4">
                                            <span>被退回</span>
                                        </p>
                                        <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 0">-->
                                            <!--<span>待审批</span>-->
                                        <!--</p>-->
                                        <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 1">-->
                                            <!--<span>审批中</span>-->
                                        <!--</p>-->
                                        <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 2">-->
                                            <!--<span>通过</span>-->
                                        <!--</p>-->
                                        <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 3">-->
                                            <!--<span>未通过</span>-->
                                        <!--</p>-->
                                        <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 4">-->
                                            <!--<span>被退回</span>-->
                                        <!--</p>-->
                                    </div>
                                </div>
                            </router-link>
                            <div v-if="showLoadingWrap2">
                                <Loading :showloadingwrap="showLoadingWrap2"
                                         :showloadingimg="showLoadingImg2"></Loading>
                            </div>
                        </ul>
                        <!--<Loading :showloadingwrap="showLoadingWrap2"-->
                                 <!--:showloadingimg="showLoadingImg2"></Loading>-->
                    </div>
                </div>
            </div>
        </div>
        <!--<header>-->
            <!--<change-btn :titleData="btnTitle"-->
                        <!--@update:currentIndex="getCurrentIndex1($event)"-->
                        <!--:currentIndex="btnCurrentIndex"></change-btn>-->
        <!--</header>-->
        <!--<div class="swiper-container first-container">-->
            <!--<div class="swiper-wrapper">-->
                <!--<div class="swiper-slide" ref="wrapper1">-->
                    <!---->
                <!--</div>-->
                <!--<div class="swiper-slide" ref="wrapper2">-->
                    <!--<div class="parent-tabwrap">-->
                        <!--<c-tab :titlebar="titlebar2"-->
                               <!--@update:currentIndex="getCurrentIndex3($event)"-->
                               <!--:currentIndex="tabCurrentIndex2" :show-num="true"></c-tab>-->
                    <!--</div>-->

                    <!--<div class="swiper-container third-container">-->
                        <!--<div class="swiper-wrapper">-->
                            <!--<div class="swiper-slide">-->
                                <!--<div class="list-wrap" ref="wrapper2_1">-->
                                    <!--<ul class="task">-->
                                        <!--<router-link tag="li"-->
                                                     <!--:to="{name:'processdetail',params:{detailObj:JSON.stringify(item),canWrite:true}}"-->
                                                     <!--v-for="item in list3" :key="item.id">-->
                                            <!--<div class="head">-->
                                                <!--<div class="title">{{item.projectName}}</div>-->
                                                <!--<div class="date">{{getLifeType(item.type)}}</div>-->
                                            <!--</div>-->
                                            <!--<div class="middle">-->
                                                <!--<span>责任人：</span>-->
                                                <!--<span>{{item.chargerName}}</span>-->
                                            <!--</div>-->
                                            <!--<div class="bottom">-->
                                                <!--<div class="tags">-->
                                                    <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 0">-->
                                                        <!--<span>待审批</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 1">-->
                                                        <!--<span>审批中</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 2">-->
                                                        <!--<span>通过</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 3">-->
                                                        <!--<span>未通过</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 4">-->
                                                        <!--<span>被退回</span>-->
                                                    <!--</p>-->
                                                <!--</div>-->
                                            <!--</div>-->
                                        <!--</router-link>-->
                                    <!--</ul>-->
                                    <!--<Loading :showloadingwrap="showLoadingWrap3"-->
                                             <!--:showloadingimg="showLoadingImg3"></Loading>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="swiper-slide">-->
                                <!--<div class="list-wrap" ref="wrapper2_2">-->
                                    <!--<ul class="task">-->
                                        <!--<router-link tag="li"-->
                                                     <!--:to="{name:'processdetail',params:{detailObj:JSON.stringify(item),canWrite:false}}"-->
                                                     <!--v-for="item in list4" :key="item.id">-->
                                            <!--<div class="head">-->
                                                <!--<div class="title">{{item.projectName}}</div>-->
                                                <!--<div class="date">{{getLifeType(item.type)}}</div>-->
                                            <!--</div>-->
                                            <!--<div class="middle">-->
                                                <!--<span>责任人：</span>-->
                                                <!--<span>{{item.chargerName}}</span>-->
                                            <!--</div>-->
                                            <!--<div class="bottom">-->
                                                <!--<div class="tags">-->
                                                    <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 0">-->
                                                        <!--<span>待审批</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 1">-->
                                                        <!--<span>审批中</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 2">-->
                                                        <!--<span>通过</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 3">-->
                                                        <!--<span>未通过</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 4">-->
                                                        <!--<span>被退回</span>-->
                                                    <!--</p>-->
                                                <!--</div>-->
                                            <!--</div>-->
                                        <!--</router-link>-->
                                    <!--</ul>-->
                                    <!--<Loading :showloadingwrap="showLoadingWrap4"-->
                                             <!--:showloadingimg="showLoadingImg4"></Loading>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
  import Swiper from 'swiper'
  import axios from 'axios'
  import Qs from 'qs'
  import BScroll from 'better-scroll'

  const btnTitle = [
    {
      name: '我负责的',
    },
    {
      name: '我审批的'
    }
  ]
  let titlebar1 = [
    {
      name: '待审批',
      num: 0
    },
    {
      name: '已审批',
      num: 0
    },
    // {
    //   name: '被退回',
    //   num: 0
    // }
  ]
  let titlebar2 = [
    {
      name: '待审批',
      num: 0
    },
    {
      name: '已审批',
      num: 0
    }
  ]
  export default {
    name: "process-center-cm",
    components: {
    },
    data() {
      return {
        btnTitle,
        titlebar1,
        titlebar2,
        detailSwiper: null,
        tabCurrentIndex: 0,
        showLoadingWrap1: false,
        showLoadingWrap2: false,
        showLoadingImg1: false,
        showLoadingImg2: false,
        list1: [],
        list2: [],
        scroll1: null,
        scroll2: null,
        openId: '',
        process_taskType: '',
        process_taskStatus: '',
        charge:{},
        approve:{}
      }
    },
    watch: {
      tabCurrentIndex() {
        console.log('this.tabCurrentIndex',this.tabCurrentIndex)
        localStorage.setItem('tabCurrentIndex', this.tabCurrentIndex)


        if (this.tabCurrentIndex === 1) {
          console.log('!this.showLoadingWrap2 && this.list2.length === 0',!this.showLoadingWrap2 && this.list2.length === 0)
          if (!this.showLoadingWrap2 && this.list2.length === 0) {
            this.loadData(this.$store.state.openID, 'charge', '已审批', 1, 10)
          }
        } else if (this.tabCurrentIndex === 0) {
          if (!this.showLoadingWrap1 && this.list1.length === 0) {
            this.loadData(this.$store.state.openID, 'charge', '审批中', 1, 10)
          }
        }

      },
    },
    beforeRouteEnter(to, from, next) {
      qing.call('setWebViewTitle',{'title':'流程中心'})

      next(vm => {
        if (from.name === 'index' || from.name === 'chairmanIndex') {
          vm.tabCurrentIndex = 0
          if (vm.tabCurrentIndex!==undefined) {
            localStorage.setItem('tabCurrentIndex', vm.tabCurrentIndex)
          }
        }
        else {
          vm.tabCurrentIndex = localStorage.getItem('tabCurrentIndex')
        }

        vm.detailSwiper = new Swiper('.first-container', {
          on: {
            slideChangeTransitionStart: () => {
              vm.tabCurrentIndex = vm.detailSwiper.activeIndex
            }
          },
        })

        vm.detailSwiper.slideTo(vm.tabCurrentIndex);

        // let getNumURL = vm.$url + "/taskSystem/task/flowNum"
        // axios.get(getNumURL, {
        //   params: {
        //     openIDStr: vm.$store.getters.openID,
        //     point_autoApprove:''
        //     // rangeStr: rangeCurrentMonth.join(',')
        //   }
        // })
        //   .then((response) => {
        //     console.log(response.data)
        //     if (response.data.result.length > 0) {
        //       let data = response.data.result[0]
        //       vm.charge = data.charge
        //       vm.approve = data.approve
        //
        //       vm.titlebar1[0].num = vm.approve.checking
        //       vm.titlebar1[1].num = vm.approve.pass + vm.approve.back
        //     }
        //   })
        // let getNumURL = vm.$url + "/taskSystem/task/getFlowAmount"
        let getNumURL = "http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getFlowAmount"

        axios({
          method: 'post',
          url: getNumURL,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: Qs.stringify({
            jsonStr: JSON.stringify([
              {
                "name":"checking",
                "param":[
                  {
                    "point_state":[
                      1
                    ],
                    "point_approverID":vm.$store.getters.openID,
                    "point_autoApprove":1
                  }
                ]
              },
              {
                "name":"done",
                "param":[
                  {
                    "point_state":[
                      2,
                      3
                    ],
                    "point_approverID":vm.$store.getters.openID,
                    "point_autoApprove":1
                  }
                ]
              }
            ]),
          })
        })
          .then((response) => {
            vm.titlebar1[0].num = response.data.result.checking
            vm.titlebar1[1].num = response.data.result.done
          })
        vm.loadData(vm.$store.getters.openID, '', '审批中', 1, 10)
      })

    },
    methods: {
      getCurrentIndex(e) {
        console.log(e)
        this.tabCurrentIndex = e;
        this.detailSwiper.slideTo(e);
      },
      ajax(url, params, list, scroll, wrapElement, orderNum) {
        switch (orderNum) {
          case 1: {
            this.showLoadingWrap1 = true
            this.showLoadingImg1 = true
            break
          }
          case 2: {
            this.showLoadingWrap2 = true
            this.showLoadingImg2 = true
            break
          }
          default: {
            break
          }
        }
        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          // headers: {
          //   'Content-Type': 'application/json; charset=UTF-8'
          // },
          data: Qs.stringify(params)
        })
          .then((response) => {
            console.log(response.data)
            if (response.data.result.data1.amount > 0) {
              switch (orderNum) {
                case 1: {
                  this.showLoadingWrap1 = false
                  this.showLoadingImg1 = false
                  break
                }
                case 2: {
                  this.showLoadingWrap2 = false
                  this.showLoadingImg1 = false
                  break
                }
                default: {
                  break
                }
              }

              let tasklist = response.data.result.data1.data
              let savePointIdsArr = response.data.result.data2
                console.log(response.data.result.data1.data)
              let lifelist = []
              tasklist.forEach((task) => {
                task.taskLifeList.forEach((life) => {

                  life.taskID = task.id
                  life.projectName = task.projectName
                  life.chargerName = task.chargerName
                  life.sourceList = task.sourceList
                  life.starttime = task.starttime
                  life.endtime = task.endtime
                  life.unitName = task.unitName
                  life.signerName = task.signerName
                  life.helperName = task.helperName
                  life.imgs = task.imgs
                  life.problem = task.problem
                  life.ways = task.ways
                  life.aim = task.aim
                  life.taskState = task.state
                  life.reward = task.reward
                  console.log(task.lifePointList)
                  life.lifePointListLength = task.taskLifeList.length

                  // life.changeTimes = task.taskLifeList.length
                  let count = 0
                  task.taskLifeList.forEach((item)=>{
                    if (item.type === 2) {
                      count+=1
                    }
                  })
                  life.changeTimes = count

                  savePointIdsArr.forEach((id,index)=>{
                    if(life.id === id){
                      life.coOperation = true
                    }
                  })

                  lifelist.push(life)
                })
              })

              lifelist.forEach((item) => {
                list.push(item)
              })

              if(scroll){
                scroll.finishPullUp()
                scroll.refresh()
              }
              // list = lifelist.concat(list);
              this.$initScroll(scroll,wrapElement,(scroll)=>{
                params.page+=1
                this.ajax(url, params, list, scroll, wrapElement, orderNum)
              })
              // this.$nextTick(() => {
              //   if (!scroll) {
              //     scroll = new BScroll(wrapElement, {
              //       click: true,
              //       pullUpLoad: {
              //         threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
              //       }
              //     })
              //     scroll.on('pullingUp', () => {
              //       params.page+=1
              //       this.ajax(url, params, list, scroll, wrapElement, orderNum)
              //       scroll.finishPullUp()
              //       // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
              //     })
              //   } else {
              //     scroll.finishPullUp()
              //     scroll.refresh()
              //   }
              //   console.log(scroll)
              // })
            }
            else {
              switch (orderNum) {
                case 1: {
                  this.showLoadingWrap1 = true
                  this.showLoadingImg1 = false
                  break
                }
                case 2: {
                  this.showLoadingWrap2 = true
                  this.showLoadingImg2 = false
                  break
                }
                default: {
                  break
                }
              }
            }

          })
          .catch((error) => {
            switch (orderNum) {
              case 1: {
                this.showLoadingWrap1 = true
                this.showLoadingImg1 = false
                break
              }
              case 2: {
                this.showLoadingWrap2 = true
                this.showLoadingImg2 = false
                break
              }
              default: {
                break
              }
            }
          })
      },
      loadData(openId, timeRange, process_taskStatus, page, pageAmount) {
        console.log(openId, timeRange, process_taskStatus, page, pageAmount)
        let queryTask = {
          point_state: undefined,
          signerID: undefined,
          point_approverID: openId,
          point_autoApprove:1
        }

        // let url = this.$url + '/taskSystem/task/util/getListWithAddPointStatus'
        let url = "http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getListWithAddPointStatus"
        if (timeRange === 0) {
          queryTask.point_approverID = undefined
          if (process_taskStatus === "审批中") {
            queryTask.point_state = [1]

            this.showLoadingWrap1 = true
            this.showLoadingImg1 = true
            let queryTaskList = []
            queryTaskList.push(queryTask)
            let params = { page, pageAmount, queryTaskList: JSON.stringify(queryTaskList) }
            this.ajax(url, params, this.list1, this.scroll1, this.$refs.wrapper1_1, 1)

          }
          else if (process_taskStatus === "已审批") {
            queryTask.point_state = [2, 3, 4]

            this.showLoadingWrap2 = true
            this.showLoadingImg2 = true
            let queryTaskList = []
            queryTaskList.push(queryTask)
            let params = { page, pageAmount, queryTaskList: JSON.stringify(queryTaskList) }
            this.ajax(url, params, this.list2, this.scroll2, this.$refs.wrapper1_2, 2)
          }
        }
        else if (timeRange === 1) {

        }

        // queryTask.point_approverID = openId
        if (process_taskStatus === "审批中") {
          queryTask.point_state = [1]

          this.showLoadingWrap1 = true
          this.showLoadingImg1 = true
          let queryTaskList = []
          queryTaskList.push(queryTask)
          let params = { page, pageAmount, queryTaskList: JSON.stringify(queryTaskList) }
          this.ajax(url, params, this.list1, this.scroll1, this.$refs.wrapper1_1, 1)

        }
        else if (process_taskStatus === "已审批") {
          queryTask.point_state = [2, 3, 4]

          this.showLoadingWrap2 = true
          this.showLoadingImg2 = true
          let queryTaskList = []
          queryTaskList.push(queryTask)
          let params = { page, pageAmount, queryTaskList: JSON.stringify(queryTaskList) }
          this.ajax(url, params, this.list2, this.scroll2, this.$refs.wrapper1_2, 2)
        }
      },
      getLifeType(type) {
        let _type = ''
        switch (type) {
          case 1:
            _type = '新增'
            break
          case 2:
            _type = '变更'
            break
          case 3:
            _type = '完结'
            break
          case 4:
            _type = '废止'
            break
          case 5:
            _type = '反馈'
            break
          case 6:
            _type = '传阅'
            break
          default:
            _type = ''
            break
        }
        return _type
      },
      judgeTarget(item){
        let state
        let len = item.lifePointList.length
        let lastPointState = item.lifePointList[item.lifePointList.length-1].state
        if(lastPointState === 2 || lastPointState.state === 3 ){
          state = lastPointState
        }else{
          for (let i = 0; i < len; i++) {
            if(item.lifePointList[i].state !== 2){
              state = item.lifePointList[i].state
              break
            }
          }
        }
        return state
      },
    }
  }
</script>

<style scoped lang="scss">
    .list-container {
        height: 100%;
    }

    header {
        height: 0.46rem;
        background-color: #397de8;
        text-align: center;
        position: relative;
        .icon {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 0.12rem;
                display: inline-block;
                width: 0.2rem;
                height: 0.2rem;
                background: url("../../assets/搜索.png") no-repeat !important;
                background-size: contain !important;
            }
    }
    .swiper-container {
        &.first-container{
            height: calc(100% - 0.41rem);
            .swiper-slide {
                height: 100%;
                .list-wrap {
                    height: 100%;
                    overflow: hidden;
                    ul {
                    }

                }

            }
        }

    }

    .swiper-slide {
        font-size: 12px;
    }

    .parent-tabwrap {
        border-bottom: 1px solid #f6f6f6;
    }

    .task {
        /*overflow: hidden;*/
        li {
            padding: 0 0.12rem;
            margin-bottom: 0.1rem;
            background-color: #fff;
            padding-bottom: 0.1rem;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title {
                padding: 0.1rem 0;
                font-size: 0.14rem;
                color: #3e3e3e;
                max-width: 3rem;
            }
            .date {
                font-size: 0.12rem;
                color: #367be7;
            }
        }
        .middle {
            padding-bottom: 0.1rem;
            span {
                font-size: 0.13rem;
                color: #666666;
            }
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .tags {
                p {
                    margin-right: 0.1rem;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 0.04rem;
                    &:first-child {
                        background: rgba(23, 178, 130, 0.5);
                        span {
                            color: #119b70;
                        }
                    }
                    &:nth-of-type(2) {
                        background: #c4dbff;
                        span {
                            color: #2967c8;
                        }
                    }
                    &:nth-of-type(3) {
                        background: #D6C2AD;
                        span {
                            color: #EA8742;
                        }
                    }
                    span {
                        padding: 0.03rem 0.12rem;
                        display: inline-flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 0.09rem;
                    }
                }

            }
            .right {

            }
        }
    }
</style>