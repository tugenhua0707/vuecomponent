<template>
  <div>
    <tb-rate allowHalf v-model="valueDisabled"></tb-rate>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        valueDisabled: 2
      }
    }
  }
</script>