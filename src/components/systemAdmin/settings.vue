<template>
    <div class="wrapper">
        <div class="bg" style="" ref="container">
            <div class="wrap">
                <div class="block" v-for="option in options">
                    <div class="row">
                        <div class="label">代审批人</div>
                        <div class="right yunzhijia">
                            <span>{{option.terName||'请选择'}}</span>
                            <i class="icon" @click="onClickToChooseReplace(option)"></i>
                        </div>
                    </div>
                    <div class="row">
                        <div class="label">工作来源 <span class="star">*</span></div>
                        <div class="right">
                            <c-select :orgRange="sourceArr"
                                      defaultValue="zzz"
                                      @update:itemObj="chooseSource($event,option)"></c-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="label">日期范围 <span class="star">*</span></div>
                        <div class="right yunzhijia">
                            <!--<c-select :orgRange="orgRange"-->
                            <!--defaultValue="zzz"-->
                            <!--@update:itemObj="companyID = $event.id"></c-select>-->
                            <!--<span>{{option.starttime + '~' + option.endtime||'请选择'}}</span>-->
                            <span>{{option.startDate}}~{{option.endDate}}</span>
                            <i class="icon" @click="selectDate('during',option)"></i>
                        </div>
                        <calendar :show.sync="option.showDatePicker" :mode="option.model" @change="onChange($event,option)"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="button-wrap">
            <div class="btn2" @click="saveData">
                <span>发送</span>
            </div>
        </div>
        <div class="btn" @click="addOption">
            <!--<i class="icon"></i>-->
            <span class="icon">添加</span>
        </div>
        <FullPageLoading :loading="loading"></FullPageLoading>
        <FullPageLoading :loading="loading1"></FullPageLoading>
        <FullPageLoading :loading="loading2"></FullPageLoading>
        <StatePage :success="success"
                   @update:tipVisible="tipVisible=$event"
                   :tipVisible="tipVisible"
                   :tipFailedDesc="tipFailedDesc"
                   :jump-to="pathname"
        ></StatePage>
    </div>
</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import Qs from 'qs'


  export default {
    name: "settings",
    data() {
      return {
        show: false,
        mode: 'during',
        date: '',
        sourceArr: [],
        options: [],
        scorll: null,
        loading:false,
        loading1:false,
        loading2:false,
        chairmanId:'',
        chairmanName:'',
        success:false,
        tipVisible:false,
        pathname:'rulesList',
        tipFailedDesc:''
      };
    },
    beforeRouteEnter(to, from, next) {
      next((vm)=>{
        qing.call('setWebViewTitle', { 'title': '主席委托设置' })
      })
    },
    mounted() {
      this.loading = true
      this.$getChairMan().then((response) => {
        this.chairmanId = response.data.result
        console.log(this.chairmanId)
        this.$getPersonInfoByOpenID(this.chairmanId).then((response)=>{
          let data = response.data.result.data[0]
          this.chairmanName = data.name
          this.loading = false

          this.options.push({
            berID: this.chairmanId,
            berName: this.chairmanName,
            terID: '',
            terName: '',
            startDate: '',
            endDate: '',
            sourceID: '',
            showDatePicker: false,
            model: 'during',
            isQualified:true
          })
        }).catch(() => {
          alert('获取主席姓名失败，请重试')
        })
      })
        .catch(() => {
          alert('获取主席ID失败，请重试')
        })

      this.loading1 = true
      let sourceURL = this.$url + "/taskSystem/source/list"
      axios.get(sourceURL, {
        params: {}
      })
        .then((response) => {
          // alert(response.data.result)
          this.sourceArr = response.data.result
          this.sourceArr.unshift({ name: '请选择', id: 0 })
          this.loading1 = false
        }).catch(() => {
        alert('获取工作来源失败，请重试')
      })

    },
    methods: {
      selectDate(mode, option) {
        // this.show = true;
        // this.mode = mode;
        // this.date = '';

        option.model = mode;
        option.showDatePicker = true
      },
      onChange(date, option) {
        if (option.model === 'single') {
          // option.dataRange = date.format('YYYY-MM-DD');
        } else {

          // option.starttime = JSON.stringify(date.map((item) => item.format('YYYY-MM-DD')))[0];
          option.startDate = date.map((item) => item.format('YYYY-MM-DD'))[0];
          option.endDate = date.map((item) => item.format('YYYY-MM-DD'))[1];
        }
      },
      onClickToChooseReplace(option) {
        qing.call('selectPersons', {
          'isMulti': false,
          'success': function (result) {

            option.terID = result.data.persons[0].openId
            option.terName = result.data.persons[0].name
            console.log(JSON.stringify(result.data.persons[0]))
            console.log(result.data.persons[0].openId)
            console.log(result.data.persons[0].name)
          }
        });
      },
      chooseSource($event, option) {
        if ($event.id === 0) {
          option.sourceID = ''
        } else {
          option.sourceID = $event.id
        }
      },

      addOption() {
        this.options.push({
          // dataRange:'',
          berID: this.chairmanId,
          berName: this.chairmanName,
          terID: '',
          terName: '',
          startDate: '',
          endDate: '',
          sourceID: '',
          showDatePicker: false,
          model: 'during',
          isQualified:true
        })
      },
      saveData() {
        this.options.forEach((option) => {
          if (!option.terID || !option.sourceID || !option.startDate || !option.endDate) {
            option.isQualified = false
            // alert('判断是否进入非空判断')
            // alert(JSON.stringify(option))
          }
        })
        let arr = []
        this.options.forEach((option)=>{
          let optionCopy = JSON.parse(JSON.stringify(option))
          // alert('查看当前option')
          // alert(JSON.stringify(optionCopy))
          if(optionCopy.isQualified){
            delete optionCopy.showDatePicker
            delete optionCopy.model
            delete optionCopy.isQualified
            // alert('查看删除属性后当前option属性')
            arr.push(optionCopy)
            // alert(JSON.stringify(arr))
          }
        })
        // alert('查看最后的arr')
        // alert(JSON.stringify(arr))
        if(arr.length<=0){
          alert('有未填项，请检查')
          return
        }

        let url = this.$url + '/taskSystem/rule/saveRelpace'
        this.loading2 = true
        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: Qs.stringify({
            jsonStr: JSON.stringify(arr),
          })
        }).then((response) => {
          this.loading2 = false
          this.tipVisible = true
          if (response.data.success === true) {
            this.success = true
          } else {
            this.tipFailedDesc = response.data.outerMessage
            this.success = false
          }
        })
      }
    },
  }
</script>

<style scoped lang="scss">
    .wrapper{
        height: 100%;
    }
    .bg {
        height: calc(100% - 0.45rem);
        overflow: scroll;
        /*background: #ccc;*/
        .wrap {
            /*height: 100%;*/
            /*overflow: hidden;*/
        }
    }

    .block {
        padding-left: 0.12rem;
        padding-right: 0.12rem;
        margin-bottom: 0.1rem;
        background: #fff;
    }

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
            width: 2em;
            height: 2em;
            font-size: 0.1rem;
            color: #ffffff;
            line-height: 1;
        }
    }

    .button-wrap {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
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