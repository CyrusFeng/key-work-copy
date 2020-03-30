<template>
    <div class="field-title">
        <i class="icon blueline" v-show="bluelineVisible"></i>
        <span class="word">
            <slot></slot>
        </span>
        <span class="icon redstar" v-show="redstarVisible">*</span>
    </div>
</template>

<script>
  export default {
    name: "title",
    props: {
      bluelineVisible: {
        type: Boolean
      },
      redstarVisible: {
        type: Boolean
      }
    }
  }
</script>

<style scoped lang="scss">
    .field-title {
        /*padding: 0.14rem 0;*/
        display: inline-flex;
        justify-content: center;
        align-items: center;
        line-height: 1;
    }

    .blueline {
        background-image: linear-gradient(-133deg, #5394f8 0%, #3e83ed 100%);
        border-radius: 0.015rem;
        width: 0.03rem;
        height: 0.13rem;
        margin-right: 0.08rem;
    }

    .redstar {
        color: red;
        font-size: 0.14rem;
    }

    .word {
        margin-right: 0.04rem;
        font-size: 0.14rem;
        color: #000000;
        font-weight: bold;
        max-width: 3rem;
    }
</style>