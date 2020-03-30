<template>
    <div style="height: 100%">
        <div class="scroll-wrap" ref="wrapper" style="height: calc(100% - 0.45rem);overflow: hidden">
            <div>
                <div class="block">
                    <div class="title-wrap">
                        <field-title :blueline-visible="false" :redstar-visible="false">完结申请</field-title>
                    </div>
                    <div class="text">
                        <div class="radio">
                            <c-radio :options="options" @value-change="radioOnChange($event)"></c-radio>
                        </div>
                        <div v-show="isFinish === 2">
                            <c-textarea default-value=""
                                        remark=""
                                        tips="请输入完结说明"
                                        @update:inputValue="explain1 = $event"
                            ></c-textarea>
                        </div>
                        <div v-show="isFinish === 3">
                            <c-textarea default-value=""
                                        remark=""
                                        tips="点击输入现状"
                                        @update:inputValue="explain2 = $event"
                            ></c-textarea>
                            <c-textarea default-value=""
                                        remark=""
                                        tips="点击输入未完成原因"
                                        @update:inputValue="explain3 = $event"
                            ></c-textarea>
                        </div>

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
                <!--<div class="block approver" v-if="$store.getters.currentRole === 3">-->
                <!--<div class="title-wrap">-->
                <!--<div>-->
                <!--<field-title :blueline-visible="false" :redstar-visible="false">审批人</field-title>-->
                <!--</div>-->
                <!--<i class="icon" @click="onClickToChooseApprover"></i>-->
                <!--</div>-->
                <!--<div class="des-wrap">-->
                <!--<div class="wrap">-->
                <!--<div class="left">-->
                <!--<img :src="approverAvatarUrl" v-if="approverAvatarUrl">-->
                <!--&lt;!&ndash;<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg" alt="">&ndash;&gt;-->
                <!--</div>-->
                <!--<div class="right">-->
                <!--<span>{{approverName}}</span>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <div class="block approver"
                     v-if="$store.getters.currentRole === 3">
                    <div class="title-wrap">
                        <div>
                            <field-title :blueline-visible="false" :redstar-visible="false">责任人审批</field-title>
                        </div>
                        <i class="icon" @click="onClickToChooseCharger"></i>
                    </div>
                    <div class="des-wrap">
                        <div class="wrap">
                            <div class="left">
                                <img :src="chargerAvatarUrl" v-if="chargerAvatarUrl">
                                <!--<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg" alt="">-->
                            </div>
                            <div class="right">
                                <span>{{chargerName}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block approver">
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
        <image-panel :url="imageUrl" :showImagePanel.sync="showImagePanel"></image-panel>
        <FullPageLoading :loading="loading"></FullPageLoading>
        <FullPageLoading :loading="loading1"></FullPageLoading>
        <FullPageLoading :loading="loading2"></FullPageLoading>
        <FullPageLoading :loading="loading3"></FullPageLoading>
        <StatePage :success="success"
                   @update:tipVisible="tipVisible=$event"
                   :tipVisible="tipVisible"
                   :tipFailedDesc="tipFailedDesc"
                   :jump-to="path"
        ></StatePage>
        <Validator :source="source"
                   :validatorVisible="validatorVisible"
                   orderType="Flow"
                   @update:validatorVisible="validatorVisible=$event"></Validator>
    </div>
</template>

<script>
  import axios from 'axios'
  import Qs from 'qs'

  export default {
    name: "end",
    data() {
      return {
        isFinish: 2,
        explain1: '',
        explain2: '',
        explain3: '',
        options: [
          { label: '完成', value: 2 },
          { label: '未完成', value: 3 },
        ],
        imageUrl: '',
        showImagePanel: false,
        loading: false,
        loading1: false,
        loading2: false,
        loading3: false,
        urlObj: [],
        approverName: '',
        approverAvatarUrl: '',
        approverID: '',

        chargerID: '',
        chargerName: '',
        chargerAvatarUrl: '',

        chargersLeaderID: '',
        chargersLeaderName: '',
        chargersLeaderAvatarUrl: '',

        scroll: null,
        tipVisible: false,
        success: false,
        source: {},//表单验证
        validatorVisible: false,
        taskLifeList: [],
        path: '',
        tipFailedDesc: ''
      }
    },
    beforeRouteEnter(to, from, next) {
      qing.call('setWebViewTitle', { 'title': '完结申请' })

      next((vm) => {
        if (from.name === 'taskdetail') {
          let { detailObj } = vm.$route.params
          vm.detailObj = detailObj

          if (vm.detailObj) {
            localStorage.setItem('detailObj', JSON.stringify(vm.detailObj))
          }
        } else {
          vm.detailObj = JSON.parse(localStorage.getItem('detailObj'))
        }
        console.log('vm.detailObj.taskLifeList', vm.detailObj.taskLifeList)
        vm.urlObj = []
        // if (vm.detailObj.imgs) {
        //   vm.detailObj.imgs.split(',').forEach((imgurl) => {
        //     vm.urlObj.push({ url: imgurl, showLoading: true })
        //   })
        // }


        if (vm.detailObj.chargerID) {
          vm.loading1 = true

          vm.$getPersonInfoByOpenID(vm.detailObj.chargerID)
            .then((response) => {
              let data = response.data.result.data[0]
              vm.chargerID = data.openId

              vm.chargerName = data.name

              vm.chargerAvatarUrl = data.photoUrl

              // vm.leadersLeader = {
              //   'openId': response.data.result.data[0].openId,
              //   'name': response.data.result.data[0].name,
              //   'photoUrl': response.data.result.data[0].photoUrl,
              // }
              vm.loading1 = false
              // alert(vm.chargerName)

            }).catch((error) => {
            alert("获取责任人信息失败")
          })

        }
        if (vm.detailObj.signerID && vm.detailObj.signerID !== null) {
          vm.loading3 = true

          vm.$getPersonInfoByOpenID(vm.detailObj.signerID)
            .then((response) => {
              let data = response.data.result.data[0]
              vm.chargersLeaderID = data.openId
              vm.chargersLeaderName = data.name
              vm.chargersLeaderAvatarUrl = data.photoUrl


              if (vm.$store.getters.openID === vm.chargersLeaderID) {
                vm.chargersLeaderID = ''
                vm.chargersLeaderName = ''
                vm.chargersLeaderAvatarUrl = ''
              }
              // vm.leadersLeader = {
              //   'openId': response.data.result.data[0].openId,
              //   'name': response.data.result.data[0].name,
              //   'photoUrl': response.data.result.data[0].photoUrl,
              // }
              vm.loading3 = false
            }).catch((error) => {
            alert("获取主管领导信息失败")
          })
        }
        // else {
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
        //         })
        //           .then((response) => {
        //             console.log(response.data.result.data.inChargers[0])
        //             let inChargers = response.data.result.data.inChargers
        //             if (inChargers[0]) {
        //
        //               let inCharger = inChargers[0]
        //               vm.chargersLeaderID = inCharger.openId
        //               vm.chargersLeaderName = inCharger.name
        //               vm.chargersLeaderAvatarUrl = inCharger.photoUrl
        //
        //               vm.loading2 = false
        //
        //               if (vm.$store.getters.openID === vm.chargersLeaderID) {
        //                 vm.chargersLeaderID = ''
        //                 vm.chargersLeaderName = ''
        //                 vm.chargersLeaderAvatarUrl = ''
        //               }
        //
        //             } else {
        //               vm.loading2 = false
        //             }
        //           })
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
      // this.approverID = this.$store.state.leaderOpenID
      // this.approverName = this.$store.state.leaderName
      // this.approverAvatarUrl = this.$store.state.leaderAvatarUrl
    },
    beforeDestroy() {
      this.urlObj = []
    },
    methods: {
      radioOnChange(e) {
        this.isFinish = e
        console.log(e)
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
      onClickImage(url) {
        this.imageUrl = url
        this.showImagePanel = true
      },
      saveData() {
        let taskLifeList = [{}]
        taskLifeList[0].parentID = this.detailObj.id
        taskLifeList[0].type = 3
        taskLifeList[0].lifePointList = []


        if (this.$store.getters.currentRole === 3) {
          let lifePoint1 = {}
          lifePoint1.index = 1
          lifePoint1.approverID = this.detailObj.chargerID
          lifePoint1.approverAvatarUrl = ''
          lifePoint1.approverName = this.detailObj.chargerName
          taskLifeList[0].lifePointList.push(lifePoint1)


          let lifePoint2 = {}
          lifePoint2.index = 2
          lifePoint2.approverID = this.chargersLeaderID
          lifePoint2.approverAvatarUrl = this.chargersLeaderAvatarUrl
          lifePoint2.approverName = this.chargersLeaderName
          // if (this.detailObj.signerID) {
          //
          //   lifePoint2.index = 2
          //   lifePoint2.approverID = this.detailObj.signerID
          //   lifePoint2.approverAvatarUrl = this.singerObj.photoUrl
          //   lifePoint2.approverName = this.singerObj.name
          // } else {
          //   lifePoint2.index = 2
          //   lifePoint2.approverID = this.chargersLeaderID
          //   lifePoint2.approverAvatarUrl = this.chargersLeaderAvatarUrl
          //   lifePoint2.approverName = this.chargersLeaderName
          // }

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
            }else{
              taskLifeList[0].lifePointList.push(lifePoint2)
            }
          }else{
            taskLifeList[0].lifePointList.push(lifePoint2)
          }


          // taskLifeList[0].lifePointList.push(lifePoint1)
          // taskLifeList[0].lifePointList.push(lifePoint2)
          //
          // if(this.chargersLeaderID === localStorage.getItem('chairmanId')){
          //   if(this.detailObj.sourceID == 1 || this.detailObj.sourceID == 2 || this.detailObj.sourceID == 3 || this.detailObj.sourceID == 4 || this.detailObj.sourceID == 7){
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


        if (this.isFinish === 2) {
          taskLifeList[0].done_type = 1
        } else if (this.isFinish === 3) {
          taskLifeList[0].done_type = 0
        }
        if (this.isFinish === 2) {
          taskLifeList[0].done_info = this.explain1
        } else if (this.isFinish === 3) {
          taskLifeList[0].done_going = this.explain2
          taskLifeList[0].done_reason = this.explain3
        }

        this.taskLifeList = taskLifeList

        if (this.$store.getters.currentRole === 3) {

          if (this.isFinish === 2) {
            this.source = {
              chargerID: this.chargerID,
              chargersLeaderID: this.chargersLeaderID,
              explain1: this.explain1
            }
          } else {
            this.source = {
              chargerID: this.chargerID,
              chargersLeaderID: this.chargersLeaderID,
              explain2: this.explain2,
              explain3: this.explain3
            }
          }

        } else {
          if (this.isFinish === 2) {
            this.source = {
              chargersLeaderID: this.chargersLeaderID,
              explain1: this.explain1
            }
          } else {
            this.source = {
              chargersLeaderID: this.chargersLeaderID,
              explain2: this.explain2,
              explain3: this.explain3,
            }
          }

        }
      },
      onClickToSave() {
        this.saveData()

        if (this.$store.getters.currentRole === 1) {
          this.path = 'chairmanList'
        }
        else if (this.$store.getters.currentRole === 3) {
          this.path = 'list-clerk'
        }
        else if(this.$store.getters.currentRole === 4 || this.$store.getters.currentRole === 2){
          this.path = 'listSourceAdmin'
        }
        else {
          this.path = 'list'
        }

        setTimeout(() => {
          if (!this.validatorVisible) {
            let url = this.$url + '/taskSystem/task/life'
            this.loading = true
            axios({
              method: 'post',
              url: url,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
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
              this.urlObj = []
            })
          }
        }, 0)
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
      // },
      onClickToChooseCharger() {
        let _this = this
        qing.call('selectPersons', {
          'isMulti': false,
          'success': function (result) {
            _this.chargerAvatarUrl = result.data.persons[0].avatarUrl
            _this.chargerName = result.data.persons[0].name
            _this.chargerID = result.data.persons[0].openId
            // alert(JSON.stringify(result.data.persons[0]))
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
                    padding: 0.13rem 0.3rem 0.13rem 0;
                    font-size: 0.14rem;
                    color: #000;
                    width: calc(5em + 0.3rem);
                    .star {
                        color: red;
                    }
                }
                .right {
                    padding: 0.12rem 0;
                    /*margin-bottom: 0.16rem;*/
                    /*font-size: 0.14rem;*/
                    color: #6e6e6e;
                    border-bottom: 1px solid #f0f0f0;
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
                        width: 100%;
                        font-size: 0.14rem;
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