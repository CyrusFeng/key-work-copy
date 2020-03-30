<template>
    <div style="height: 100%;background-color: #fff">
        <div class="scroll-wrap" ref="wrapper">
            <div class="list-wrap">
                <div class="block field">
                    <div class="title-wrap">
                        <field-title :blueline-visible="false" :redstar-visible="false">{{detailObj.projectName}}</field-title>
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

                <div class="block" v-if="detailObj.type === 1">
                    <div class="title-wrap">
                        <field-title :blueline-visible="true" :redstar-visible="false">现状及问题</field-title>
                    </div>
                    <div class="des-wrap">
                        <p class="des">{{detailObj.problem|| '暂无现状及问题'}}</p>
                    </div>
                </div>
                <div class="block" v-if="detailObj.type === 1">
                    <div class="title-wrap">
                        <field-title :blueline-visible="true" :redstar-visible="false">实施方法</field-title>
                    </div>
                    <div class="des-wrap">
                        <p class="des">{{detailObj.ways|| '暂无实施方法'}}</p>
                    </div>
                </div>
                <div class="block" v-if="detailObj.type === 1">
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
                        <p class="des">{{change_info_string || '暂无变更内容'}}</p>
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
                        <p class="des">{{detailObj.done_info || '暂无完结说明'}}</p>
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
                        <p class="des">任务现状：{{detailObj.done_going || '暂无任务现状'}}</p>
                        <p class="des">完结原因：{{detailObj.done_reason || '暂无完结原因'}}</p>
                    </div>
                </div>
                <div class="block" v-if="detailObj.type === 4">
                    <div class="title-wrap">
                        <field-title :blueline-visible="true" :redstar-visible="false">废止原因</field-title>
                    </div>
                    <div class="des-wrap">
                        <p class="des">{{detailObj.cancel_type===2?'客观原因：':'主观原因：'}}{{detailObj.cancel_reason || '暂无废止原因'}}</p>
                    </div>
                </div>
                <div class="block" v-if="detailObj.type === 5">
                    <div class="title-wrap">
                        <field-title :blueline-visible="true" :redstar-visible="false">反馈信息</field-title>
                    </div>
                    <div class="des-wrap">
                        <p class="des">{{detailObj.reply_info || '暂无反馈信息'}}</p>
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
                                        <span class="date">{{judgePointStatus(detailObj.lifePointList,index) ||getPointStatus(item.state)}}</span>
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


                <div class="block rate-wrap" v-if="$showReward(detailObj.reward) && detailObj.type === 3 && detailObj.state === 3">
                    <!--<div class="title">-->
                    <!--<span>加分情况</span>-->
                    <!--</div>-->
                    <div class="title-wrap">
                        <field-title :blueline-visible="true" :redstar-visible="false">卓越奖励</field-title>
                    </div>
                    <Rate v-model="detailObj.reward" :size="35" :read-only="true"></Rate>
                    <!--<p>此项工作结果成效卓越，超出预期，特给予加分奖励！</p>-->
                </div>
            </div>
        </div>
        <image-panel :url="imageUrl" :showImagePanel.sync="showImagePanel"></image-panel>
    </div>
</template>

<script>
  import fieldTitle from './public/Title'
  import imagePanel from './public/Image-panel'
  import Rate from './public/rate/rate'

  export default {
    name: "taskLifeDetail",
    components: {
      'field-title': fieldTitle,
      'image-panel': imagePanel,
      'Rate':Rate
    },
    data(){
      return {
        detailObj:{},
        folded: true,
        imageUrl: '',
        showImagePanel: false,
        urlObj:[],
        change_info:{},
        change_info_string:''
      }
    },
    mounted() {
      this.$initScroll(this.scroll,this.$refs.wrapper)
    },
    beforeRouteEnter(to, from, next) {
      qing.call('setWebViewTitle',{'title':'流程详情'})

      next((vm) => {
        if (from.name === 'taskdetail') {
          let { detailObj } = vm.$route.params
          vm.detailObj = JSON.parse(detailObj)

          if (vm.detailObj) {
            localStorage.setItem('life_detailObj', JSON.stringify(vm.detailObj))
          }
        } else {
          vm.detailObj = localStorage.getItem('life_detailObj')
        }
        if (vm.detailObj.imgs && vm.detailObj.imgs.length > 0) {
          vm.urlObj = []
          vm.detailObj.imgs.split(',').forEach((imgurl) => {
            vm.urlObj.push({ url: imgurl })
          })
        }
        console.log('vm.detailObj.change_info',vm.detailObj.change_info)
        if(vm.detailObj.change_info){
          if(typeof vm.detailObj.change_info === 'string'){
            vm.change_info = JSON.parse(vm.detailObj.change_info)
          }else{
            vm.change_info = vm.detailObj.change_info
          }

          let item1,item2,item3,item4,item5
          if(vm.change_info.after.endtime !== vm.change_info.before.endtime){
            item1 = `预计完成时间：由${vm.change_info.before.endtime.split(' ')[0]}变更为${vm.change_info.after.endtime.split(' ')[0]}\r\n`
            vm.change_info_string += item1
          }
          if(vm.change_info.after.unitName !== vm.change_info.before.unitName){
            item2 = `单位名称：由${vm.change_info.before.unitName}变更为${vm.change_info.after.unitName?vm.change_info.after.unitName:"' '"}\r\n`
            vm.change_info_string += item2
          }
          if(vm.change_info.after.chargerName !== vm.change_info.before.chargerName){
            item3 = `责任人：由${vm.change_info.before.chargerName}变更为${vm.change_info.after.chargerName?vm.change_info.after.chargerName:"' '"}\r\n`
            vm.change_info_string += item3
          }
          if(vm.change_info.after.helperName !== vm.change_info.before.helperName){
            let beforeHelperName = vm.change_info.before.helperName
            if(beforeHelperName === undefined || beforeHelperName === null || beforeHelperName === 'undefined' || beforeHelperName === 'null'){
              beforeHelperName = '未设置'
            }else{
              beforeHelperName = vm.change_info.before.helperName
            }
            item4 = `协助人：由${beforeHelperName}变更为${vm.change_info.after.helperName?vm.change_info.after.helperName:"' '"}\r\n`
            vm.change_info_string += item4
          }
          if(vm.change_info.after.aim !== vm.change_info.before.aim){
            let aim = vm.change_info.before.aim
            if(aim === undefined || aim === null || aim === 'undefined' || aim === 'null'){
              aim = '未设置'
            }else{
              aim = vm.change_info.before.aim
            }
            item5 = `预计完成目标：由${aim}变更为${vm.change_info.after.aim?vm.change_info.after.aim:"' '"}\r\n`
            vm.change_info_string += item5
          }
        }

      })
      // let a = {"eid":"8738001","openId":"5b584ae0e4b0326c56807440"}
    },
    beforeDestroy(){
      this.urlObj = []
    },
    methods:{
      onClickImage(url) {
        this.imageUrl = url
        this.showImagePanel = true
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

    }
  }
</script>

<style scoped lang="scss">
    * {
        font-size: 12px;
    }
    .scroll-wrap {
        height: 100%;
        overflow: hidden;
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
        &.rate-wrap {
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
    }

    .swiper-slide {
        &:last-child {
            background-color: #fff;
        }
    }

    .timeline {
        padding-top: 0.1rem;
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