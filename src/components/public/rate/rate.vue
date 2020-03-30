<template>
    <div class="nut-rate">
        <!--<span -->
            <!--class="nut-rate-item" -->
            <!--:class="['nut-rate-item',{'nut-rate-active':n<=current}]"-->
            <!--v-for="n in total" :key="n" @click="onClick($event,n)" -->
            <!--:style="{-->
                <!--'height':size+'px',-->
                <!--'width':size+'px',-->
                <!--'marginRight':spacing+'px',-->
                <!--'backgroundImage':n<=current?checkedIcon:uncheckedIcon-->
            <!--}">-->
        <!--</span>-->
        <span
                class="nut-rate-item"
                :class="{ 'defaultStar1': n==1&&n>current ,'defaultStar2': n==2&&n>current ,'defaultStar3': n==3&&n>current ,'defaultStar4': n==4&&n>current ,'defaultStar5': n==5&&n>current ,'blingStar1': n==1&&n<=current ,'blingStar2': n==2&&n<=current ,'blingStar3': n==3&&n<=current ,'blingStar4': n==4&&n<=current ,'blingStar5': n==5&&n<=current}"
                v-for="n in total" :key="n" @click="onClick($event,n)"
                :style="{
                'height':size+'px',
                'width':size+'px',
                'marginRight':spacing+'px',
                'backgroundImage':n<=current?checkedIcon:uncheckedIcon
            }">
        </span>
    </div>
</template>
<script>
export default {
    name:'nut-rate',
    props: {
        total:{
            type:[String,Number],
            default:5
        },
        value:{
            type:[String, Number],
            default:3
        },
        size:{
            type:[String,Number],
            default:25
        },
        uncheckedIcon:{
            type:String,
            default:null
        },
        checkedIcon:{
            type:String,
            default:null
        },
        readOnly:{
            type:Boolean,
            default: false
        },
        spacing:{
            type:[String,Number],
            default: 20
        },
    },
    data() {
        return {
            current: 0,
        };
    },
    created(){
        this.current = this.value;
    },
    methods: {
        onClick($event,idx){
            if(this.readOnly){
                this.$emit('input',this.current);
                this.$emit('click',this.current);
            }else{
              console.log('idx',idx)
              if(this.current === idx){
                this.current = idx-1
              }else{
                this.current = idx;
              }
              this.$emit('input',this.current);
              this.$emit('click',this.current);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .nut-rate {
        padding: 0.12rem 0 0.16rem 0;
        display: flex;
        justify-content: center;
        background: #fff;
        .nut-rate-item {
            display: inline-block;
            vertical-align: bottom;
            width: 30px;
            height: 30px;
            margin-right: 15px;
            /*background-image: url("../../../assets/chairman/star.png");*/
            /*background-size: cover;*/
            &:last-child {
                margin-right: 0 !important;
            }
            &.nut-rate-active {
                background-image: url("../../../assets/chairman/star_active.png");
            }
        }
        .defaultStar1{
            background-image: url("../../../assets/chairman/1.png");
            background-size: cover;
        }
        .defaultStar2{
            background-image: url("../../../assets/chairman/2.png");
            background-size: cover;
        }
        .defaultStar3{
            background-image: url("../../../assets/chairman/3.png");
            background-size: cover;
        }
        .defaultStar4{
            background-image: url("../../../assets/chairman/4.png");
            background-size: cover;
        }
        .defaultStar5{
            background-image: url("../../../assets/chairman/5.png");
            background-size: cover;
        }

        .blingStar1{
            background-image: url("../../../assets/chairman/b1.png");
            background-size: cover;
        }
        .blingStar2{
            background-image: url("../../../assets/chairman/b2.png");
            background-size: cover;
        }
        .blingStar3{
            background-image: url("../../../assets/chairman/b3.png");
            background-size: cover;
        }
        .blingStar4{
            background-image: url("../../../assets/chairman/b4.png");
            background-size: cover;
        }
        .blingStar5{
            background-image: url("../../../assets/chairman/b5.png");
            background-size: cover;
        }
    }
</style>
