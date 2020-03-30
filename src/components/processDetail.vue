<template>
    <div style="height: 100%">
        <div class="scroll-wrap" ref="wrapper" :class="{'hideBtn':hideBtn}">
            <div class="list-wrap">
                <div class="block field">
                    <div class="title-wrap">
                        <field-title :blueline-visible="false" :redstar-visible="false">
                            <span>{{detailObj.projectName}}</span>
                            <span class="reward" v-if="$showReward(detailObj.reward) && detailObj.type === 3">(+{{detailObj.reward}}分)</span>
                        </field-title>
                        <span class="status">{{getLifeType(detailObj.type)}}</span>
                    </div>
                    <div class="content" :class="{folded:!folded}">
                        <div class="row">
                            <div class="label">责任人</div>
                            <div class="right">{{$judgeUndefined(detailObj.chargerName)}}</div>
                        </div>
                        <div class="row">
                            <div class="label">工作来源</div>
                            <div class="right" v-if="detailObj.sourceList&&detailObj.sourceList[0]">
                                {{detailObj.sourceList[0].name}}
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">启动时间</div>
                            <div class="right">{{detailObj.starttime && detailObj.starttime.split(' ')[0]}}</div>
                        </div>
                        <div class="row">
                            <div class="label">完成时间</div>
                            <div class="right">{{detailObj.endtime && detailObj.endtime.split(' ')[0]}}</div>
                        </div>
                        <div class="row">
                            <div class="label">单位</div>
                            <div class="right">{{$judgeUndefined(detailObj.unitName)}}</div>
                        </div>
                        <div class="row">
                            <div class="label">签发人</div>
                            <div class="right">{{$judgeUndefined(detailObj.signerName)}}</div>
                        </div>
                        <div class="row">
                            <div class="label">协助人</div>
                            <div class="right">{{$judgeUndefined(detailObj.helperName)}}</div>
                        </div>
                        <!--<div class="row">-->
                        <!--<div class="label">变更次数</div>-->
                        <!--<div class="right">{{detailObj.changeTimes}}</div>-->
                        <!--</div>-->
                    </div>
                    <div class="bottom">
                        <div @click="folded = !folded">
                            <p v-if="folded">
                                <span>展开</span>
                                <i class="icon"></i>
                            </p>
                            <p v-else class="unfolded">
                                <span>收起</span>
                                <i class="icon"></i>
                            </p>
                        </div>
                    </div>
                </div>


                <!--<div class="block" v-if="detailObj.type === 1">-->
                <div class="block">
                    <div class="title-wrap">
                        <field-title :blueline-visible="true" :redstar-visible="false">现状及问题</field-title>
                    </div>
                    <div class="des-wrap">
                        <p class="des">{{detailObj.problem|| '暂无现状及问题'}}</p>
                    </div>
                </div>
                <!--<div class="block" v-if="detailObj.type === 1">-->
                <div class="block">
                    <div class="title-wrap">
                        <field-title :blueline-visible="true" :redstar-visible="false">实施方法</field-title>
                    </div>
                    <div class="des-wrap">
                        <p class="des">{{detailObj.ways|| '暂无实施方法'}}</p>
                    </div>
                </div>
                <!--<div class="block" v-if="detailObj.type === 1">-->
                <div class="block">
                    <div class="title-wrap">
                        <field-title :blueline-visible="true" :redstar-visible="false">预期目标</field-title>
                    </div>
                    <div class="des-wrap">
                        <p class="des">{{detailObj.aim|| '暂无预期目标'}}</p>
                    </div>
                </div>

                <div class="block" v-if="detailObj.type === 2">
                    <div class="title-wrap">
                        <field-title :blueline-visible="true" :redstar-visible="false">变更内容</field-title>
                    </div>
                    <div class="des-wrap">
                        <p class="des">{{change_info_string|| '暂无变更内容'}}</p>
                    </div>
                </div>
                <div class="block" v-if="detailObj.type === 2">
                    <div class="title-wrap">
                        <field-title :blueline-visible="true" :redstar-visible="false">变更原因</field-title>
                    </div>
                    <div class="des-wrap">
                        <p class="des">{{detailObj.change_reason || '暂无变更原因'}}</p>
                    </div>
                </div>
                <div class="block" v-if="detailObj.type === 3 && detailObj.done_type === 1">
                    <div class="title-wrap">
                        <div>
                            <field-title :blueline-visible="true" :redstar-visible="false">完结申请</field-title>
                        </div>
                        <span>完成</span>
                    </div>
                    <div class="des-wrap">
                        <p class="des">{{detailObj.done_info|| '暂无完结说明'}}</p>
                    </div>
                </div>
                <div class="block" v-if="detailObj.type === 3 && detailObj.done_type === 0">
                    <div class="title-wrap">
                        <div>
                            <field-title :blueline-visible="true" :redstar-visible="false">完结申请</field-title>
                        </div>
                        <span>未完成</span>
                    </div>
                    <div class="des-wrap">
                        <p class="des">任务现状：{{detailObj.done_going|| '暂无任务现状'}}</p>
                        <p class="des">完结原因：{{detailObj.done_reason|| '暂无完结原因'}}</p>
                    </div>
                </div>
                <div class="block" v-if="detailObj.type === 4">
                    <div class="title-wrap">
                        <field-title :blueline-visible="true" :redstar-visible="false">废止原因</field-title>
                    </div>
                    <div class="des-wrap">
                        <p class="des">{{detailObj.cancel_type===2?'客观原因：':'主观原因：'}}{{detailObj.cancel_reason ||
                            '暂无废止原因'}}</p>
                    </div>
                </div>
                <div class="block" v-if="detailObj.type === 5">
                    <div class="title-wrap">
                        <field-title :blueline-visible="true" :redstar-visible="false">反馈信息</field-title>
                    </div>
                    <div class="des-wrap">
                        <p class="des">{{detailObj.reply_info|| '暂无反馈信息'}}</p>
                    </div>
                </div>


                <!--<div class="block picture">-->
                <!--<div class="title-wrap">-->
                <!--<field-title :blueline-visible="true" :redstar-visible="false">附件</field-title>-->
                <!--<span class="sub-des">共{{urlObj.length}}张</span>-->
                <!--</div>-->
                <!--<div class="des-wrap images">-->
                <!--<div class="i1 pic-wrapper" v-for="item in urlObj" @click="onClickImage(item.url)">-->
                <!--<div class="img-wrap">-->
                <!--<img :src="item.url" class="picture" alt="">-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->


                <div class="block">
                    <div class="title-wrap">
                        <field-title :blueline-visible="false" :redstar-visible="false">审批信息</field-title>
                    </div>
                    <div class="des-wrap">
                        <div class="timeline">
                            <div class="tips" v-if="false">暂无审批信息</div>
                            <div class="item-wrap" v-else>
                                <div class="item" v-for="(item,index) in detailObj.lifePointList">
                                    <div class="top">
                                        <span class="status">{{item.approverName}}</span>
                                        <span class="date">{{judgePointStatus(detailObj.lifePointList,index) || getPointStatus(item.state)}}</span>
                                    </div>
                                    <div class="content-wrap">
                                        <!--<span>天荣营销公司总经理</span>-->
                                        <span>{{item.info}}</span>
                                    </div>
                                    <div class="bottom">
                                        <div class="charger">
                                            <span>{{item.approveTime}}</span>
                                            <!--<span>2019-12-12 </span>-->
                                            <!--<span>17:55:42</span>-->
                                        </div>
                                        <!--<div class="more">-->
                                        <!--<span>更多</span>-->
                                        <!--</div>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div class="rate-wrap"-->
                <!--v-if="$store.getters.currentRole===1 && detailObj.type === 3 && detailObj.done_type === 1 && detailObj.state === 2">-->
                <!--<div class="rate-wrap" v-if="$store.getters.currentRole === 1 && detailObj.type === 3 && detailObj.done_type === 1 && detailObj.state === 2">-->
                <!--<div class="title">-->
                <!--<span>卓越奖励</span>-->
                <!--</div>-->
                <!--<Rate v-model="val" :size="35"></Rate>-->
                <!--<p>此项工作结果成效卓越，超出预期，特给予加分奖励！</p>-->
                <!--</div>-->



                <div class="rate-wrap" v-if="showRate">
                    <div class="title">
                        <span>卓越奖励</span>
                    </div>
                    <Rate v-model="val" :size="35"></Rate>
                    <p>此项工作结果成效卓越，超出预期，特给予加分奖励！</p>
                </div>


                <div class="block approver" v-if="canWrite && $store.getters.currentRole!==4 && $store.getters.currentRole!==2">
                    <div class="title-wrap">
                        <div class="left">
                            <field-title :blueline-visible="false" :redstar-visible="false">审批信息</field-title>
                        </div>
                        <!--<div class="right" v-if="$store.getters.currentRole === 1 && detailObj.state === 2"-->
                             <!--@click="onClickToChooseApprover">-->
                        <div class="right" v-if="$store.getters.currentRole === 1 && detailObj.state === 2"
                             @click="visible = true">
                            <span>协办</span>
                        </div>
                    </div>
                    <div class="radio">
                        <c-radio :options="options" @value-change="radioOnChange($event)"></c-radio>
                    </div>
                    <div class="text">
                        <c-textarea default-value=""
                                    remark=""
                                    tips="点击输入相关说明……………."
                                    @update:inputValue="info = $event"></c-textarea>
                    </div>
                </div>


                <div class="rate-wrap" v-if="$showReward(detailObj.reward) && detailObj.type === 3 && detailObj.state === 3">
                    <div class="title">
                        <span>卓越奖励</span>
                    </div>
                    <Rate v-model="detailObj.reward" :size="35" :read-only="true"></Rate>
                    <p>此项工作结果成效卓越，超出预期，特给予加分奖励！</p>
                </div>

            </div>
        </div>
        <div class="button-wrap" v-if="canWrite && $store.getters.currentRole!==4 && $store.getters.currentRole!==2">
            <div class="btn2" @click="onClickToApproval">
                <span>发送</span>
            </div>
        </div>
        <!--系统管理员和业务管理员才有 重定位和废止 流程的功能-->
        <div class="button-wrap" v-if="($store.getters.currentRole===4 || $store.getters.currentRole===2) && canSet">
            <div class="btn1" @click="onClickToRelocation">
                <span>重定位</span>
            </div>
            <div class="btn2" @click="onClickToAbolish">
                <span>废止</span>
            </div>
        </div>
        <image-panel :url="imageUrl" :showImagePanel.sync="showImagePanel"></image-panel>
        <StatePage :success="success"
                   @update:tipVisible="tipVisible=$event"
                   :tipVisible="tipVisible"
                   :tipFailedDesc="tipFailedDesc"
                   :jump-to="path"
        ></StatePage>
        <FullPageLoading :loading="loading"></FullPageLoading>
        <CoOperation :detail-obj="detailObj" :visible.sync="visible"></CoOperation>
    </div>
</template>

<script>
  import tabForDetails from './public/Tabs-for-details'
  import Rate from './public/rate/rate'
  import CoOperation from './chairman/CoOperation'
  import axios from 'axios'
  import Qs from 'qs'
  import BScroll from 'better-scroll'

  const titlebar = [
    {
      name: '工作详情'
    },
    {
      name: '生命周期'
    }
  ]
  const urlObj = []
  export default {
    name: "processDetail",
    components: {
      'tabs-for-details': tabForDetails,
      'Rate': Rate,
      'CoOperation': CoOperation,
    },
    data() {
      return {
        titlebar,
        detailSwiper: null,
        scroll: null,
        currentIndex: 0,
        element: null,
        folded: true,
        imageUrl: '',
        showImagePanel: false,
        urlObj,
        options: [
          { label: '同意', value: 2 },
          { label: '不同意', value: 3 },
        ],
        detailObj: {},
        isAgree: 2,
        info: '',
        state: '',
        canWrite: false,
        canSet:false,
        loading: false,
        tipVisible: false,
        success: false,
        change_info: {},
        change_info_string: '',
        path: '',//保存数据后跳转的目标
        val: 0,//主席评分
        lifePointList: [], //存放主席协办提交的审批节点
        tipFailedDesc:'',
        visible:false
      }
    },
    computed: {
      showRate() {
        console.log('!!!!!!!!!!!!!!!!!!!')
        console.log(this.$store.getters.currentRole)
        console.log(this.detailObj.type)
        console.log(this.detailObj.done_type)
        console.log(this.detailObj.state)
        return this.$store.getters.currentRole === 1 && this.detailObj.type === 3 && this.detailObj.done_type === 1 && this.detailObj.state === 2
      },
      hideBtn(){
        if(this.$store.getters.currentRole === 2 || this.$store.getters.currentRole === 4){
          return !this.canSet
        }else{
          return !this.canWrite
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      qing.call('setWebViewTitle', { 'title': '流程详情' })

      next((vm) => {
        if (from.name === 'processcenter' || from.name === 'process-center-cm' || from.name === 'process-center-clerk' || from.name === 'process-center-source-admin' || from.name === 'processCenterSourceAdmin') {

          let { detailObj, canWrite, canSet } = vm.$route.params
          // vm.detailObj = JSON.parse(detailObj)
          vm.canWrite = canWrite
          vm.canSet = canSet
          localStorage.setItem('process_detailObj_canWrite', vm.canWrite)
          localStorage.setItem('process_detailObj_canSet', vm.canSet)


          // let getDetail = vm.$url + "/taskSystem/task/list"
          let getDetail = 'http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getList'

          let queryTask = {
            // id: [JSON.parse(detailObj).taskID],
            life_id: JSON.parse(detailObj).id
          }
          let queryTaskList = []
          queryTaskList.push(queryTask)

          let params = {
            page: 1,
            pageAmount: 10,
            queryTaskList: JSON.stringify(queryTaskList)
          }
          axios({
            method: 'post',
            url: getDetail,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: Qs.stringify(params)
          })
            .then((response) => {
              if (response.data.success) {
                let task = response.data.result.data[0]

                let lifelist = []
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

                  if (task.taskLifeList && task.taskLifeList.length > 0) {
                    life.lifePointListLength = task.taskLifeList[0].lifePointList.length
                  }
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

                vm.detailObj = lifelist[0]
                vm.$store.commit('setProcessDetailObj', vm.detailObj)

                if (vm.detailObj.imgs && vm.detailObj.imgs.length > 0) {
                  vm.urlObj = []
                  vm.detailObj.imgs.split(',').forEach((imgurl) => {
                    vm.urlObj.push({ url: imgurl })
                  })
                }
                if (vm.detailObj.change_info) {
                  if (typeof vm.detailObj.change_info === 'string') {
                    vm.change_info = JSON.parse(vm.detailObj.change_info)
                  } else {
                    vm.change_info = vm.detailObj.change_info
                  }

                  let item1, item2, item3, item4, item5
                  if (vm.change_info.after.endtime !== vm.change_info.before.endtime) {
                    item1 = `预计完成时间：由${vm.change_info.before.endtime.split(' ')[0]}变更为${vm.change_info.after.endtime.split(' ')[0]}\r\n`
                    vm.change_info_string += item1
                  }
                  if (vm.change_info.after.unitName !== vm.change_info.before.unitName) {
                    item2 = `单位名称：由${vm.change_info.before.unitName}变更为${vm.change_info.after.unitName ? vm.change_info.after.unitName : "' '"}\r\n`
                    vm.change_info_string += item2
                  }
                  if (vm.change_info.after.chargerName !== vm.change_info.before.chargerName) {
                    item3 = `责任人：由${vm.change_info.before.chargerName}变更为${vm.change_info.after.chargerName ? vm.change_info.after.chargerName : "' '"}\r\n`
                    vm.change_info_string += item3
                  }
                  if (vm.change_info.after.helperName !== vm.change_info.before.helperName) {
                    let beforeHelperName = vm.change_info.before.helperName
                    if (beforeHelperName === undefined || beforeHelperName === null || beforeHelperName === 'undefined' || beforeHelperName === 'null') {
                      beforeHelperName = '未设置'
                    } else {
                      beforeHelperName = vm.change_info.before.helperName
                    }
                    item4 = `协助人：由${beforeHelperName}变更为${vm.change_info.after.helperName ? vm.change_info.after.helperName : "' '"}\r\n`
                    vm.change_info_string += item4
                  }
                  if (vm.change_info.after.aim !== vm.change_info.before.aim) {
                    let aim = vm.change_info.before.aim
                    if (aim === undefined || aim === null || aim === 'undefined' || aim === 'null') {
                      aim = '未设置'
                    } else {
                      aim = vm.change_info.before.aim
                    }
                    item5 = `预计完成目标：由${aim}变更为${vm.change_info.after.aim ? vm.change_info.after.aim : "' '"}\r\n`
                    vm.change_info_string += item5
                  }
                }
                // debugger
                vm.pointCount = 0
                console.log('this.detailObj.lifePointList', vm.detailObj.lifePointList)
                for (let i = 0; i < vm.detailObj.lifePointList.length; i++) {
                  let point = vm.detailObj.lifePointList[i]

                  if (point.state === 1 && point.approverID === vm.$store.getters.openID) {
                    vm.pointCount = i
                    console.log('inner count', vm.pointCount)
                    break
                  }
                  // if (point.state === 1) {
                  //   vm.pointCount = i
                  //   console.log('inner count', vm.pointCount)
                  //   break
                  // }
                }
                console.log('count', vm.pointCount)
              }
              else {
                alert('获取流程中心详情失败')
              }
            }).catch((e) => {
            // console.log(e)
            alert('接口错误')
          })


        }
        else {
          vm.detailObj = vm.$store.getters.processDetailObj
          vm.canWrite = localStorage.getItem('process_detailObj_canWrite')
          vm.canSet = localStorage.getItem('process_detailObj_canSet')

          if (vm.detailObj.imgs && vm.detailObj.imgs.length > 0) {
            vm.urlObj = []
            vm.detailObj.imgs.split(',').forEach((imgurl) => {
              vm.urlObj.push({ url: imgurl })
            })
          }
          if (vm.detailObj.change_info) {
            if (typeof vm.detailObj.change_info === 'string') {
              vm.change_info = JSON.parse(vm.detailObj.change_info)
            } else {
              vm.change_info = vm.detailObj.change_info
            }

            // let item1, item2, item3, item4, item5
            // if (vm.change_info.after.endtime) {
            //   item1 = `预计完成时间：由${vm.change_info.before.endtime.split(' ')[0]}变更为${vm.change_info.after.endtime.split(' ')[0]}\r\n`
            //   vm.change_info_string += item1
            // }
            // if (vm.change_info.after.unitName) {
            //   item2 = `单位名称：由${vm.change_info.before.unitName}变更为${vm.change_info.after.unitName}\r\n`
            //   vm.change_info_string += item2
            // }
            // if (vm.change_info.after.chargerName) {
            //   item3 = `责任人：由${vm.change_info.before.chargerName}变更为${vm.change_info.after.chargerName}\r\n`
            //   vm.change_info_string += item3
            // }
            // if (vm.change_info.after.helperName) {
            //   item4 = `协助人：由${vm.change_info.before.helperName}变更为${vm.change_info.after.helperName}\r\n`
            //   vm.change_info_string += item4
            // }
            // if (vm.change_info.after.aim) {
            //   item5 = `预计完成目标：由${vm.change_info.before.aim}变更为${vm.change_info.after.aim}\r\n`
            //   vm.change_info_string += item5
            // }

            let item1, item2, item3, item4, item5
            if (vm.change_info.after.endtime !== vm.change_info.before.endtime) {
              item1 = `预计完成时间：由${vm.change_info.before.endtime.split(' ')[0]}变更为${vm.change_info.after.endtime.split(' ')[0]}\r\n`
              vm.change_info_string += item1
            }
            if (vm.change_info.after.unitName !== vm.change_info.before.unitName) {
              item2 = `单位名称：由${vm.change_info.before.unitName}变更为${vm.change_info.after.unitName ? vm.change_info.after.unitName : "' '"}\r\n`
              vm.change_info_string += item2
            }
            if (vm.change_info.after.chargerName !== vm.change_info.before.chargerName) {
              item3 = `责任人：由${vm.change_info.before.chargerName}变更为${vm.change_info.after.chargerName ? vm.change_info.after.chargerName : "' '"}\r\n`
              vm.change_info_string += item3
            }
            if (vm.change_info.after.helperName !== vm.change_info.before.helperName) {
              let beforeHelperName = vm.change_info.before.helperName
              if (beforeHelperName === undefined || beforeHelperName === null || beforeHelperName === 'undefined' || beforeHelperName === 'null') {
                beforeHelperName = '未设置'
              } else {
                beforeHelperName = vm.change_info.before.helperName
              }
              item4 = `协助人：由${beforeHelperName}变更为${vm.change_info.after.helperName ? vm.change_info.after.helperName : "' '"}\r\n`
              vm.change_info_string += item4
            }
            if (vm.change_info.after.aim !== vm.change_info.before.aim) {
              let aim = vm.change_info.before.aim
              if (aim === undefined || aim === null || aim === 'undefined' || aim === 'null') {
                aim = '未设置'
              } else {
                aim = vm.change_info.before.aim
              }
              item5 = `预计完成目标：由${aim}变更为${vm.change_info.after.aim ? vm.change_info.after.aim : "' '"}\r\n`
              vm.change_info_string += item5
            }
          }
        }
        // vm.lifePointListNew = JSON.parse(JSON.stringify(vm.detailObj.lifePointList))
      })
    },
    mounted() {
      this.$initScroll(this.scroll, this.$refs.wrapper)
    },
    methods: {
      getCurrentIndex(e) {
        this.currentIndex = e;
        this.detailSwiper.slideTo(this.currentIndex);
      },
      onClickImage(url) {
        this.imageUrl = url
        this.showImagePanel = true
      },
      radioOnChange(e) {
        this.isAgree = e
        console.log(e)
      },
      onClickToChooseApprover() {
        console.log('_this.detailObj.lifePointListLength', this.detailObj.lifePointListLength)
        let _this = this
        qing.call('selectPersons', {
          'isMulti': true,
          'success': function (result) {
            result.data.persons.forEach((item, index) => {

              let obj = {}
              obj.approverID = item.openId
              obj.approverName = item.name
              obj.approverAvatarUrl = item.avatarUrl
              obj.index = index + 1
              obj.parentID = _this.detailObj.id
              _this.lifePointList.push(obj)
            })

            _this.loading = true

            let url = _this.$url + '/taskSystem/task/addPoint'
            axios({
              method: 'post',
              url: url,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              data: Qs.stringify({
                jsonStr: JSON.stringify(_this.lifePointList),
                index: _this.detailObj.lifePointListLength
              })
            }).then((response) => {
              // alert(JSON.stringify(response.data))
              _this.path = 'process-center-cm'
              _this.loading = false
              _this.tipVisible = true
              if (response.data.success === true) {
                _this.success = true
              } else {
                _this.success = false
                _this.tipFailedDesc = response.data.outerMessage
              }
            })
          }
        });
      },
      onClickToApproval() {

        if (this.$store.getters.currentRole === 1) {
          this.path = 'process-center-cm'
        } else if (this.$store.getters.currentRole === 3) {
          this.path = 'process-center-clerk'
        } else {
          this.path = 'processcenter'
        }

        this.loading = true

        if (this.val) {
          let url2 = this.$url + '/taskSystem/task/reward'
          axios({
            method: 'post',
            url: url2,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: Qs.stringify({
              jsonStr: JSON.stringify([{ id: this.detailObj.taskID, reward: this.val }])
            })
          })
            .then((response) => {
              console.log()
              if (response.data.success === true) {

                let url = this.$url + '/taskSystem/task/audit'
                axios({
                  method: 'post',
                  url: url,
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                  },
                  data: Qs.stringify({
                    // jsonStr: JSON.stringify([{ id: this.detailObj.id, state: this.isAgree }])
                    jsonStr: JSON.stringify([{
                      id: this.detailObj.lifePointList[this.pointCount].id,
                      state: this.isAgree,
                      info: this.info
                    }])
                  })
                }).then((response) => {
                  // alert(JSON.stringify(response.data))
                  this.loading = false
                  this.tipVisible = true
                  if (response.data.success === true) {
                    this.success = true
                  } else {
                    this.success = false
                  }
                })
              }
              else {
                this.success = false
              }
            })
        }
        else {
          let url = this.$url + '/taskSystem/task/audit'
          axios({
            method: 'post',
            url: url,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: Qs.stringify({
              // jsonStr: JSON.stringify([{ id: this.detailObj.id, state: this.isAgree }])
              jsonStr: JSON.stringify([{
                id: this.detailObj.lifePointList[this.pointCount].id,
                state: this.isAgree,
                info: this.info
              }])
            })
          }).then((response) => {
            // alert(JSON.stringify(response.data))
            this.loading = false
            this.tipVisible = true
            if (response.data.success === true) {
              this.success = true
            } else {
              this.success = false
            }
          })
        }




        // this.loading = true
        // let _this = this
        // axios.all([this.audit(),this.rate()])
        //   .then(axios.spread(function (audit,rate) {
        //     // 两个请求现在都执行完成
        //     _this.loading = false
        //     _this.tipVisible = true
        //     if (audit.data.success === true && rate.data.success === true) {
        //       _this.success = true
        //     } else {
        //       _this.success = false
        //     }
        //   }));
      },
      onClickToRelocation() {
        let _this = this
        qing.call('selectPersons', {
          'isMulti': false,
          'success': function (result) {
            _this.newApproverID = result.data.persons[0].openId
            _this.newApproverName = result.data.persons[0].name
            _this.newApproverAvatarUrl = result.data.persons[0].avatarUrl

            _this.loading = true

            let url = _this.$url + '/taskSystem/task/changeApproverID'
            axios({
              method: 'post',
              url: url,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              data: Qs.stringify({
                approverID: _this.newApproverID,
                approverName: _this.newApproverName,
                approverAvatarUrl: _this.newApproverAvatarUrl,
                pointID: _this.detailObj.lifePointList[_this.detailObj.lifePointList.length-1].id
              })
            }).then((response) => {
              // alert(JSON.stringify(response.data))
              _this.path = 'process-center-source-admin'

              _this.loading = false
              _this.tipVisible = true
              if (response.data.success === true) {
                _this.success = true
                _this.tongzhi(_this.newApproverID)
              } else {
                _this.success = false
              }
            })
          }
        });
      },
      tongzhi(chargerID) {
        let url = this.$url + '/taskSystem/msg/sendMsg'
        let param = {
          openID: [chargerID],
          msg: `您有1条重点工作[${this.getLifeType(this.detailObj.type)}]流程待审批，请及时处理`
        }
        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: Qs.stringify(param, { arrayFormat: 'brackets' })
        }).then((response) => {
        }).catch(() => {
        })
      },
      onClickToAbolish() {
        let question = confirm("确定要废止这条流程吗?")
        if(question){
          this.beSureToAbolish()
        }
      },
      beSureToAbolish() {
        let thisFlowID = this.detailObj.id;
        let paramsObj = {
          lifeID:thisFlowID
        }
        let url = this.$url + '/taskSystem/task/deleteLife'
        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: Qs.stringify(paramsObj)
        }).then((response) => {
          // alert(JSON.stringify(response.data))
          this.path = 'process-center-source-admin'

          this.loading = false
          this.tipVisible = true
          if (response.data.success === true) {
            this.success = true
          } else {
            this.success = false
          }
        })
      },
      audit() {
        let url = this.$url + '/taskSystem/task/audit'
        return axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: Qs.stringify({
            jsonStr: JSON.stringify([{
              id: this.detailObj.lifePointList[0].id,
              state: this.isAgree,
              info: this.info
            }])
          })
        })
      },
      rate() {
        let url = this.$url + '/taskSystem/task/reward'
        return axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: Qs.stringify({
            jsonStr: JSON.stringify([{ id: this.detailObj.taskID, reward: this.val }])
          })
        })
      },
      onClickToReject() {
        let url = this.$url + '/taskSystem/task/audit'
        this.loading = true
        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          // headers: {
          //   'Content-Type': 'application/json; charset=UTF-8'
          // },
          data: Qs.stringify({
            // jsonStr: JSON.stringify([{ id: this.detailObj.id, state: this.isAgree }])
            jsonStr: JSON.stringify([{ id: this.detailObj.lifePointList[0].id, state: 4, info: this.info }])
          })
        }).then((response) => {
          // alert(JSON.stringify(response.data))
          this.loading = false
          this.tipVisible = true
          if (response.data.success == true) {
            this.success = true
          } else {
            this.success = false
          }
        })
      },
      getTaskStatus(state) {
        switch (state) {
          case 0:
            this.state = '暂存'
            break
          case 1:
            this.state = '新增'
            break
          case 2:
            this.state = '进行中'
            break
          case 3:
            this.state = '已完成'
            break
          case 4:
            this.state = '已废止'
            break
          default:
            this.state = ''
            break
        }
        return this.state
      },
      getLifeStatus(type) {
        let _type = ''
        switch (type) {
          case 0:
            _type = '新增'
            break
          case 1:
            _type = '退回'
            break
          case 2:
            _type = '审批中'
            break
          case 3:
            _type = '通过'
            break
          case 4:
            _type = '未通过'
            break
          default:
            _type = ''
            break
        }
        return _type
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
      getPointStatus(type) {
        let _type = ''
        switch (type) {
          case 0:
            _type = '待审批'
            break
          case 1:
            _type = '审批中'
            break
          case 2:
            _type = '通过'
            break
          case 3:
            _type = '未通过'
            break
          case 4:
            _type = '驳回'
            break
          default:
            _type = ''
            break
        }
        return _type
      },
      judgePointStatus(list,index){
        if(list && list.length>0){
          if(list[index+1]){
            if(list[index].type === 1 && list[index+1].type === 2){
              return '协办'
            }else{
              return ''
            }
          }else{
            return ''
          }
        }else{
          return ''
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    * {
        font-size: 12px;
    }

    .scroll-wrap {
        height: calc(100% - 0.45rem);
        overflow: hidden;
        background-color: #F2F6F9;
        &.hideBtn {
            height: 100%;
        }
    }

    .block {
        margin-bottom: 0.1rem;
        background-color: #fff;
        .title-wrap {
            padding: 0.14rem 0;
            margin-right: 0.12rem;
            margin-left: 0.12rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 0.01rem solid #ebebeb;
            span.status {
                font-size: 0.14rem;
                color: #16b685;
            }
        }
        .radio {
            padding: 0.12rem 0;
            margin-left: 0.12rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-bottom: 0.01rem solid #ebebeb;
        }
        .content {
            margin-left: 0.12rem;
            margin-right: 0.12rem;
            height: 0.47rem;
            overflow: hidden;
            .row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .label {
                    padding: 0.2rem 0.3rem 0 0;
                    font-size: 0.14rem;
                    color: #a0a0a0;
                    /*border-bottom: 1px solid #fff;*/
                    width: calc(4em + 0.3rem);
                }
                .right {
                    padding: 0.2rem 0 0 0;
                    font-size: 0.14rem;
                    color: #6e6e6e;
                    /*border-bottom: 1px solid #f0f0f0;*/
                    /*flex: 1;*/
                    .active {
                        color: #b4b4b4;
                    }
                }
            }
            &.folded {
                height: 3.52rem;
            }
        }
        .bottom {
            text-align: right;
            div {
                > p {
                    margin-left: auto;
                    padding: 0.07rem 0.1rem 0.11rem;
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
                        width: 0.1rem;
                        height: 0.14rem;
                        background: url("../assets/right1.png") no-repeat;
                        background-size: contain;
                    }

                    &.unfolded {
                        .icon {
                            display: inline-block;
                            width: 0.14rem;
                            height: 0.1rem;
                            background: url("../assets/收起.png") no-repeat;
                            background-size: contain;
                        }
                    }
                }
            }

        }
        .des-wrap {
            margin-left: 0.12rem;
            margin-right: 0.12rem;
            padding: 0.1rem 0 0.2rem;
            .des {
                font-size: 0.14rem;
                color: #454545;
                white-space: pre-wrap;
            }
        }
        &.field {
            .title-wrap {
                margin-right: 0;
                padding-right: 0.12rem;
                margin-left: 0.12rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 0.01rem solid #ebebeb;
            }
        }
        &.picture {
            .title-wrap {
                display: flex;
                justify-content: flex-start;
                align-items: flex-end;
                .sub-des {
                    margin-left: 0.08rem;
                    font-size: 0.10rem;
                    color: #b7b7b7;
                }
            }
            .images {
                display: flex;
                flex-wrap: wrap;
                .pic-wrapper {
                    flex: 0 0 25%;
                    /*margin-right: 0.16rem;*/
                    margin-bottom: 0.16rem;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    .img-wrap {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 0.5rem;
                        height: 0.5rem;
                    }
                    .picture {
                        /*width: 100%;*/
                        max-width: 0.5rem;
                        height: auto;
                        max-height: 0.5rem;
                    }
                }
            }
        }
        &.approver {
            margin-bottom: 0;
            .title-wrap {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                .left {

                }
                .right {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #367be7;
                    border-radius: 0.115rem;
                    width: 0.5rem;
                    height: 0.23rem;
                    font-size: 0.12rem;
                    color: #FFFFFF;;
                }
            }
        }
    }

    .rate-wrap {
        margin-bottom: 0.1rem;
        padding-bottom: 0.1rem;
        background-color: #fff;
        > .title {
            display: flex;
            justify-content: center;
            padding: 0.15rem 0;
            border-bottom: 0.01rem solid #ebebeb;;

            span {
                font-size: 0.15rem;
                color: #367be7;
            }
        }
        > p {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.1rem;
            color: #BCBCBC;
        }
    }

    .swiper-slide {
        &:last-child {
            background-color: #fff;
        }
    }

    .button-wrap {
        padding-top: 0.06rem;
        padding-bottom: 0.06rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 0.01rem solid #f1f1f1;
        background-color: #fff;
        .btn1 {
            margin-right: 0.12rem;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1.37rem;
            height: 0.32rem;
            span {
                font-size: 0.15rem;
                color: #397de8;
            }
        }
        .btn2 {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1.37rem;
            height: 0.32rem;
            span {
                font-size: 0.15rem;
                color: #397de8;
            }
        }
    }

    .timeline {
        padding-top: 0.2rem;
        .item-wrap {
            /*margin-bottom: 0.2rem;*/
            position: relative;
            &::before {
                content: '';
                position: absolute;
                top: 0px;
                left: 0.38rem;
                bottom: 0px;
                width: 4px;
                background: #ddd;
            }
            .item {
                margin-bottom: 0.1rem;
                margin-right: 0.12rem;
                margin-left: 0.62rem;
                padding: 0.1rem 0.12rem 0 0.2rem;
                /*position: relative;*/
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                flex-direction: column;
                background: #f2f6f9;
                border: 1px solid #efefef;
                &::before {
                    content: '';
                    position: absolute;
                    width: 0.12rem;
                    height: 0.12rem;
                    border: 0.04rem solid salmon;
                    background-color: #fff;
                    border-radius: 100%;
                    /*top: 15%;*/
                    left: 0.3rem;
                    z-index: 99;
                }
                > div {
                    width: 100%;
                }
                .top {
                    padding-bottom: 0.04rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .status {
                        font-size: 0.14rem;
                        color: #030303;
                    }
                    .date {
                        font-size: 0.12rem;
                        color: #666666;
                    }
                }
                .content-wrap {
                    span {
                        line-height: 1.3;
                        font-size: 0.13rem;
                        color: #999999;
                    }
                }
                .bottom {
                    padding-top: 0.04rem;
                    padding-bottom: 0.12rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .charger {
                        font-size: 0.13rem;
                        color: #999999;
                    }
                    .more {
                        font-size: 0.1rem;
                        color: #007aff;
                    }
                }
            }
        }
        .tips {
            text-align: center;
            font-size: 0.14rem;
            color: #999;
        }
    }
</style>