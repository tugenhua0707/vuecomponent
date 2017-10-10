<template>
  <div class="cell" :style="{width: column.width}" v-if="row[column.prop]">
    {{ row[column.prop] }}
  </div>
  <div class="cell" :style="{width: column.width}" v-else v-html="htmlData">
  </div>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  export default {
    mixins: [ Emitter ],
    props: {
      row: [Object, Array],
      column: [Object, Array],
      ihtml: [Object, Array]
    },
    data() {
      return {
        htmlData: ''
      }
    },
    beforeMount() {
      var childs = this.$parent.$parent.$refs.hiddenColumns.children;
      for (var c = 0, clen = childs.length; c < clen; c++) {
        if (childs[c].children && childs[c].children.length) {
          this.htmlData = this.ihtml[c];
        }
      }
    },
    mounted() {
    }
  }
</script>