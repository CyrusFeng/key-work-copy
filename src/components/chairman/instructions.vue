<template>
    <div style="height: 100%">
        <div class="scroll-wrap" ref="wrapper" style="height: calc(100% - 0.45rem);overflow: hidden">
            <div style="height: 100%">
                <div class="block" style="height: 100%">
                    <div class="title-wrap">
                        <field-title :blueline-visible="false" :redstar-visible="false">批示意见</field-title>
                    </div>
                    <div class="text">
                        <c-textarea default-value=""
                                    remark=""
                                    tips="点击输入相关批示"
                                    row="30"
                                    @update:inputValue="des = $event"></c-textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="button-wrap">
            <div class="btn2" @click="onClickToSave">
                <span>发送</span>
            </div>
        </div>
        <FullPageLoading :loading="loading"></FullPageLoading>
        <StatePage :success="success"
                   @update:tipVisible="tipVisible=$event"
                   :tipVisible="tipVisible"
                   jump-to="taskdetail"
        ></StatePage>
        <Validator :source="source"
                   :validatorVisible="validatorVisible"
                   @update:validatorVisible="validatorVisible=$event"></Validator>
    </div>
</template>

<script>
  import axios from 'axios'
  import Qs from 'qs'
  export default {
    name: "instructions",
    data(){
      return {
        scroll: null,
        loading: false,
        tipVisible: false,
        success: false,
        source: {},//表单验证
        validatorVisible: false,
        commentList:[],
        detailObj:{},
        des:''
      }
    },
    beforeRouteEnter(to, from, next) {
      qing.call('setWebViewTitle',{'title':'批示'})

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
        // console.log('vm.detailObj.taskLifeList', vm.detailObj.taskLifeList)
      })
    },

    mounted() {
      this.$initScroll(this.scroll, this.$refs.wrapper)
    },
    methods: {
      saveData() {
        let commentList = [{}]
        commentList[0].parentID = this.detailObj.id
        commentList[0].comments = this.des

        this.commentList = commentList

        // this.source = {
        //   approverID: this.approverID,
        // }
      },
      onClickToSave() {
        if(!this.des){
          alert('请输入批示意见')
          return
        }
        this.saveData()

        setTimeout(() => {
          if (!this.validatorVisible) {
            let url = this.$url + '/taskSystem/task/comment'
            this.loading = true
            axios({
              method: 'post',
              url: url,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              data: Qs.stringify({
                jsonStr: JSON.stringify(this.commentList),
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