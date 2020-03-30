<template>
    <div style="height: 100%" class="componentWrap" v-if="visible" ref="wrapper">
        <div class="scroll-wrap" style="height: calc(100% - 0.45rem);overflow: hidden">
            <div>
                <div class="block">
                    <div class="title-wrap">
                        <field-title :blueline-visible="false" :redstar-visible="false">协办批示</field-title>
                    </div>
                    <div class="text">
                        <c-textarea default-value=""
                                    remark=""
                                    tips="请填写协办批示"
                                    @update:inputValue="des = $event"></c-textarea>
                    </div>
                </div>
                <div class="block approver">
                    <div class="title-wrap">
                        <div>
                            <field-title :blueline-visible="false" :redstar-visible="false">选择协办人</field-title>
                        </div>
                        <i class="icon" @click="onClickToChooseApprover"></i>
                    </div>
                    <div class="des-wrap">
                        <div class="wrap" v-for="item in xiebanList">
                            <div class="left">
                                <img :src="item.avatarUrl" v-if="item.avatarUrl">
                                <!--<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g6nig61wg9j308w064tax.jpg" alt="">-->
                            </div>
                            <div class="right">
                                <span>{{item.name}}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!--<div class="button-wrap">-->
            <!--&lt;!&ndash;<div class="btn1">&ndash;&gt;-->
            <!--&lt;!&ndash;<span>暂存</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--<div class="btn2" @click="onClickToSave">-->
                <!--<span>发送</span>-->
            <!--</div>-->
        <!--</div>-->
        <div class="button-wrap">
            <div class="btn1 btn" @click="onClickToSave">
                <span>发送</span>
            </div>
            <div class="btn2 btn" @click="goBack">
                <span>返回</span>
            </div>
        </div>
        <FullPageLoading :loading="loading"></FullPageLoading>
        <FullPageLoading :loading="loading1"></FullPageLoading>
        <!--<StatePage :success="success"-->
                   <!--@update:tipVisible="tipVisible=$event"-->
                   <!--:tipVisible="tipVisible"-->
                   <!--:tipFailedDesc="tipFailedDesc"-->
                   <!--:jump-to="path"-->
        <!--&gt;</StatePage>-->
        <Validator :source="source"
                   :validatorVisible="validatorVisible"
                   @update:validatorVisible="validatorVisible=$event"></Validator>
    </div>
</template>

<script>
  import axios from 'axios'
  import Qs from 'qs'

  export default {
    name: "CoOperation",
    data() {
      return {
        des: '',
        loading: false,
        loading1: false,

        approverName: '',
        approverAvatarUrl: '',
        approverID: '',
        scroll: null,
        success: false,
        source: {},//表单验证
        validatorVisible: false,
        taskLifeList: [],
        chargerID: '',
        chargerName: '',
        chargerAvatarUrl: '',
        chairmanId: '',
        chairmanName: '',
        chairmanAvatarUrl: '',
        xiebanList: [],
        pointCount:0,
        lifePointList:[]
      }
    },
    props:{
      detailObj:{
        type:Object
      },
      visible:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      detailObj(){
        console.log('this.detailObj.lifePointList', this.detailObj.lifePointList)
        for (let i = 0; i < this.detailObj.lifePointList.length; i++) {
          let point = this.detailObj.lifePointList[i]

          if (point.state === 1 && point.approverID === this.$store.getters.openID) {
            this.pointCount = i
            console.log('inner count', this.pointCount)
            break
          }
          // if (point.state === 1) {
          //   this.pointCount = i
          //   console.log('inner count', this.pointCount)
          //   break
          // }
        }
        console.log('count', this.pointCount)
      },
      visible:{
        handler:function(){
          this.$initScroll(this.scroll, this.$refs.wrapper)
        },
        immediate:true
      }
    },
    mounted() {
      this.xiebanList = []
      this.des = ''

      this.$getChairMan().then((response) => {
        this.chairmanId = response.data.result
        console.log(this.chairmanId)
        this.$getPersonInfoByOpenID(this.chairmanId).then((response) => {
          let data = response.data.result.data[0]
          this.chairmanName = data.name
          this.chairmanAvatarUrl = data.photoUrl
          this.loading = false
        }).catch(() => {
          alert('获取主席姓名失败，请重试')
        })
      })
        .catch(() => {
          alert('获取主席ID失败，请重试')
        })


    },
    methods: {
      onClickToChooseApprover() {
        console.log('_this.detailObj.lifePointListLength', this.detailObj.lifePointListLength)
        let _this = this
        qing.call('selectPersons', {
          'isMulti': true,
          'success': function (result) {

            _this.lifePointList = []

            _this.xiebanList = result.data.persons
            result.data.persons.forEach((item, index) => {
              let obj = {}
              obj.approverID = item.openId
              obj.approverName = item.name
              obj.approverAvatarUrl = item.avatarUrl
              obj.index = index + 1
              obj.parentID = _this.detailObj.id
              obj.type = 2
              _this.lifePointList.push(obj)
            })
            let chairmanObj = {}
            chairmanObj.approverID = _this.chairmanId
            chairmanObj.approverName = _this.chairmanName
            chairmanObj.approverAvatarUrl = _this.chairmanAvatarUrl
            chairmanObj.index = result.data.persons.length + 1
            chairmanObj.parentID = _this.detailObj.id
            chairmanObj.type = 1
            _this.lifePointList.push(chairmanObj)
          }
        });
      },

      onClickToSave() {
        if(this.xiebanList<=0){
          alert('未选择协办人')
          return
        }
        if(!this.des){
          let question = confirm("您未填写协办意见，确定要提交协办吗？")
          if (!question) {
            return
          }
        }

        this.loading = true

        let url = this.$url + '/taskSystem/task/addPoint'
        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: Qs.stringify({
            jsonStr: JSON.stringify(this.lifePointList),
            index: this.detailObj.lifePointListLength
          })
        })
          .then((response) => {
            // alert(JSON.stringify(response.data))
            // this.path = 'process-center-cm'
            this.loading = false
            // this.tipVisible = true
            // if (response.data.success === true) {
            //   this.success = true
            // } else {
            //   this.success = false
            // }

            this.loading1 = true
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
                  state: 2,
                  info: this.des
                }])
              })
            })
              .then((response) => {
                this.loading1 = false
                if (response.data.success === true) {
                  alert('协办成功')
                } else {
                  alert('协办失败')
                }
                this.$emit('update:visible',false)
                this.$router.push({
                  name: 'process-center-cm',
                })

              }).catch(()=>{
                alert('添加协办意见失败')
            })

          }).catch(()=>{
          this.loading = false
          alert('协办失败')
        })
      },
      goBack(){
        this.$emit('update:visible',false)
      }
      // onClickToSave() {
      //   this.saveData()
      //
      //   if (this.$store.getters.currentRole === 1) {
      //     this.path = 'chairmanList'
      //   }
      //   else if (this.$store.getters.currentRole === 3) {
      //     this.path = 'list-clerk'
      //   }
      //   else if (this.$store.getters.currentRole === 4 || this.$store.getters.currentRole === 2) {
      //     this.path = 'listSourceAdmin'
      //   }
      //   else {
      //     this.path = 'list'
      //   }
      //
      //   setTimeout(() => {
      //     if (!this.validatorVisible) {
      //       let url = this.$url + '/taskSystem/task/life'
      //       this.loading = true
      //       axios({
      //         method: 'post',
      //         url: url,
      //         headers: {
      //           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      //         },
      //         data: Qs.stringify({
      //           jsonStr: JSON.stringify(this.taskLifeList),
      //         })
      //       }).then((response) => {
      //         this.loading = false
      //         this.tipVisible = true
      //         if (response.data.success === true) {
      //           this.success = true
      //         } else {
      //           this.tipFailedDesc = response.data.outerMessage
      //           this.success = false
      //         }
      //       })
      //     }
      //   }, 0)
      // },
      // onClickToChooseApprover() {
      //   let _this = this
      //   qing.call('selectPersons', {
      //     'isMulti': false,
      //     'success': function (result) {
      //       _this.approverAvatarUrl = result.data.persons[0].avatarUrl
      //       _this.approverName = result.data.persons[0].name
      //       _this.approverID = result.data.persons[0].openId
      //       // alert(JSON.stringify(result.data.persons[0]))
      //     }
      //   });
      // },

    },
    beforeDestroy() {
      this.xiebanList = []
      this.des = ''
    }
  }
</script>

<style scoped lang="scss">
    .componentWrap {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1111;
        background-color: #fff;
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
                        .icon {
                            margin-right: 0.12rem;
                            display: inline-block;
                            width: 0.16rem;
                            height: 0.16rem;
                            background: url("../../assets/添加.png") no-repeat !important;
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
                        background: url("../../assets/right1.png") no-repeat;
                        background-size: contain;
                    }

                    &.unfolded {
                        .icon {
                            display: inline-block;
                            width: 0.14rem;
                            height: 0.1rem;
                            background: url("../../assets/收起.png") no-repeat;
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
            .wrap{
                margin-bottom: 10px;
            }
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
                    background: url("../../assets/添加.png") no-repeat !important;
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
                            background: url("../../assets/附件删除.png") no-repeat !important;
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
                    background: url("../../assets/添加.png") no-repeat !important;
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

</style>