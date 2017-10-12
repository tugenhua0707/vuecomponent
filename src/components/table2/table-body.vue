
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
        @mouseenter.stop="handleMouseIn(row._index)"
        @mouseleave.stop="handleMouseOut(row._index)"
      >
        <td 
          v-for="(column, _index) in columns"
          :class="{
            'bgColor': data[index] && data[index].isHover
          }"
        >
          <cellData :row="row" :column="column"></cellData>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  import cellData from './cell-data.vue';
  export default {
    name: 'TbTableBody',
    mixins: [Emitter],
    components: { cellData },
    props: {
      data: {
        type: [Array, Object],
        required: true
      },
      columns: {
        type: [Array, Object],
        required: true
      },
      stripe: {
        type: Boolean,
        default: false
      },
      rowClassName: [String, Function],
      columnsWidth: Array,
      isFixedLeftRight: Boolean
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
      },
      handleMouseIn(index) {
        if (this.isFixedLeftRight) {
          this.$parent.handleMouseIn(index);
        }
      },
      handleMouseOut(index) {
        if (this.isFixedLeftRight) {
          this.$parent.handleMouseOut(index);
        }
      }
    },
    mounted () {

    }
  }
</script>