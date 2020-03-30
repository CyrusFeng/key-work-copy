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

                    <div class="right yunzhijia" v-if="path === 'list-clerk'">
                        <span>{{chargerName||'请选择'}}</span>
                        <i class="icon" @click="onClickToChooseCharger"></i>
                    </div>
                    <div class="right" v-else>
                        <span>{{$store.state.name||"暂无责任人"}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="label">工作来源 <span class="star">*</span></div>
                    <div class="right">
                        <c-select :orgRange="sourceArr"
                                  defaultValue="zzz"
                                  @update:itemObj="chooseSource($event)"></c-select>
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
                    <div class="label">单位 <span class="star">*</span></div>
                    <div class="right yunzhijia">
                        <!--<c-select :orgRange="orgRange"-->
                        <!--defaultValue="zzz"-->
                        <!--@update:itemObj="companyID = $event.id"></c-select>-->
                        <span>{{unitName||'请选择'}}</span>
                        <i class="icon" @click="onClickToChooseCompany"></i>
                    </div>
                </div>
                <div class="row">
                    <div class="label">签发人</div>
                    <div class="right yunzhijia clearAble">
                        <span>{{signerName||'请选择'}}</span>
                        <div class="icon-wrap">
                            <i class="icon iconClear" @click="clearSinger"></i>
                            <i class="icon" @click="onClickToChooseSinger"></i>
                        </div>
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
                <field-title :blueline-visible="false" :redstar-visible="true">现状及问题</field-title>
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
                <field-title :blueline-visible="false" :redstar-visible="true">实施方法</field-title>
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
                <i class="icon" @click="onClickToChooseAnotherCharger"></i>
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
                   :jump-to="path"
        ></StatePage>
        <FullPageLoading :loading="loading"></FullPageLoading>
        <Validator :source="source"
                   :validatorVisible="validatorVisible"
                   @update:validatorVisible="validatorVisible=$event"></Validator>
    </div>
</template>

<script>
  import axios from 'axios'
  import Qs from 'qs'
  import util from '../util'

  const orgRange = [
    {
      id: 'x001',
      name: 'xxx',
    },
    {
      id: 'x002',
      name: 'yyy'
    },
  ]
  const urlObj = [
    // {
    //   url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg'
    // },
    // {
    //   url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg'
    // },
    // {
    //   url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg'
    // },
    // {
    //   url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg'
    // },
    // {
    //   url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6niksccotj30ku112acg.jpg'
    // },
    // {
    //   url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6niksccotj30ku112acg.jpg'
    // },
    // {
    //   url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg'
    // },
    // {
    //   url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg'
    // },
    // {
    //   url: 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg'
    // }
  ]
  export default {
    name: "taskAdd",
    data() {
      return {
        folded: true,
        tipVisible: false,
        success: false,
        loading: false,
        orgRange,
        urlObj,
        sourceArr: [],
        imageUrl: undefined,
        showImagePanel: false,
        saveData: {},
        projectName: undefined,
        chargerID: undefined,
        chargerName: undefined,
        chargerAvatarUrl: '',
        sourceID: undefined,
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

        chargersLeaderID: '',
        chargersLeaderName: '',
        chargersLeaderAvatarUrl: '',

        approverAvatarUrl: undefined,
        isVisible1: false,
        isVisible2: false,
        date1: undefined,
        date2: undefined,
        index: 1,
        openId: undefined,
        charger_name: undefined,
        today: util.getYearMonthDayString(new Date()),
        source: {},//表单验证
        validatorVisible: false,
        path: 'list'
      }
    },

    mounted() {
      console.log('validatorVisible', this.validatorVisible)
      // let sourceURL = this.$url + "/taskSystem/source/list"
      let sourceURL = "http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/source/list"
      axios.get(sourceURL, {
        params: {}
      })
        .then((response) => {
          // alert(response.data.result)
          this.sourceArr = response.data.result
          this.sourceArr.unshift({ name: '请选择', id: 0 })
        })


      // this.unitID = this.$store.getters.unitID
      // this.unitName = this.$store.getters.unitName
      // this.approverID = this.$store.getters.leaderOpenID
      // this.approverName = this.$store.getters.leaderName
      // this.approverAvatarUrl = this.$store.getters.leaderAvatarUrl


      // let getpersonQueryObj = {
      //   "eid": "8738001",
      //   "openId": this.$store.state.openID,
      // }
      // let yunzhijiaURL = this.$url + "/taskSystem/intf/cloud"
      // axios.get(yunzhijiaURL, {
      //   params: {
      //     url: '/gateway/opendata-control/data/getperson',
      //     dataStr: JSON.stringify(getpersonQueryObj),
      //     authorize: 'app'
      //   }
      // })
      //   .then((response) => {
      //     console.log(response.data.result.data[0].orgId)
      //     // alert(response.data.result.data[0].orgId)
      //     let orgId = response.data.result.data[0].orgId
      //     let department = response.data.result.data[0].department
      //     this.unitID = orgId
      //     this.unitName = department
      //
      //
      //     let getorgpersonsQueryObj = {
      //       "eid": "8738001",
      //       "orgId": orgId,
      //     }
      //
      //     axios.get(yunzhijiaURL, {
      //       params: {
      //         url: '/gateway/opendata-control/data/getorg',
      //         dataStr: JSON.stringify(getorgpersonsQueryObj),
      //         authorize: 'app'
      //       }
      //     }).then((response) => {
      //       console.log(response.data.result.data.inChargers[0])
      //       // alert(response.data.result.data.inChargers[0])
      //       let inChargers = response.data.result.data.inChargers
      //       if (inChargers[0]) {
      //         let inCharger = inChargers[0]
      //         this.approverID = inCharger.openId
      //         this.approverName = inCharger.name
      //         this.approverAvatarUrl = inCharger.photoUrl
      //
      //         store.commit('setLeaderOpenID', inCharger.openId)
      //         store.commit('setLeaderName', inCharger.name)
      //         store.commit('setLeaderAvatarUrl', inCharger.photoUrl)
      //
      //       } else {
      //
      //       }
      //     })
      //
      //   })
      //   .catch((error) => {
      //   })

    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        qing.call('setWebViewTitle', { 'title': '工作新增' })

        if (from.name === 'index' || from.name === 'list') {
          vm.path = 'list'

          vm.unitID = vm.$store.getters.unitID
          vm.unitName = vm.$store.getters.unitName
          // vm.chargersLeaderID = vm.$store.getters.leaderOpenID
          // vm.chargersLeaderName = vm.$store.getters.leaderName
          // vm.chargersLeaderAvatarUrl = vm.$store.getters.leaderAvatarUrl
        }
        else if (from.name === 'clerkIndex' || from.name === 'list-clerk') {
          vm.path = 'list-clerk'
        }
        else if (from.name === 'source-admin-index' || from.name === 'listSourceAdmin') {
          vm.path = 'listSourceAdmin'
        }


      })
    },
    beforeDestroy() {
      this.urlObj = []
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
        this.saveData.taskLifeList[0].lifePointList = []
        this.saveData.projectName = this.projectName
        if (this.path === 'list-clerk') {
          this.saveData.chargerID = this.chargerID
          this.saveData.chargerName = this.chargerName
        } else {
          this.saveData.chargerID = this.$store.state.openID
          this.saveData.chargerName = this.$store.state.name
        }

        this.saveData.sourceID = this.sourceID
        this.saveData.starttime = this.starttime
        this.saveData.endtime = this.endtime
        this.saveData.unitID = this.unitID
        this.saveData.unitName = this.unitName
        this.saveData.signerID = this.signerID
        this.saveData.signerName = this.signerName
        this.saveData.helperID = this.helperID
        this.saveData.helperName = this.helperName

        this.saveData.problem = this.problem
        this.saveData.ways = this.ways
        this.saveData.aim = this.aim
        this.saveData.imgs = this.imgs
        this.saveData.level = 1
        this.saveData.state = 1

        this.saveData.taskLifeList[0].type = 1
        // this.saveData.taskLifeList[0].creatorID = this.chargerID
        // this.saveData.taskLifeList[0].creatorName = this.chargerName
        if (this.$store.getters.currentRole === 3) {
          let lifePoint1 = {}
          lifePoint1.approverID = this.chargerID
          lifePoint1.approverName = this.chargerName
          lifePoint1.approverAvatarUrl = this.chargerAvatarUrl
          lifePoint1.index = 1
          this.saveData.taskLifeList[0].lifePointList.push(lifePoint1)


          let lifePoint2 = {}
          lifePoint2.approverID = this.chargersLeaderID
          lifePoint2.approverName = this.chargersLeaderName
          lifePoint2.approverAvatarUrl = this.chargersLeaderAvatarUrl
          lifePoint2.index = 2


          if (this.chargersLeaderID === localStorage.getItem('chairmanId')) {
            if (this.sourceID == 1 || this.sourceID == 2 || this.sourceID == 3 || this.sourceID == 4 || this.sourceID == 7) {
              let lifePoint = {}
              lifePoint.approverID = '57c0f003e4b01de693d52384'
              lifePoint.approverName = '晏宁'
              lifePoint.approverAvatarUrl = 'https://static.yunzhijia.com/space/c/photo/load?id=5e0c0d946d67ff33eb8b830d'
              lifePoint.index = 2
              this.saveData.taskLifeList[0].lifePointList.push(lifePoint)

              lifePoint2.index = 3
              this.saveData.taskLifeList[0].lifePointList.push(lifePoint2)

            } else {
              this.saveData.taskLifeList[0].lifePointList.push(lifePoint2)
            }
          } else {
            this.saveData.taskLifeList[0].lifePointList.push(lifePoint2)
          }
        }
        else {
          let lifePoint1 = {}
          lifePoint1.approverID = this.chargersLeaderID
          lifePoint1.approverName = this.chargersLeaderName
          lifePoint1.approverAvatarUrl = this.chargersLeaderAvatarUrl
          lifePoint1.index = 1
          this.saveData.taskLifeList[0].lifePointList.push(lifePoint1)
          if (this.chargersLeaderID === localStorage.getItem('chairmanId')) {
            if (this.sourceID == 1 || this.sourceID == 2 || this.sourceID == 3 || this.sourceID == 4 || this.sourceID == 7) {
              let lifePoint = {}
              lifePoint.approverID = '57c0f003e4b01de693d52384'
              lifePoint.approverName = '晏宁'
              lifePoint.approverAvatarUrl = 'https://static.yunzhijia.com/space/c/photo/load?id=5e0c0d946d67ff33eb8b830d'
              lifePoint.index = 1

              this.saveData.taskLifeList[0].lifePointList[0].index = 2
              this.saveData.taskLifeList[0].lifePointList.unshift(lifePoint)
            }
          }
        }

        if (this.$store.getters.currentRole === 3) {
          this.source = {
            projectName: this.projectName,
            chargerName: this.chargerName,
            sourceID: this.sourceID,
            starttime: this.starttime,
            endtime: this.endtime,
            unitName: this.unitName,
            problem: this.problem,
            ways: this.ways,
            aim: this.aim,
            // approverID: this.approverID,
            chargerID: this.chargerID,
            chargersLeaderID: this.chargersLeaderID,
          }
        } else {
          this.source = {
            projectName: this.projectName,
            chargerName: this.$store.state.name,
            sourceID: this.sourceID,
            starttime: this.starttime,
            endtime: this.endtime,
            unitName: this.unitName,
            problem: this.problem,
            ways: this.ways,
            aim: this.aim,
            chargersLeaderID: this.chargersLeaderID,
          }
        }

      },
      onClickToSave() {
        this.saveDate()

        setTimeout(() => {
          if (!this.validatorVisible) {
            let url = this.$url + '/taskSystem/task/task'
            // let url1 = this.$url + '/task/startLife'
            this.loading = true
            axios({
              method: 'post',
              url: url,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
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
            })
          }
        }, 0)

      },
      onClickToChooseSinger() {
        let _this = this
        qing.call('selectPersons', {
          'isMulti': false,
          'selected': [_this.signerID],
          'success': function (result) {
            _this.signerID = result.data.persons[0].openId
            _this.signerName = result.data.persons[0].name
          }
        });
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
      onClickToChooseCharger() {
        let _this = this
        qing.call('selectPersons', {
          'isMulti': false,
          'success': function (result) {
            _this.chargerID = result.data.persons[0].openId
            _this.chargerName = result.data.persons[0].name
            _this.chargerAvatarUrl = result.data.persons[0].avatarUrl
            // alert(_this.chargerID)

            _this.getOrgID(_this.chargerID)
              .then((response) => {

                let orgId = response.data.result.data[0].orgId
                let department = response.data.result.data[0].department

                // _this.$store.commit('setUnitID', orgId)
                // _this.$store.commit('setUnitName', department)

                // _this.unitID = _this.$store.getters.unitID
                // _this.unitName = _this.$store.getters.unitName

                _this.unitID = orgId
                _this.unitName = department


                // if(orgId){
                //   _this.getInCharger(orgId)
                //     .then((response) => {
                //
                //       let inChargers = response.data.result.data.inChargers
                //       let parentId = response.data.result.data.parentId
                //
                //
                //       if (inChargers.length > 0) {
                //         // alert('inChargers.length > 0')
                //         let inCharger = inChargers[0]
                //
                //         let flag = false
                //         for (let j = 0; j < inChargers.length; j++) {
                //
                //           if(inChargers[j].openId === _this.chargerID){
                //             flag = true
                //             break
                //           }
                //         }
                //
                //         if (flag && parentId !== '' && parentId !== null) {
                //           _this.getInCharger(parentId).then((response) => {
                //             let inChargers = response.data.result.data.inChargers
                //             if(inChargers.length>1){
                //               _this.chargersLeaderID = ''
                //               _this.chargersLeaderName = ''
                //               _this.chargersLeaderAvatarUrl = ''
                //             }else if(inChargers.length === 1){
                //               // alert(inChargers[0].name)
                //               _this.chargersLeaderID = inChargers[0].openId
                //               _this.chargersLeaderName = inChargers[0].name
                //               _this.chargersLeaderAvatarUrl = inChargers[0].photoUrl
                //             }
                //
                //           })
                //         }
                //         else {
                //           _this.chargersLeaderID = inCharger.openId
                //           _this.chargersLeaderName = inCharger.name
                //           _this.chargersLeaderAvatarUrl = inCharger.photoUrl
                //         }
                //
                //       }
                //       else {
                //         _this.chargersLeaderID = ''
                //         _this.chargersLeaderName = ''
                //         _this.chargersLeaderAvatarUrl = ''
                //       }
                //     })
                //     .catch((error) => {
                //       alert('getInCharger error')
                //     })
                // }

              })
          }
        });
      },
      onClickToChooseAnotherCharger() {
        let _this = this
        qing.call('selectPersons', {
          'isMulti': false,
          'success': function (result) {

            _this.chargerID = result.data.persons[0].openId
            _this.chargerName = result.data.persons[0].name
            _this.chargerAvatarUrl = result.data.persons[0].avatarUrl

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
        console.log(222)
        // this.isVisible = false
        // console.log(this.isVisible)
        this[`${param}`] = !this[`${param}`];
        // this[`${param}`] = false
        console.log(this[`${param}`])
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
      getInCharger(orgId) {
        let getorgpersonsQueryObj = {
          "eid": "8738001",
          "orgId": orgId,
        }
        let yunzhijiaURL = this.$url + "/taskSystem/intf/cloud"

        return axios.get(yunzhijiaURL, {
          params: {
            url: '/gateway/opendata-control/data/getorg',
            dataStr: JSON.stringify(getorgpersonsQueryObj),
            authorize: 'app'
          }
        })
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

      clearHelper() {
        this.helperID = undefined
        this.helperName = undefined
      },
      clearSinger() {
        this.signerID = undefined
        this.signerName = undefined
      },
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