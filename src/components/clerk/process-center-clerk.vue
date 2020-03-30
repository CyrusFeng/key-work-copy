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
                        <div class="task">
                            <div v-for="leaderObj in list1" class="charger-wrap">
                                <div style="font-size: 12px" class="charger-name">
                                    <span class="left">{{leaderObj.name}}</span>
                                    <div class="toggle-bottom">
                                        <div @click="onClickToggle($event,leaderObj)">
                                            <p v-if="!leaderObj.folded">
                                                <span>收起</span>
                                                <i class="icon"></i>
                                            </p>
                                            <p v-else class="unfolded">
                                                <span>展开</span>
                                                <i class="icon"></i>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <router-link
                                        tag="div"
                                        class="router-link"
                                        :class="{folded:leaderObj.folded}"
                                        v-for="item in leaderObj.lifelist"
                                        :key="item.id"
                                        :to="{name:'processdetail',params:{detailObj:JSON.stringify(item),canWrite:false}}">
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
                                            <p v-if="item.listState === 0">
                                                <span>新增</span>
                                            </p>
                                            <p v-if="item.listState === 1">
                                                <span>退回</span>
                                            </p>
                                            <p v-if="item.listState === 2">
                                                <span>审批中</span>
                                            </p>
                                            <p v-if="item.listState === 3">
                                                <span>通过</span>
                                            </p>
                                            <p v-if="item.listState === 4">
                                                <span>未通过</span>
                                            </p>
                                            <p v-if="item.listState === 5">
                                                <span>关闭</span>
                                            </p>
                                        </div>
                                    </div>
                                </router-link>
                                <Loading :showloadingwrap="showLoadingWrap1"
                                         :showloadingimg="showLoadingImg1"></Loading>
                            </div>
                        </div>
                        <!--<ul class="task">-->
                            <!--<router-link tag="li"-->
                                         <!--:to="{name:'processdetail',params:{detailObj:JSON.stringify(item),canWrite:true}}"-->
                                         <!--v-for="item in list1" :key="item.id">-->
                                <!--<div class="head">-->
                                    <!--<div class="title">{{item.projectName}}</div>-->
                                    <!--<div class="date">{{getLifeType(item.type)}}</div>-->
                                <!--</div>-->
                                <!--<div class="middle">-->
                                    <!--<span>责任人：</span>-->
                                    <!--<span>{{item.chargerName}}</span>-->
                                    <!--<span>{{item.coOperation?'（协办中）':''}}</span>-->
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

                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="list-wrap 222" ref="wrapper1_2">
                        <div class="task">
                            <div v-for="leaderObj in list2" class="charger-wrap">
                                <div style="font-size: 12px" class="charger-name">
                                    <span class="left">{{leaderObj.name}}</span>
                                    <div class="toggle-bottom">
                                        <div @click="onClickToggle($event,leaderObj)">
                                            <p v-if="!leaderObj.folded">
                                                <span>收起</span>
                                                <i class="icon"></i>
                                            </p>
                                            <p v-else class="unfolded">
                                                <span>展开</span>
                                                <i class="icon"></i>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <router-link
                                        tag="div"
                                        class="router-link"
                                        :class="{folded:leaderObj.folded}"
                                        v-for="item in leaderObj.lifelist"
                                        :key="item.id"
                                        :to="{name:'processdetail',params:{detailObj:JSON.stringify(item),canWrite:false}}">
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
                                            <p v-if="item.listState === 0">
                                                <span>新增</span>
                                            </p>
                                            <p v-if="item.listState === 1">
                                                <span>退回</span>
                                            </p>
                                            <p v-if="item.listState === 2">
                                                <span>审批中</span>
                                            </p>
                                            <p v-if="item.listState === 3">
                                                <span>通过</span>
                                            </p>
                                            <p v-if="item.listState === 4">
                                                <span>未通过</span>
                                            </p>
                                            <p v-if="item.listState === 5">
                                                <span>关闭</span>
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
                                <Loading :showloadingwrap="showLoadingWrap2"
                                         :showloadingimg="showLoadingImg2"></Loading>
                            </div>
                        </div>
                        <!--<ul class="task">-->
                            <!--<router-link tag="li"-->
                                         <!--:to="{name:'processdetail',params:{detailObj:JSON.stringify(item),canWrite:false}}"-->
                                         <!--v-for="item in list2" :key="item.id">-->
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

                    </div>
                </div>
            </div>
        </div>

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
      name: '审批中',
      num: 0
    },
    {
      name: '已审批',
      num: 0
    },
  ]
  export default {
    name: "process-center-clerk",
    components: {},
    data() {
      return {
        btnTitle,
        titlebar1:[
          {
            name: '审批中',
            num: 0
          },
          {
            name: '已审批',
            num: 0
          },
        ],
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
        charge: {},
        approve: {},
        leaderArr: []
      }
    },
    watch: {
      tabCurrentIndex() {
        console.log('this.tabCurrentIndex', this.tabCurrentIndex)
        localStorage.setItem('tabCurrentIndex', this.tabCurrentIndex)

        if (this.tabCurrentIndex === 1) {
          console.log('!this.showLoadingWrap2 && this.list2.length === 0', !this.showLoadingWrap2 && this.list2.length === 0)
          if (!this.showLoadingWrap2 && this.list2.length === 0) {
            this.loadData(this.$store.state.openID, 'charge', '已审批', 1, 10000)
          }
        } else if (this.tabCurrentIndex === 0) {
          if (!this.showLoadingWrap1 && this.list1.length === 0) {
            this.loadData(this.$store.state.openID, 'charge', '审批中', 1, 10000)
          }
        }

      },
    },
    beforeRouteEnter(to, from, next) {
      qing.call('setWebViewTitle',{'title':'流程中心'})

      next(vm => {
        vm.leaderArr = vm.$store.getters.leaderArr

        if (from.name === 'index' || from.name === 'clerkIndex') {
          vm.tabCurrentIndex = 0
          if (vm.tabCurrentIndex !== undefined) {
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


        // let today = new Date()
        // let rangeCurrentMonth = [util.getFirstDateOfMonth(today), util.getLastDateOfMonth(today)]
        // let rangeCurrentYear = [util.getFirstDateOfYear(today), util.getLastDateOfYear(today)]

        // let getNumURL = vm.$url + "/taskSystem/task/flowNum"
        let getNumURL = "http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/flowNum"
        // axios.get(getNumURL, {
        //   params: {
        //     openIDStr: vm.$store.getters.openID,
        //     // rangeStr: rangeCurrentMonth.join(',')
        //   }
        // })
        //   .then((response) => {
        //     // alert("getNumURL调用成功")
        //     console.log(response.data)
        //     if (response.data.result.length > 0) {
        //       let data = response.data.result[0]
        //       console.log('data', data)
        //       vm.charge = data.charge
        //       vm.approve = data.approve
        //
        //       // vm.titlebar1[0].num = vm.charge.checking
        //       // vm.titlebar1[1].num = vm.charge.pass + vm.charge.back
        //       // vm.titlebar1[2].num = vm.charge.back
        //
        //       vm.titlebar1[0].num = vm.approve.checking
        //       vm.titlebar1[1].num = vm.approve.pass
        //     }
        //   })


        let p1 = vm.leaderArr.map(leader => {
          return axios.get(getNumURL, {
            params: {
              openIDStr: leader.fleaderID,
            }
          })
        })

        Promise.all(p1)
          .then((values) => {
            if (values.length > 0) {
              values.forEach((response, index) => {
                if (response.data.result.length > 0) {
                  let data = response.data.result[0]

                  let charge = data.charge
                  let approve = data.approve

                  console.log(Number(charge.checking))
                  console.log(Number(charge.pass))
                  console.log(Number(charge.back))
                  console.log(Number(charge.pass)+Number(charge.back))
                  // vm.titlebar1[0].num = vm.charge.checking
                  // vm.titlebar1[1].num = vm.charge.pass + vm.charge.back
                  // vm.titlebar1[2].num = vm.charge.back
                  vm.titlebar1[0].num += Number(charge.checking)
                  vm.titlebar1[1].num += Number(charge.pass)+Number(charge.back)

                  // let obj = {}
                  // obj.charge = data.charge
                  //
                  // vm.titlebar1[0].num += Number(obj.charge.all)
                  // vm.titlebar1[1].num += Number(obj.charge.finished)
                  // vm.titlebar1[2].num += Number(obj.charge.doing)
                  // vm.titlebar1[3].num += Number(obj.charge.unfinished)
                }
              })
            }
          })
          .catch(()=>{
            alert('获取数量接口错误')
          })

        vm.loadData(vm.$store.getters.openID, '', '审批中', 1, 10000)
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

        const promises = this.leaderArr.map(user => {

          let queryTaskList = JSON.parse(params.queryTaskList)
          queryTaskList.forEach((item) => {
            if (item.chargerID) {
              item.chargerID = user.fleaderID
            }
          })

          params.queryTaskList = JSON.stringify(queryTaskList)
          console.log('params.queryTaskList', params.queryTaskList)
          return axios({
            method: 'post',
            url: url,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: Qs.stringify(params)
          })
        });

        Promise.all(promises)
          .then((values) => {
            values.forEach((response, index) => {
              let amount = response.data.result.amount
              if (amount > 0) {
                let tasklist = response.data.result.data
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
                    life.listState = task.taskLifeList[0].state

                    // life.changeTimes = task.taskLifeList.length

                    let count = 0
                    task.taskLifeList.forEach((item) => {
                      if (item.type === 2) {
                        count += 1
                      }
                    })
                    life.changeTimes = count

                    lifelist.push(life)
                  })
                })

                if(lifelist.length>0){
                  let obj = {}
                  obj.id = this.leaderArr[index].fleaderID
                  obj.name = this.leaderArr[index].fleaderName
                  obj.lifelist = lifelist
                  list.push(obj)
                }

              }
            })

            if(list.length>0){
              list.forEach((item) => {
                // item.$set('folded',true)
                this.$set(item, 'folded', false)
              })

              switch (orderNum) {
                case 1: {
                  this.showLoadingWrap1 = false
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
            }else{
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

            if (scroll) {
              scroll.finishPullUp()
              scroll.refresh()
            }
            // list = lifelist.concat(list);
            this.$initScroll(scroll, wrapElement)

          })
          .catch((error)=>{
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
          chargerID: openId,
        }
        // let url = this.$url + '/taskSystem/task/flowList'
        let url = "http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/flowList"

        if (process_taskStatus === "审批中") {
          // queryTask.point_state = [1]
          queryTask.life_state = 2

          this.showLoadingWrap1 = true
          this.showLoadingImg1 = true
          let queryTaskList = []
          queryTaskList.push(queryTask)
          let params = { page, pageAmount, queryTaskList: JSON.stringify(queryTaskList) }
          this.ajax(url, params, this.list1, this.scroll1, this.$refs.wrapper1_1, 1)

        }
        else if (process_taskStatus === "已审批") {
          // queryTask.point_state = [2, 3, 4]
          queryTask.life_state = 3

          let queryTask2 = {
            life_state: 4,
            chargerID: openId,
          }
          this.showLoadingWrap2 = true
          this.showLoadingImg2 = true
          let queryTaskList = []
          queryTaskList.push(queryTask)
          queryTaskList.push(queryTask2)
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
      onClickToggle($event, item) {
        $event.stopPropagation()
        item.folded = !item.folded
      },
      judgeTarget(item){
        let state
        let len = item.lifePointList.length
        if(len>0){
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
        }else{
          state = -1
        }
        return state
      }
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
        &.first-container {
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
        > .charger-wrap {
            padding: 0 0.12rem;
            margin-bottom: 0.1rem;
            background-color: #fff;
            padding-bottom: 0.1rem;
            &:last-child {
                margin-bottom: 0;
            }
            .charger-name {
                padding: 0.07rem 0 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    font-size: 0.14rem;
                    color: #000000;
                }
                .toggle-bottom {
                    text-align: right;
                    div {
                        > p {
                            margin-left: auto;
                            /*padding: 0.07rem 0 0 0.1rem;*/
                            display: inline-flex;
                            justify-content: flex-end;
                            align-items: center;
                            span {
                                font-size: 0.10rem;
                                color: #a3a3a3;
                            }
                            .icon {
                                margin-left: 0.04rem;
                                display: inline-block;
                                width: 0.14rem;
                                height: 0.1rem;
                                background: url("../../assets/收起.png") no-repeat;
                                background-size: contain;
                                transform: rotate(0deg);
                            }

                            &.unfolded {
                                .icon {
                                    display: inline-block;
                                    width: 0.14rem;
                                    height: 0.1rem;
                                    background: url("../../assets/收起.png") no-repeat;
                                    background-size: contain;
                                    transform: rotate(180deg);
                                }
                            }
                        }
                    }

                }
            }
            .router-link {
                /*padding: 0 0.12rem;*/
                /*margin-bottom: 0.1rem;*/
                background-color: #fff;
                border-bottom: 0.01rem solid #e5e5e5;
                /*padding-bottom: 0.1rem;*/
                &:last-child {
                    margin-bottom: 0;
                }
                &.folded {
                    height: 0;
                    overflow: hidden;
                    border-bottom: 0;
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
                padding-bottom: 0.12rem;
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

    }
</style>