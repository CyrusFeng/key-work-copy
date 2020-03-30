<template>
    <div class="change-btn">
                    <span @click="changeIndex(index,$event)"
                          v-for="(item,index) in titleData"
                          :key="index"
                          :class="{'nav_active':index == currentIndex}"
                    >{{item.name}}</span>
    </div>
</template>

<script>
  export default {
    name: "change-button",
    props:{
      currentIndex:{
        type:Number,
        default:0
      },
      titleData:{
        type:Array
      }
    },
    methods: {
      changeIndex(index, $event) {
        // this.currentIndex = index;
        this.$emit('update:currentIndex',index)
        // this.detailSwiper.slideTo(this.currentIndex);
      },
    },
    watch:{
      currentIndex(){
        console.log(this.currentIndex)
      }
    }
  }
</script>

<style scoped lang="scss">
    .change-btn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        /*display: inline-block;*/
        display: flex;
        border-radius: 0.2rem;
        font-size: 0;
        background-color: #367be7;
        border:1px solid #ffffff;
        /*height: 0.3rem;*/
        span {
            /*display: inline-block;*/
            /*max-width: 4em;*/
            /*padding: 0.06rem 0.12rem;*/
            border-radius: 0.16rem;
            font-size: 0.13rem;
            color: #fff;
            background-color: #367be7;

            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 1;
            height: 0.3rem;
            width: max-content;
            padding: 0 0.12rem;
            &.nav_active {
                background: #fff;
                color: #367be7;
            }
        }
    }
</style>