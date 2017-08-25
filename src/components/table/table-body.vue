
<template>
  <table cellspacing="0" cellpadding="0" width="100%" :class="[prefixCls+'-body']">
    <colgroup>
      <col v-for="(column, index) in columns" :width="column.width" v-show="!fixedhead"></col>
      <col v-for="(w, index) in columnswidth" :width="w" v-show="fixedhead"></col>
    </colgroup>
    <tbody>
      <tr 
        v-for="(row, index) in objData" 
        :class="rowClasses(row._index)" 
        v-show="col.length <= 0" 
        @mouseenter.stop="handleMouseIn(row._index)"
        @mouseleave.stop="handleMouseOut(row._index)"
      >
        <td v-for="(column, index) in columns" :height="columnsheight">
          <div :class="['cell']" v-html="row[column.key]">{{row[column.key]}}</div>
        </td>
      </tr>
      <tr 
        v-for="(row, index) in objData" 
        :class="rowClasses(row._index)" 
        v-show="col.length > 0" 
        @mouseenter.stop="handleMouseIn(row._index)"
        @mouseleave.stop="handleMouseOut(row._index)"
      >
        <td v-for="(column, index) in columns" :class="(showcol*1) === index ? column.fixBody : 'hidden'" :height="columnsheight">
          <div :class="['cell']" v-html="row[column.key]">{{row[column.key]}}</div>
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
      prefixCls: {
        type: String
      },
      columns: {
        type: Array
      },
      data: {
        type: [Array, Object],
      },
      stripe: {
        type: Boolean,
        default: false
      },
      fixedhead: {
        type: Boolean,
        default: false
      },
      columnswidth: {
        type: Array
      },
      columnsheight: {
        type: String
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
        col: [],
        objData: this.data
      }
    },
    computed: {

    },
    beforeMount() {

      if (this.fixedcol && this.fixedcol.length) {
        this.col = this.fixedcol;
      }
    },
    methods: {
      rowClasses(index) {
        // 因为index索引从0开始的
        var currentIndex = index + 1;
        return [
          {
            [`stripe`]: this.stripe && (currentIndex % 2 === 0),
            [`bgColor`]: this.data[index] && this.data[index]._isHover
          }
        ];
      },
      handleMouseIn(_index) {
        this.$parent.handleMouseIn(_index);
      },
      handleMouseOut(_index) {
        this.$parent.handleMouseOut(_index);
      }
    },
    mounted () {
      
    }
  }
</script>