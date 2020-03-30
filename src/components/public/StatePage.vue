<template>
    <div class="wrap" v-if="tipVisible">
        <div class="icon">
            <img src="../../assets/cuowu.png" alt="" v-if="!success">
            <img src="../../assets/chenggong.png" alt="" v-if="success">
        </div>
        <div class="desc">{{desc}}&nbsp;&nbsp;{{count}}秒后跳转</div>
        <div class="guide" v-if="!success">保存失败请重新保存</div>
        <div class="guide" v-if="!success">{{tipFailedDesc}}</div>
    </div>
</template>

<script>
  export default {
    name: "tips",
    props: {
      tipVisible: {
        type: Boolean
      },
      success: {
        type: Boolean
      },
      desc: {
        type: String
      },
      tipFailedDesc: {
        type: String
      },
      billType: {
        type: String
      },
      billStatus: {
        type: String
      },
      jumpTo: {
        type: String,
        default: 'list'
      },
      secondJump: {
        type: String
      }
    },
    data() {
      return {
        count: 1,
      }
    },
    // computed:{
    //   count(){
    //     return this.success?1:3
    //   }
    // },
    watch: {
      tipVisible() {
        if (this.tipVisible) {
          if (this.success) {
            this.count = 1
          } else {
            this.count = 3
          }

          let timer = setInterval(() => {
            this.count--
            if (this.count === 0) {
              clearInterval(timer)
              // this.count = 3
              this.$emit('update:tipVisible', false)
              this.$router.push({
                name: this.jumpTo,
                params: {
                  jumpTo: this.secondJump
                }
              })
              // this.$router.push({name: this.jumpTo, query: {key: "2"}});
            }
          }, 1000)
        }
      },
    },
  }
</script>

<style scoped lang="scss">
    .wrap {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        width: 100%;
        height: 100%;
        background-color: #fff;
        .icon {
            margin: 0.5rem auto 0;
            width: 0.6rem;
            height: 0.6rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .desc {
            padding-top: 0.24rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.20rem;
            color: #333333;
        }
        .guide {
            padding-right: 0.2rem;
            padding-left: 0.2rem;
            padding-top: 0.06rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.12rem;
            line-height: 1.5;
            color: #939393;
        }
    }
</style>