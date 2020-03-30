<template>
    <div style="height: 100%">
        <div class="scroll-wrap" style="height: calc(100% - 0.45rem);overflow: hidden" ref="wrapper">
            <div>
                <div class="block field">
                    <div class="title-wrap">
                        <field-title :blueline-visible="false" :redstar-visible="false">{{detailObj.projectName}}
                        </field-title>
                        <span class="status"
                              v-if="detailObj && detailObj.state">{{getTaskStatus(detailObj.state)}}</span>

                    </div>
                    <div class="content">
                        <div class="row">
                            <div class="top">
                                <div class="label">完成日期</div>
                                <div class="right">{{detailObj.endtime && detailObj.endtime.split(' ')[0]}}</div>
                            </div>
                            <div class="bottom">
                                <div class="label">变更为</div>
                                <div class="right" @click="isVisible1 = !isVisible1">
                                    <span>{{(endtime && endtime.split(' ')[0]) ||'请选择'}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="top">
                                <div class="label">单位</div>
                                <div class="right">{{$judgeUndefined(detailObj.unitName)}}</div>
                            </div>
                            <div class="bottom">
                                <div class="label">变更为</div>
                                <div class="right yunzhijia">
                                    <span>{{unitName||'请选择'}}</span>
                                    <i class="icon" @click="onClickToChooseCompany"></i>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="top">
                                <div class="label">责任人</div>
                                <div class="right">{{$judgeUndefined(detailObj.chargerName)}}</div>
                            </div>
                            <div class="bottom">
                                <div class="label">变更为</div>
                                <div class="right yunzhijia">
                                    <span>{{chargerName||'请选择'}}</span>
                                    <i class="icon" @click="onClickToChooseCharger"></i>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="top">
                                <div class="label">协助人</div>
                                <!--<div class="right">{{$judgeUndefined(detailObj.helperName)}}</div>-->
                                <div class="right">{{$judgeUndefined(changeInfoObj.before.helperName)}}</div>
                                <i class="icon delete-btn" @click="deleteOriginHelper"></i>
                            </div>
                            <div class="bottom">
                                <div class="label">变更为</div>
                                <div class="right yunzhijia clearAble">
                                    <!--<span>{{helperName||'请选择'}}</span>-->
                                    <span>{{changeInfoObj.after.helperName||'请选择'}}</span>
                                    <div class="icon-wrap">
                                        <i class="icon iconClear" @click="clearHelper"></i>
                                        <i class="icon" @click="onClickToChooseHelper"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div class="title-wrap">
                        <field-title :blueline-visible="false" :redstar-visible="false">预期目标</field-title>
                        <!--<span class="status" v-if="detailObj && detailObj.state">{{getTaskStatus(detailObj.state)}}</span>-->
                    </div>
                    <div class="text">
                        <div class="word">{{$judgeUndefined(detailObj.aim)}}</div>
                        <c-textarea default-value=""
                                    remark=""
                                    tips="请输入变更内容"
                                    @update:inputValue="changeInfoObj.after.aim = $event"></c-textarea>
                    </div>
                </div>
                <div class="block">
                    <div class="title-wrap">
                        <field-title :blueline-visible="false" :redstar-visible="true">变更原因</field-title>
                    </div>
                    <div class="text">
                        <c-textarea default-value=""
                                    remark=""
                                    tips="请输入变更原因"
                                    @update:inputValue="change_reason = $event"></c-textarea>
                    </div>
                </div>
                <!--<div class="block picture">-->
                <!--<div class="title-wrap">-->
                <!--<div>-->
                <!--<field-title :blueline-visible="true" :redstar-visible="false">附件</field-title>-->
                <!--<span class="sub-des">共{{urlObj.length}}张</span>-->
                <!--</div>-->
                <!--<i class="icon" @click="onClickToChooseImage"></i>-->
                <!--</div>-->
                <!--<div class="des-wrap images">-->
                <!--<div class="i1 pic-wrapper" v-for="item in urlObj" @click="onClickImage(item.url)">-->
                <!--<div class="img-wrap">-->
                <!--&lt;!&ndash;<img :src="item.url" class="picture" alt="">&ndash;&gt;-->
                <!--<img :src="item.url" class="picture" @load="item.showLoading = false"-->
                <!--v-show="!item.showLoading">-->
                <!--<img src="../assets/默认图片.png" class="picture" v-show="item.showLoading">-->
                <!--<i class="icon" @click="onClickToRemoveImg($event,item)"></i>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <!--<div class="block approver" v-if="$store.state.taskType === 'charge'">-->
                <!--<div class="title-wrap">-->
                <!--<div>-->
                <!--<field-title :blueline-visible="false" :redstar-visible="false">审批人</field-title>-->
                <!--</div>-->
                <!--<i class="icon" @click="onClickToChooseApprover"></i>-->
                <!--</div>-->
                <!--<div class="des-wrap">-->
                <!--<div class="wrap">-->
                <!--<div class="left">-->
                <!--&lt;!&ndash;<img :src="approverAvatarUrl" alt="">&ndash;&gt;-->
                <!--<img :src="approverAvatarUrl" alt="" v-if="approverAvatarUrl">-->
                <!--</div>-->
                <!--<div class="right">-->
                <!--&lt;!&ndash;<span>{{approverName}}</span>&ndash;&gt;-->
                <!--<span>{{approverName}}</span>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <div class="block approver"
                     v-if="$store.state.taskType === 'charge' && $store.getters.currentRole === 3">
                    <div class="title-wrap">
                        <div>
                            <field-title :blueline-visible="false" :redstar-visible="false">责任人审批</field-title>
                        </div>
                        <i class="icon" @click="onClickToChooseApprover"></i>
                    </div>
                    <div class="des-wrap">
                        <div class="wrap">
                            <div class="left">
                                <img :src="approverAvatarUrl" v-if="approverAvatarUrl">
                                <!--<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg" alt="">-->
                            </div>
                            <div class="right">
                                <span>{{approverName}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block approver"
                     v-if="$store.state.taskType === 'charge' && this.$store.getters.currentRole !== 2 && this.$store.getters.currentRole !== 4">
                    <div class="title-wrap">
                        <div>
                            <field-title :blueline-visible="false" :redstar-visible="false">上级领导审批</field-title>
                        </div>
                        <i class="icon" @click="onClickToChooseChargersLeader"></i>
                    </div>
                    <div class="des-wrap">
                        <div class="wrap">
                            <div class="left">
                                <img :src="chargersLeaderAvatarUrl" v-if="chargersLeaderAvatarUrl">
                                <!--<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg" alt="">-->
                            </div>
                            <div class="right">
                                <span>{{chargersLeaderName}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="button-wrap">
            <!--<div class="btn1">-->
            <!--<span>暂存</span>-->
            <!--</div>-->
            <div class="btn2" @click="onClickToSave">
                <span>发送</span>
            </div>
        </div>
        <nut-datepicker
                :is-visible="isVisible1"
                type="date"
                title="请选择日期"
                :is-show-chinese="false"
                :defaultValue="today"
                endDate="2199-10-05"
                @close="switchPicker('isVisible1')"
                @choose="setChooseValue1"
        >
        </nut-datepicker>
        <image-panel :url="imageUrl" :showImagePanel.sync="showImagePanel"></image-panel>
        <StatePage :success="success"
                   @update:tipVisible="tipVisible=$event"
                   :tipVisible="tipVisible"
                   :tipFailedDesc="tipFailedDesc"
                   :jump-to="path"
        ></StatePage>
        <FullPageLoading :loading="loading"></FullPageLoading>
        <FullPageLoading :loading="loading1"></FullPageLoading>
        <FullPageLoading :loading="loading2"></FullPageLoading>
        <FullPageLoading :loading="loading3"></FullPageLoading>
        <Validator :source="source"
                   :validatorVisible="validatorVisible"
                   @update:validatorVisible="validatorVisible=$event"></Validator>
    </div>
</template>

<script>
  import util from '../util'
  import axios from 'axios'
  import Qs from 'qs'

  const urlObj = [
    {
      url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg'
    },
    {
      url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg'
    },
    {
      url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg'
    },
    {
      url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg'
    },
    {
      url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6niksccotj30ku112acg.jpg'
    },
    {
      url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6niksccotj30ku112acg.jpg'
    },
    {
      url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg'
    },
    {
      url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg'
    },
    {
      url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg'
    }
  ]

  export default {
    name: "change",
    data() {
      return {
        // urlObj:[],
        urlObj,
        isVisible1: false,
        scroll: null,
        loading: false,
        loading1: false,
        loading2: false,
        loading3: false,
        tipVisible: false,
        success: false,
        imageUrl: undefined,
        showImagePanel: false,
        today: util.getYearMonthDayString(new Date()),
        endtime: '',
        unitName: '',
        unitID: '',
        chargerID: '',
        chargerName: '',
        chargerAvatarUrl: '',

        chargersLeaderID: '',
        chargersLeaderName: '',
        chargersLeaderAvatarUrl: '',

        helperID: '',
        helperName: '',
        aim: '',
        change_reason: '',
        detailObj: {},
        approverID: '',
        approverName: '',
        approverAvatarUrl: '',
        source: {},//表单验证
        validatorVisible: false,
        taskLifeList: [],
        path: '',
        tipFailedDesc: '',
        changeInfoObj: {
          before: {
            endtime: '',
            unitID: '',
            unitName: '',
            chargerID: '',
            chargerName: '',
            helperID: '',
            helperName: '',
            aim: ''
          },
          after: {
            endtime: '',
            unitID: '',
            unitName: '',
            chargerID: '',
            chargerName: '',
            helperID: '',
            helperName: '',
            aim: ''
          }
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      qing.call('setWebViewTitle', { 'title': '变更' })

      next((vm) => {
        if (from.name === 'taskdetail') {
          let { detailObj } = vm.$route.params
          console.log(detailObj)

          vm.detailObj = detailObj

          if (vm.detailObj) {
            localStorage.setItem('detailObj', JSON.stringify(vm.detailObj))
          }
        } else {
          vm.detailObj = JSON.parse(localStorage.getItem('detailObj'))
        }

        vm.changeInfoObj.before.endtime = vm.detailObj.endtime
        vm.changeInfoObj.before.unitID = vm.detailObj.unitID
        vm.changeInfoObj.before.unitName = vm.detailObj.unitName
        vm.changeInfoObj.before.chargerID = vm.detailObj.chargerID
        vm.changeInfoObj.before.chargerName = vm.detailObj.chargerName
        vm.changeInfoObj.before.helperID = vm.detailObj.helperID
        vm.changeInfoObj.before.helperName = vm.detailObj.helperName
        vm.changeInfoObj.before.aim = vm.detailObj.aim

        vm.changeInfoObj.after.endtime = vm.detailObj.endtime
        vm.changeInfoObj.after.unitID = vm.detailObj.unitID
        vm.changeInfoObj.after.unitName = vm.detailObj.unitName
        vm.changeInfoObj.after.chargerID = vm.detailObj.chargerID
        vm.changeInfoObj.after.chargerName = vm.detailObj.chargerName
        vm.changeInfoObj.after.helperID = vm.detailObj.helperID
        vm.changeInfoObj.after.helperName = vm.detailObj.helperName
        vm.changeInfoObj.after.aim = vm.detailObj.aim


        console.log('vm.detailObj.taskLifeList', vm.detailObj.taskLifeList)
        vm.urlObj = []
        if (vm.detailObj.imgs) {
          vm.detailObj.imgs.split(',').forEach((imgurl) => {
            vm.urlObj.push({ url: imgurl, showLoading: true })
          })
        }


        if (vm.detailObj.chargerID) {
          vm.loading1 = true

          vm.$getPersonInfoByOpenID(vm.detailObj.chargerID)
            .then((response) => {
              let data = response.data.result.data[0]
              vm.approverID = data.openId

              vm.approverName = data.name

              vm.approverAvatarUrl = data.photoUrl


              // vm.leadersLeader = {
              //   'openId': response.data.result.data[0].openId,
              //   'name': response.data.result.data[0].name,
              //   'photoUrl': response.data.result.data[0].photoUrl,
              // }
              vm.loading1 = false

            }).catch((error) => {
            alert("获取责任人信息失败")
          })

        }
        console.log('vm.detailObj.signerID', vm.detailObj.signerID)
        if (vm.detailObj.signerID && vm.detailObj.signerID !== null) {
          vm.loading3 = true

          vm.$getPersonInfoByOpenID(vm.detailObj.signerID)
            .then((response) => {
              let data = response.data.result.data[0]
              vm.chargersLeaderID = data.openId
              vm.chargersLeaderName = data.name
              vm.chargersLeaderAvatarUrl = data.photoUrl

              // vm.leadersLeader = {
              //   'openId': response.data.result.data[0].openId,
              //   'name': response.data.result.data[0].name,
              //   'photoUrl': response.data.result.data[0].photoUrl,
              // }

              if (vm.$store.getters.openID === vm.chargersLeaderID) {
                vm.chargersLeaderID = ''
                vm.chargersLeaderName = ''
                vm.chargersLeaderAvatarUrl = ''
              }
              vm.loading3 = false
            }).catch((error) => {
            alert("获取主管领导信息失败")
          })
        }
        // else{
        //   // 获取责任人领导信息
        //   vm.loading2 = true
        //   let getpersonQueryObj = {
        //     "eid": "8738001",
        //     "openId": vm.detailObj.chargerID,
        //   }
        //   let yunzhijiaURL = vm.$url + "/taskSystem/intf/cloud"
        //   axios.get(yunzhijiaURL, {
        //     params: {
        //       url: '/gateway/opendata-control/data/getperson',
        //       dataStr: JSON.stringify(getpersonQueryObj),
        //       authorize: 'app'
        //     }
        //   })
        //     .then((response) => {
        //       let orgId = response.data.result.data[0].orgId
        //
        //       // alert(orgId)
        //       let getorgpersonsQueryObj = {
        //         "eid": "8738001",
        //         "orgId": orgId,
        //       }
        //
        //       if (orgId) {
        //         axios.get(yunzhijiaURL, {
        //           params: {
        //             url: '/gateway/opendata-control/data/getorg',
        //             dataStr: JSON.stringify(getorgpersonsQueryObj),
        //             authorize: 'app'
        //           }
        //         }).then((response) => {
        //           console.log(response.data.result.data.inChargers[0])
        //           let inChargers = response.data.result.data.inChargers
        //           if (inChargers[0]) {
        //
        //             let inCharger = inChargers[0]
        //             vm.chargersLeaderID = inCharger.openId
        //             vm.chargersLeaderName = inCharger.name
        //             vm.chargersLeaderAvatarUrl = inCharger.photoUrl
        //
        //             vm.loading2 = false
        //
        //             if (vm.$store.getters.openID === vm.chargersLeaderID) {
        //               vm.chargersLeaderID = ''
        //               vm.chargersLeaderName = ''
        //               vm.chargersLeaderAvatarUrl = ''
        //             }
        //
        //           } else {
        //             vm.loading2 = false
        //           }
        //         })
        //       } else {
        //         vm.loading2 = false
        //       }
        //
        //
        //     })
        //     .catch((error) => {
        //       alert("获取主管领导信息失败")
        //     })
        // }


      })
    },
    mounted() {
      this.$initScroll(this.scroll, this.$refs.wrapper)
    },
    beforeDestroy() {
      this.urlObj = []
    },
    methods: {
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
      onClickToChooseImage() {
        let _this = this
        qing.call('chooseImage', {
          'type': 'camera',
          'needCut': false,
          'isMulti': true,
          'maxSelectCount': 9,
          'showOrigin': false,
          'success': function (res) {
            // alert(JSON.stringify(res))
            res.data.localIds.forEach((localId) => {
              qing.call('uploadImage', {
                localId: localId,
                isShowProgressTips: 1,
                success: function (result) {
                  // alert(JSON.stringify(result))
                  // alert(result.success)
                  if (result.success === "true" || result.success === true) {
                    let serverId = result.data.serverId
                    _this.urlObj.push({
                      url: `https://yunzhijia.com//openfile/download/media/${serverId}`,
                      showLoading: true
                    })
                  } else {
                    alert("图片上传失败，请重试")
                  }
                }
              });
            })
          }
        });
      },
      onClickToChooseApprover() {
        let _this = this
        qing.call('selectPersons', {
          'isMulti': false,
          'success': function (result) {
            _this.approverAvatarUrl = result.data.persons[0].avatarUrl
            _this.approverName = result.data.persons[0].name
            _this.approverID = result.data.persons[0].openId
            // alert(JSON.stringify(result.data.persons[0]))
          }
        });
      },
      switchPicker(param) {
        console.log(222)
        // this.isVisible = false
        // console.log(this.isVisible)
        this[`${param}`] = !this[`${param}`];
        // this[`${param}`] = false
        console.log(this[`${param}`])
      },
      // setChooseValue1(param) {
      //   this.endtime = param[3];
      //   if(this.endtime&&this.detailObj.starttime){
      //     if(!this.compareDate(this.endtime,this.detailObj.starttime)){
      //       alert('完成时间必须大于开始时间')
      //       this.endtime = undefined
      //     }
      //   }
      // },
      setChooseValue1(param) {
        this.endtime = param[3];
        if (this.endtime && this.detailObj.starttime) {
          if (!this.compareDate(this.endtime, this.detailObj.starttime)) {
            alert('完成时间必须大于开始时间')
            this.endtime = undefined
          } else {
            this.endtime = util.getYearMonthDayHMSString(new Date(param[3]), 'end')
          }
        } else {

        }
        this.changeInfoObj.after.endtime = this.endtime
      },
      compareDate(date1, date2) {
        if (!date1) {
          return false
        }
        if (!date2) {
          return false
        }

        if (typeof date1 === 'string') {
          date1 = date1.replace(/-/g, '/')
        }
        if (typeof date2 === 'string') {
          date2 = date2.replace(/-/g, '/')
        }

        let oDate1 = new Date(date1);
        oDate1.setHours(0, 0, 0)
        let oDate2 = new Date(date2);
        if (oDate1.getTime() > oDate2.getTime()) {
          return true
        } else {
          return false
        }
      },
      onClickToChooseCompany() {
        let _this = this
        qing.call('selectOrgs', {
          'isMulti': false,
          'success': function (result) {
            _this.unitID = result.data.orgs[0].orgId
            _this.unitName = result.data.orgs[0].orgName

            _this.changeInfoObj.after.unitID = _this.unitID
            _this.changeInfoObj.after.unitName = _this.unitName
          }
        });
      },
      // onClickToChooseCharger() {
      //   let _this = this
      //   qing.call('selectPersons', {
      //     'isMulti': false,
      //     'success': function (result) {
      //       _this.chargerID = result.data.persons[0].openId
      //       _this.chargerName = result.data.persons[0].name
      //     }
      //   });
      // },

      onClickToChooseHelper() {
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
            _this.helperID = arr1.join(',')
            _this.helperName = arr2.join(',')
            // alert(_this.helperName)

            _this.changeInfoObj.after.helperID = _this.helperID
            _this.changeInfoObj.after.helperName = _this.helperName
          }
        });
      },
      clearHelper() {
        this.helperID = undefined
        this.helperName = undefined

        this.changeInfoObj.after.helperID = undefined
        this.changeInfoObj.after.helperName = undefined
      },
      deleteOriginHelper() {
        this.helperID = ''
        this.helperName = ''

        this.changeInfoObj.before.helperID = '未设置'
        this.changeInfoObj.before.helperName = '未设置'
      },
      saveData() {
        // let changeInfoObj = {
        //   before: {
        //     endtime: this.detailObj.endtime,
        //     unitID: this.detailObj.unitID,
        //     unitName: this.detailObj.unitName,
        //     chargerID: this.detailObj.chargerID,
        //     chargerName: this.detailObj.chargerName,
        //     helperID: this.detailObj.helperID,
        //     helperName: this.detailObj.helperName,
        //     aim: this.detailObj.aim
        //   },
        //   after: {
        //     endtime: this.endtime || undefined,
        //     unitID: this.unitID || undefined,
        //     unitName: this.unitName || undefined,
        //     chargerID: this.chargerID || undefined,
        //     chargerName: this.chargerName || undefined,
        //     helperID: this.helperID || undefined,
        //     helperName: this.helperName || undefined,
        //     aim: this.aim || undefined
        //   }
        // }
        // Object.keys(changeInfoObj.before).forEach(function (key) {
        //   let value = changeInfoObj.before[key]
        //   if (value === undefined || value === null || value === 'null' || value === 'undefined' || value === '') {
        //     changeInfoObj.before[key] = '未设置'
        //   }
        // })
        // Object.keys(changeInfoObj.after).forEach(function (key) {
        //   let value = changeInfoObj.after[key]
        //   if (value === undefined || value === null || value === 'null' || value === 'undefined' || value === '') {
        //     changeInfoObj.after[key] = undefined
        //   }
        // })
        // if (!changeInfoObj.after.endtime) {
        //   changeInfoObj.before.endtime = undefined
        // }
        // if (!changeInfoObj.after.unitID) {
        //   changeInfoObj.before.unitID = undefined
        // }
        // if (!changeInfoObj.after.unitName) {
        //   changeInfoObj.before.unitName = undefined
        // }
        // if (!changeInfoObj.after.chargerID) {
        //   changeInfoObj.before.chargerID = undefined
        // }
        // if (!changeInfoObj.after.chargerName) {
        //   changeInfoObj.before.chargerName = undefined
        // }
        // if (!changeInfoObj.after.helperID) {
        //   changeInfoObj.before.helperID = undefined
        // }
        // if (!changeInfoObj.after.helperName) {
        //   changeInfoObj.before.helperName = undefined
        // }
        // if (!changeInfoObj.after.aim) {
        //   changeInfoObj.before.aim = undefined
        // }
        // if (changeInfoObj.after.helperName === 'delete') {
        //   changeInfoObj.after.helperName = ''
        // }
        // if (changeInfoObj.after.helperID === 'delete') {
        //   changeInfoObj.before.helperID = ''
        // }

        if (this.changeInfoObj.before.endtime === this.changeInfoObj.after.endtime) {
          this.changeInfoObj.before.endtime = undefined
          this.changeInfoObj.after.endtime = undefined
        }
        if (this.changeInfoObj.before.unitID === this.changeInfoObj.after.unitID) {
          this.changeInfoObj.before.unitID = undefined
          this.changeInfoObj.after.unitID = undefined
          this.changeInfoObj.before.unitName = undefined
          this.changeInfoObj.after.unitName = undefined
        }
        if (this.changeInfoObj.before.chargerID === this.changeInfoObj.after.chargerID) {
          this.changeInfoObj.before.chargerID = undefined
          this.changeInfoObj.after.chargerID = undefined
          this.changeInfoObj.before.chargerName = undefined
          this.changeInfoObj.after.chargerName = undefined
        }
        if (this.changeInfoObj.before.helperID === this.changeInfoObj.after.helperID) {
          this.changeInfoObj.before.helperID = undefined
          this.changeInfoObj.after.helperID = undefined
          this.changeInfoObj.before.helperName = undefined
          this.changeInfoObj.after.helperName = undefined
        }
        if (this.changeInfoObj.before.aim === this.changeInfoObj.after.aim) {
          this.changeInfoObj.before.aim = undefined
          this.changeInfoObj.after.aim = undefined
        }


        let taskLifeList = [{}]
        taskLifeList[0].parentID = this.detailObj.id
        taskLifeList[0].type = 2
        taskLifeList[0].lifePointList = []

        if (this.$store.getters.currentRole === 3) {
          let lifePoint1 = {}
          lifePoint1.index = 1
          lifePoint1.approverID = this.detailObj.chargerID
          lifePoint1.approverAvatarUrl = this.approverAvatarUrl
          lifePoint1.approverName = this.detailObj.chargerName
          taskLifeList[0].lifePointList.push(lifePoint1)

          let lifePoint2 = {}
          lifePoint2.index = 2
          lifePoint2.approverID = this.chargersLeaderID
          lifePoint2.approverAvatarUrl = this.chargersLeaderAvatarUrl
          lifePoint2.approverName = this.chargersLeaderName


          if (this.chargersLeaderID === localStorage.getItem('chairmanId')) {
            if (this.detailObj.sourceID == 1 || this.detailObj.sourceID == 2 || this.detailObj.sourceID == 3 || this.detailObj.sourceID == 4 || this.detailObj.sourceID == 7) {
              let lifePoint = {}
              lifePoint.approverID = '57c0f003e4b01de693d52384'
              lifePoint.approverName = '晏宁'
              lifePoint.approverAvatarUrl = 'https://static.yunzhijia.com/space/c/photo/load?id=5e0c0d946d67ff33eb8b830d'
              lifePoint.index = 2
              taskLifeList[0].lifePointList.push(lifePoint)

              lifePoint2.index = 3
              taskLifeList[0].lifePointList.push(lifePoint2)
            } else {
              taskLifeList[0].lifePointList.push(lifePoint2)
            }
          } else {
            taskLifeList[0].lifePointList.push(lifePoint2)
          }


          // if (this.chargersLeaderID === localStorage.getItem('chairmanId')) {
          //   if (this.detailObj.sourceID == 1 || this.detailObj.sourceID == 2 || this.detailObj.sourceID == 3 || this.detailObj.sourceID == 4 || this.detailObj.sourceID == 7) {
          //     let lifePoint3 = {}
          //     lifePoint3.approverID = '57c0f003e4b01de693d52384'
          //     lifePoint3.approverName = '晏宁'
          //     lifePoint3.approverAvatarUrl = 'https://static.yunzhijia.com/space/c/photo/load?id=5e0c0d946d67ff33eb8b830d'
          //     lifePoint3.index = 3
          //     taskLifeList[0].lifePointList.push(lifePoint3)
          //
          //   }
          // }
        }
        else if (this.$store.getters.currentRole === 2 || this.$store.getters.currentRole === 4) {
          let lifePoint = {}
          lifePoint.index = 1
          lifePoint.approverID = this.$store.state.openID
          lifePoint.approverAvatarUrl = this.$store.state.avatarUrl
          lifePoint.approverName = this.$store.state.name
          taskLifeList[0].lifePointList.push(lifePoint)

          // if (this.chargersLeaderID === localStorage.getItem('chairmanId')) {
          //   if (this.detailObj.sourceID == 1 || this.detailObj.sourceID == 2 || this.detailObj.sourceID == 3 || this.detailObj.sourceID == 4 || this.detailObj.sourceID == 7) {
          //     let lifePoint3 = {}
          //     lifePoint3.approverID = '57c0f003e4b01de693d52384'
          //     lifePoint3.approverName = '晏宁'
          //     lifePoint3.approverAvatarUrl = 'https://static.yunzhijia.com/space/c/photo/load?id=5e0c0d946d67ff33eb8b830d'
          //     lifePoint3.index = 2
          //     taskLifeList[0].lifePointList.push(lifePoint3)
          //
          //   }
          // }
        }
        else {
          let lifePoint = {}
          lifePoint.index = 1
          if (this.$store.state.taskType === 'charge') {
            lifePoint.approverID = this.chargersLeaderID
            lifePoint.approverAvatarUrl = this.chargersLeaderAvatarUrl
            lifePoint.approverName = this.chargersLeaderName
          } else if (this.$store.state.taskType === 'sign') {
            lifePoint.approverID = this.$store.state.openID
            lifePoint.approverAvatarUrl = this.$store.state.avatarUrl
            lifePoint.approverName = this.$store.state.name
          }
          taskLifeList[0].lifePointList.push(lifePoint)

          if (this.$store.state.taskType === 'charge') {
            if (this.chargersLeaderID === localStorage.getItem('chairmanId')) {
              if (this.detailObj.sourceID == 1 || this.detailObj.sourceID == 2 || this.detailObj.sourceID == 3 || this.detailObj.sourceID == 4 || this.detailObj.sourceID == 7) {
                let lifePoint = {}
                lifePoint.approverID = '57c0f003e4b01de693d52384'
                lifePoint.approverName = '晏宁'
                lifePoint.approverAvatarUrl = 'https://static.yunzhijia.com/space/c/photo/load?id=5e0c0d946d67ff33eb8b830d'
                lifePoint.index = 1

                taskLifeList[0].lifePointList[0].index = 2
                taskLifeList[0].lifePointList.unshift(lifePoint)

              }
            }
          }
        }

        taskLifeList[0].change_info = JSON.stringify(this.changeInfoObj)
        taskLifeList[0].change_reason = this.change_reason
        this.taskLifeList = taskLifeList

        let after
        // if (!this.changeInfoObj.after.chargerID && !this.changeInfoObj.after.unitID && !this.changeInfoObj.after.endtime && !this.changeInfoObj.after.helperID && !this.changeInfoObj.after.aim) {
        //   after = undefined
        // } else {
        //   after = 1
        // }
        if (this.changeInfoObj.after.chargerID === this.changeInfoObj.before.chargerID
          && this.changeInfoObj.after.unitID === this.changeInfoObj.before.unitID
          && this.changeInfoObj.after.endtime === this.changeInfoObj.before.endtime
          && this.changeInfoObj.after.helperID === this.changeInfoObj.before.helperID
          && this.changeInfoObj.after.aim === this.changeInfoObj.before.aim) {
          after = undefined
        }else{
          after = 1
        }
        if (this.$store.getters.taskType === 'sign') {
          this.source = {
            change_reason: this.change_reason,
            after
            // approverID: this.approverID,
          }
        }
        else {
          if (this.$store.getters.currentRole === 3) {
            this.source = {
              change_reason: this.change_reason,
              approverID: this.approverID,
              chargersLeaderID: this.chargersLeaderID,
              after
            }
          }
          else if (this.$store.getters.currentRole === 2 || this.$store.getters.currentRole === 4) {
            this.source = {
              change_reason: this.change_reason,
              after
            }
          }
          else if (this.$store.getters.currentRole == 1 && this.detailObj.sourceID == '7'){
            this.source = {
              change_reason: this.change_reason,
              after
            }
          }
          else {

            this.source = {
              change_reason: this.change_reason,
              chargersLeaderID: this.chargersLeaderID,
              after
            }
          }
        }

      },
      onClickToSave() {
        this.saveData()

        if (this.$store.getters.currentRole === 1) {
          this.path = 'chairmanList'
        }
        // else if(this.$store.getters.currentRole === 2){
        //   this.path = 'list'
        // }
        else if (this.$store.getters.currentRole === 3) {
          this.path = 'list-clerk'
        }
        else if (this.$store.getters.currentRole === 4 || this.$store.getters.currentRole === 2) {
          this.path = 'listSourceAdmin'
        }
        else {
          this.path = 'list'
        }

        setTimeout(() => {
          if (!this.validatorVisible) {
            let url = this.$url + '/taskSystem/task/life'
            // let url1 = this.$url + '/task/startLife'
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
                jsonStr: JSON.stringify(this.taskLifeList),
              })
            }).then((response) => {
              this.loading = false
              this.tipVisible = true
              if (response.data.success === true) {
                this.success = true
              } else {
                this.tipFailedDesc = response.data.outerMessage
                this.success = false
              }
            })
          }
        }, 0)

      },
      onClickToChooseCharger() {
        let _this = this
        qing.call('selectPersons', {
          'isMulti': false,
          'success': function (result) {
            _this.chargerAvatarUrl = result.data.persons[0].avatarUrl
            _this.chargerName = result.data.persons[0].name
            _this.chargerID = result.data.persons[0].openId
            // alert(JSON.stringify(result.data.persons[0]))

            _this.changeInfoObj.after.chargerID = _this.chargerID
            _this.changeInfoObj.after.chargerName = _this.chargerName
          }
        });
      },
      onClickToChooseChargersLeader() {
        let _this = this
        qing.call('selectPersons', {
          'isMulti': false,
          'success': function (result) {
            _this.chargersLeaderAvatarUrl = result.data.persons[0].avatarUrl
            _this.chargersLeaderName = result.data.persons[0].name
            _this.chargersLeaderID = result.data.persons[0].openId
            // alert(JSON.stringify(result.data.persons[0]))
          }
        });
      },


      // getPersonInfoByOpenID(openID) {
      //   let getpersonQueryObj = {
      //     "eid": "8738001",
      //     "type": 1,
      //     "array": [openID]
      //   }
      //   let yunzhijiaURL = this.$url + "/taskSystem/intf/cloud2"
      //
      //   return axios({
      //     method: 'post',
      //     url: yunzhijiaURL,
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      //     },
      //     data: Qs.stringify({
      //       url: '/gateway/openimport/open/person/get',
      //       dataStr: JSON.stringify(getpersonQueryObj),
      //       authorize: 'resGroupSecret'
      //     })
      //   })
      // }
    }
  }
</script>

<style scoped lang="scss">
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
        .text {
            .word {
                margin-left: 0.1rem;
                padding: 0.08rem 0 0.15rem 0;
                font-size: 0.14rem;
                color: #454545;
                border-bottom: 0.01rem solid #ebebeb;
            }
        }
        .content {
            margin-left: 0.12rem;
            margin-right: 0.12rem;
            .row {
                .top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    .label {
                        padding: 0.13rem 0.3rem 0.13rem 0;
                        font-size: 0.14rem;
                        color: #ccc;
                        width: calc(5em + 0.3rem);
                        .star {
                            color: red;
                        }
                    }
                    .right {
                        padding: 0.13rem 0;
                        font-size: 0.14rem;
                        color: #6e6e6e;
                        border-bottom: 1px solid #ccc;
                        flex: 1;
                        .active {
                            color: #b4b4b4;
                        }
                        &.yunzhijia {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .icon {
                                margin-right: 0.12rem;
                                display: inline-block;
                                width: 0.16rem;
                                height: 0.16rem;
                                background: url("../assets/添加.png") no-repeat !important;
                                background-size: contain !important;
                            }

                        }
                        span {
                            display: inline-flex;
                            height: 0.2rem;
                            width: 80%;
                            font-size: 0.14rem;
                        }
                    }
                    .delete-btn {
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);

                        display: inline-block;
                        width: 0.16rem;
                        height: 0.16rem;
                        background: url("../assets/附件删除.png") no-repeat !important;
                        background-size: contain !important;
                    }
                }
                .bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #ccc;
                    .label {
                        padding: 0.13rem 0.3rem 0.13rem 0;
                        font-size: 0.14rem;
                        color: #000;
                        width: calc(5em + 0.3rem);
                        text-align: left;
                        .star {
                            color: red;
                        }
                    }
                    .right {
                        padding: 0.12rem 0;
                        display: flex;
                        /*margin-bottom: 0.16rem;*/
                        /*font-size: 0.14rem;*/
                        color: #6e6e6e;
                        flex: 1;
                        .active {
                            color: #b4b4b4;
                        }
                        &.yunzhijia {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .icon-wrap {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                width: 35%;
                            }
                            .icon {
                                /*margin-right: 0.12rem;*/
                                display: inline-block;
                                width: 0.16rem;
                                height: 0.16rem;
                                background: url("../assets/添加.png") no-repeat !important;
                                background-size: contain !important;
                            }
                            &.clearAble {
                                .iconClear {
                                    margin-right: 0.12rem;
                                    display: inline-block;
                                    width: 0.16rem;
                                    height: 0.16rem;
                                    background: url("../assets/附件删除.png") no-repeat !important;
                                    background-size: contain !important;
                                }
                            }
                        }
                        span {
                            display: inline-flex;
                            height: 0.2rem;
                            width: 65%;
                            font-size: 0.14rem;
                        }
                    }
                }

            }
            &.folded {
                height: 3.68rem;
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
                justify-content: space-between;
                align-items: flex-end;
                .sub-des {
                    margin-left: 0.08rem;
                    font-size: 0.10rem;
                    color: #b7b7b7;
                }
                .icon {
                    display: inline-block;
                    width: 0.2rem;
                    height: 0.2rem;
                    background: url("../assets/添加.png") no-repeat !important;
                    background-size: contain !important;
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
                        position: relative;
                        .icon {
                            position: absolute;
                            top: -0.05rem;
                            right: -0.05rem;
                            display: inline-block;
                            width: 0.1rem;
                            height: 0.1rem;
                            background: url("../assets/附件删除.png") no-repeat !important;
                            background-size: contain !important;
                        }
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
                .sub-des {
                    margin-left: 0.08rem;
                    font-size: 0.10rem;
                    color: #b7b7b7;
                }
                .icon {
                    display: inline-block;
                    width: 0.2rem;
                    height: 0.2rem;
                    background: url("../assets/添加.png") no-repeat !important;
                    background-size: contain !important;
                }
            }
            .des-wrap {
                height: 0.6rem;
            }
            .wrap {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .left {
                    margin-right: 0.1rem;
                    img {
                        width: 0.4rem;
                        height: 0.4rem;
                        border-radius: 50%;
                    }
                }
                .right {
                    span {
                        font-size: 0.15rem;
                        color: #000000;
                    }
                }
            }
        }
        &:last-of-type {
            margin-bottom: 0;
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

</style>