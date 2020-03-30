<template>
    <div class="wrap" v-if="validatorVisible">
        <div class="title">请将以下必填项填写完整</div>
        <ul>
            <li v-for="item,key,index in errors">
                <!--<span>{{mapping(key,orderType)}}</span>-->
                <span>{{item.alias}}</span>
                <span>{{item.required}}</span>
            </li>
        </ul>
        <div class="btn-wrap">
            <div class="btn" @click="sure">确定</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "validator",
    props: {
      source: {
        type: Object
      },
      validatorVisible: {
        type: Boolean
      },
      orderType: {
        type: String
      }
    },
    data() {
      return {
        rules: [
          { key: 'projectName', required: true, owner: 'taskAdd', entry: false, alias: '项目名称' },
          { key: 'chargerName', required: true, owner: 'taskAdd', entry: false, alias: '责任人' },
          { key: 'sourceID', required: true, owner: 'taskAdd', entry: false, alias: '工作来源' },
          { key: 'starttime', required: true, owner: 'taskAdd', entry: false, alias: '启动时间' },
          { key: 'endtime', required: true, owner: 'taskAdd', entry: false, alias: '完成时间' },
          { key: 'unitName', required: true, owner: 'taskAdd', entry: false, alias: '单位名称' },
          { key: 'problem', required: true, owner: 'taskAdd', entry: false, alias: '现状及问题' },
          { key: 'ways', required: true, owner: 'taskAdd', entry: false, alias: '实施方法' },
          { key: 'aim', required: true, owner: 'taskAdd', entry: false, alias: '预期目标' },
          { key: 'approverID', required: true, owner: 'taskAdd', entry: false, alias: '第一审批人' },
          { key: 'change_reason', required: true, owner: 'taskAdd', entry: false, alias: '变更原因' },
          { key: 'chargerID', required: true, owner: 'taskAdd', entry: false, alias: '责任人' },
          { key: 'chargersLeaderID', required: true, owner: 'taskAdd', entry: false, alias: '上级领导' },
          { key: 'explain1', required: true, owner: 'taskAdd', entry: false, alias: '完结说明' },
          { key: 'explain2', required: true, owner: 'taskAdd', entry: false, alias: '现状' },
          { key: 'explain3', required: true, owner: 'taskAdd', entry: false, alias: '未完成原因' },
          { key: 'reason1', required: true, owner: 'taskAdd', entry: false, alias: '主观原因' },
          { key: 'reason2', required: true, owner: 'taskAdd', entry: false, alias: '客观原因' },
          { key: 'des', required: true, owner: 'taskAdd', entry: false, alias: '工作进展情况' },
          { key: 'after', required: true, owner: 'taskAdd', entry: false, alias: '变更内容' },
        ],
        entrys: [],
        errors: {},
      }
    },
    methods: {
      sure() {
        this.$emit('update:validatorVisible', false)
        this.errors = {}
      },
      // mapping(key, orderType) {
      //   for (let i = 0; i < this.chinese.length; i++) {
      //     if (key === this.chinese[i]['key']) {
      //       if (key === 'remark' || key === 'entrys') {
      //         if (orderType === this.chinese[i]['owner']) {
      //           return this.chinese[i]['explain']
      //         }
      //       } else {
      //         return this.chinese[i]['explain']
      //       }
      //     }
      //   }
      // },
      validator(rules, source, errorArr) {

        Object.keys(source).forEach(function (key) {
          let value = source[key]

          rules.forEach((rule) => {
            if (rule.key === key && rule.required) {
              if (value === null || value === 'null' || value === '' || value === undefined || value === 'undefined' || JSON.stringify(value) === '{}' || JSON.stringify(value) === '[]') {
                errorArr[rule.key] = { required: '为必填项', alias: rule.alias }
              }
            }
          })
          console.log(key, source[key]);
        });
      }
    },
    watch: {
      source: {
        handler() {
          this.validator(this.rules, this.source, this.errors)
          console.log(JSON.stringify(this.errors))
          this.$emit('update:validatorVisible', JSON.stringify(this.errors) !== '{}')
        },
        // immediate: true,
        deep: true,
      }
    }
  }
</script>

<style scoped lang="scss">
    .wrap {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.8);
        .title {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 2.4rem;
            padding: 0.16rem 0;
            font-size: 0.16rem;
            background: #3b80ec;
            color: #ffffff;
        }
        ul {
            width: 2.4rem;
            background: #fff;
            li {
                padding: 0.1rem 0.2rem;
                font-size: 0.14rem;
            }
        }
        .btn-wrap {
            padding: 0.1rem 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 2.4rem;
            background: #fff;
        }
        .btn {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #3b80ec;
            border-radius: 0.14rem;
            width: 0.75rem;
            height: 0.28rem;
            font-size: 0.14rem;
            color: #ffffff;
        }
    }
</style>