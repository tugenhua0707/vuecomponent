
<template>
  <!--
    <div ref="cell" :class="['cell']" v-html="row[column.key]" v-if="column.type !== 'checkbox'" :style="{width: columnsWidth[naturalIndex] + 'px'}">{{row[column.key]}}</div>
  -->

</template>

<script>
  import Vue from 'vue';
  export default {
    name: 'TableCell',
    props: {
      columns: Array,
      data: Array       
    },
    data() {
      return {
        objData: this.data
      }
    },
    methods: {
      compile () {
        if (this.column.render) {
          const component = new Vue({
            functional: true,
            render: (h) => {
              return this.column.render(h, this.row, this.column, this.index);
            }
          });
          const Cell = component.$mount();
          this.$refs.cell.appendChild(Cell.$el);
        }
      }
    },
    mounted () {
      
      this.$nextTick(() => {
        this.compile();
      });
      
    }
  }
</script>