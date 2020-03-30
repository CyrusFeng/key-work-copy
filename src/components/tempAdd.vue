<template>
    <div>
        <div class="block field">
            <div class="title-wrap">
                <field-title :blueline-visible="false" :redstar-visible="false">基本信息</field-title>
            </div>
            <div class="content" :class="{folded:!folded}">
                <div class="row">
                    <div class="label">项目名称&nbsp;<span class="star">*</span></div>
                    <!--<div class="right">{{travelApplyData.applyDate}}</div>-->
                    <div class="right" v-if="true">
                        <c-input
                                defaultValue=""
                                defaultType=""
                                tips="请输入"
                                @update:inputValue="projectName = $event"></c-input>
                    </div>
                </div>
                <div class="row">
                    <div class="label">责任人 <span class="star">*</span></div>
                    <div class="right yunzhijia">
                        <span>{{charger_name||"请选择"}}</span>
                        <i class="icon" @click="onClickToChooseCharger"></i>
                    </div>
                </div>

                <div class="row">
                    <div class="label">启动时间 <span class="star">*</span></div>
                    <div class="right" @click="isVisible1 = !isVisible1">
                        <!--<c-input-->
                        <!--defaultValue=""-->
                        <!--defaultType="date"-->
                        <!--tips="请选择日期"-->
                        <!--type="1"-->
                        <!--@update:inputValue="starttime = $event"></c-input>-->
                        <span>{{starttime||'请选择'}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="label">完成时间 <span class="star">*</span></div>
                    <div class="right" @click="isVisible2 = !isVisible2">
                        <!--<c-input-->
                        <!--defaultValue=""-->
                        <!--defaultType="date"-->
                        <!--tips="请选择日期"-->
                        <!--type="1"-->
                        <!--@update:inputValue="endtime = $event"></c-input>-->
                        <span>{{endtime||'请选择'}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="label">工作来源 <span class="star">*</span></div>
                    <div class="right" @click="isVisible3 = !isVisible3">
                        <!--<span>{{sourceName||'请选择'}}</span>-->
                        <c-select :orgRange="sourceArr"
                                  :defaultValueId="sourceID"
                                  @update:itemObj="chooseSource($event)"></c-select>
                    </div>
                </div>
                <div class="row">
                    <div class="label">单位</div>
                    <div class="right yunzhijia clearAble">
                        <span>{{unitName||'请选择'}}</span>
                        <div class="icon-wrap">
                            <i class="icon iconClear" @click="clearCompany"></i>
                            <i class="icon" @click="onClickToChooseCompany"></i>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="$store.getters.currentRole == 2 || $store.getters.currentRole == 4">
                    <div class="label">签发人</div>
                    <div class="right yunzhijia clearAble">
                        <span>{{signerName||'请选择'}}</span>
                        <div class="icon-wrap">
                            <i class="icon iconClear" @click="clearSigner"></i>
                            <i class="icon" @click="onClickToChooseSigner"></i>
                        </div>
                    </div>
                </div>
                <div class="row" v-else="">
                    <div class="label">签发人</div>
                    <div class="right yunzhijia clearAble">
                        <span>{{signerName||'暂无签发人'}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="label">协助人</div>
                    <div class="right yunzhijia clearAble">
                        <span>{{helperName||'请选择'}}</span>
                        <div class="icon-wrap">
                            <i class="icon iconClear" @click="clearHelper"></i>
                            <i class="icon" @click="onClickToChooseHelper"></i>
                        </div>
                    </div>
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
                <field-title :blueline-visible="false" :redstar-visible="false">现状及问题</field-title>
            </div>
            <div class="text">
                <c-textarea default-value=""
                            remark=""
                            tips="请输入"
                            @update:inputValue="problem = $event"></c-textarea>
            </div>
        </div>
        <div class="block">
            <div class="title-wrap">
                <field-title :blueline-visible="false" :redstar-visible="false">实施方法</field-title>
            </div>
            <div class="text">
                <c-textarea default-value=""
                            remark=""
                            tips="请输入"
                            @update:inputValue="ways = $event"></c-textarea>
            </div>
        </div>
        <div class="block">
            <div class="title-wrap">
                <field-title :blueline-visible="false" :redstar-visible="true">预期目标</field-title>
            </div>
            <div class="text">
                <c-textarea default-value=""
                            remark=""
                            tips="请输入"
                            @update:inputValue="aim = $event"></c-textarea>
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
        <!--<div class="block approver">-->
        <!--<div class="title-wrap">-->
        <!--<div>-->
        <!--<field-title :blueline-visible="false" :redstar-visible="false">审批人</field-title>-->
        <!--</div>-->
        <!--<i class="icon" @click="onClickToChooseApprover"></i>-->
        <!--</div>-->
        <!--<div class="des-wrap">-->
        <!--<div class="wrap">-->
        <!--<div class="left">-->
        <!--<img :src="approverAvatarUrl" alt="">-->
        <!--&lt;!&ndash;<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg" alt="">&ndash;&gt;-->
        <!--</div>-->
        <!--<div class="right">-->
        <!--<span>{{approverName}}</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <div class="button-wrap">
            <!--<div class="btn1">-->
            <!--<span>暂存</span>-->
            <!--</div>-->
            <div class="btn2" @click="onClickToSave">
                <span>发送</span>
            </div>
        </div>
        <image-panel :url="imageUrl" :showImagePanel.sync="showImagePanel"></image-panel>
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
        <nut-datepicker
                :is-visible="isVisible2"
                type="date"
                title="请选择日期"
                :is-show-chinese="false"
                :defaultValue="today"
                endDate="2199-10-05"
                @close="switchPicker('isVisible2')"
                @choose="setChooseValue2"
        >
        </nut-datepicker>
        <StatePage :success="success"
                   @update:tipVisible="tipVisible=$event"
                   :tipVisible="tipVisible"
                   :jump-to="pathname"
        ></StatePage>
        <FullPageLoading :loading="loading"></FullPageLoading>
        <Validator :source="source"
                   :validatorVisible="validatorVisible"
                   @update:validatorVisible="validatorVisible=$event"></Validator>
        <!--<nut-picker-->
        <!--:is-visible="isVisible3"-->
        <!--:default-value-data="defaultValueData1"-->
        <!--:list-data="sourceNameArr"-->
        <!--@close="switchPicker('isVisible3')"-->
        <!--@confirm="setSource"-->
        <!--&gt;-->
        <!--</nut-picker>-->
    </div>
</template>

<script>
  import axios from 'axios'
  import Qs from 'qs'
  import util from '../util'

  const urlObj = [
    // {
    //   url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg'
    // },
  ]
  export default {
    name: "tempAdd",
    data() {
      return {
        folded: true,
        tipVisible: false,
        success: false,
        loading: false,
        urlObj,
        sourceArr: [],
        sourceNameArr: [],
        imageUrl: undefined,
        showImagePanel: false,
        saveData: {},
        projectName: undefined,
        // chargerID: undefined,
        chargerName: undefined,
        sourceID: undefined,
        sourceName: undefined,
        defaultSource: {},
        starttime: undefined,
        endtime: undefined,
        unitID: undefined,
        unitName: undefined,
        signerID: undefined,
        signerName: undefined,
        helperID: undefined,
        helperName: undefined,
        problem: undefined,
        ways: undefined,
        aim: undefined,
        imgs: undefined,
        appendixs: undefined,
        approverID: undefined,
        approverName: undefined,
        approverAvatarUrl: undefined,
        isVisible1: false,
        isVisible2: false,
        isVisible3: false,
        date1: undefined,
        date2: undefined,
        index: 1,
        openId: undefined,
        charger_name: undefined,
        chargerID: undefined,
        today: util.getYearMonthDayString(new Date()),
        source: {},//表单验证
        validatorVisible: false,
        pathname: 'list'
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        qing.call('setWebViewTitle', { 'title': '临时下发' })
      })
    },
    mounted() {
      this.signerID = this.$store.getters.openID
      this.signerName = this.$store.state.name
      if (this.$store.getters.currentRole === 1) {
        this.pathname = 'chairmanIndex'
      }
      else if (this.$store.getters.currentRole === 2) {
        this.pathname = 'listSourceAdmin'
      }
      else if (this.$store.getters.currentRole === 3) {
        this.pathname = 'list-clerk'
      }
      else if (this.$store.getters.currentRole === 4) {
        this.pathname = 'listSourceAdmin'
      }
      else if (this.$store.getters.currentRole === 0) {
        this.pathname = 'list'
      }
      // let sourceURL = this.$url + "/taskSystem/source/list"
      let sourceURL = "http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/source/list"
      axios.get(sourceURL, {
        params: {}
      })
        .then((response) => {
          // alert(response.data.result)
          this.sourceArr = response.data.result
          this.sourceArr.unshift({ name: '请选择', id: 0 })

          if (this.$store.getters.currentRole === 1) {
            for (let i = 0; i < this.sourceArr.length; i++) {
              if (this.sourceArr[i].name === '主席安排') {
                // this.defaultSource = JSON.parse(JSON.stringify(this.sourceArr[i]))
                // console.log('------------------')
                // console.log(this.defaultSource)
                this.sourceID = this.sourceArr[i].id
                // this.sourceName = this.sourceArr[i].name
              }
            }
          }

          // for (let i = 0; i < this.sourceArr.length; i++) {
          //   if(this.sourceArr[i].name==='主席安排'){
          //     this.sourceID = this.sourceArr[i].id
          //     this.sourceID = this.sourceArr[i].id
          //
          //     this.sourceArr.splice(i, 1)
          //     this.sourceArr.unshift(this.sourceArr[i])
          //   }
          // }
        })
      if (this.$store.getters.currentRole === 0) {
        let getpersonQueryObj = {
          "eid": "8738001",
          "openId": this.$store.getters.openID,
        }
        let yunzhijiaURL = this.$url + "/taskSystem/intf/cloud"
        axios.get(yunzhijiaURL, {
          params: {
            url: '/gateway/opendata-control/data/getperson',
            dataStr: JSON.stringify(getpersonQueryObj),
            authorize: 'app'
          }
        })
          .then((response) => {
            console.log(response.data.result.data[0].orgId)
            // alert(response.data.result.data[0].orgId)
            let orgId = response.data.result.data[0].orgId
            let department = response.data.result.data[0].department
            this.unitID = orgId
            this.unitName = department

            let getorgpersonsQueryObj = {
              "eid": "8738001",
              "orgId": orgId,
            }

            axios.get(yunzhijiaURL, {
              params: {
                url: '/gateway/opendata-control/data/getorg',
                dataStr: JSON.stringify(getorgpersonsQueryObj),
                authorize: 'app'
              }
            })
              .then((response) => {
                console.log(response.data.result.data.inChargers[0])
                // alert(response.data.result.data.inChargers[0])
                let inChargers = response.data.result.data.inChargers
                if (inChargers[0]) {
                  let inCharger = inChargers[0]
                  this.approverID = inCharger.openId
                  this.approverName = inCharger.name
                  this.approverAvatarUrl = inCharger.photoUrl
                } else {

                }
              })

          })
          .catch((error) => {
          })
      }


    },
    methods: {
      onClickToRemoveImg(e, item) {
        console.log(e)
        e.stopPropagation()
        this.urlObj.splice(this.urlObj.indexOf(item), 1)
      },
      onClickImage(url) {
        this.imageUrl = url
        this.showImagePanel = true
      },
      saveDate() {
        this.saveData = {}
        this.saveData.taskLifeList = [{}]
        this.saveData.taskLifeList[0].lifePointList = [{}]
        this.saveData.projectName = this.projectName
        this.saveData.chargerID = this.chargerID
        this.saveData.chargerName = this.charger_name
        this.saveData.sourceID = this.sourceID
        this.saveData.starttime = this.starttime
        this.saveData.endtime = this.endtime
        this.saveData.unitID = this.unitID
        this.saveData.unitName = this.unitName
        // this.saveData.signerID = this.$store.state.openID
        // this.saveData.signerName = this.$store.state.name
        this.saveData.signerID = this.signerID
        this.saveData.signerName = this.signerName

        this.saveData.helperID = this.helperID
        this.saveData.helperName = this.helperName
        // alert(this.helperName)

        this.saveData.problem = this.problem
        this.saveData.ways = this.ways
        this.saveData.aim = this.aim
        this.saveData.imgs = this.imgs
        this.saveData.level = 1
        this.saveData.state = 1
        this.saveData.taskLifeList[0].type = 1
        // this.saveData.taskLifeList[0].creatorID = this.chargerID
        // this.saveData.taskLifeList[0].creatorName = this.chargerName

        // this.saveData.taskLifeList[0].lifePointList[0].approverID = this.$store.state.openID
        // this.saveData.taskLifeList[0].lifePointList[0].approverName = this.$store.state.name
        this.saveData.taskLifeList[0].lifePointList[0].approverID = this.signerID || this.$store.getters.openID
        this.saveData.taskLifeList[0].lifePointList[0].approverName = this.signerName || this.$store.state.name
        this.saveData.taskLifeList[0].lifePointList[0].approverAvatarUrl = this.$store.state.avatarUrl
        this.saveData.taskLifeList[0].lifePointList[0].index = this.index
        console.log(this.saveData)
        console.log(JSON.stringify(this.saveData))
        // alert(JSON.stringify(this.saveData))

        this.source = {
          projectName: this.projectName,
          chargerName: this.charger_name,
          starttime: this.starttime,
          endtime: this.endtime,
          aim: this.aim,
          sourceID: this.sourceID
        }
      },
      onClickToSave() {
        this.saveDate()

        setTimeout(() => {
          if (!this.validatorVisible) {
            let url = this.$url + '/taskSystem/task/task'
            // let url1 = this.$url + '/taskSystem/task/startLife'
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
                jsonStr: JSON.stringify([this.saveData]),
              })
            }).then((response) => {
              this.loading = false
              this.tipVisible = true
              if (response.data.success === true) {
                this.success = true
              } else {
                this.success = false
              }
            }).catch(() => {

            }).finally(() => {
              // this.urlObj = []
            })
          }
        }, 0)
      },
      beforeDestroy() {
        this.urlObj = []
      },
      onClickToChooseCharger() {
        let _this = this
        qing.call('selectPersons', {
          'isMulti': false,
          'success': function (result) {
            _this.chargerID = result.data.persons[0].openId
            _this.charger_name = result.data.persons[0].name

            _this.getOrgID(_this.chargerID)
              .then((response) => {
                let orgId = response.data.result.data[0].orgId
                let department = response.data.result.data[0].department

                // alert(department)


                _this.unitID = orgId
                _this.unitName = department


              })
          }
        });
      },
      getOrgID(openID) {
        let getpersonQueryObj = {
          "eid": "8738001",
          "openId": openID,
        }

        let yunzhijiaURL = this.$url + "/taskSystem/intf/cloud"

        return axios.get(yunzhijiaURL, {
          params: {
            url: '/gateway/opendata-control/data/getperson',
            dataStr: JSON.stringify(getpersonQueryObj),
            authorize: 'app'
          }
        })
      },
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
          }
        });
      },
      onClickToChooseSigner(){
        let _this = this
        qing.call('selectPersons', {
          'isMulti': false,
          'success': function (result) {
            _this.signerID = result.data.persons[0].openId
            _this.signerName = result.data.persons[0].name
          }
        });
      },
      onClickToChooseCompany() {
        let _this = this
        qing.call('selectOrgs', {
          'isMulti': false,
          'success': function (result) {
            _this.unitID = result.data.orgs[0].orgId
            _this.unitName = result.data.orgs[0].orgName
          }
        });
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
        this[`${param}`] = !this[`${param}`];
      },
      setChooseValue1(param) {
        this.starttime = param[3];
        if (this.endtime && this.starttime) {
          if (!this.compareDate(this.endtime, this.starttime)) {
            alert('完成时间必须大于开始时间')
            this.starttime = undefined
            this.endtime = undefined
          }
        }
      },
      setChooseValue2(param) {
        this.endtime = param[3];
        if (this.endtime && this.starttime) {
          if (!this.compareDate(this.endtime, this.starttime)) {
            alert('完成时间必须大于开始时间')
            this.starttime = undefined
            this.endtime = undefined
          }
        }
      },
      compareDate(date1, date2) {
        if (!date1) {
          return false
        }
        if (!date2) {
          return false
        }
        let oDate1 = new Date(date1);
        let oDate2 = new Date(date2);
        if (oDate1.getTime() > oDate2.getTime()) {
          return true
        } else {
          return false
        }
      },

      chooseSource($event) {
        if ($event.id === 0) {
          this.sourceID = ''
        } else {
          this.sourceID = $event.id
        }
      },
      clearHelper() {
        this.helperID = undefined
        this.helperName = undefined
      },
      clearCompany() {
        this.unitID = undefined
        this.unitName = undefined
      },
      clearSigner() {
        this.signerID = undefined
        this.signerName = undefined
      },

      // setSource(chosen) {
      //   alert(chosen)
      //   alert(chosen[0])
      //   // this.year = `${chooseData[0]}年`;
      // }
    },
    watch: {
      urlObj() {
        let arr = []
        this.urlObj.forEach((item) => {
          arr.push(item.url)
        })
        this.imgs = arr.join(',')
      }
    }
  }
</script>

<style scoped lang="scss">
    .swiper-container {
        /*height: calc(100% - 0.88rem);*/
        height: calc(100% - 0.44rem);
        .swiper-wrapper {
            /*height: 100%;*/
            .swiper-slide {
                /*height: 100%;*/
            }
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
                        .icon-wrap {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            width: 35%;
                        }
                        .icon {
                            margin-right: 0.12rem;
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