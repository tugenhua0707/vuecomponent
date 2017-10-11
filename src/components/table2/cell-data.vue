<template>
  <div class="cell" :style="{width: column.width}" >
    {{row[column.prop]}}
  </div>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  export default {
    mixins: [Emitter],
    props: {
      row: [Object, Array],
      column: [Object, Array]
    },
    data() {
      return {

      }
    },
    beforeMount() {
      
    },
    mounted() {

    }
  }
</script>