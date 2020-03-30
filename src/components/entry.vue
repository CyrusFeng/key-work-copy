<template>
    <div class="bg">
        <!--<p @click="chooseBSY">-->
            <!--<i class="icon"></i>-->
            <!--<span>办事员</span>-->
        <!--</p>-->
        <!--<p @click="chooseGLY">-->
            <!--<i class="icon"></i>-->
            <!--<span>系统管理员</span>-->
        <!--</p>-->
        <!--<p @click="chooseGR">-->
            <!--<i class="icon"></i>-->
            <!--<span>个人</span>-->
        <!--</p>-->
        <div class="wrap">
            <div class="item-wrap" @click="choose(0)" v-if="roles.length>0">
                <i class="icon"></i>
                <span>个人</span>
            </div>
            <div class="item-wrap" v-for="role in roles" @click="choose(role)">
                <i class="icon"></i>
                <span v-if="role===0">个人</span>
                <span v-if="role===1">主席</span>
                <span v-if="role===2">系统管理员</span>
                <span v-if="role===3">办事员</span>
                <span v-if="role===4">业务管理员</span>
            </div>
        </div>

        <!--<div @click="jumpTo"><span>个人</span></div>-->
        <!--<router-link to="settings" style="font-size: 16px">设置</router-link>-->
        <!--<router-link to="index" style="font-size: 16px">个人</router-link>-->


    </div>
</template>

<script>
  export default {
    name: "entry",
    data(){
      return {
        currentRole:-1
      }
    },
    beforeRouteEnter(to, from, next) {
      qing.call('setWebViewTitle',{'title':'角色选择'})
      next()
    },
    created(){
      this.currentRole = this.$store.getters.currentRole
      this.roles = this.$store.state.roles

      localStorage.setItem('keepShowResultOpen','0')
    },
    methods:{
      chooseBSY(){
        this.$store.commit('setCurrentRole',3)
        this.$router.push({
          name: 'clerkIndex'
        })
      },
      chooseGLY(){
        this.$store.commit('setCurrentRole',2)
      },
      chooseGR(){
        this.$store.commit('setCurrentRole',0)
        this.$router.push({
          name: 'index'
        })
      },
      choose(role){
        this.$store.commit('setCurrentRole',role)

        switch (role) {
          case 0: {
            this.$router.push({
              name: 'index'
            })
            break
          }
          case 1: {
            this.$router.push({
              name: 'chairmanIndex'
            })
            break
          }
          case 2: {
            this.$router.push({
              name: 'source-admin-index'
            })
            break
          }
          case 3: {
            this.$router.push({
              name: 'clerkIndex'
            })
            break
          }
          case 4: {
            this.$router.push({
              name: 'source-admin-index'
            })
            break
          }

          default: {
            break
          }
        }
      },
      jumpTo(){
        this.$store.commit('setCurrentRole',0)

        this.$router.push({
          name: 'index'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
    .bg{
        padding-top: 0.2rem;
        height: 100%;
        background: #fff
    }
    .item-wrap {
        margin: 0 0.5rem 0.3rem 0.5rem;
        /*margin-bottom: 0.3rem;*/
        height: 0.44rem;
        /*width: 1.44rem;*/
        border: 1px solid #1989fa;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        span {
            font-size: 0.18rem;
            color: #1989fa;
        }
    }



</style>