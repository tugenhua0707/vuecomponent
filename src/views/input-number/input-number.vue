<template>
    <tb-input-number :max="10" :min="1" v-model="value1" step=1.2></tb-input-number>
</template>
<script>
  export default {
    data () {
      return {
        value1: 1,
      }
    }
  }
</script>