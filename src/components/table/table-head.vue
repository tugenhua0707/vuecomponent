
<template>
  <table cellpadding="0" cellspacing="0" width="100%" :class="[prefixCls+'-head']">
    <colgroup>
      <col v-for="(column, index) in columns" :width="column.width" v-if="!fixedhead"></col>
      <col v-for="(w, index) in columnswidth" :width="w" v-if="fixedhead"></col>
      <col class="gutter" v-if="fixedhead"></col>
    </colgroup>
    <thead>
      <tr v-if="col.length <= 0">
        <th v-for="(column, index) in columns" :height="columnsheight">
          <div :class="['cell']">{{column.title}}</div>
        </th>
      </tr>
      <tr v-if="col.length > 0">
        <th v-for="(column, index) in columns" :class="(showcol*1) === index ? column.fixHead : 'hidden'" 
          :height="columnsheight">
          <div :class="['cell']">{{column.title}}</div>
        </th>
      </tr>
    </thead>
  </table>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  export default {
    name: 'TbTableHead',
    mixins: [ Emitter ],
    props: {
      prefixCls: {
        type: String
      },
      columns: {
        type: Array
      },
      fixedhead: {
        type: Boolean,
        default: false
      },
      columnswidth: {
        type: Array
      },
      columnsheight: {
        type: [Number, String]
      },
      fixedcol: {
        type: Array
      },
      showcol: {
        type: [String, Number]
      }
    },
    data () {
      return {
        col: []
      }
    },
    beforeMount() {
      if (this.fixedcol && this.fixedcol.length) {
        this.col = this.fixedcol;
      }
    },
    computed: {
      
    },
    methods: {

    },
    mounted () {
      
    }
  }
</script>