<template>
    <div class="materiel-search-wrap" @click="" ref="searchWrap" v-show="open">
        <div>
            <!--<div class="search-bar-wrap" @click.stop="">-->
            <div class="search-bar-wrap">
                <div class="search-bar">
                    <i class="search-icon"></i>
                    <!--<label for="search1" class="showName" v-show="!labelStatus">请输入重点工作名称/姓名</label>-->
                    <!--<input type="text" id="search1" @input="search($event)" :value="selectedResult" placeholder="请输入重点工作名称/姓名xaggax">-->
                    <!--<input type="text" id="search1" v-model="selectedResult" placeholder="请输入重点工作名称/姓名xaggax">-->
                    <c-input tips="请输入重点工作名称/姓名"
                             background-color="#e7e7e7"
                             @update:inputValue="selectedResult = $event"
                             :input-value="selectedResult"></c-input>
                    <i class="icon clear" @click="clearSearchResult"></i>
                </div>
                <span class="cancelBtn" @click="closeSearch">取消</span>
            </div>

            <div class="row">
                <div class="label">时间区间</div>
                <div class="right yunzhijia">
                    <!--<c-select :orgRange="orgRange"-->
                    <!--defaultValue="zzz"-->
                    <!--@update:itemObj="companyID = $event.id"></c-select>-->
                    <!--<span>{{option.starttime + '~' + option.endtime||'请选择'}}</span>-->
                    <span>{{startDate}}-{{endDate}}</span>
                    <i class="icon date" @click="selectDate('during')"></i>
                    <i class="icon cancel" @click="cancelDate"></i>
                </div>
                <calendar :show.sync="showDatePicker" :mode="model" @change="onChange($event)"/>
            </div>

            <div class="checkbox-wrap">
                <checkbox :options="sourceArr" @value-change="radioOnChange($event)"></checkbox>
            </div>
        </div>

        <!--<div class="btn">-->
        <!--<span>搜索</span>-->
        <!--</div>-->
        <div class="button-wrap">
            <div class="btn2" @click="onClickToSearch">
                <span>搜索</span>
            </div>
        </div>
        <!--<div class="result-wrap" @click.stop="" v-show="showResult">-->
        <!--<ul class="result">-->
        <!--<li v-for="item in searchResult" @click="resultToSearchBar($event,item.supplierId)">{{item.supplierName}}</li>-->
        <!--</ul>-->
        <!--</div>-->
    </div>
</template>

<script>
  import axios from 'axios'
  import util from '../util'
  import checkbox from './public/checkbox/checkbox'

  export default {
    name: "taskSearch",
    components: {
      'checkbox': checkbox
    },
    props: {
      url: {
        type: String
      },
      open: {
        type: Boolean
      }
    },
    data() {
      return {
        timer: null,
        labelStatus: false,
        searchStatus: true,
        searchResult: [],
        selectedResult: '',
        showResult: false,
        showDatePicker: false,
        model: 'during',
        startDate: '',
        endDate: '',
        sourceArr: [],
        sourceIdArr: [],
        selectSource: []
      }
    },
    mounted() {
      if(this.$store.getters.currentRole === 0){
        this.sourceIdArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '3ed89f36-8932-4b50-991f-b66477f3a89e']
      }else if(this.$store.getters.currentRole === 1){
        this.sourceIdArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '3ed89f36-8932-4b50-991f-b66477f3a89e']
      }else if(this.$store.getters.currentRole === 2){
        this.sourceIdArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '3ed89f36-8932-4b50-991f-b66477f3a89e']
      }else if(this.$store.getters.currentRole === 3){
        // this.sourceIdArr = JSON.parse(this.$store.getters.sourceIDs)
        // if (this.sourceIdArr.length === 0) {
        //   this.sourceIdArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '3ed89f36-8932-4b50-991f-b66477f3a89e']
        // }
        this.sourceIdArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '3ed89f36-8932-4b50-991f-b66477f3a89e']
      } else if(this.$store.getters.currentRole === 4){
        this.sourceIdArr = JSON.parse(this.$store.getters.sourceIDs)
        if (this.sourceIdArr.length === 0) {
          this.sourceIdArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '3ed89f36-8932-4b50-991f-b66477f3a89e']
        }
      }

      // console.log(this.$store.getters.sourceIDs)

      this.sourceArr = this.sourceIdArr.map((source) => {
        switch (source) {
          case '1':
            return {
              value: source,
              label: '董事会'
            }
            break
          case '2':
            return {
              value: source,
              label: '监事会'
            }
            break
          case '3':
            return {
              value: source,
              label: '执委会'
            }
            break
          case '4':
            return {
              value: source,
              label: '经营计划会'
            }
            break
          case '5':
            return {
              value: source,
              label: '职能会'
            }
            break
          case '6':
            return {
              value: source,
              label: '专项会'
            }
            break
          case '7':
            return {
              value: source,
              label: '主席安排'
            }
            break
          case '8':
            return {
              value: source,
              label: '主席工作报告'
            }
            break
          case '9':
            return {
              value: source,
              label: '日常经营'
            }
            break
          case '3ed89f36-8932-4b50-991f-b66477f3a89e':
            return {
              value: source,
              label: '日常会议安排'
            }
            break
        }
      })
    },
    methods: {
      // changeShowSearch() {
      //   this.searchStatus = !this.searchStatus
      // },
      search(e) {
        this.selectedResult = e.target.value
        // this.labelHidden(e)
        //----------------
        //函数节流
        // clearTimeout(this.timer)
        // this.timer = setTimeout(() => {
        //   if (e.target.value !== '') {
        //     axios.get(this.url, {
        //       params: {
        //         keyword: e.target.value
        //       }
        //     })
        //       .then((response) => {
        //         this.searchResult = response.data.data;
        //         this.showResult = true
        //       })
        //       .catch(function (error) {
        //         console.log(error);
        //       });
        //   } else {
        //     this.showResult = false
        //     this.searchResult = []
        //     this.selectedResult = ''
        //     this.$emit('update:selected', '')
        //   }
        // }, 300)
      },
      labelHidden(e) {
        this.labelStatus = true
        if (e.target.value === '') {
          this.labelStatus = false
        }
      },
      resultToSearchBar(e, id) {
        this.selectedResult = e.target.textContent
        this.$emit('update:selected', id)
        this.hiddenSearch()
        this.searchResult = []
      },
      hiddenSearch() {
        this.showResult = false;
      },
      clearSearchResult() {
        // this.$emit('update:selected', '')
        this.selectedResult = ''
      },
      closeSearch() {
        this.$emit('update:open', false)
      },
      onClickToSearch() {
        let today = new Date
        let queryTask = {
          endtime: undefined,
          starttime: undefined,
          state: undefined,
          // chargerID: undefined,
          // signerID: undefined,
          life_done_type: undefined,
          // helperID: undefined,
          level: 1
        }
        queryTask.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31']
        queryTask.starttime = ['1970-01-01', util.getLastDateOfMonthHMS(today)]
        queryTask.life_done_type = undefined
        queryTask.state = [2, 3, 4]

        let queryTaskList = []
        // queryTaskList.push(queryTask)

        queryTaskList = this.generatorQueryList()
        this.$emit('update:queryTaskList', queryTaskList)
        this.$emit('update:open', false)
      },
      generatorQueryList() {
        let queryList = []
        let obj = {}
        let baseQuery = []
        if (this.selectedResult) {
          baseQuery = this.generatorQuery(this.selectedResult, this.startDate, this.endDate)
        } else {
          baseQuery = this.generatorQuery(undefined, this.startDate, this.endDate)
        }
        console.log('-------------basequery')
        console.log(baseQuery)
        if (this.selectSource.length > 0) {
          this.selectSource.forEach((sourceId) => {

            let newBaseQuery
            newBaseQuery = JSON.parse(JSON.stringify(baseQuery))
            console.log(newBaseQuery)
            newBaseQuery.forEach((item) => {
              item.sourceID = sourceId
            })
            queryList = queryList.concat(newBaseQuery)
            console.log('------------querylist')
            console.log(queryList)
          })
        }
        else {
          // queryList = baseQuery
          this.sourceIdArr.forEach((sourceId) => {

            let newBaseQuery
            newBaseQuery = JSON.parse(JSON.stringify(baseQuery))
            console.log(newBaseQuery)
            newBaseQuery.forEach((item) => {
              item.sourceID = sourceId
            })
            queryList = queryList.concat(newBaseQuery)
            console.log('------------querylist')
            console.log(queryList)
          })
        }

        if(this.$store.getters.currentRole === 0){
          let queryList1 = JSON.parse(JSON.stringify(queryList))
          let queryList2 = JSON.parse(JSON.stringify(queryList))
          let queryList3 = JSON.parse(JSON.stringify(queryList))
          queryList1.map((query)=>{
            return query.chargerID = this.$store.state.openID
          })
          queryList2.map((query)=>{
            return query.helperID = this.$store.state.openID
          })
          queryList3.map((query)=>{
            return query.signerID = this.$store.state.openID
          })
          queryList = queryList1.concat(queryList2,queryList3)
        }
        else if(this.$store.getters.currentRole === 1){
          let queryList1 = JSON.parse(JSON.stringify(queryList))
          queryList1.map((query)=>{
            // return query.state = [1,2,3,4]
            return query.state = [2,3,4]
          })
          queryList = queryList1
        }
        else if(this.$store.getters.currentRole === 3){

          let queryList1 = JSON.parse(JSON.stringify(queryList))
          let queryList2 = JSON.parse(JSON.stringify(queryList))
          queryList1.map((query)=>{
            return query.chargerID = 'default'
          })
          queryList2.map((query)=>{
            return query.helperID = 'default'
          })
          queryList = queryList1.concat(queryList2)
        }
        return queryList
      },
      generatorQuery(selectedResult, starttime, endtime, source) {
        let today = new Date()
        if (selectedResult) {

          return [
            {
              projectName: selectedResult,
              starttime: endtime ? ['1970-01-01 00:00:00', this.dateTransform(endtime, '23:59:59')] : ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
              // starttime: endtime ? ['1970-01-01 00:00:00', this.dateTransform(endtime, '23:59:59')] : ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
              endtime: starttime ? [this.dateTransform(starttime, '00:00:00'), '9999-12-31 23:59:59'] : ['1970-01-01 00:00:00', '9999-12-31 23:59:59'],
              // endtime: starttime ? [this.dateTransform(starttime, '00:00:00'), '9999-12-31 23:59:59'] : [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59'],
              level: 1,
              state: [2, 3, 4]
            },
            {
              chargerName: selectedResult,
              starttime: endtime ? ['1970-01-01 00:00:00', this.dateTransform(endtime, '23:59:59')] : ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
              // starttime: endtime ? ['1970-01-01 00:00:00', this.dateTransform(endtime, '23:59:59')] : ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
              endtime: starttime ? [this.dateTransform(starttime, '00:00:00'), '9999-12-31 23:59:59'] : ['1970-01-01 00:00:00', '9999-12-31 23:59:59'],
              // endtime: starttime ? [this.dateTransform(starttime, '00:00:00'), '9999-12-31 23:59:59'] : [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59'],
              level: 1,
              state: [2, 3, 4]
            },
            {
              helperName: selectedResult,
              starttime: endtime ? ['1970-01-01 00:00:00', this.dateTransform(endtime, '23:59:59')] : ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
              // starttime: endtime ? ['1970-01-01 00:00:00', this.dateTransform(endtime, '23:59:59')] : ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
              endtime: starttime ? [this.dateTransform(starttime, '00:00:00'), '9999-12-31 23:59:59'] : ['1970-01-01 00:00:00', '9999-12-31 23:59:59'],
              // endtime: starttime ? [this.dateTransform(starttime, '00:00:00'), '9999-12-31 23:59:59'] : [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59'],
              level: 1,
              state: [2, 3, 4]
            },
            {
              signerName: selectedResult,
              starttime: endtime ? ['1970-01-01 00:00:00', this.dateTransform(endtime, '23:59:59')] : ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
              // starttime: endtime ? ['1970-01-01 00:00:00', this.dateTransform(endtime, '23:59:59')] : ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
              endtime: starttime ? [this.dateTransform(starttime, '00:00:00'), '9999-12-31 23:59:59'] : ['1970-01-01 00:00:00', '9999-12-31 23:59:59'],
              // endtime: starttime ? [this.dateTransform(starttime, '00:00:00'), '9999-12-31 23:59:59'] : [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59'],
              level: 1,
              state: [2, 3, 4]
            }
          ]
        } else {
          return [
            {
              // starttime: ['1970-01-01 00:00:00',this.dateTransform(endtime, '23:59:59')],
              // endtime: [this.dateTransform(starttime, '00:00:00'),'9999-12-31 23:59:59'],
              starttime: endtime ? ['1970-01-01 00:00:00', this.dateTransform(endtime, '23:59:59')] : ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
              // starttime: endtime ? ['1970-01-01 00:00:00', this.dateTransform(endtime, '23:59:59')] : ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
              endtime: starttime ? [this.dateTransform(starttime, '00:00:00'), '9999-12-31 23:59:59'] : ['1970-01-01 00:00:00', '9999-12-31 23:59:59'],
              // endtime: starttime ? [this.dateTransform(starttime, '00:00:00'), '9999-12-31 23:59:59'] : [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59'],
              level: 1,
              state: [2, 3, 4]
            }
          ]
        }

      },
      onChange(date) {
        this.startDate = date.map((item) => item.format('YYYY/MM/DD'))[0]
        this.endDate = date.map((item) => item.format('YYYY/MM/DD'))[1]
      },
      selectDate(mode) {
        // this.show = true;
        // this.mode = mode;
        // this.date = '';

        this.model = mode;
        this.showDatePicker = true
      },
      cancelDate() {
        this.startDate = ''
        this.endDate = ''
      },
      radioOnChange($event) {
        this.selectSource = $event
        console.log($event)
      },
      dateTransform(date, tail) {
        let arr = date.split('/')
        let newDate = arr.join('-')
        let finalDate = newDate + ' ' + tail
        return finalDate
      }
    }
  }
</script>

<style scoped lang="scss">
    .materiel-search-wrap {
        width: 100%;
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        height: 100%;
        background-color: #fff;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .materiel-search-wrap .search-bar-wrap {
        padding: 0.1rem 0 0.1rem 0.12rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #F2F6F9;
    }

    .materiel-search-wrap .search-bar-wrap .search-bar {
        margin-right: 0.06rem;
        padding: 0.08rem 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: #e7e7e7;
        border-radius: 0.1rem;
        flex: 1;
        position: relative;
    }

    .materiel-search-wrap .search-bar-wrap .search-bar label {
        position: absolute;
        top: 50%;
        left: 0.35rem;
        transform: translateY(-50%);
        font-size: 0.14rem;
        color: #8e8e93;
    }

    .materiel-search-wrap .search-bar-wrap .search-bar .search-icon {
        margin: 0 0.12rem;
    }

    .materiel-search-wrap .search-bar-wrap .search-bar input {
        margin-right: 0.2rem;
        height: 0.22rem;
        font-size: 0.14rem;
        background: #e7e7e7;
        border: 0;
        flex: 1;
    }

    .materiel-search-wrap .search-bar-wrap .search-bar .icon.clear {
        margin-right: 0.06rem;
        display: inline-block;
        width: 0.14rem;
        height: 0.14rem;
        background: url("../assets/cuowu.png") no-repeat !important;
        background-size: contain !important;
    }

    .materiel-search-wrap .search-bar-wrap .cancelBtn {
        margin-right: 0.1rem;
        font-size: 0.14rem;
        color: #007aff;
    }

    .materiel-search-wrap .result-wrap {
        padding-left: 0.12rem;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0.58rem;
        background: #fff;
        z-index: 2;
    }

    .materiel-search-wrap .result-wrap .result li {
        padding: 0.14rem 0;
        position: relative;
        font-size: 0.12rem;
        color: #929292;
        /*border-bottom: 1px solid #efefef;*/
    }

    .materiel-search-wrap .result-wrap .result li::after {
        content: "  ";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #efefef;
        /* 如果不用 background-color, 使用 border-top:1px solid #e0e0e0; */
    }

    @media screen and (-webkit-min-device-pixel-ratio: 2) {
        .materiel-search-wrap .result-wrap .result li::after {
            transform: scaleY(.5);
        }
    }

    @media screen and (-webkit-min-device-pixel-ratio: 3) {
        .materiel-search-wrap .result-wrap .result li::after {
            transform: scaleY(.333333);
        }
    }

    .row {
        /*margin-right: 0.1rem;*/
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #F2F6F9;
        .label {
            padding: 0.13rem 0.15rem 0.13rem 0.15rem;
            font-size: 0.12rem;
            color: #8e8e93;
            width: calc(4em + 0.3rem);
        }
        .right {
            margin-right: 0.1rem;
            padding: 0.04rem 0.12rem 0.04rem 0.2rem;
            /*margin-bottom: 0.16rem;*/
            /*font-size: 0.14rem;*/
            font-size: 0.12rem;
            color: #8e8e93;
            border-bottom: 1px solid #f0f0f0;
            flex: 1;
            background-color: #fff;
            border-radius: 0.08rem;
            .active {
                color: #b4b4b4;
            }
            &.yunzhijia {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .icon.date {
                    /*margin-right: 0.12rem;*/
                    display: inline-block;
                    width: 0.16rem;
                    height: 0.16rem;
                    background: url("../assets/添加.png") no-repeat !important;
                    background-size: contain !important;
                    margin-right: 0.2rem;
                }
                .icon.cancel {
                    /*margin-right: 0.12rem;*/
                    display: inline-block;
                    width: 0.16rem;
                    height: 0.16rem;
                    background: url("../assets/cuowu.png") no-repeat !important;
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
