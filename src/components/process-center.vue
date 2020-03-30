<template>
    <div style="height: 100%">
        <header>
            <change-btn :titleData="btnTitle"
                        @update:currentIndex="getCurrentIndex1($event)"
                        :currentIndex="btnCurrentIndex"></change-btn>
        </header>
        <div class="swiper-container first-container swiper-no-swiping">
            <div class="swiper-wrapper">
                <div class="swiper-slide" ref="wrapper1">
                    <div class="parent-tabwrap">
                        <c-tab :titlebar="titlebar1"
                               @update:currentIndex="getCurrentIndex2($event)"
                               :currentIndex="tabCurrentIndex1" :show-num="true"></c-tab>
                    </div>

                    <div class="swiper-container second-container swiper-no-swiping">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="list-wrap" ref="wrapper1_1">
                                    <ul class="task">
                                        <router-link tag="li"
                                                     :to="{name:'processdetail',params:{detailObj:JSON.stringify(item),canWrite:true}}"
                                                     v-for="item in list1" :key="item.id">
                                            <div class="head">
                                                <div class="title">
                                                    {{item.projectName}}
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
                                                    <!--<p v-if="judgeTarget(item) === 0">-->
                                                    <!--<span>待审批</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="judgeTarget(item) === 1">-->
                                                    <!--<span>审批中</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="judgeTarget(item) === 2">-->
                                                    <!--<span>通过</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="judgeTarget(item) === 3">-->
                                                    <!--<span>未通过</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="judgeTarget(item) === 4">-->
                                                    <!--<span>被退回</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 0">-->
                                                    <!--<span>待审批</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 1">-->
                                                    <!--<span>审批中</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="item.lifePointList && item.lifePointList[item.lifePointList.length-1] && item.lifePointList[item.lifePointList.length-1].state === 2">-->
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
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="list-wrap" ref="wrapper1_2">
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
                                                    <!--<p v-if="judgeTarget(item) === 0">-->
                                                    <!--<span>待审批</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="judgeTarget(item) === 1">-->
                                                    <!--<span>审批中</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="judgeTarget(item) === 2">-->
                                                    <!--<span>通过</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="judgeTarget(item) === 3">-->
                                                    <!--<span>未通过</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="judgeTarget(item) === 4">-->
                                                    <!--<span>被退回</span>-->
                                                    <!--</p>-->
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
                                </div>
                            </div>
                            <!--<div class="swiper-slide">-->
                            <!--<div class="list-wrap" ref="wrapper1_3">-->
                            <!--<ul class="task">-->
                            <!--<router-link tag="li"-->
                            <!--:to="{name:'rejectretry',params:{detailObj:JSON.stringify(item),canWrite:false}}"-->
                            <!--v-for="item in list5" :key="item.id">-->
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
                            <!--<Loading :showloadingwrap="showLoadingWrap5"-->
                            <!--:showloadingimg="showLoadingImg5"></Loading>-->
                            <!--</div>-->
                            <!--</div>-->
                        </div>
                    </div>
                </div>
                <div class="swiper-slide" ref="wrapper2">
                    <div class="parent-tabwrap">
                        <c-tab :titlebar="titlebar2"
                               @update:currentIndex="getCurrentIndex3($event)"
                               :currentIndex="tabCurrentIndex2" :show-num="true"></c-tab>
                    </div>

                    <div class="swiper-container third-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="list-wrap" ref="wrapper2_1">
                                    <ul class="task">
                                        <router-link tag="li"
                                                     :to="{name:'processdetail',params:{detailObj:JSON.stringify(item),canWrite:false}}"
                                                     v-for="item in list3" :key="item.id">
                                            <div class="head">
                                                <div class="title">
                                                    {{item.projectName}}
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
                                                    <!--<p v-if="judgeTarget(item) === 0">-->
                                                    <!--<span>待审批</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="judgeTarget(item) === 1">-->
                                                    <!--<span>审批中</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="judgeTarget(item) === 2">-->
                                                    <!--<span>通过</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="judgeTarget(item) === 3">-->
                                                    <!--<span>未通过</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="judgeTarget(item) === 4">-->
                                                    <!--<span>被退回</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 0">-->
                                                    <!--<span>待审批</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="item.lifePointList && item.lifePointList[0] && item.lifePointList[0].state === 1">-->
                                                    <!--<span>审批中</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="item.lifePointList && item.lifePointList[item.lifePointList.length-1] && item.lifePointList[item.lifePointList.length-1].state === 2">-->
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
                                        <div v-if="showLoadingWrap3">
                                            <Loading :showloadingwrap="showLoadingWrap3"
                                                     :showloadingimg="showLoadingImg3"></Loading>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="list-wrap" ref="wrapper2_2">
                                    <ul class="task">
                                        <router-link tag="li"
                                                     :to="{name:'processdetail',params:{detailObj:JSON.stringify(item),canWrite:false}}"
                                                     v-for="item in list4" :key="item.id">
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
                                                    <!--<p v-if="judgeTarget(item) === 0">-->
                                                    <!--<span>待审批</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="judgeTarget(item) === 1">-->
                                                    <!--<span>审批中</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="judgeTarget(item) === 2">-->
                                                    <!--<span>通过</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="judgeTarget(item) === 3">-->
                                                    <!--<span>未通过</span>-->
                                                    <!--</p>-->
                                                    <!--<p v-if="judgeTarget(item) === 4">-->
                                                    <!--<span>被退回</span>-->
                                                    <!--</p>-->
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
                                        <div v-if="showLoadingWrap4">
                                            <Loading :showloadingwrap="showLoadingWrap4"
                                                     :showloadingimg="showLoadingImg4"></Loading>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
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
      name: '我审批的',
    },
    {
      name: '我负责的'
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
      name: '审批中',
      num: 0
    },
    {
      name: '已审批',
      num: 0
    }
  ]
  export default {
    name: "process-center",
    components: {},
    data() {
      return {
        btnTitle,
        titlebar1,
        titlebar2,
        detailSwiper1: null,
        detailSwiper2: null,
        detailSwiper3: null,
        btnCurrentIndex: 0,
        tabCurrentIndex1: 0,
        tabCurrentIndex2: 0,
        showLoadingWrap1: false,
        showLoadingWrap2: false,
        showLoadingWrap3: false,
        showLoadingWrap4: false,
        // showLoadingWrap5: false,
        showLoadingImg1: false,
        showLoadingImg2: false,
        showLoadingImg3: false,
        showLoadingImg4: false,
        // showLoadingImg5: false,
        list1: [],
        list2: [],
        list3: [],
        list4: [],
        // list5: [],
        scroll1: null,
        scroll2: null,
        scroll3: null,
        scroll4: null,
        // scroll5: null,
        openId: '',
        process_taskType: '',
        process_taskStatus: '',
        charge: {},
        approve: {}
      }
    },
    watch: {
      btnCurrentIndex() {
        this.$store.commit('setCurrentBtnIndex', this.btnCurrentIndex)
        // if(this.btnCurrentIndex === 1){
        //   if(!this.$store.getters.currentTabIndex2){
        //     this.$store.commit('setCurrentTabIndex2', 0)
        //   }
        // }



        if (this.btnCurrentIndex === 1 && this.tabCurrentIndex2 === 0) {
          if (!this.showLoadingWrap3 && this.list3.length === 0) {
            this.loadData(this.$store.getters.openID, 'charge', '审批中', 1, 10)

          }
        } else if (this.btnCurrentIndex === 1 && this.tabCurrentIndex2 === 1) {
          if (!this.showLoadingWrap4 && this.list4.length === 0) {
            this.loadData(this.$store.getters.openID, 'charge', '已审批', 1, 10)
          }
        }

        if (this.btnCurrentIndex === 0 && this.tabCurrentIndex1 === 0) {
          if (!this.showLoadingWrap1 && this.list1.length === 0) {
            this.loadData(this.$store.getters.openID, 'approval', '审批中', 1, 10)
          }
        } else if (this.btnCurrentIndex === 0 && this.tabCurrentIndex1 === 1) {
          if (!this.showLoadingWrap2 && this.list2.length === 0) {
            this.loadData(this.$store.getters.openID, 'approval', '已审批', 1, 10)
          }
        }
        // else if (this.btnCurrentIndex === 0 && this.tabCurrentIndex1 === 2) {
        //   if (!this.showLoadingWrap5 && this.list5.length === 0) {
        //     this.loadData(this.$store.state.openID, 'charge', '被退回', 1, 10)
        //   }
        // }
      },
      tabCurrentIndex1() {
        this.$store.commit('setCurrentTabIndex', this.tabCurrentIndex1)

        if (this.tabCurrentIndex1 === 1) {
          if (!this.showLoadingWrap2 && this.list2.length === 0) {
            this.loadData(this.$store.getters.openID, 'approval', '已审批', 1, 10)
          }
        } else if (this.tabCurrentIndex1 === 0) {
          if (!this.showLoadingWrap1 && this.list1.length === 0) {
            this.loadData(this.$store.getters.openID, 'approval', '审批中', 1, 10)
          }
        }
        // else if (this.tabCurrentIndex1 === 2) {
        //   if (!this.showLoadingWrap5 && this.list5.length === 0) {
        //     this.loadData(this.$store.state.openID, 'charge', '被退回', 1, 10)
        //   }
        // }
      },
      tabCurrentIndex2() {
        this.$store.commit('setCurrentTabIndex', this.tabCurrentIndex2)

        if (this.tabCurrentIndex2 === 1) {
          if (!this.showLoadingWrap4 && this.list4.length === 0) {
            this.loadData(this.$store.getters.openID, 'charge', '已审批', 1, 10)
          }
        } else if (this.tabCurrentIndex2 === 0) {
          if (!this.showLoadingWrap3 && this.list3.length === 0) {
            this.loadData(this.$store.getters.openID, 'charge', '审批中', 1, 10)
          }
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      qing.call('setWebViewTitle', { 'title': '流程中心' })

      next(vm => {
        if (from.name === 'index') {
          let { process_taskType, process_taskStatus } = vm.$route.params
          vm.process_taskType = process_taskType
          vm.process_taskStatus = process_taskStatus
          console.log('process_taskType', process_taskType)

          // if (vm.process_taskType) {
          //   localStorage.setItem('process_taskType', vm.process_taskType)
          // }
          // if (vm.process_taskStatus) {
          //   localStorage.setItem('process_taskStatus', vm.process_taskStatus)
          // }

          if (vm.process_taskType === 'approval') {
            vm.$store.commit('setCurrentBtnIndex', 0)

          } else if (vm.process_taskType === 'charge') {
            vm.$store.commit('setCurrentBtnIndex', 1)
          }
          vm.$store.commit('setCurrentTabIndex', 0)


        }
        else {
          vm.btnCurrentIndex = vm.$store.getters.currentBtnIndex

          if(vm.btnCurrentIndex === 0){
            vm.process_taskType = 'approval'
            vm.tabCurrentIndex1 = vm.$store.getters.currentTabIndex
          }else{
            vm.process_taskType = 'charge'
            vm.tabCurrentIndex2 = vm.$store.getters.currentTabIndex
          }
          if(vm.$store.getters.currentTabIndex === 0){
            vm.process_taskStatus = '审批中'
          }else{
            vm.process_taskStatus = '已审批'
          }
        }
        vm.detailSwiper1 = new Swiper('.first-container', {
          on: {
            slideChangeTransitionStart: () => {
              vm.btnCurrentIndex = vm.detailSwiper1.activeIndex
            }
          },
        })
        vm.detailSwiper2 = new Swiper('.second-container', {
          on: {
            slideChangeTransitionStart: () => {
              vm.tabCurrentIndex1 = vm.detailSwiper2.activeIndex
              console.log(vm.tabCurrentIndex1)
            }
          },
        })
        vm.detailSwiper3 = new Swiper('.third-container', {
          on: {
            slideChangeTransitionStart: () => {
              vm.tabCurrentIndex2 = vm.detailSwiper3.activeIndex
            }
          },
        })

        vm.detailSwiper1.slideTo(vm.btnCurrentIndex);

        if (vm.btnCurrentIndex === 0) {
          vm.detailSwiper2.slideTo(vm.tabCurrentIndex1);
        } else {
          vm.detailSwiper3.slideTo(vm.tabCurrentIndex2);
        }

        // vm.$store.commit('setCurrentTabIndex', vm.taskStatus)



        // let getNumURL = vm.$url + "/taskSystem/task/flowNum"
        // axios.get(getNumURL, {
        //   params: {
        //     openIDStr: vm.$store.state.openID,
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
        //       vm.titlebar2[0].num = vm.charge.checking
        //       vm.titlebar2[1].num = vm.charge.pass + vm.charge.back
        //       // vm.titlebar1[2].num = vm.charge.back
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
                    // "point_autoApprove":1
                  }
                ]
              },
              {
                "name":"done",
                "param":[
                  {
                    "point_state":[
                      2,
                      3,
                      4
                    ],
                    "point_approverID":vm.$store.getters.openID,
                    // "point_autoApprove":1
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
                    "life_state":2,
                    "chargerID":vm.$store.getters.openID,
                  }
                ]
              },
              {
                "name":"done",
                "param":[
                  {
                    "life_state":3,
                    "chargerID":vm.$store.getters.openID,
                  },
                  {
                    "life_state":4,
                    "chargerID":vm.$store.getters.openID,
                  }
                ]
              }
            ]),
          })
        })
          .then((response) => {
            vm.titlebar2[0].num = response.data.result.checking
            vm.titlebar2[1].num = response.data.result.done
          })

        vm.loadData(vm.$store.state.openID, vm.process_taskType, vm.process_taskStatus, 1, 10)
      })

    },
    methods: {
      getCurrentIndex1(e) {
        this.btnCurrentIndex = e;
        this.detailSwiper1.slideTo(e);
      },
      getCurrentIndex2(e) {
        console.log(e)
        this.tabCurrentIndex2 = 0;
        this.tabCurrentIndex1 = e;
        this.detailSwiper2.slideTo(e);
      },
      getCurrentIndex3(e) {
        this.tabCurrentIndex1 = 0;
        this.tabCurrentIndex2 = e;
        this.detailSwiper3.slideTo(e);
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
          case 3: {
            this.showLoadingWrap3 = true
            this.showLoadingImg3 = true
            break
          }
          case 4: {
            this.showLoadingWrap4 = true
            this.showLoadingImg4 = true
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
            if (response.data.result.amount > 0) {
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
                case 3: {
                  this.showLoadingWrap3 = false
                  this.showLoadingImg3 = false
                  break
                }
                case 4: {
                  this.showLoadingWrap4 = false
                  this.showLoadingImg4 = false
                  break
                }
                default: {
                  break
                }
              }

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

                  // lifelist.push(life)
                  list.push(life)
                })
              })

              // lifelist.forEach((item) => {
              //   list.push(item)
              // })

              if (scroll) {
                scroll.finishPullUp()
                scroll.refresh()
              }
              // list = lifelist.concat(list);
              this.$initScroll(scroll, wrapElement, (scroll) => {
                params.page += 1
                this.ajax(url, params, list, scroll, wrapElement, orderNum)
              })

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
                case 3: {
                  this.showLoadingWrap3 = true
                  this.showLoadingImg3 = false
                  break
                }
                case 4: {
                  this.showLoadingWrap4 = true
                  this.showLoadingImg4 = false
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
              case 3: {
                this.showLoadingWrap3 = true
                this.showLoadingImg3 = false
                break
              }
              case 4: {
                this.showLoadingWrap4 = true
                this.showLoadingImg4 = false
                break
              }
              default: {
                break
              }
            }
          })
      },
      loadData(openId, process_taskType, process_taskStatus, page, pageAmount) {
        console.log(openId, process_taskType, process_taskStatus, page, pageAmount)
        let queryTask = {
          point_state: undefined,
          chargerID: undefined,
          point_approverID: undefined,
        }
        let url = 'http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/flowList'
        // let url = this.$url + '/taskSystem/task/flowList'
        if (process_taskType === 'approval') {
          queryTask.chargerID = undefined
          queryTask.point_approverID = openId
          if (process_taskStatus === "审批中") {
            // queryTask.point_state = [1]

            queryTask.point_state = [1]


            this.showLoadingWrap1 = true
            this.showLoadingImg1 = true
            let queryTaskList = []
            queryTaskList.push(queryTask)
            let params = { page, pageAmount, queryTaskList: JSON.stringify(queryTaskList) }
            this.ajax(url, params, this.list1, this.scroll1, this.$refs.wrapper1_1, 1)

          }
          else if (process_taskStatus === "已审批") {
            // queryTask.point_state = [2, 3, 4]

            queryTask.point_state = [2, 3, 4]


            this.showLoadingWrap2 = true
            this.showLoadingImg2 = true
            let queryTaskList = []
            queryTaskList.push(queryTask)
            let params = { page, pageAmount, queryTaskList: JSON.stringify(queryTaskList) }
            this.ajax(url, params, this.list2, this.scroll2, this.$refs.wrapper1_2, 2)
          }
        }
        else if (process_taskType === 'charge') {
          queryTask.chargerID = openId
          queryTask.point_approverID = undefined
          if (process_taskStatus === "审批中") {
            queryTask.life_state = 2

            this.showLoadingWrap3 = true
            this.showLoadingImg3 = true
            let queryTaskList = []
            queryTaskList.push(queryTask)
            let params = { page, pageAmount, queryTaskList: JSON.stringify(queryTaskList) }
            this.ajax(url, params, this.list3, this.scroll3, this.$refs.wrapper2_1, 3)

          }
          else if (process_taskStatus === "已审批") {
            queryTask.life_state = 3

            this.showLoadingWrap4 = true
            this.showLoadingImg4 = true
            let queryTaskList = []
            let queryTask2 = {
              life_state: 4,
              chargerID: openId,
              point_approverID: undefined,
            }
            queryTaskList.push(queryTask)
            queryTaskList.push(queryTask2)

            let params = { page, pageAmount, queryTaskList: JSON.stringify(queryTaskList) }
            this.ajax(url, params, this.list4, this.scroll4, this.$refs.wrapper2_2, 4)
          }
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
      judgeTarget(item) {
        let state
        let len = item.lifePointList.length
        let lastPointState = item.lifePointList[item.lifePointList.length - 1].state
        if (lastPointState === 2 || lastPointState.state === 3) {
          state = lastPointState
        } else {
          for (let i = 0; i < len; i++) {
            if (item.lifePointList[i].state !== 2) {
              state = item.lifePointList[i].state
              break
            }
          }
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
            background: url("../assets/搜索.png") no-repeat !important;
            background-size: contain !important;
        }
    }

    .first-container {
        height: calc(100% - 0.46rem);
        .second-container, .third-container {
            height: calc(100% - 0.41rem);
            .swiper-wrapper {
                height: 100%;
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
                padding: 0.1rem 0 0.06rem 0;
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
            padding-bottom: 0.06rem;
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