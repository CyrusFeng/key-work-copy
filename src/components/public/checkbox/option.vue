<template>
    <label class="x-option" @click="handleClick">
        <div class="check-box" :class="{checked:selected.indexOf(option.value)>-1}">
            <transition name="fill-fade">
                <span class="fill" v-show="selected.indexOf(option.value)>-1"></span>
            </transition>
        </div>
        <span class="label-text">{{option.label}}</span>
    </label>
</template>
<script>
  export default {
    name: 'option',
    props: {
      option: { type: Object, required: true },
      current: Number,
      index: Number,
      selected:{
        type:Array
      }
    },
    methods: {
      handleClick() {
        this.$emit('update:selected', this.option.value)
      }
    }
  }
</script>
<style scoped lang="scss">
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
    .fill-fade-enter-active, .fill-fade-leave-active {
        transition: all .2s cubic-bezier(.78, .14, .15, .86);
    }
    .fill-fade-enter-to, .fill-fade-leave {
        opacity: 1;
        transform: scale(0.85);
    }
    .fill-fade-enter, .fill-fade-leave-to {
        opacity: 0;
        transform: scale(0.05);
    }
</style>