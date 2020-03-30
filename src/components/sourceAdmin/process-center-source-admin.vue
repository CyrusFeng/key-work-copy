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
                            <!--canwrite：是否可审批-->
                            <router-link tag="li"
                                         :to="{name:'processdetail',params:{detailObj:JSON.stringify(item),canWrite:true,canSet:true}}"
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
                            <Loading :showloadingwrap="showLoadingWrap1"
                                     :showloadingimg="showLoadingImg1"></Loading>
                        </ul>

                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="list-wrap 222" ref="wrapper1_2">
                        <ul class="task">
                            <router-link tag="li"
                                         :to="{name:'processdetail',params:{detailObj:JSON.stringify(item),canWrite:false,canSet:false}}"
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
                        </ul>
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
    name: "process-center-source-admin",
    components: {},
    data() {
      return {
        btnTitle,
        titlebar1,
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
        vm.leaderArr = vm.$store.getters.leaderArr
        vm.sourceArr = JSON.parse(vm.$store.getters.sourceIDs)

        if (from.name === 'index' || from.name === 'chairmanIndex') {
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


        // let getNumURL = vm.$url + "/taskSystem/task/getFlowAmount"
        let getNumURL = "http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getFlowAmount"

        let queryList = vm.createFlowNumParam()

        queryList.forEach((query) => {
          let originLength = query.param.length
          let paramList = vm.$duplicate(query.param, vm.sourceArr.length)
          vm.sourceArr.forEach((source, index) => {
            paramList.forEach((queryTask,index2) => {
              if(index2<(index+1)*originLength && index2>=index*originLength){
                queryTask.sourceID = source
                queryTask = JSON.parse(JSON.stringify(queryTask))
                console.log(queryTask)
                paramList[index2] = queryTask
              }
            })
          })
        })

        // let p1 = vm.sourceArr.map(source => {
        //   return axios.get(getNumURL, {
        //     params: {
        //       openIDStr: source,
        //     }
        //   })
        // })

        axios({
          method: 'post',
          url: getNumURL,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: Qs.stringify({
            jsonStr: JSON.stringify(queryList),
          })
        })
          .then((response) => {
            // alert("getNumURL调用成功")
            console.log(response.data)
            if (response.data.success) {
              let data = response.data.result

              vm.titlebar1[0].num = data.checking
              vm.titlebar1[1].num = data.pass
            }else{
              vm.titlebar1[0].num = 0
              vm.titlebar1[1].num = 0
            }
          })


        // const promise = vm.leaderArr.map(leader => {
        //   return axios.get(getNumURL, {
        //     params: {
        //       openIDStr: leader.fleaderID,
        //     }
        //   })
        // })
        //
        // Promise.all(promise)
        //   .then((values) => {
        //     if (values.length > 0) {
        //       values.forEach((response, index) => {
        //         if (response.data.result.length > 0) {
        //           let data = response.data.result[0]
        //
        //           let charge = data.charge
        //           let approve = data.approve
        //
        //           // vm.titlebar1[0].num = vm.charge.checking
        //           // vm.titlebar1[1].num = vm.charge.pass + vm.charge.back
        //           // vm.titlebar1[2].num = vm.charge.back
        //           vm.titlebar1[0].num = Number(charge.checking)
        //           vm.titlebar1[1].num = Number(charge.pass)+Number(charge.back)
        //
        //           // let obj = {}
        //           // obj.charge = data.charge
        //           //
        //           // vm.titlebar1[0].num += Number(obj.charge.all)
        //           // vm.titlebar1[1].num += Number(obj.charge.finished)
        //           // vm.titlebar1[2].num += Number(obj.charge.doing)
        //           // vm.titlebar1[3].num += Number(obj.charge.unfinished)
        //         }
        //       })
        //     }
        //   })
        //   .catch(()=>{
        //     alert('获取数量接口错误')
        //   })
        //
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
          data: Qs.stringify(params)
        }).then((response)=>{
          switch (orderNum) {
            case 1: {
              this.showLoadingWrap1 = false
              this.showLoadingImg1 = false
              break
            }
            case 2: {
              this.showLoadingWrap2 = false
              this.showLoadingImg2 = false
              break
            }
            default: {
              break
            }
          }
          let amount = response.data.result.amount
          if (amount > 0) {
            let tasklist = response.data.result.data

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

                list.push(life)
              })
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
          }
          else{
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
        }).catch(()=>{
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
          life_state: undefined,
          sourceID: undefined,
        }
        // let url = this.$url + '/taskSystem/task/flowList'
        let url = "http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/flowList"

        if (process_taskStatus === "审批中") {
          // queryTask.point_state = [1]
          queryTask.life_state = 2

          this.showLoadingWrap1 = true
          this.showLoadingImg1 = true
          let queryTaskList = []

          // this.sourceArr.forEach((source)=>{
          //   let obj = {...queryTask}
          //   obj.sourceID = source
          //   queryTaskList.push(obj)
          // })

          if(this.sourceArr.length>0){
            this.sourceArr.forEach((source)=>{
              let obj = {...queryTask}
              obj.sourceID = source
              queryTaskList.push(obj)
            })
          }else{
            queryTaskList.push(queryTask)
          }

          let params = { page, pageAmount, queryTaskList: JSON.stringify(queryTaskList) }
          this.ajax(url, params, this.list1, this.scroll1, this.$refs.wrapper1_1, 1)

        }
        else if (process_taskStatus === "已审批") {
          // queryTask.point_state = [2, 3, 4]
          queryTask.life_state = 3

          let queryTask2 = {
            life_state: 4,
            sourceID: undefined,
          }
          this.showLoadingWrap2 = true
          this.showLoadingImg2 = true
          let queryTaskList = []

          // this.sourceArr.forEach((source)=>{
          //   let obj = {...queryTask}
          //   let obj2 = {...queryTask2}
          //   obj.sourceID = source
          //   obj2.sourceID = source
          //
          //   queryTaskList.push(obj)
          //   queryTaskList.push(obj2)
          // })

          if(this.sourceArr.length>0){
            this.sourceArr.forEach((source)=>{
              let obj = {...queryTask}
              let obj2 = {...queryTask2}
              obj.sourceID = source
              obj2.sourceID = source

              queryTaskList.push(obj)
              queryTaskList.push(obj2)
            })
          }else{
            queryTaskList.push(queryTask)
            queryTaskList.push(queryTask2)
          }


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
      createFlowNumParam(){
        let queryTask1 = {
          "life_state":2,
        }

        let queryTask2 = {
          "life_state":3,
        }

        let queryTask3 = {
          "life_state":4,
        }
        let checking = {
          name: 'checking',
          param: [queryTask1],
        }
        let pass = {
          name: 'pass',
          param: [queryTask2,queryTask3],
        }
        let queryList = []
        queryList = [checking, pass]
        return queryList
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