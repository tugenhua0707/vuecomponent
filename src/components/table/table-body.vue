
<template>
  <table cellspacing="0" cellpadding="0" width="100%" :class="[prefixCls+'-body']">
    <colgroup>
      <col v-for="(column, index) in columns" :width="column.width" v-if="!fixedhead"></col>
      <col v-for="(w, index) in columnswidth" :width="w" v-if="fixedhead"></col>
    </colgroup>
    <tbody>
      <tr 
        v-for="(row, index) in objData" 
        :class="rowClasses(row._index)" 
        v-if="col.length <= 0" 
        @mouseenter.stop="handleMouseIn(row._index)"
        @mouseleave.stop="handleMouseOut(row._index)"
        @click.stop="handleClick(row._index)"
      >
        <td v-for="(column, index) in columns" :height="columnsheight" :width="columnswidth[index]">
          <div :class="['cell']" v-html="row[column.key]" v-if="column.type !== 'checkbox'" :style="{width: columnswidth[index] + 'px'}">{{row[column.key]}}</div>
          <div :class="['cell']" v-if="column.type === 'checkbox'" :style="{width: columnswidth[index]+ 'px'}">
            <input type="checkbox" @click.stop="handleMultipe(row._index)"/>
          </div>
        </td>
      </tr>
      <tr 
        v-for="(row, index) in objData" 
        :class="rowClasses(row._index)" 
        v-if="col.length > 0" 
        @mouseenter.stop="handleMouseIn(row._index)"
        @mouseleave.stop="handleMouseOut(row._index)"
        @click.stop="handleClick(row._index)"
      >
        <td v-for="(column, index) in columns" :class="(showcol*1) === index ? column.fixBody : 'hidden'" :width="columnswidth[index]" 
        :height="columnsheight">
          <div :class="['cell']" v-html="row[column.key]" v-if="column.type !== 'checkbox'" :style="{width: columnswidth[index]+ 'px'}">{{row[column.key]}}</div>
          <div :class="['cell']" v-if="column.type === 'checkbox'" :style="{width: columnswidth[index]+ 'px'}">
            <input type="checkbox" @click.stop="handleMultipe(row._index)"/>
          </div>
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
            [`bgColor`]: this.data[index] && this.data[index]._isHover,
            [`current-row`]: this.data[index] && this.data[index]._selectSingleRow
          }
        ];
      },
      handleMouseIn(_index) {
        this.$parent.handleMouseIn(_index);
      },
      handleMouseOut(_index) {
        this.$parent.handleMouseOut(_index);
      },
      handleClick(_index) {
        this.$parent.handleClick(_index);
      },
      handleMultipe(_index) {
        this.$parent.handleMultipe(_index);
      }
    },
    mounted () {
      
    }
  }
</script>