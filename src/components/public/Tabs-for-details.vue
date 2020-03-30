<template>
    <div class="tab-title-wrap" ref="tabTitleWrap">
        <div class="tab-title">
            <div class="nav-item" :class="{'nav_active':index == currentIndex}" v-for="(item,index) in titlebar"
                 :key="index" @click.stop="changeIndex(index,$event)">
                <span ref="nav_item">{{item.name}}</span>
                <span v-if="showNum">({{6}})</span>
            </div>
            <span class="line" ref="line"></span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "tabs",
    data() {
      return {
        detailSwiper: null,
        lineWidth: 0,
        wrapLeft:0
      }
    },
    props: {
      titlebar: {
        type: Array
      },
      showNum: {
        type: Boolean,
        default: false
      },
      currentIndex:{
        type:Number,
        default:0
      },
      element:{
        type:Element
      }
    },
    mounted() {
      // this.currentIndex = 0

      this.lineWidth = this.$refs.line.clientWidth
      let dom, index
      // switch (this.billStatus) {
      //   case 'SUBMIT': {
      //     dom = this.$refs.nav_item[0]
      //     index = 0
      //     break
      //   }
      //   case 'SAVE': {
      //     dom = this.$refs.nav_item[1]
      //     index = 1
      //     break
      //   }
      //   case 'AUDIT': {
      //     dom = this.$refs.nav_item[2]
      //     index = 2
      //     break
      //   }
      //   default: {
      //     dom = this.$refs.nav_item[0]
      //     break
      //   }
      // }
      dom = this.$refs.nav_item[0]
      let tabTitleWrap = this.$refs.tabTitleWrap
      this.wrapLeft = tabTitleWrap.getBoundingClientRect().left
      // this.currentIndex = index;
      // this.detailSwiper.slideTo(this.currentIndex);

      // let { right } = dom.getBoundingClientRect()
      // this.$refs.line.style.left = right / 2 + 'px'
      // this.$refs.line.style.transform = 'translateX(-50%)'
      this.$refs.line.style.visibility = 'visible'

      let { width, left } = dom.getBoundingClientRect()
      console.log('left',left)
      console.log('this.wrapLeft',this.wrapLeft)
      // this.$refs.line.style.width = width+'px'
      this.$refs.line.style.left = left + width / 2 - this.lineWidth / 2 - this.wrapLeft + 'px'
      this.$refs.line.style.transition = 'all 350ms'
      // console.log("line width",this.$refs.line.clientWidth);
    },
    methods: {
      changeIndex(index, $event) {
        this.$emit('update:currentIndex',index)
        // this.$emit('update:element',$event.target)

        // this.currentIndex = index;
        // this.detailSwiper.slideTo(this.currentIndex);
        // this.lineMove(index,$event.target)
      },
      lineMove(index,ele){
        // console.log($event.target.parentNode)
        let currentDom = this.$refs.nav_item[index]
        // let currentDom = ele
        console.log('currentDom',currentDom)

        // let { width, left } = $event.target.parentNode.getBoundingClientRect()
        let { width, left } = currentDom.getBoundingClientRect()
        // console.log(left, width)

        // this.$refs.line.style.width = width+'px'
        console.log('left',left)
        console.log('this.wrapLeft',this.wrapLeft)
        if(this.wrapLeft === document.documentElement.clientWidth){
          this.wrapLeft = 0
        }
        this.$refs.line.style.left = left + width / 2 - this.lineWidth / 2 - this.wrapLeft + 'px'
        this.$refs.line.style.transition = 'all 350ms'
      }
    },
    watch:{
      currentIndex(){
        this.lineMove(this.currentIndex,this.element)
      }
    }
  }
</script>

<style lang="scss" scoped>
    /*.tab-title-wrap {*/
        /*!*padding: 0.05rem 0;*!*/
        /*!*background-color: #367be7;*!*/
    /*}*/

    .tab-title {
        background-color: #367be7;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: relative;
        .line {
            background: #fff;
            border-radius: 0.015rem;
            /*width: 0.21rem;*/
            width: 4em;
            height: 0.02rem;
            position: absolute;
            visibility: hidden;
            bottom: 0;

        }
        .nav-item {
            padding: 0 0.14rem;
            width: auto !important;
            font-size: 0.12rem;
            /*flex: 1;*/
            text-align: center;
            span {
                display: inline-block;
                line-height: 0.38rem;
                border-bottom: 0.02rem solid rgba(237, 91, 0, 0);
                color: #fff;
                opacity: 0.4;
                text-align: center;
            }
            &.nav_active {
                span {
                    color: #fff;
                    opacity: 1;
                }
            }
        }
    }
</style>