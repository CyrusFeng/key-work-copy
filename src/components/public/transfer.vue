<template>

</template>

<script>
  export default {
    name: "transfer",
    props: {
      jumpTo: {
        type: String
      }
    },
    beforeRouteEnter(to, from, next) {

      next(vm => {
        let { jumpTo } = vm.$route.params
        vm.$router.push({
          name: jumpTo,
        })
      })
    },
    created() {

    }
  }
</script>

<style scoped>

</style>