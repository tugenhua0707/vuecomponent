<template>
    <tb-rate v-model="value" @on-change='aa'></tb-rate>
</template>
<script>
  export default {
    data () {
      return {
        value: 0
      }
    }
  }
</script>