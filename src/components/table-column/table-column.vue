
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  import Vue from 'vue';
  export default {
    mixins: [ Emitter ],
    name: 'TbTableColumn',
    props: {
      
    },
    data() {
      return {
        columns: []
      }
    },
    beforeMount() {
      
    },
    mounted() {
      this.$nextTick(() => {
        this.compile();
      });
    },
    created() {

    },
    methods: {
      compile () {
        var self = this;
        console.log(this)
        const component = new Vue({
          functional: true,
          render: (h) => {
            console.log(h)
            //return this.column.render(h, this.row, this.column, this.index);
          }
        });
        //const Cell = component.$mount();
        //this.$refs.cell.appendChild(Cell.$el);
      }
    }
  }
</script>