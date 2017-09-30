
<template>
  <table cellspacing="0" cellpadding="0" width="100%" class="tb-table-body">
    <colgroup>
      <col v-if="columnsWidth.length > 0" v-for="w in columnsWidth" :width="(w-1)"></col>
      <col v-for="item in columns" :width="(item.width - 1)" v-if="columnsWidth.length == 0"></col>
    </colgroup>
    <tbody>
      <tr 
        v-for="(row, index) in data"
        :class="getRowClass(row, index)"
      >
        <td v-for="(column, index) in columns">
          <div class="cell" :style="{width: column.width}">{{row[column.prop]}}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  export default {
    name: 'TbTableBody',
    mixins: [ Emitter ],
    props: {
      data: {
        type: Array,
        required: true
      },
      columns: {
        type: Array,
        required: true
      },
      stripe: {
        type: Boolean,
        default: false
      },
      rowClassName: [String, Function],
      columnsWidth: Array
    },
    data() {
      return {
        
      }
    },
    beforeMount() {
      
    },
    methods: {
      getRowClass(row, index) {
        const rets = [];
        const rowClassName = this.rowClassName;
        if (typeof rowClassName === 'string') {
          rets.push(rowClassName);
        } else if (typeof rowClassName === 'function') {
          rets.push(rowClassName.call(null, row, index) || '');
        }
        return rets.join(' ');
      }
    },
    mounted () {
      
    }
  }
</script>