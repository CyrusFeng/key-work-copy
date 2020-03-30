<template>
    <div class="container">
        <div class="control">
            <c-tab :titlebar="titlebar1"
                   @update:currentIndex="getCurrentIndex1"
                   :currentIndex="currentIndex1"
                   :element.sync="element1" :show-num="false" class="tabs-out"></c-tab>
            <div class="statistics">
                <div class="swiper-container first-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="block-wrapper">
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'chairmanList',params:{timeType:0,source:0,taskStatus:0}}"

                                >
                                    <span class="num blue">{{sourceDSH.finished + sourceDSH.doing + sourceDSH.unfinished + sourceDSH.abolish || 0}}</span>
                                    <span class="des">本月工作</span>
                                </router-link>
                                <div class="line"
                                     style="height: 0.26rem; width: 0.01rem; background-color: #ccc;align-self: baseline;"></div>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'chairmanList',params:{timeType:0,source:0,taskStatus:1}}"

                                >
                                    <span class="num green">{{sourceDSH.finished || 0}}</span>
                                    <span class="des">本月已完成</span>
                                </router-link>
                                <div class="line"
                                     style="height: 0.26rem; width: 0.01rem; background-color: #ccc;align-self: baseline;"></div>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'chairmanList',params:{timeType:0,source:0,taskStatus:2}}"

                                >
                                    <span class="num cyan">{{sourceDSH.doing || 0}}</span>
                                    <span class="des">本月推进中</span>
                                </router-link>
                                <div class="line"
                                     style="height: 0.26rem; width: 0.01rem; background-color: #ccc;align-self: baseline;"></div>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'chairmanList',params:{timeType:0,source:0,taskStatus:3}}"

                                >
                                    <span class="num orange">{{sourceDSH.unfinished || 0}}</span>
                                    <span class="des">未完成</span>
                                </router-link>

                            </div>

                        </div>
                        <div class="swiper-slide">
                            <div class="block-wrapper">
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'chairmanList',params:{timeType:0,source:1,taskStatus:0}}"

                                >
                                    <span class="num blue">{{sourceZWH.finished + sourceZWH.doing + sourceZWH.unfinished + sourceZWH.abolish || 0}}</span>
                                    <span class="des">本月工作</span>
                                </router-link>
                                <div class="line"
                                     style="height: 0.26rem; width: 0.01rem; background-color: #ccc;align-self: baseline;"></div>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'chairmanList',params:{timeType:0,source:1,taskStatus:1}}"

                                >
                                    <span class="num green">{{sourceZWH.finished || 0}}</span>
                                    <span class="des">本月已完成</span>
                                </router-link>
                                <div class="line"
                                     style="height: 0.26rem; width: 0.01rem; background-color: #ccc;align-self: baseline;"></div>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'chairmanList',params:{timeType:0,source:1,taskStatus:2}}"

                                >
                                    <span class="num cyan">{{sourceZWH.doing || 0}}</span>
                                    <span class="des">本月推进中</span>
                                </router-link>
                                <div class="line"
                                     style="height: 0.26rem; width: 0.01rem; background-color: #ccc;align-self: baseline;"></div>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'chairmanList',params:{timeType:0,source:1,taskStatus:3}}"

                                >
                                    <span class="num orange">{{sourceZWH.unfinished || 0}}</span>
                                    <span class="des">未完成</span>
                                </router-link>

                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="block-wrapper">
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'chairmanList',params:{timeType:0,source:2,taskStatus:0}}"
                                        @click.native="$store.commit('setTaskType','sign')"
                                >
                                    <span class="num blue">{{sign.finished + sign.doing + sign.unfinished + sign.abolish || 0}}</span>
                                    <span class="des">本月工作</span>
                                </router-link>
                                <div class="line"
                                     style="height: 0.26rem; width: 0.01rem; background-color: #ccc;align-self: baseline;"></div>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'chairmanList',params:{timeType:0,source:2,taskStatus:1}}"
                                        @click.native="$store.commit('setTaskType','sign')"
                                >
                                    <span class="num green">{{sign.finished || 0}}</span>
                                    <span class="des">本月已完成</span>
                                </router-link>
                                <div class="line"
                                     style="height: 0.26rem; width: 0.01rem; background-color: #ccc;align-self: baseline;"></div>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'chairmanList',params:{timeType:0,source:2,taskStatus:2}}"
                                        @click.native="$store.commit('setTaskType','sign')"
                                >
                                    <span class="num cyan">{{sign.doing || 0}}</span>
                                    <span class="des">本月推进中</span>
                                </router-link>
                                <div class="line"
                                     style="height: 0.26rem; width: 0.01rem; background-color: #ccc;align-self: baseline;"></div>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'chairmanList',params:{timeType:0,source:2,taskStatus:3}}"
                                        @click.native="$store.commit('setTaskType','sign')"
                                >
                                    <span class="num orange">{{sign.unfinished || 0}}</span>
                                    <span class="des">未完成</span>
                                </router-link>

                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="block-wrapper">
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'chairmanList',params:{timeType:0,source:3,taskStatus:0}}"

                                >
                                    <span class="num blue">{{monthAll.finished+monthAll.doing+monthAll.unfinished+monthAll.abolish || 0}}</span>
                                    <span class="des">本月工作</span>
                                </router-link>
                                <div class="line"
                                     style="height: 0.26rem; width: 0.01rem; background-color: #ccc;align-self: baseline;"></div>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'chairmanList',params:{timeType:0,source:3,taskStatus:1}}"

                                >
                                    <span class="num green">{{monthAll.finished || 0}}</span>
                                    <span class="des">本月已完成</span>
                                </router-link>
                                <div class="line"
                                     style="height: 0.26rem; width: 0.01rem; background-color: #ccc;align-self: baseline;"></div>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'chairmanList',params:{timeType:0,source:3,taskStatus:2}}"

                                >
                                    <span class="num cyan">{{monthAll.doing || 0}}</span>
                                    <span class="des">本月推进中</span>
                                </router-link>
                                <div class="line"
                                     style="height: 0.26rem; width: 0.01rem; background-color: #ccc;align-self: baseline;"></div>
                                <router-link
                                        class="block"
                                        tag="div"
                                        :to="{name:'chairmanList',params:{timeType:0,source:3,taskStatus:3}}"

                                >
                                    <span class="num orange">{{monthAll.unfinished || 0}}</span>
                                    <span class="des">未完成</span>
                                </router-link>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="block echarts">
                <c-tab :titlebar="titlebar2"
                       @update:currentIndex="getCurrentIndex2"
                       :currentIndex="currentIndex2"
                       :element.sync="element2" :show-num="false" class="tabs-out"></c-tab>


                <div class="swiper-container second-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="chart-wrap" style="background-color: #fff">
                                <div id="myChart1" ref="myChart1"
                                     style="margin:0 auto;width: 0.9rem;height: 0.9rem;"></div>
                                <div class="desc-wrap">
                                    <p class="desc">{{monthAll.finished+monthAll.doing+monthAll.unfinished||0}}项</p>
                                </div>
                            </div>
                            <div class="legend-wrap">
                                <div>
                                    <span class="spot" style="background-color: #25B082"></span>
                                    <span>已完成{{monthAll.finished||0}}</span>
                                </div>
                                <div>
                                    <span class="spot" style="background-color: #FDB22F"></span>
                                    <span>推进中{{monthAll.doing||0}}</span>
                                </div>
                                <div>
                                    <span class="spot" style="background-color: #F56327"></span>
                                    <span>未完成{{monthAll.unfinished||0}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="chart-wrap" style="background-color: #fff">
                                <div id="myChart2" ref="myChart2"
                                     style="margin:0 auto;width: 0.9rem;height: 0.9rem;"></div>
                                <div class="desc-wrap">
                                    <p class="desc">{{yearAll.finished+yearAll.doing+yearAll.unfinished||0}}项</p>
                                </div>
                            </div>
                            <div class="legend-wrap">
                                <div>
                                    <span class="spot" style="background-color: #25B082"></span>
                                    <span>已完成{{yearAll.finished||0}}</span>
                                </div>
                                <div>
                                    <span class="spot" style="background-color: #FDB22F"></span>
                                    <span>推进中{{yearAll.doing||0}}</span>
                                </div>
                                <div>
                                    <span class="spot" style="background-color: #F56327"></span>
                                    <span>未完成{{yearAll.unfinished||0}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block entry">
                <div class="title">功能入口</div>
                <div class="entry-wrap">
                    <router-link
                            class="item-wrap"
                            tag="div"
                            :to="{name:'chairmanList',params:{timeType:1,source:0,taskStatus:0}}"

                    >
                        <div class="item">
                            <div class="top">
                                <!--<span>全年工作</span>-->
                                <span>全部工作</span>
                                <span class="icon"></span>
                            </div>
                            <div class="bottom">
                                <!--<span>查看全年工作</span>-->
                                <span>查看全部工作</span>
                            </div>
                        </div>
                        <div class="img">
                            <img src="../../assets/chairman/全部工作.png" alt="">
                        </div>
                    </router-link>
                    <!--<div class="item-wrap">-->
                    <!--<div class="item">-->
                    <!--<div class="top">-->
                    <!--<span>全部工作</span>-->
                    <!--<span class="icon"></span>-->
                    <!--</div>-->
                    <!--<div class="bottom">-->
                    <!--<span>查看全部工作</span>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--<div class="img">-->
                    <!--<img src="../../assets/chairman/全部工作.png" alt="">-->
                    <!--</div>-->
                    <!--</div>-->

                    <div class="line"></div>
                    <router-link
                            class="item-wrap"
                            tag="div"
                            :to="{name:'tempAdd',params:{}}"

                    >
                        <div class="item">
                            <div class="top">
                                <span>临时下发</span>
                                <span class="icon"></span>
                            </div>
                            <div class="bottom">
                                <span>新增下发工作</span>
                            </div>
                        </div>
                        <div class="img">
                            <img src="../../assets/chairman/临时下发.png" alt="">
                        </div>
                    </router-link>
                    <!--<div class="item-wrap">-->
                    <!---->
                    <!--</div>-->
                </div>
                <div class="entry-wrap">
                    <router-link
                            class="item-wrap"
                            tag="div"
                            :to="{name:'process-center-cm',params:{}}"

                    >
                        <div class="item">
                            <div class="top">
                                <span>流程中心</span>
                                <span class="icon"></span>
                            </div>
                            <div class="bottom">
                                <span>查看审批流程</span>
                            </div>
                        </div>
                        <div class="img">
                            <img src="../../assets/chairman/流程.png" alt="">
                        </div>
                    </router-link>
                    <div class="line"></div>
                    <router-link class="item-wrap"
                                 tag="div"
                                 :to="{name:'ranking',params:{}}"
                                 @click.native="">
                        <div class="item">
                            <div class="top">
                                <span>排行查看</span>
                                <span class="icon"></span>
                            </div>
                            <div class="bottom">
                                <span>重点工作排行</span>
                            </div>
                        </div>
                        <div class="img">
                            <img src="../../assets/chairman/排行查看.png" alt="">
                        </div>
                    </router-link>
                    <!--<div class="item-wrap">-->
                        <!--<div class="item">-->
                            <!--<div class="top">-->
                                <!--<span>排行查看</span>-->
                                <!--<span class="icon"></span>-->
                            <!--</div>-->
                            <!--<div class="bottom">-->
                                <!--<span>重点工作排行</span>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="img">-->
                            <!--<img src="../../assets/chairman/排行查看.png" alt="">-->
                        <!--</div>-->
                    <!--</div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import tabs from '../public/Tabs'
  import util from '../../util'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import axios from 'axios'

  const echarts = require('echarts/lib/echarts');
  // 引入柱状图等
  require("echarts/lib/chart/pie");

  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require("echarts/lib/component/dataZoom");
  require("echarts/lib/component/markPoint");
  require("echarts/lib/component/markLine");

  const titlebar1 = [
    {
      name: '董事会'
    },
    {
      name: '执委会'
    },
    {
      name: '我下发的'
    },
    {
      // name: '全部'
      name: '全部来源'
    }
  ]
  const titlebar2 = [
    {
      name: '本月'
    },
    {
      name: '全部'
    },
  ]
  export default {
    name: "chairmanIndex",
    components: {
      'c-tab': tabs,
    },
    data() {
      return {
        titlebar1,
        titlebar2,
        detailSwiper1: null,
        detailSwiper2: null,
        currentIndex1: 0,
        currentIndex2: 0,
        element1: null,
        element2: null,
        openId: '',
        avatar: '',
        name: '',
        charge: {},
        sign: {},
        sourceDSH: {},
        sourceZWH: {},
        monthAll: {},//本月
        yearAll: {},//本年
        myChart1: {},
        myChart2: {},
        option1: {
          title: {
            text: '',
            textStyle: {
              color: 'red'
            }
          },
          tooltip: {
            trigger: 'item',
            //formatter: '{a} <br/>{b}: {c}<br/>百分比：{d}%'
            formatter: '{b}: {c} ({d}%)',
            position: ['50%', '50%']
          },

          //外层的环的配置，此处无关紧要，仅供参考
          series: [
            {
              name: '重点工作',
              type: 'pie',
              selectedMode: false,
              radius: ['70%', '100%'],
              hoverAnimation: false,
              hoverOffset: 0,
              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              // color: ['#FD8652','#25B082','#4DC5BA'],
              color: ['#25B082', '#FDB22F', '#F56327'],
              data: [
                { value: 1, name: '已完成' },
                { value: 2, name: '推进中' },
                { value: 3, name: '未完成' },
              ]
            }
          ]
        },
        option2: {
          title: {
            text: '',
            textStyle: {
              color: 'red'
            }
          },
          tooltip: {
            trigger: 'item',
            //formatter: '{a} <br/>{b}: {c}<br/>百分比：{d}%'
            formatter: '{b}: {c} ({d}%)',
            position: ['50%', '50%']
          },

          series: [
            {
              name: '重点工作',
              type: 'pie',
              // selectedMode: 'single',
              selectedMode: false,
              radius: ['70%', '100%'],
              hoverAnimation: false,
              hoverOffset: 0,
              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              // color: ['#FD8652','#25B082','#4DC5BA'],
              color: ['#25B082', '#FDB22F', '#F56327'],
              data: [
                { value: 1, name: '已完成' },
                { value: 2, name: '推进中' },
                { value: 3, name: '未完成' },
              ]
            }
          ]
          //外层的环的配置，此处无关紧要，仅供参考

        }
      }
    },
    beforeRouteEnter(to, from, next) {
      qing.call('setWebViewTitle',{'title':'首页'})

      next((vm) => {

        vm.detailSwiper1 = new Swiper('.first-container', {
          pagination: {
            el: '.swiper-pagination'
          },
          on: {
            slideChangeTransitionStart: function () {
              console.log(vm.detailSwiper1.activeIndex)
              vm.currentIndex1 = vm.detailSwiper1.activeIndex
            }
          },
        })
        vm.detailSwiper2 = new Swiper('.second-container', {
          pagination: {
            el: '.swiper-pagination'
          },
          on: {
            slideChangeTransitionStart: function () {
              console.log(vm.detailSwiper2.activeIndex)
              vm.currentIndex2 = vm.detailSwiper2.activeIndex
            }
          },
        })

        let today = new Date()
        let rangeCurrentMonth = [util.getFirstDateOfMonthHMS(today), util.getLastDateOfMonthHMS(today)]
        // let rangeCurrentYear = [util.getFirstDateOfYearHMS(today), util.getLastDateOfYearHMS(today)]
        let rangeCurrentYear = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']


        // let getNumURL = vm.$url + "/taskSystem/task/statusNum"
        let getNumURL = "http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/statusNum"

        // axios.get(getNumURL, {
        //   params: {
        //     openIDStr: vm.$store.state.openID,
        //     rangeStr: rangeCurrentMonth.join(',')
        //   }
        // })
        //   .then((response) => {
        //     // alert("getNumURL调用成功")
        //     console.log(response.data)
        //     if (response.data.result.length > 0) {
        //       let data = response.data.result[0]
        //       vm.sign = data.dispatch
        //     }
        //   })
        axios.get(getNumURL, {
          params: {
            sourceStr: '1,3,7',
            rangeStr: rangeCurrentMonth.join(',')
          }
        })
          .then((response) => {
            // alert("getNumURL调用成功")
            console.log(response.data)
            if (response.data.result.length > 0) {
              response.data.result.forEach((item) => {
                if (item.sourceId === '1') {
                  vm.sourceDSH = item.all
                }
                if (item.sourceId === '3') {
                  vm.sourceZWH = item.all
                }
                if (item.sourceId === '7') {
                  vm.sign = item.all
                }
              })
            }
          })
        //'http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getNum'
        axios.get(getNumURL, {
          params: {
            rangeStr: rangeCurrentMonth.join(',')
          }
        })
          .then((response) => {
            // alert("getNumURL调用成功")
            console.log(response.data)
            if (response.data.result.length > 0) {
              vm.monthAll = response.data.result[0].all
              vm.option1.series[0].data[0].value = vm.monthAll.finished
              vm.option1.series[0].data[1].value = vm.monthAll.doing
              vm.option1.series[0].data[2].value = vm.monthAll.unfinished
              vm.myChart1 = echarts.init(vm.$refs.myChart1);
              vm.myChart1.setOption(vm.option1);
            }
          }).catch(() => {
          vm.option1.series[0].data[0].value = 0
          vm.option1.series[0].data[1].value = 0
          vm.option1.series[0].data[2].value = 0
          vm.myChart1 = echarts.init(vm.$refs.myChart1);
          vm.myChart1.setOption(vm.option1);
        })
        axios.get(getNumURL, {
          params: {
            rangeStr: rangeCurrentYear.join(',')
          }
        })
          .then((response) => {
            // alert("getNumURL调用成功")
            console.log(response.data)
            if (response.data.result.length > 0) {
              vm.yearAll = response.data.result[0].all
              vm.option2.series[0].data[0].value = vm.yearAll.finished
              vm.option2.series[0].data[1].value = vm.yearAll.doing
              vm.option2.series[0].data[2].value = vm.yearAll.unfinished
              vm.myChart2 = echarts.init(vm.$refs.myChart2);
              vm.myChart2.setOption(vm.option2);
            }
          }).catch(() => {
          vm.option2.series[0].data[0].value = 0
          vm.option2.series[0].data[1].value = 0
          vm.option2.series[0].data[2].value = 0
          vm.myChart2 = echarts.init(vm.$refs.myChart2);
          vm.myChart2.setOption(vm.option2);
        })
      })
    },
    mounted() {
      this.myChart1 = echarts.init(this.$refs.myChart1);
      this.myChart1.setOption(this.option1);
      this.myChart2 = echarts.init(this.$refs.myChart2);
      this.myChart2.setOption(this.option2);
    },
    beforeRouteLeave(to, from, next) {
      if (to.name !== 'index') {
        next()
      }
    },
    methods: {
      getCurrentIndex1(e) {
        this.currentIndex1 = e;
        this.detailSwiper1.slideTo(this.currentIndex1);
        console.log('e', e)
      },
      getCurrentIndex2(e) {
        this.currentIndex2 = e;
        this.detailSwiper2.slideTo(this.currentIndex2);
        console.log('e', e)
      }
    }
  }
</script>

<style scoped lang="scss">
    .container {
        height: 100%;
        overflow: auto;
        background-image: linear-gradient(-156deg, #367be7 49%, #5394f8 100%);
    }

    .control {
        margin: 0.1rem 0.12rem 0;
        border-radius: 0.08rem;
        overflow: hidden;
        /*background-color: #F2F6F9;*/
        /*box-shadow: 0 0.03rem 0.03rem 0 #e3eef5;*/
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
                    padding: 0 0.3rem;
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
                            font-size: 0.32rem;
                            color: #ffffff;
                            line-height: 1;
                            &.blue {
                                color: #4186ef;
                            }
                            &.green {
                                color: #16b181;
                            }
                            &.cyan {
                                color: #FDB22F;
                            }
                            &.orange {
                                color: #f55c10;
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
        > .block {
            margin-top: 0.1rem;
            box-shadow: 0 7px 6px 0 #2972e0;
            border-radius: 8px;
            overflow: hidden;
            background-color: #fff;
            &.echarts {
                & ::v-deep .tab-title-wrap {
                    .tab-title {
                        justify-content: center;
                    }
                }
            }
            .chart-wrap {
                margin-top: 0.1rem;
                position: relative;
                .desc-wrap {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    .desc {
                        font-size: 0.15rem;
                        color: #367be7;
                    }
                }
            }
            .legend-wrap {
                margin-top: 0.06rem;
                padding-bottom: 0.1rem;
                display: flex;
                justify-content: space-around;
                align-items: center;
                > div {
                    span.spot {
                        margin-right: 0.04rem;
                        display: inline-block;
                        width: 0.09rem;
                        height: 0.09rem;
                        border-radius: 50%;
                    }
                    span {
                        font-size: 0.11rem;
                        color: #999999;
                    }
                }
            }

        }
        .entry {
            .title {
                padding: 0.1rem 0 0.1rem 0;
                text-align: center;
                font-size: 0.12rem;
                color: #4186ef;
            }
            .entry-wrap {
                padding: 0.2rem 0;
                margin: 0 0.14rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .item-wrap {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    .item {
                        .top {
                            span {
                                font-size: 0.14rem;
                                color: #3f3f3f;
                            }
                            .icon {
                                margin-left: 0.1rem;
                                display: inline-block;
                                width: 0.04rem;
                                height: 0.08rem;
                                background: url("../../assets/right1.png") no-repeat;
                                background-size: contain;
                            }
                        }
                        .bottom {
                            margin-top: 0.12rem;
                            span {
                                font-size: 0.11rem;
                                color: #999999;
                            }
                        }
                    }
                    .img {
                        margin-left: 0.2rem;
                        width: 0.54rem;
                        height: 0.6rem;
                        img {
                            width: 100%;

                        }
                    }
                }
                .line {
                    display: inline-flex;
                    width: 0.01rem;
                    height: 0.48rem;
                    /*align-self: baseline;*/
                    background-color: #ddd;
                }
                &:last-child {
                    border-top: 0.01rem solid #ddd;
                }
            }

        }
    }

</style>