<template>
    <div style="height: 100%;background-color: #fff">
        <tabs-for-details :titlebar="titlebar" @update:currentIndex="getCurrentIndex"
                          :currentIndex="currentIndex"
                          :element.sync="element"></tabs-for-details>
        <div class="swiper-container swiper-no-swiping">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <!--<div class="scroll-wrap"-->
                    <!--:class="{'hideBtn':detailObj.state === 4||detailObj.state === 3||detailObj.chargerID !== $store.state.openID || showBtn===false}"-->
                    <!--ref="wrapper1">-->
                    <div class="scroll-wrap"
                         :class="{'hideBtn':hideAllBtn}"
                         ref="wrapper1">
                        <!--showButtonWrap-->
                        <div>
                            <div class="block field">
                                <div class="title-wrap">
                                    <field-title :blueline-visible="false" :redstar-visible="false">
                                        <span>{{$judgeUndefined(detailObj.projectName)}}</span>
                                        <span class="reward" v-if="$showReward(detailObj.reward) && detailObj.state === 3">(+{{detailObj.reward}}分)</span>
                                    </field-title>
                                    <div class="left">
                                        <span class="status">{{getTaskStatus(detailObj.state)}}</span>
                                        <!--<span class="urge" @click="maskVisible=true"-->
                                        <!--v-if="($store.getters.currentRole===0&&$store.getters.taskType === 'sign')||$store.getters.currentRole===2||$store.getters.currentRole===4">催办</span>-->
                                        <span class="urge" @click="maskVisible=true"
                                              v-if="judgeShowBtnByRole('催办')">催办</span>
                                    </div>

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
                                        <div class="right">{{detailObj.starttime && detailObj.starttime.split(' ')[0]}}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">完成时间</div>
                                        <div class="right">{{detailObj.endtime && detailObj.endtime.split(' ')[0]}}
                                        </div>
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
                                    <div class="row">
                                        <div class="label">变更次数</div>
                                        <!--<div class="right">{{detailObj.taskLifeList && detailObj.taskLifeList.length}}</div>-->
                                        <div class="right">{{detailObj.changeTimes}}</div>
                                    </div>
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

                            <div class="block">
                                <div class="title-wrap">
                                    <field-title :blueline-visible="true" :redstar-visible="false">现状及问题</field-title>
                                </div>
                                <div class="des-wrap">
                                    <p class="des">{{detailObj.problem}}</p>
                                </div>
                            </div>
                            <div class="block">
                                <div class="title-wrap">
                                    <field-title :blueline-visible="true" :redstar-visible="false">实施方法</field-title>
                                </div>
                                <div class="des-wrap">
                                    <p class="des">{{detailObj.ways}}</p>
                                </div>
                            </div>
                            <div class="block">
                                <div class="title-wrap">
                                    <field-title :blueline-visible="true" :redstar-visible="false">预期目标</field-title>
                                </div>
                                <div class="des-wrap">
                                    <p class="des">{{detailObj.aim}}</p>
                                </div>
                            </div>
                            <div class="block">
                                <div class="title-wrap">
                                    <field-title :blueline-visible="true" :redstar-visible="false">主席批示</field-title>
                                </div>
                                <div class="des-wrap">
                                    <div v-if="detailObj.commentList && detailObj.commentList.length>0">
                                        <p class="des" v-for="item,index in detailObj.commentList">
                                            <span>{{index+1}}.{{item.comments}}——</span>
                                            <span>{{item.createtime}}</span>
                                        </p>
                                    </div>
                                    <div v-else>
                                        <p class="des">暂无主席批示</p>
                                    </div>
                                </div>
                            </div>

                            <div class="block rate-wrap" v-if="$showReward(detailObj.reward) && detailObj.state === 3">
                                <!--<div class="title">-->
                                <!--<span>加分情况</span>-->
                                <!--</div>-->
                                <div class="title-wrap">
                                    <field-title :blueline-visible="true" :redstar-visible="false">卓越奖励</field-title>
                                </div>
                                <Rate v-model="detailObj.reward" :size="35" :read-only="true"></Rate>
                                <!--<p>此项工作结果成效卓越，超出预期，特给予加分奖励！</p>-->
                            </div>

                            <!--<div class="block picture" v-if="urlObj.length>0">-->
                            <!--<div class="title-wrap">-->
                            <!--<field-title :blueline-visible="true" :redstar-visible="false">附件</field-title>-->
                            <!--<span class="sub-des">共{{urlObj.length}}张</span>-->
                            <!--</div>-->
                            <!--<div class="des-wrap images">-->
                            <!--<div class="i1 pic-wrapper" v-for="item in urlObj" @click="onClickImage(item.url)">-->
                            <!--<div class="img-wrap">-->
                            <!--&lt;!&ndash;<img :src="item.url" class="picture">&ndash;&gt;-->

                            <!--<img :src="item.url" class="picture" @load="item.showLoading = false"-->
                            <!--v-show="!item.showLoading">-->
                            <!--<img src="../assets/默认图片.png" class="picture" v-show="item.showLoading">-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                        </div>
                    </div>

                    <!--<div class="button-wrap" v-if="!hideAllBtn">-->
                    <!--<router-link tag="div" :to="{name:'change',params:{detailObj}}" class="btn1 btn"-->
                    <!--v-if="showButtonWrap">-->
                    <!--<span>变更</span>-->
                    <!--</router-link>-->
                    <!--<router-link tag="div" :to="{name:'abolish',params:{detailObj}}" class="btn2 btn"-->
                    <!--v-if="showButtonWrap">-->
                    <!--<span>废止</span>-->
                    <!--</router-link>-->
                    <!--<div class="btn5 btn" v-if="$store.getters.currentRole===4||$store.getters.currentRole===2"-->
                    <!--@click="onClickToDeleteTask">-->
                    <!--<span>删除</span>-->
                    <!--</div>-->
                    <!--&lt;!&ndash;<router-link tag="div" :to="{name:'feedback',params:{detailObj}}" class="btn3 btn"&ndash;&gt;-->
                    <!--&lt;!&ndash;v-if="$store.state.taskType === 'charge'&& $store.state.currentRole===0">&ndash;&gt;-->
                    <!--&lt;!&ndash;<span>过程反馈</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
                    <!--&lt;!&ndash;<router-link tag="div" :to="{name:'end',params:{detailObj}}" class="btn4 btn"&ndash;&gt;-->
                    <!--&lt;!&ndash;v-if="$store.state.taskType === 'charge' && $store.state.currentRole===0">&ndash;&gt;-->
                    <!--&lt;!&ndash;<span>任务完结</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
                    <!--<router-link tag="div" :to="{name:'feedback',params:{detailObj}}" class="btn3 btn"-->
                    <!--v-if="showButtonWrap && showButtonGroup">-->
                    <!--<span>过程反馈</span>-->
                    <!--</router-link>-->
                    <!--<router-link tag="div" :to="{name:'end',params:{detailObj}}" class="btn4 btn"-->
                    <!--v-if="showButtonWrap && showButtonGroup">-->
                    <!--<span>任务完结</span>-->
                    <!--</router-link>-->
                    <!--</div>-->

                    <div class="button-wrap" v-if="!hideAllBtn">
                    <!--<div class="button-wrap">-->
                        <router-link tag="div" :to="{name:'change',params:{detailObj}}" class="btn1 btn"
                                     v-if="detailObj.state && judgeShowBtnByRole('变更')">
                            <span>变更</span>
                        </router-link>
                        <!--<router-link tag="div" :to="{name:'change',params:{detailObj}}" class="btn1 btn">-->
                            <!--<span>变更</span>-->
                        <!--</router-link>-->
                        <router-link tag="div" :to="{name:'abolish',params:{detailObj}}" class="btn2 btn"
                                     v-if="detailObj.state && judgeShowBtnByRole('废止')">
                            <span>废止</span>
                        </router-link>
                        <div class="btn5 btn" v-if="detailObj.state && judgeShowBtnByRole('删除')"
                             @click="onClickToDeleteTask">
                            <span>删除</span>
                        </div>
                        <!--<router-link tag="div" :to="{name:'feedback',params:{detailObj}}" class="btn3 btn"-->
                        <!--v-if="$store.state.taskType === 'charge'&& $store.state.currentRole===0">-->
                        <!--<span>过程反馈</span>-->
                        <!--</router-link>-->
                        <!--<router-link tag="div" :to="{name:'end',params:{detailObj}}" class="btn4 btn"-->
                        <!--v-if="$store.state.taskType === 'charge' && $store.state.currentRole===0">-->
                        <!--<span>任务完结</span>-->
                        <!--</router-link>-->
                        <router-link tag="div" :to="{name:'feedback',params:{detailObj}}" class="btn3 btn"
                                     v-if="detailObj.state && judgeShowBtnByRole('反馈')">
                            <span>过程反馈</span>
                        </router-link>
                        <router-link tag="div" :to="{name:'end',params:{detailObj}}" class="btn4 btn"
                                     v-if="detailObj.state && judgeShowBtnByRole('完结')">
                            <span>任务完结</span>
                        </router-link>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="timeline">
                        <div ref="wrapper2">
                            <div class="tips" v-if="lifeArr.length<1">暂无审批信息</div>
                            <div class="item-wrap" v-else>
                                <div class="item" v-for="item in lifeArr" v-if="item.type!==6">
                                    <div class="top">
                                        <span class="status">{{getLifeType(item.type) || '未知的变更类型'}}</span>
                                        <span class="date" v-if="item.lifePointList&&item.lifePointList.length>0">{{item.lifePointList[item.lifePointList.length-1].approveTime || '暂无时间'}}</span>
                                    </div>
                                    <div class="content-wrap">
                                        <p v-if="item.type === 2">
                                            <span>变更原因：</span>
                                            <span>{{item.change_reason || '暂无变更原因'}}</span>
                                        </p>
                                        <p v-if="item.type === 3">
                                            <span>完结说明：</span>
                                            <span>{{item.done_info||item.done_going || '暂无完结说明'}}</span>
                                        </p>
                                        <p v-if="item.type === 4">
                                            <span>废止原因：</span>
                                            <span>{{item.cancel_reason || '暂无废止原因'}}</span>
                                        </p>
                                        <p v-if="item.type === 5">
                                            <span>过程反馈：</span>
                                            <span>{{item.reply_info || '暂无过程反馈'}}</span>
                                        </p>
                                    </div>
                                    <div class="bottom">
                                        <div class="charger">
                                            <span>责任人：</span>
                                            <span>{{detailObj.chargerName || '暂无责任人'}}</span>
                                        </div>
                                        <div class="more">
                                            <router-link tag="li"
                                                         :to="{name:'taskLifeDetail',params:{detailObj:JSON.stringify(item)}}"
                                            >更多
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <image-panel :url="imageUrl" :showImagePanel.sync="showImagePanel"></image-panel>
        <router-link v-if="$store.getters.currentRole===1"
                     :to="{name:'instructions',params:{detailObj}}"
                     tag="div" class="float-btn">
            <!--<i class="icon"></i>-->
            <span class="icon">批示</span>
        </router-link>
        <!--<div v-if="$store.getters.currentRole===0&&isFinish(detailObj) === 1&&detailObj.state ===2&&$store.getters.openID===detailObj.chargerID"-->
        <!--<div v-if="showButtonWrap"-->
        <!--class="float-btn" @click="passRound">-->
        <!--<span class="icon">传阅</span>-->
        <!--</div>-->
        <div v-if="judgeShowBtnByRole('传阅')"
             class="float-btn" @click="passRound">
            <span class="icon">传阅</span>
        </div>
        <StatePage :success="success"
                   @update:tipVisible="tipVisible=$event"
                   :tipVisible="tipVisible"
                   :jump-to="path"
        ></StatePage>
        <!--<FullPageLoading :loading="loading"></FullPageLoading>-->
        <!--<FullPageLoading :loading="loading1"></FullPageLoading>-->
        <!--<FullPageLoading :loading="loading2"></FullPageLoading>-->
        <!--<FullPageLoading :loading="loading3"></FullPageLoading>-->
        <div class="mask" v-if="maskVisible">
            <div class="block">
                <div class="title-wrap">
                    <field-title :blueline-visible="false" :redstar-visible="false">请填写催办内容</field-title>
                </div>
                <div class="text">
                    <c-textarea default-value=""
                                remark=""
                                tips="请输入催办意见"
                                @update:inputValue="msg = $event"></c-textarea>
                </div>
            </div>
            <div class="button-wrap">
                <div class="btn2" @click="urge">
                    <span>发送</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import tabForDetails from './public/Tabs-for-details'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import BScroll from 'better-scroll'
  import axios from 'axios'
  import Qs from 'qs'
  import util from '../util'
  import Rate from './public/rate/rate'


  const titlebar = [
    {
      name: '工作详情'
    },
    {
      name: '生命周期'
    }
  ]
  const urlObjArr = [
    {
      url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg',
      showLoading: true
    }
  ]
  export default {
    name: "taskDetail",
    components: {
      'tabs-for-details': tabForDetails,
      'Rate': Rate,
    },
    data() {
      return {
        titlebar,
        detailSwiper: null,
        currentIndex: 0,
        element: null,
        folded: true,
        imageUrl: '',
        showImagePanel: false,
        urlObj: [],
        urlObjArr,
        detailObj: {},
        state: '',
        isCurrentMonth: true,
        pointArr: [],
        lifeArr: [],
        scroll: null,
        scroll2: null,
        showBtn: true,
        fromName: '',
        util,
        success: false,
        tipVisible: false,
        loading: false,
        loading1: false,
        loading2: false,
        loading3: false,
        path: '',
        approverName: '',
        approverAvatarUrl: '',
        approverID: '',
        msg: '',
        maskVisible: false,
        changeBtnOpen: true,
        deleteBtnOpen: true,
        feedbackBtnOpen: true,
      }
    },
    computed: {
      hideAllBtn() {
        // if (this.showButtonWrap === false && this.$store.getters.currentRole !== 4 && this.$store.getters.currentRole !== 2) {
        //   return true
        // } else {
        //   return false
        // }
        if (this.changeBtnOpen || this.deleteBtnOpen || this.feedbackBtnOpen) {
          return false
        } else {
          return true
        }
      },
      showButtonWrap() {
        if (this.showBtn === true) {
          if (this.fromName === 'list') {
            return true
          }
          else if (this.fromName === 'chairmanList') {
            if (this.$store.state.currentBtnIndex === 2) {
              return true
            } else {
              if (this.detailObj.signerID === this.$store.getters.openID) {
                return true
              } else {
                return false
              }
            }
          }
          else if (this.fromName === 'list-clerk') {
            return true
          }
          else if (this.fromName === 'listSourceAdmin') {
            return true
          }
          else {
            return true
          }
        } else {
          return false
        }
      },
      showButtonGroup() {
        if (this.fromName === 'list') {
          if (this.detailObj.chargerID === this.$store.state.openID) {
            return true
          }
          else {
            return false
          }
        }
        else if (this.fromName === 'chairmanList') {
          return false
        }
        else if (this.fromName === 'list-clerk') {
          return true
        }
        else if (this.fromName === 'listSourceAdmin') {
          return false
        }
        else {
          if (this.$store.getters.currentRole === 4 || this.$store.getters.currentRole === 1 || this.$store.getters.currentRole === 2) {
            return false
          } else {
            return true
          }
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      qing.call('setWebViewTitle', { 'title': '工作详情' })

      next((vm) => {
        // if (from.name === 'list') {
        //   vm.fromName = 'list'
        // }
        // if (from.name === 'chairmanList') {
        //   vm.fromName = 'chairmanList'
        // }
        // if (from.name === 'list-clerk') {
        //   vm.fromName = 'list-clerk'
        // }
        vm.fromName = from.name
        vm.$store.commit('setFromName', vm.fromName)
        if (from.name === 'list' || from.name === 'chairmanList' || from.name === 'list-clerk' || from.name === 'listSourceAdmin') {
          // vm.currentIndex = 0

          let { detailObj, isCurrentMonth, isSub, mainID } = vm.$route.params

          // let getDetail = vm.$url + "/taskSystem/task/list"
          let getDetail = 'http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getList'
          let queryTask = {
            id: [JSON.parse(detailObj).id],
          }
          if (isSub && mainID) {
            queryTask.id = [mainID]
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
              if (response.data.success && response.data.result.amount > 0) {
                let data = response.data.result.data[0]
                vm.detailObj = data
                vm.$store.commit('setTaskDetailObj', vm.detailObj)
                localStorage.setItem('taskDetailObj', JSON.stringify(vm.detailObj))
                vm.isCurrentMonth = isCurrentMonth

                vm.lifeArr = []
                vm.$store.commit('setLifeArr', [])
                let count = 0

                if (!isSub) {
                  vm.detailObj.taskLifeList.forEach((life) => {
                    life.projectName = vm.detailObj.projectName
                    life.chargerName = vm.detailObj.chargerName
                    life.sourceList = vm.detailObj.sourceList
                    life.starttime = vm.detailObj.starttime
                    life.endtime = vm.detailObj.endtime
                    life.unitName = vm.detailObj.unitName
                    life.signerName = vm.detailObj.signerName
                    life.helperName = vm.detailObj.helperName
                    life.imgs = vm.detailObj.imgs
                    life.problem = vm.detailObj.problem
                    life.ways = vm.detailObj.ways
                    life.aim = vm.detailObj.aim
                    life.reward = vm.detailObj.reward
                    if (life.type === 2 && life.state === 3) {
                      count += 1
                    }
                    vm.lifeArr.push(life)
                  })
                }
                else {
                  let a = {}
                  vm.detailObj.nextList.forEach((sub) => {
                    if (sub.id === JSON.parse(detailObj).id) {
                      a = sub
                    }
                  })
                  vm.detailObj = a

                  vm.detailObj.taskLifeList.forEach((life) => {
                    life.projectName = vm.detailObj.projectName
                    life.chargerName = vm.detailObj.chargerName
                    life.sourceList = vm.detailObj.sourceList
                    life.starttime = vm.detailObj.starttime
                    life.endtime = vm.detailObj.endtime
                    life.unitName = vm.detailObj.unitName
                    life.signerName = vm.detailObj.signerName
                    life.helperName = vm.detailObj.helperName
                    life.imgs = vm.detailObj.imgs
                    if (life.type === 2) {
                      count += 1
                    }
                    vm.lifeArr.push(life)
                  })
                }

                vm.detailObj.changeTimes = count
                vm.$store.commit('setLifeArr', vm.lifeArr)


                vm.urlObj = []
                if (vm.detailObj.imgs) {
                  vm.detailObj.imgs.split(',').forEach((imgurl) => {
                    vm.urlObj.push({ url: imgurl, showLoading: true })
                  })
                }

                vm.judgeShowBtn()
                vm.$store.commit('setShowBtn', vm.showBtn)

              }
              else {
                alert('获取重点工作详情失败')
              }
            }).catch(() => {
            alert('接口错误')
          })

        }
        else if (from.name === 'instructions' || from.name === null) {
          vm.detailObj = vm.$store.getters.taskDetailObj
          console.log('vm.$store.getters.taskDetailObj', vm.$store.getters.taskDetailObj)

          // let getDetail = vm.$url + "/taskSystem/task/list"
          let getDetail = 'http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getList'

          let queryTask = {
            id: [vm.detailObj.id],
          }
          let queryTaskList = []
          queryTaskList.push(queryTask)

          let params = {
            page: 1,
            pageAmount: 10,
            queryTaskList: JSON.stringify(queryTaskList)
            // queryTaskList:queryTaskList
          }
          axios({
            method: 'post',
            url: getDetail,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            // headers: {
            //   'Content-Type': 'application/json; charset=UTF-8'
            // },
            data: Qs.stringify(params)
          })
            .then((response) => {
              if (response.data.success) {
                let data = response.data.result.data[0]
                vm.detailObj = data
                vm.$store.commit('setTaskDetailObj', vm.detailObj)
                localStorage.setItem('taskDetailObj', JSON.stringify(vm.detailObj))
                // vm.isCurrentMonth = isCurrentMonth


                vm.lifeArr = []
                vm.$store.commit('setLifeArr', [])
                let count = 0
                vm.detailObj.taskLifeList.forEach((life) => {
                  life.projectName = vm.detailObj.projectName
                  life.chargerName = vm.detailObj.chargerName
                  life.sourceList = vm.detailObj.sourceList
                  life.starttime = vm.detailObj.starttime
                  life.endtime = vm.detailObj.endtime
                  life.unitName = vm.detailObj.unitName
                  life.signerName = vm.detailObj.signerName
                  life.helperName = vm.detailObj.helperName
                  life.imgs = vm.detailObj.imgs
                  if (life.type === 2) {
                    count += 1
                  }
                  vm.lifeArr.push(life)
                })

                vm.detailObj.changeTimes = count
                vm.$store.commit('setLifeArr', vm.lifeArr)

                vm.urlObj = []
                if (vm.detailObj.imgs) {
                  vm.detailObj.imgs.split(',').forEach((imgurl) => {
                    vm.urlObj.push({ url: imgurl, showLoading: true })
                  })
                }
                //列表状态为已完成或者已废止的重点工作，详情不显示操作按钮
                vm.judgeShowBtn()
                vm.$store.commit('setShowBtn', vm.showBtn)


              } else {
                alert('获取重点工作详情失败')
              }
            }).catch((e) => {
            console.log(e)
            alert('接口错误')
          })
        }
        else {
          vm.lifeArr = vm.$store.state.lifeArr
          vm.detailObj = vm.$store.getters.taskDetailObj
          vm.fromName = vm.$store.state.fromName

          vm.urlObj = []
          if (vm.detailObj.imgs) {
            vm.detailObj.imgs.split(',').forEach((imgurl) => {
              vm.urlObj.push({ url: imgurl, showLoading: true })
            })
          }
          vm.showBtn = vm.$store.state.showBtn
          console.log(vm.showBtn)

        }
        vm.currentIndex = vm.$store.state.currentBtnIndexDetail
        vm.detailSwiper = new Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination'
          },
          on: {
            slideChangeTransitionStart: function () {
              vm.currentIndex = vm.detailSwiper.activeIndex
            }
          },
        })
        vm.detailSwiper.slideTo(vm.currentIndex);

        (async function () {
          vm.loading1 = true
          try {
            let response = await vm.$getPersonInfoByOpenID(vm.$store.getters.openID)
            let data = response.data.result.data[0]
            vm.approverID = data.openId
            vm.approverName = data.name
            vm.approverAvatarUrl = data.photoUrl
            vm.loading1 = false
          } catch (e) {
            alert("获取责任人信息失败")
          }
        })()
      })
    },
    mounted() {
      this.$initScroll(this.scroll, this.$refs.wrapper1)
      this.$initScroll(this.scroll2, this.$refs.wrapper2)
    },
    beforeRouteLeave(to, from, next) {
      if (to.name !== 'taskLifeDetail') {
        this.$store.commit('setCurrentBtnIndexDetail', 0)
        // this.urlObj = []
      }
      next()
    },
    beforeDestroy() {

    },
    methods: {
      getCurrentIndex(e) {
        this.currentIndex = e;
        this.detailSwiper.slideTo(this.currentIndex);
        this.$store.commit('setCurrentBtnIndexDetail', this.currentIndex)
      },
      onClickImage(url) {
        this.imageUrl = url
        this.showImagePanel = true
      },
      getTaskStatus(state) {
        switch (state) {
          case 0: {
            this.state = '暂存'
            break
          }
          case 1: {
            this.state = '新增'
            break
          }
          case 2: {
            if (util.compareDate(this.detailObj.endtime, new Date())) {
              this.state = '进行中'
            } else {
              this.state = '未完成'
            }
            if (this.$store.getters.currentRole === 3) {

            }
            if (this.$store.getters.currentRole === 0) {
              if (this.$store.state.taskType === 'sign') {
                this.showBtn = true
              } else {
                if (this.detailObj.chargerID === this.$store.state.openID) {
                  this.showBtn = true
                } else {
                  this.showBtn = false
                }
              }
            }

            break
          }
          case 3: {
            if (this.isFinish(this.detailObj) === 1) {
              this.state = '已完成'
            } else if (this.isFinish(this.detailObj) === 0) {
              this.state = '未完成'
            }
            // if(this.$store.state.taskType === 'sign'){
            //   this.showBtn = true
            // }else{
            //   this.showBtn = false
            // }
            this.showBtn = false
            break
          }
          case 4: {
            this.state = '已废止'
            this.showBtn = false
            break
          }
          default: {
            this.state = ''
            this.showBtn = false
            break
          }
        }

        return this.state
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
      isFinish(item) {
        if (item.taskLifeList && item.taskLifeList.length > 0) {
          for (let i = 0; i < item.taskLifeList.length; i++) {
            if (item.taskLifeList[i].type === 3) {
              return item.taskLifeList[i].done_type
            }
          }
        }
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
      judgeShowBtn() {
        // if (this.$store.state.currentTabIndex === 1 || this.$store.state.currentTabIndex === 4) {
        //   this.showBtn = false
        // }
        if ((this.detailObj.state === 3) && this.detailObj.isTimeout === 0 || this.detailObj.state === 4) {
          this.showBtn = false
        }
        else {
          if (this.$store.getters.currentRole === 1) {
            this.showBtn = true
          }
          else if (this.$store.getters.currentRole === 3) {
            let leaderArr = this.$store.getters.leaderArr
            let helperIDs = []
            if (this.detailObj.helperID) {
              helperIDs = this.detailObj.helperID.split(',')
            }

            let weight1 = 0
            let weight2 = 0
            for (let i = 0; i < leaderArr.length; i++) {
              if (this.detailObj.chargerID === leaderArr[i].fleaderID) {
                weight1 = 2
              } else if (helperIDs.indexOf(leaderArr[i].fleaderID) > -1) {
                weight2 = 1
              }
            }
            if (weight2 < weight1) {
              this.showBtn = true
            } else {
              this.showBtn = false
            }
          }
          else if (this.$store.getters.currentRole === 4 || this.$store.getters.currentRole === 2) {
            this.showBtn = true
          }
          else {
            if (this.detailObj.chargerID === this.$store.getters.openID) {
              this.showBtn = true
            } else {
              this.showBtn = false
            }
          }
        }
      },
      judgeShowBtnByState(detailObj) {
        let state = ''
        let show = false
        let detailState = detailObj.state
        switch (detailState) {
          case 0: {
            state = '暂存'
            show = false
            break
          }
          case 1: {
            state = '新增'
            show = false
            break
          }
          case 2: {
            if (util.compareDate(detailObj.endtime, new Date())) {
              state = '进行中'
            } else {
              state = '未完成'
            }
            show = true

            // if (this.$store.getters.currentRole === 3) {
            //
            // }
            // if (this.$store.getters.currentRole === 0) {
            //   if (this.$store.state.taskType === 'sign') {
            //     this.showBtn = true
            //   } else {
            //     if (this.detailObj.chargerID === this.$store.state.openID) {
            //       this.showBtn = true
            //     } else {
            //       this.showBtn = false
            //     }
            //   }
            // }
            break
          }
          case 3: {
            if (this.isFinish(detailObj) === 1) {
              state = '已完成'
            } else if (this.isFinish(detailObj) === 0) {
              state = '未完成'
            }
            show = false

            // this.showBtn = false
            break
          }
          case 4: {
            state = '已废止'
            show = false
            // this.showBtn = false
            break
          }
          default: {
            state = ''
            show = false
            // this.showBtn = false
            break
          }
        }

        return show
      },
      judgeShowBtnByRole(btnName) {
        switch (btnName) {
          case '变更': {
            // break
          }
          case '废止': {
            if (this.judgeShowBtnByState(this.detailObj)) {

              if (this.$store.getters.currentRole == 0) {
                if (this.$store.getters.taskType === 'charge') {
                  if (this.detailObj.chargerID === this.$store.getters.openID) {
                    this.changeBtnOpen = true
                    return true
                  } else {
                    this.changeBtnOpen = false
                    return false
                  }
                }
                else if (this.$store.getters.taskType === 'sign') {
                  this.changeBtnOpen = true
                  return true
                }
                else {
                  this.changeBtnOpen = false
                  return false
                }

              }
              else if (this.$store.getters.currentRole == 3) {
                let leaderArr = this.$store.getters.leaderArr

                let leaderIdArr = leaderArr.map((item) => {
                  return item.fleaderID
                })

                if (leaderIdArr.indexOf(this.detailObj.chargerID) > -1) {
                  this.changeBtnOpen = true
                  return true
                } else {
                  this.changeBtnOpen = false
                  return false
                }

                // alert(leaderArr.length)
                // alert(JSON.stringify(leaderArr))
                // for (let i = 0; i < leaderArr.length; i++) {
                //   alert(i)
                //   alert(leaderArr[i].fleaderName)
                //   if (this.detailObj.chargerID === leaderArr[i].fleaderID) {
                //     this.changeBtnOpen = true
                //     flag = true
                //     return true
                //   }else{
                //     if(!flag){
                //       this.changeBtnOpen = false
                //       return false
                //     }else{
                //       return true
                //     }
                //   }
                // }
                // return this.changeBtnOpen
              }
              else if (this.$store.getters.currentRole == 1) {
                // if (this.detailObj.signerID === this.$store.getters.openID) {
                if (this.detailObj.sourceID === '7') {
                  this.changeBtnOpen = true
                  return true
                }else{
                  this.changeBtnOpen = false
                  return false
                }
              }
              else {
                this.changeBtnOpen = true
                return true
              }

              // this.changeBtnOpen = true
              // return true
            }
            else {
              this.changeBtnOpen = false
              return false
            }
            break
          }
          case '删除': {
            if (this.$store.getters.currentRole == 2 || this.$store.getters.currentRole == 4) {
              this.deleteBtnOpen = true
              return true
            } else {
              this.deleteBtnOpen = false
              return false
            }
            break
          }
          case '反馈': {

          }
          case '完结': {
            let flag = false
            if (this.judgeShowBtnByState(this.detailObj)) {
              if (this.$store.getters.currentRole == 0) {
                if (this.$store.getters.taskType === 'charge') {
                  if (this.detailObj.chargerID === this.$store.getters.openID) {
                    this.feedbackBtnOpen = true
                    return true
                  } else {
                    this.feedbackBtnOpen = false
                    return false
                  }
                }
                else if (this.$store.getters.taskType === 'sign') {
                  // this.feedbackBtnOpen = true
                  this.feedbackBtnOpen = false
                  // return true
                  return false
                }
                else {
                  this.feedbackBtnOpen = false
                  return false
                }

              }
              else if (this.$store.getters.currentRole == 3) {
                let leaderArr = this.$store.getters.leaderArr
                let leaderIdArr = leaderArr.map((item) => {
                  return item.fleaderID
                })
                if (leaderIdArr.indexOf(this.detailObj.chargerID) > -1) {
                  this.feedbackBtnOpen = true
                  return true
                } else {
                  this.feedbackBtnOpen = false
                  return false
                }
              }
              else if (this.$store.getters.currentRole == 1 && this.$store.getters.taskType === 'charge') {
                this.feedbackBtnOpen = true
                return true
              } else {
                this.feedbackBtnOpen = false
                return false
              }
            } else {
              this.feedbackBtnOpen = false
              return false
            }
            break
          }
          case '传阅': {
            if (this.judgeShowBtnByState(this.detailObj)) {
              if (this.$store.getters.currentRole == 0) {
                if(this.detailObj.chargerID === this.$store.getters.openID){
                  return true
                }else{
                  return false
                }
              } else {
                return false
              }
            } else {
              return false
            }
            break
          }
          case '催办': {
            if (this.judgeShowBtnByState(this.detailObj)) {
              if (this.$store.getters.currentRole == 0 && this.$store.getters.taskType === 'sign') {
                return true
              } else if (this.$store.getters.currentRole == 2 || this.$store.getters.currentRole == 4) {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
            break
          }

          default: {
            break
          }
        }

      },
      onClickToDeleteTask() {
        let question = confirm("确定要删除这项工作吗?")
        if (question) {
          this.beSureToDeleteTask()
        }
      },
      beSureToDeleteTask() {
        let taskId = this.detailObj.id;
        let paramsObj = { taskId }
        let url = this.$url + '/taskSystem/task/deleteTask'
        this.loading = true

        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: Qs.stringify(paramsObj)
        }).then((response) => {
          // alert(JSON.stringify(response.data))
          if (this.$store.getters.currentRole === 2) {
            this.path = 'listSourceAdmin'
          } else if (this.$store.getters.currentRole === 4) {
            this.path = 'listSourceAdmin'
          }

          this.loading = false
          this.tipVisible = true
          if (response.data.success === true) {
            this.success = true
          } else {
            this.success = false
            alert(response.data.outerMessage)
          }
        })
      },
      passRound() {
        let _this = this
        let arr1 = []
        let arr2 = []
        qing.call('selectPersons', {
          'isMulti': true,
          'success': function (result) {
            result.data.persons.forEach((item) => {
              arr1.push(item.openId)
              arr2.push(item.name)
            })
            let readerID = arr1.join(',')
            let readerName = arr2.join(',')
            // alert(_this.helperName)

            let taskLifeList = [{}]
            taskLifeList[0].parentID = _this.detailObj.id
            taskLifeList[0].type = 6
            taskLifeList[0].read_readerID = readerID
            taskLifeList[0].read_readerName = readerName
            taskLifeList[0].lifePointList = [{}]
            taskLifeList[0].lifePointList[0].index = 1
            taskLifeList[0].lifePointList[0].approverID = _this.approverID
            taskLifeList[0].lifePointList[0].approverAvatarUrl = _this.approverAvatarUrl
            taskLifeList[0].lifePointList[0].approverName = _this.approverName

            let url = _this.$url + '/taskSystem/task/life'
            _this.loading2 = true
            axios({
              method: 'post',
              url: url,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              data: Qs.stringify({
                jsonStr: JSON.stringify(taskLifeList),
              })
            }).then((response) => {
              _this.loading2 = false
              alert(`已传阅给${readerName}`)
            }).catch(() => {
              alert('传阅失败')
            })
          }
        });
      },
      urge() {
        this.maskVisible = false
        let url = this.$url + '/taskSystem/msg/sendMsg'
        let param = {
          openID: [this.detailObj.chargerID],
          msg: `您负责的【${this.detailObj.projectName}】收到来自【${this.approverName}】的催办消息，内容如下：【${this.msg}】`
        }
        this.loading3 = true
        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: Qs.stringify(param, { arrayFormat: 'brackets' })
        }).then((response) => {
          this.loading3 = false
          alert('催办成功')
        }).catch(() => {
          alert('催办失败')
        })
      }
    },
  }
</script>

<style scoped lang="scss">
    * {
        font-size: 12px;
    }

    .swiper-container {
        height: calc(100% - 0.4rem);
        .swiper-wrapper {
            height: 100%;
        }
    }

    .swiper-slide {
        height: 100%;
        .scroll-wrap {
            height: calc(100% - 0.45rem);
            overflow: hidden;
            background-color: #F2F6F9;
            &.hideBtn {
                height: 100%;
            }
            /*>div{*/
            /*&.hideBtn {*/
            /*height: 100%;*/
            /*}*/
            /*}*/
            > div > .block {
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
                            padding: 0.12rem 0.3rem 0.12rem 0;
                            font-size: 0.14rem;
                            color: #a0a0a0;
                            /*border-bottom: 1px solid #fff;*/
                            width: calc(4em + 0.3rem);
                        }
                        .right {
                            padding: 0.12rem 0;
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
                        height: 3.8rem;
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
                        span {
                            font-size: 0.14rem;
                            color: #454545;
                        }
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
                        .left {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            span.status {
                                font-size: 0.14rem;
                                color: #16b685;
                            }
                            span.urge {
                                margin-left: 0.1rem;
                                background: #367be7;
                                border-radius: 0.11rem;
                                width: 0.5rem;
                                height: 0.2rem;
                                font-size: 0.12rem;
                                color: #ffffff;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                        }
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
            .btn {
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
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }

    .swiper-slide {
        &:last-child {
            background-color: #fff;
        }
    }

    .timeline {
        padding-top: 0.3rem;
        /*height: calc(100% - 0.3rem);*/
        height: 100%;
        > div {
            height: 100%;
            overflow: hidden;
        }
        .item-wrap {
            /*margin-bottom: 0.2rem;*/
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

    .float-btn {
        position: fixed;
        right: 0.12rem;
        bottom: 0.8rem;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        z-index: 9;
        /*background-color: rgba(255, 255, 255, 0.5);*/
        background-color: #599bff;
        /*transform: translateY(20%);*/
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 2em;
            height: 1em;
            font-size: 0.1rem;
            color: #ffffff;
            line-height: 1;
        }
    }

    .mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #fff;
        z-index: 11111;
        .block {
            /*margin-bottom: 0.1rem;*/
            background-color: #fff;
            height: calc(100% - 0.45rem);
            overflow: scroll;
            .title-wrap {
                padding: 0.14rem 0;
                margin-right: 0.12rem;
                margin-left: 0.12rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 0.01rem solid #ebebeb;
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
                border: 0.01rem solid #4488f0;
                border-radius: 0.165rem;
                width: 1.37rem;
                height: 0.32rem;
                background-color: #fff;
                span {
                    font-size: 0.15rem;
                    color: #397de8;
                }
            }
            .btn2 {
                display: flex;
                justify-content: center;
                align-items: center;
                border: 0.01rem solid #4488f0;
                border-radius: 0.165rem;
                width: 1.37rem;
                height: 0.32rem;
                background-color: #397de8;
                span {
                    font-size: 0.15rem;
                    color: #fff;
                }
            }
        }
    }

</style>