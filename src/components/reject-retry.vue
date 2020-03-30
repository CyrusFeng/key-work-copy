<template>
    <div style="height: 100%;background-color: #fff">
        <div class="scroll-wrap" ref="wrapper">
            <div class="list-wrap">
                <div class="block field">
                    <div class="title-wrap">
                        <field-title :blueline-visible="false" :redstar-visible="false">{{detailObj.projectName}}</field-title>
                        <span class="status">{{getLifeType(detailObj.type)}}</span>
                    </div>
                    <div class="content content1" :class="{folded:!folded}">
                        <div class="row">
                            <div class="label">责任人</div>
                            <div class="right">{{detailObj.chargerName}}</div>
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
                            <div class="right">{{detailObj.unitName}}</div>
                        </div>
                        <div class="row">
                            <div class="label">签发人</div>
                            <div class="right">{{detailObj.signerName}}</div>
                        </div>
                        <div class="row">
                            <div class="label">协助人</div>
                            <div class="right">{{detailObj.helperName}}</div>
                        </div>
                        <div class="row">
                            <div class="label">变更次数</div>
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

                <template v-if="detailObj.type === 2">
                    <div class="block field">
                        <div class="title-wrap">
                            <field-title :blueline-visible="false" :redstar-visible="false">变更内容
                            </field-title>
                        </div>
                        <div class="content content2">
                            <div class="row">
                                <div class="top">
                                    <div class="label">完成日期</div>
                                    <div class="right">{{detailObj.endtime && detailObj.endtime.split(' ')[0]}}</div>
                                </div>
                                <div class="bottom">
                                    <div class="label">变更为</div>
                                    <div class="right" @click="isVisible1 = !isVisible1">
                                        <span>{{endtime||'请选择'}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="top">
                                    <div class="label">单位</div>
                                    <div class="right">{{detailObj.unitName}}</div>
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
                                    <div class="right">{{detailObj.chargerName}}</div>
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
                                    <div class="right">{{detailObj.helperName}}</div>
                                </div>
                                <div class="bottom">
                                    <div class="label">变更为</div>
                                    <div class="right yunzhijia">
                                        <span>{{helperName||'请选择'}}</span>
                                        <i class="icon" @click="onClickToChooseHelper"></i>
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
                            <div class="word">{{detailObj.aim}}</div>
                            <c-textarea :default-value="aim"
                                        remark=""
                                        tips="请输入变更内容"
                                        @update:inputValue="aim = $event"></c-textarea>
                        </div>
                    </div>
                    <div class="block">
                        <div class="title-wrap">
                            <field-title :blueline-visible="false" :redstar-visible="false">变更原因</field-title>
                        </div>
                        <div class="text">
                            <c-textarea default-value=""
                                        remark=""
                                        tips="请输入变更原因"
                                        @update:inputValue="change_reason = $event"></c-textarea>
                        </div>
                    </div>
                </template>



                <div class="block picture">
                    <div class="title-wrap">
                        <div>
                            <field-title :blueline-visible="true" :redstar-visible="false">附件</field-title>
                            <span class="sub-des">共{{urlObj.length}}张</span>
                        </div>
                        <i class="icon" @click="onClickToChooseImage"></i>
                    </div>
                    <div class="des-wrap images">
                        <div class="i1 pic-wrapper" v-for="item in urlObj" @click="onClickImage(item.url)">
                            <div class="img-wrap">
                                <img :src="item.url" class="picture" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div class="title-wrap">
                        <field-title :blueline-visible="false" :redstar-visible="false">审批信息</field-title>
                    </div>
                    <div class="des-wrap">
                        <div class="timeline">
                            <div class="tips" v-if="false">暂无审批信息</div>
                            <div class="item-wrap" v-else>
                                <div class="item" v-for="item in detailObj.lifePointList">
                                    <div class="top">
                                        <span class="status">{{item.approverName}}</span>
                                        <span class="date">{{getPointStatus(item.state)}}</span>
                                    </div>
                                    <div class="content-wrap">
                                        <!--<span>天荣营销公司总经理</span>-->
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
            </div>
        </div>
        <div class="button-wrap">
            <div class="btn1" @click="onClickToSave">
                <span>发送</span>
            </div>
            <div class="btn2">
                <span>删除</span>
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
        ></StatePage>
        <FullPageLoading :loading="loading"></FullPageLoading>
    </div>
</template>

<script>
  import util from '../util'
  import axios from 'axios'
  import Qs from 'qs'
  export default {
    name: "reject-retry",
    data(){
      return {
        detailObj:{},
        folded: true,
        urlObj:[],
        scroll: null,
        loading: false,
        isVisible1: false,
        tipVisible:false,
        success:false,
        imageUrl: undefined,
        showImagePanel: false,

        today: util.getYearMonthDayString(new Date()),
        endtime: '',
        unitName: '',
        unitID: '',
        chargerID: '',
        chargerName: '',
        helperID: '',
        helperName: '',
        aim: '',
        change_reason: '',
        newChangeInfoObj:{},
        approverID:'',
        approverAvatarUrl:'',
        approverName:''
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        if (from.name === 'processcenter') {
          let { detailObj } = vm.$route.params
          console.log(detailObj)
          vm.detailObj = JSON.parse(detailObj)

          if (vm.detailObj != null && JSON.stringify(vm.detailObj) !== '{}') {
            localStorage.setItem('rejectRetry_detailObj', JSON.stringify(vm.detailObj))
          }
        } else {
          vm.detailObj = JSON.parse(localStorage.getItem('rejectRetry_detailObj'))
        }


        if (vm.detailObj.imgs && vm.detailObj.imgs.length > 0) {
          vm.urlObj = []
          vm.detailObj.imgs.split(',').forEach((imgurl) => {
            vm.urlObj.push({ url: imgurl })
          })
        }
        console.log('vm.detailObj.change_info',vm.detailObj.change_info)

        let changeInfoObj = {}
        if(typeof vm.detailObj.change_info === 'string'){
          changeInfoObj = JSON.parse(vm.detailObj.change_info)
        }else{
          changeInfoObj = vm.detailObj.change_info
        }
        console.log(changeInfoObj)
        vm.endtime = changeInfoObj.after.endtime
        vm.unitID = changeInfoObj.after.unitID
        vm.unitName = changeInfoObj.after.unitName
        vm.chargerID = changeInfoObj.after.chargerID
        vm.chargerName = changeInfoObj.after.chargerName
        vm.helperID = changeInfoObj.after.helperID
        vm.helperName = changeInfoObj.after.helperName
        vm.aim = changeInfoObj.after.aim


        vm.newChangeInfoObj = {
          before: {
            endtime: changeInfoObj.after.endtime,
            unitID: changeInfoObj.after.unitID,
            unitName: changeInfoObj.after.unitName,
            chargerID: changeInfoObj.after.chargerID,
            chargerName: changeInfoObj.after.chargerName,
            helperID: changeInfoObj.after.helperID,
            helperName: changeInfoObj.after.helperName,
            aim: changeInfoObj.after.aim
          }
        }

        let lifePointList = vm.detailObj.lifePointList
        vm.approverID = lifePointList[0].approverID
        vm.approverAvatarUrl = lifePointList[0].approverAvatarUrl
        vm.approverName = lifePointList[0].approverName
      })
      // let a = {"eid":"8738001","openId":"5b584ae0e4b0326c56807440"}
    },
    mounted() {
      this.$initScroll(this.scroll,this.$refs.wrapper)
    },
    beforeDestroy(){
      this.urlObj = []
    },
    methods:{
      onClickToSave() {
        this.newChangeInfoObj.after = {
          endtime: this.endtime || undefined,
          unitID: this.unitID || undefined,
          unitName: this.unitName || undefined,
          chargerID: this.chargerID || undefined,
          chargerName: this.chargerName || undefined,
          helperID: this.helperID || undefined,
          helperName: this.helperName || undefined,
          aim: this.aim || undefined
        }

        let taskLifeList = [{}]
        taskLifeList[0].parentID = this.detailObj.taskID
        taskLifeList[0].type = 2
        taskLifeList[0].lifePointList = [{}]
        taskLifeList[0].lifePointList[0].index = 1

        taskLifeList[0].lifePointList[0].approverID = this.approverID
        taskLifeList[0].lifePointList[0].approverAvatarUrl = this.approverAvatarUrl
        taskLifeList[0].lifePointList[0].approverName = this.approverName

        taskLifeList[0].change_info = JSON.stringify(this.newChangeInfoObj)
        taskLifeList[0].change_reason = this.change_reason

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
            jsonStr: JSON.stringify(taskLifeList),
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
      switchPicker(param) {
        console.log(222)
        // this.isVisible = false
        // console.log(this.isVisible)
        this[`${param}`] = !this[`${param}`];
        // this[`${param}`] = false
        console.log(this[`${param}`])
      },
      setChooseValue1(param) {
        this.endtime = param[3];
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
      onClickToChooseCharger() {
        let _this = this
        qing.call('selectPersons', {
          'isMulti': false,
          'success': function (result) {
            _this.chargerID = result.data.persons[0].openId
            _this.chargerName = result.data.persons[0].name
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
        background-color: #fff;
        &.hideBtn{
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
            &.content1{
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

            }
            &.content2{
                .row {
                    .top {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
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
                    .bottom {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px solid #f0f0f0;
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