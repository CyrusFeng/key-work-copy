<template>
    <div class="rules-wrap" ref="wrapper">
        <ul class="rules" v-if="list.length>0">
            <li v-for="item in list" :key="item.id">
                <div class="head">
                    <div class="title">
                        <span class="projectName ellipsis">{{item.terName}}</span>
                    </div>
                </div>
                <div class="middle">
                    <span>日期区间：{{item.startDate && item.startDate.split(' ')[0]}}至{{item.endDate && item.endDate.split(' ')[0]}}</span>
                </div>
                <div class="middle">
                    <span>工作来源：{{getSourceName(item.sourceID)}}</span>
                </div>
                <div class="float-btn" @click="deleteRule(item.id)">
                    <span>删除</span>
                </div>
            </li>
        </ul>
        <Loading v-else
                 :showloadingwrap="true"
                 :showloadingimg="false"></Loading>
        <router-link :to="{name:'settings'}"
                     tag="div" class="btn">
            <!--<i class="icon"></i>-->
            <span class="icon">新增</span>
        </router-link>
        <FullPageLoading :loading="loading"></FullPageLoading>
        <StatePage :success="success"
                   @update:tipVisible="tipVisible=$event"
                   :tipVisible="tipVisible"
                   :tipFailedDesc="tipFailedDesc"
                   jump-to="transfer"
                   secondJump="rulesList"
        ></StatePage>
    </div>
</template>

<script>
  import axios from 'axios'
  import Qs from 'qs'

  export default {
    name: "rulesList",
    data() {
      return {
        scroll: null,
        list: [],
        loading:false,
        tipFailedDesc:'',
        tipVisible:false,
        success:false
      }
    },
    watch:{
      "$route":"getReplaceList"
    },
    created(){
      this.getReplaceList()
    },
    // beforeRouteEnter(to, from, next){
    //   next((vm)=>{
    //     vm.getReplaceList()
    //   })
    // },
    methods: {
      getReplaceList() {
        let wrapElement = this.$refs.wrapper
        let url = this.$url + '/taskSystem/rule/getRelpace'

        this.ajax(url, {}, this.list, this.scroll, wrapElement)
      },
      ajax(url, params, list, scroll, wrapElement) {
        axios({
          method: 'post',
          url: url,
        })
          .then((response) => {
            let amount = response.data.result.length
            if (amount > 0) {
              // list = response.data.result;
              response.data.result.forEach((item)=>{
                list.push(item)
              })
              console.log(list)
              if (scroll) {
                scroll.finishPullUp()
                scroll.refresh()
              }
              this.$initScroll(scroll, wrapElement)
            }
            else {
            }
          })
          .catch(() => {
          })
      },
      deleteRule(id){
        let question = confirm("确定要删除这条数据吗?")
        if (question) {
          this.loading = true
          let url = this.$url + '/taskSystem/rule/deleteRelpace'

          axios({
            method: 'post',
            url: url,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: Qs.stringify({
              ids: [id],
            },{ arrayFormat: 'brackets' })
          }).then((response) => {
            this.loading = false
            this.tipVisible = true
            if (response.data.success === true) {
              this.success = true
              // alert('操作成功')
            } else {
              this.tipFailedDesc = response.data.outerMessage
              this.success = false
              // alert('操作失败')
            }
            // this.$router.go(0)
          })
        }

      },
      getSourceName(id){
        let name = ''
        switch (id) {
          case '1': {
            name = '董事会'
            break
          }
          case '2': {
            name = '监事会'

            break
          }
          case '3': {
            name = '执委会'

            break
          }
          case '4': {
            name = '经营计划会'

            break
          }
          case '5': {
            name = '职能会'

            break
          }
          case '6': {
            name = '专项会'

            break
          }
          case '7': {
            name = '主席安排'

            break
          }
          case '8': {
            name = '主席工作报告'

            break
          }
          case '9': {
            name = '日常经营'

            break
          }
          case '3ed89f36-8932-4b50-991f-b66477f3a89e': {
            name = '日常会议安排'

            break
          }
          default: {
            break
          }
        }
        return name

      }
    }
  }
</script>

<style scoped lang="scss">
    .rules-wrap {
        .rules {
            /*overflow: hidden;*/
            li {
                padding: 0 0.12rem;
                margin-bottom: 0.1rem;
                background-color: #fff;
                padding-bottom: 0.1rem;
                position: relative;
                &:last-child {
                    margin-bottom: 0;
                }
                .float-btn{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    right: 0.1rem;
                    top: 0.1rem;
                    background:#367be7;
                    border-radius:16.5px;
                    width:60px;
                    height:28px;
                    span{
                        font-size:0.12rem;
                        color:#ffffff;
                    }
                }
            }
            .head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .title {
                    padding: 0.1rem 0 0.06rem 0;
                    font-size: 0;
                    .projectName {
                        /*display: inline-flex;*/
                        max-width: 2.4rem;
                        font-size: 0.14rem;
                        color: #3e3e3e;
                        vertical-align: middle;
                    }
                    .reward {
                        font-size: 0.14rem;
                        color: #3e3e3e;
                        vertical-align: middle;
                    }
                }
                .date {
                    font-size: 0.12rem;
                    color: #6f6f6f;
                }
            }
            .middle {
                padding-bottom: 0.06rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span {
                    font-size: 0.13rem;
                    color: #666666;
                }
            }
        }
        .btn {
            position: fixed;
            left: 0.12rem;
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
                width: 2.4em;
                height: 2em;
                font-size: 0.1rem;
                color: #ffffff;
                line-height: 1;
            }
        }
    }
</style>