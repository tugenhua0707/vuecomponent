
<template>
  <div 
    class="tb-table tb-table-bottom-none"
    :class="{
      'tb-table-border': border,
      'tb-table-stripe': stripe,
      'tb-table-fixed-head': height
    }"
  >
    <div :class="{
      'tb-table-fixed-col': fixedColumns.length > 0}">
      <div class="tb-table-head-wrapper" ref="headWrapper">
        <tb-table-column
          :columns="tableColumns"
          :fixed-head="height"
          :columns-width="columnswidth">
          <slot></slot>
        </tb-table-column>
      </div>
      <div 
        class="tb-table-body-wrapper" 
        ref="bodyWrapper" 
        :style="{
          height: bodyHeight, 
          width: bodyWidth,
          'overflow': height ? 'auto' : ''
        }">
        <tableBody
          :data="data"
          :columns="tableColumns"
          :row-class-name="rowClassName"
          :columns-width="columnswidth"
        >
        </tableBody>
      </div>
    </div>
    <div class="tb-table-fixed-col-left">
      <div class="tb-table-fixed-head-wrapper" ref="fixedHeadWrapper">
        <tb-table-column
          :columns="tableColumns"
          :fixed-head="height"
          :columns-width="columnswidth">
          <slot></slot>
        </tb-table-column>
      </div>
      <div class="tb-table-fixed-body-wrapper" ref="fixedBodyWrapper">
        <tableBody
          :data="data"
          :columns="tableColumns"
          :row-class-name="rowClassName"
          :columns-width="columnswidth"
        >
        </tableBody>
      </div>
    </div>
  </div>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  import tableBody from './table-body.vue';
  export default {
    name: 'TbTable',
    mixins: [ Emitter ],
    components: {tableBody},
    props: {
      data: {
        type: Array,
        required: true
      },
      // 间隔变色
      stripe: {
        type: Boolean,
        default: false
      },
      // 带有边框
      border: {
        type: Boolean,
        default: false
      },
      // 带状态的表格
      rowClassName: [String, Function],

      // 固定表头而设置
      height: [String, Number],
    },
    data() {
      return {
        tableColumns: [],
        bodyHeight: '',
        bodyWidth: '',
        columnswidth: [],
        fixedColumns: [],     // 保存固定的列  保存的是索引值 0 代表的是 最左列，1 代表的是第二列 ....依次类推
      }
    },
    beforeMount() {
      // 获取table列表的字段名称
      this.getListColumns();
    },
    computed: {
      
    },
    mounted() {
      console.log(this.fixedColumns)
      if (this.height) {
        this.getBodyHeight();
      }
    },
    methods: {
      // 获取table列表的字段
      getListColumns() {
        var widthArrs = [];
        var defaults = this.$slots.default;
        var filterArrs = [];
        if (defaults.length > 0) {
          for (var d = 0, dlen = defaults.length; d < dlen; d++) {
            if (defaults[d].tag) {
              filterArrs.push(defaults[d])
            }
          }
          for (var f = 0, flen = filterArrs.length; f < flen; f++) {
            var item = filterArrs[f];
            var propsData = item.data.attrs;
            this.tableColumns.push(propsData);
            widthArrs.push(propsData.width);
            if (propsData.fixed === '') {
              this.fixedColumns.push(f);
            }
          }
        }
        // this.height 有的话 是固定头部的含义
        if (this.height) {
          // 获取数组里面最大值
          var maxValue = Math.max.apply(null, widthArrs);
          // 获取数组最大值的索引
          var maxIndex = widthArrs.indexOf(maxValue.toString());
          // 最大值的宽度 需要减去 15， 因为需要包括纵向滚动条的宽度
          var resetMaxValue = maxValue*1 - 15 - 1;
          // 最后重新设置数组的宽度
          widthArrs[maxIndex] = resetMaxValue.toString();
          this.columnswidth = widthArrs;
        }
      },
      getBodyHeight() {
        // 总高度 - 头部的高度 - 1(低边框为1px)
        this.bodyHeight = this.height - this.$refs.headWrapper.offsetHeight - 1 + 'px';
      }
    }
  }
</script>