<template>
    <div>
        <div class="selected-all">
            <label class="x-option" @click="clickAll">
                <div class="check-box" :class="{checked:selected.length === options.length}">
                    <transition name="fill-fade">
                        <span class="fill" v-show="selected.length === options.length"></span>
                    </transition>
                </div>
                <span class="label-text">全选</span>
            </label>
        </div>
        <div class="x-radio" :class="{vertical}">
            <x-option v-for="(option,index) in options" :key="option.value" :option="option" :index="index"
                      @update:selected="updateSelected" :selected="selected"></x-option>
        </div>
    </div>

</template>
<script>
  import xOption from './option.vue'
  export default {
    name: "radio",
    components: { xOption },
    props: {
      options: { type: Array, required: true },
      vertical: { type: Boolean, default: false },
      defaultIndex: Number
    },
    data() {
      return {
        // current: 0,
        selected:[]
      }
    },
    watch: {
      selected(val) {
          this.$emit('value-change', this.selected)
      }
    },
    created() {
      // this.defaultIndex || this.defaultIndex === 0 ? this.current = this.defaultIndex : ''
    },
    methods:{
      updateSelected($event){
        let index = this.selected.indexOf($event)
        if(index === -1){
          this.selected.push($event)
        }else{
          this.selected.splice(index,1)
        }
      },
      clickAll(){
        if(this.selected.length>0){
          this.selected = []
        }else{
          this.selected = this.options.map((item)=>{
            return item.value
          })

        }
      }
    }
  }
</script>
<style scoped lang="scss">
    .x-radio {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        &.vertical {
            flex-direction: column;
            align-items: flex-start;
        }
    }
    $p:#007aff;
    .x-option {
        margin: 0.2rem;
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        padding-right: 8px;
        >.check-box {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 1px solid rgba(0, 0, 0, 0.15);
            display: flex;
            justify-content: center;
            align-items: center;
            >.fill {
                display: inline-flex;
                width: 8px;
                height: 8px;
                background: $p;
                border-radius: 50%;
            }
            &.checked {
                border-color: $p;
            }
        }
        >.label-text {
            padding: 0 0.08rem;
            font-size: 0.12rem;
            display: inline-block;
            min-width: calc(3em + 0.16rem);
            max-width: calc(6em + 0.16rem);
        }
    }
</style>