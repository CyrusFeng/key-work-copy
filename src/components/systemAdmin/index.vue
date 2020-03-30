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
                                            :to="{name:'listSourceAdmin',params:{taskType:'charge',timeRange:0,taskStatus:0}}"
                                            @click.native="$store.commit('setTaskType','charge')"
                                    >
                                        <span class="num blue">{{item.charge.all || 0}}</span>
                                        <span class="des">本月工作</span>
                                    </router-link>
                                    <router-link
                                            class="block"
                                            tag="div"
                                            :to="{name:'listSourceAdmin',params:{taskType:'charge',timeRange:0,taskStatus:1}}"
                                            @click.native="$store.commit('setTaskType','charge')"
                                    >
                                        <span class="num green">{{item.charge.finished || 0}}</span>
                                        <span class="des">本月已完成</span>
                                    </router-link>
                                    <router-link
                                            class="block"
                                            tag="div"
                                            :to="{name:'listSourceAdmin',params:{taskType:'charge',timeRange:0,taskStatus:2}}"
                                            @click.native="$store.commit('setTaskType','charge')"
                                    >
                                        <span class="num cyan">{{item.charge.doing || 0}}</span>
                                        <span class="des">本月推进中</span>
                                    </router-link>
                                    <router-link
                                            class="block"
                                            tag="div"
                                            :to="{name:'listSourceAdmin',params:{taskType:'charge',timeRange:0,taskStatus:3}}"
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
                        :to="{name:'listSourceAdmin',params:{taskType:'charge',timeRange:0,taskStatus:0}}"
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
                        :to="{name:'tempAdd'}"
                >
                    <p>
                        <i class="icon"></i>
                        <span>工作新增</span>
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
                        class="btn4"
                        tag="div"
                        :to="{name:'settings'}"
                >
                    <p>
                        <i class="icon"></i>
                        <span>设置</span>
                    </p>
                </router-link>
            </div>
        </div>
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
    name: "system-admin-index",
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
        canLoadIndex: 0
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
      qing.call('setWebViewTitle', { 'title': '业务管理员首页' })


      next((vm) => {
        vm.sourceArr = vm.$store.getters.sourceIDs

        let getNumURL = vm.$url + "/taskSystem/task/getAmount"

        let queryListMonth = vm.$createQueryList(undefined, 'charge', 0)

        queryListMonth.forEach((query) => {
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
          if (response.data.success) {
            let data = response.data.result

            vm.titlebar[0].charge.all = data.all
            vm.titlebar[0].charge.finished = data.finished
            vm.titlebar[0].charge.doing = data.doing
            vm.titlebar[0].charge.unfinish = data.unfinish
          }
        })



        let queryListYear = vm.$createQueryList(undefined, 'charge', 1)
        queryListYear.forEach((query) => {
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
            if (response.data.success) {
              let data = response.data.result

              vm.titlebar[1].charge.all = data.all
              vm.titlebar[1].charge.finished = data.finished
              vm.titlebar[1].charge.doing = data.doing
              vm.titlebar[1].charge.unfinish = data.unfinish
            }
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
            }
        }
    }
</style>