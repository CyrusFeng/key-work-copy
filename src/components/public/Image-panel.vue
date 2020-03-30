<template>
    <div class="panel-wrap" v-show="showImagePanel" ref="wrapper">
        <div class="img-wrap">
            <img :src="url" alt="" @load="loadImage" class="image" v-show="!showLoading">
            <img src="../../assets/loading-bottom.gif" alt="" v-show="showLoading" class="loading">
        </div>
    </div>
</template>

<script>
  import ClickOutside from '../../click-outside'
  import {removeListener} from '../../click-outside'
  export default {
    name: "image-panel",
    directives:{
      ClickOutside
    },
    props:{
      url:{
        type:String
      },
      showImagePanel:{
        type:Boolean,
      },
    },
    data(){
      return {
        showLoading:true
      }
    },
    mounted(){
    },
    methods:{
      close () {
        this.$emit('update:showImagePanel',false)
        this.$refs.wrapper.removeEventListener('click',this.addListener)
      },
      addListener(e) {
        if (this.$refs.wrapper.contains(e.target)) {
          this.close()
        }
      },
      loadImage(){
        this.showLoading = false
      }
    },
    watch:{
      showImagePanel(){
        if (this.showImagePanel === true){
          this.$refs.wrapper.addEventListener('click',this.addListener)
          this.showLoading = true
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .panel-wrap{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: black;
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
        .img-wrap{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        img.image{
            width: 100%;
            height: auto;
        }
        img.loading{
            width: 0.2rem;
            height: 0.2rem;
        }
    }
</style>