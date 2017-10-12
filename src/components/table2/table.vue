
<template>
  <div 
    class="tb-table tb-table-bottom-none"
    :class="{
      'tb-table-border': border,
      'tb-table-stripe': stripe,
      'tb-table-fixed-head': height || fixedColumnsLeft.length > 0 || fixedColumnsRight > 0
    }"
  >
    <div 
      class="hidden-columns" 
      ref="hiddenColumns"
      :style="{
        width: rightColWidth + 'px',
        height: fixedBodyHeight + 'px',
        visibility: isRightCol ? 'visible' : 'hidden',
        zIndex: isRightCol ? '10' : '-1',
        right: height > 0 ? '14px' : '0'
      }"
    ><slot></slot></div>
    <div>
      <div class="tb-table-head-wrapper" ref="headWrapper">
        <tableHead
          :columns="tableColumns"
          :fixed-head="height"
          :columns-width="columnswidth">
        </tableHead>
      </div>
      <div 
        class="tb-table-body-wrapper" 
        ref="bodyWrapper" 
        @scroll="handleBodyScroll"
        :style="{
          height: bodyHeight,
          'overflow': height ? 'auto' : ''
        }">
        <tableBody
          ref="tbodyWrapper"
          :data="data"
          :columns="tableColumns"
          :row-class-name="rowClassName"
          :columns-width="columnswidth"
          :isFixedLeftRight="isFixedLeftRight"
        >
        </tableBody>
      </div>
    </div>
    <div 
      class="tb-table-fixed-col-left" 
      v-if="fixedColumnsLeft.length > 0" 
      :style="{
        width: fixedLeftWidth + 'px',
        height: fixedHeight + 'px'
      }">
      <div class="tb-table-fixed-head-wrapper">
        <tableHead
          :columns="tableColumns"
          :fixed-head="height"
          :columns-width="columnswidth">
        </tableHead>
      </div>
      <div 
        class="tb-table-fixed-body-wrapper" 
        ref="fixedLeftBody"
        :style="{height: fixedBodyHeight + 'px'}"
      >
        <tableBody
          :data="data"
          :columns="tableColumns"
          :row-class-name="rowClassName"
          :columns-width="columnswidth"
          :isFixedLeftRight="isFixedLeftRight"
        >
        </tableBody>
      </div>
    </div>
    <div 
      class="tb-table-fixed-col-right" 
      v-if="fixedColumnsRight.length > 0"
      :style="{
        width: fixedRightWidth + 'px',
        height: fixedHeight + 'px',
        right: (fixedColumnsRight.length > 0 && height > 0) ? '14px' : 0
      }"
    >
      <div 
        class="tb-table-fixed-head-wrapper"
        :style="{
          right: (fixedColumnsRight.length > 0 && height > 0) ? '-14px' : 0
        }"
      >
        <tableHead
          :columns="tableColumns"
          :fixed-head="height"
          :columns-width="columnswidth">
        </tableHead>
      </div>
      <div 
        class="tb-table-fixed-body-wrapper" 
        ref="fixedRightBody"
        :style="{height: fixedBodyHeight + 'px'}"
      >
        <tableBody
          :data="data"
          :columns="tableColumns"
          :row-class-name="rowClassName"
          :columns-width="columnswidth"
          :isFixedLeftRight="isFixedLeftRight"
        >
        </tableBody>
      </div>
    </div>
    <div 
      class="tb-table-fixed-right-patch" 
      v-if="height > 0"
      :style="{width: '13px', height: '40px'}">
    </div>
  </div>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  import tableBody from './table-body.vue';
  import tableHead from './table-head.vue';
  export default {
    name: 'TbTable',
    componentName: 'TbTable',
    mixins: [Emitter],
    components: { tableBody, tableHead },
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
      height: [String, Number]
    },
    data() {
      return {
        tableColumns: [],
        bodyHeight: '',
        columnswidth: [],

        /* 保存最左侧列，比如 fixed 或 fixed='left' */
        fixedColumnsLeft: [],

        /* 保存最右侧列，比如 fixed = 'right' */
        fixedColumnsRight: [],

        /* 左侧固定列的宽度 */
        fixedLeftWidth: 0,

        /* 右侧固定列的宽度 */
        fixedRightWidth: 0,

        /* 固定列的高度 */
        fixedHeight: 0,

        /* 固定列的body的高度 */
        fixedBodyHeight: 'auto',

        /* 是否固定左侧或右侧 通过该参数判断是否手动移动上去 是否变色 */
        isFixedLeftRight: false,

        /* 右侧操作是否固定 操作只能右侧固定，不能不固定或左侧固定(因为操作数据是定位上去的) */
        isRightCol: false,

        /* 右侧固定的宽度，默认为0 */
        rightColWidth: '0',

        /* 保存操作固定列的字段 */
        columnsElem: [],      
      }
    },
    beforeMount() {
      // 获取table列表的字段名称
      this.getListColumns();
    },
    computed: {
      
    },
    mounted() {
      var self = this;
      if (this.height) {
        this.getBodyHeight();
      }
      var tableElem = this.$refs.bodyWrapper.children[0];
      var tbodyElem = tableElem.children[1];
      var trElems = tbodyElem.children;
      var hiddenColumns = this.$refs.hiddenColumns;
      var columnsChild = hiddenColumns.children;
      for (var j = 0, jlen = columnsChild.length; j < jlen; j++) {
        if (columnsChild[j].children && columnsChild[j].children.length) {
          this.columnsElem = columnsChild[j].children;
        }
      }
      // 对操作每一列动态设置元素的高度
      for (var i = 0, ilen = trElems.length; i < ilen; i++) {
        if (this.columnsElem[i]) {
          this.columnsElem[i].style.height = trElems[i].offsetHeight + 'px';
          this.columnsElem[i].style.lineHeight = trElems[i].offsetHeight + 'px';
        }
      }
      this.$nextTick(function() {
        // 判断是否有横向滚动条 tbody的宽度 > 外层table的宽度，说明内部的tbody的宽度超过 table的宽度，因此底部会有滚动条
        if (self.$refs.tbodyWrapper.$el.offsetWidth > self.$refs.bodyWrapper.offsetWidth) {
          self.fixedBodyHeight = self.$refs.bodyWrapper.offsetHeight - 14;
        } else {
          self.fixedBodyHeight = self.$refs.bodyWrapper.offsetHeight;
        }
        self.fixedHeight = self.fixedBodyHeight + 40;
      });
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
            // 保存hover的属性
            propsData.isHover = false;
            this.tableColumns.push(propsData);
            widthArrs.push(propsData.width);
            if (propsData.fixed === '' || propsData.fixed === 'left') {
              this.fixedColumnsLeft.push(propsData);
            }
            if (propsData.fixed === 'right') {
              this.fixedColumnsRight.push(propsData);
            }
          }
        }
        // 对固定列重新排序
        if (this.fixedColumnsLeft.length > 0 || this.fixedColumnsRight.length > 0) {
          this.fixedColSort();
          this.isFixedLeftRight = true;
        }
        // 固定头部
        this.fixedHead(widthArrs);
      },
      getBodyHeight() {
        // 总高度 - 头部的高度 - 1(低边框为1px)
        this.bodyHeight = this.height - this.$refs.headWrapper.offsetHeight - 1 + 'px';
      },
      // 固定头部
      fixedHead(widthArrs) {
        if (this.height) {
          // 获取数组里面最大值
          var maxValue = Math.max.apply(null, widthArrs);
          // 获取数组最大值的索引
          var maxIndex = widthArrs.indexOf(maxValue.toString());
          // 最大值的宽度 需要减去 15， 因为需要包括纵向滚动条的宽度
          var resetMaxValue = maxValue * 1 - 15 - 1;
          // 最后重新设置数组的宽度
          widthArrs[maxIndex] = resetMaxValue.toString();
          this.columnswidth = widthArrs;
        }
      },
      fixedColSort() {
        var self = this;
        var fixedColumnsLeft = this.fixedColumnsLeft;
        var fixedColumnsRight = this.fixedColumnsRight;
        /*
         * 1. 对固定左侧元素重新排序，从后面遍历，依次插入到数组的最前面去。这样就保证了先后顺序
         * 比如原数组 [1,3,5,6,7,8，9]    this.fixedColumnsLeft = [1, 5]
         * 那么先从5遍历，然后依次到1，然后使用数组的unshift方法 向数组的开头添加元素，且原数组对应的项删除掉，这样就组成了新数组
         * newArrs = [1, 5, 3, 6, 7, 8, 9]
           2. 同理对固定在右侧的元素重新排序，比如 this.fixedColumnsRight = [7, 8], 先在原数组中删除对应的项，然后使用push方法，依次从头到尾循环 右侧固定的列
           依次往后面插入元素，最后新数组就变成 newArrs = [1, 5, 3, 6, 9, 7, 8]
         */
        // 对固定左侧的元素 进行重新排序
        var leftRightSort = function (arrs, type) {
          var tableColumns = self.tableColumns;
          if (type === 'left') {
            // 对左侧排序
            for (var j = arrs.length - 1; j >= 0; j--) {
              for (var i = 0, ilen = tableColumns.length; i < ilen; i++) {
                if (tableColumns[i].label === arrs[j].label) {
                  self.tableColumns.splice(i, 1);
                  self.tableColumns.unshift(arrs[j]);
                  self.fixedLeftWidth += arrs[j].width - 1;
                  break;
                }
              }
            }
          } else if (type === 'right') {
            // 对右侧排序
            for (var m = 0; m < arrs.length; m++) {
              for (var n = 0, nlen = tableColumns.length; n < nlen; n++) {
                if (tableColumns[n].label === arrs[m].label) {
                  if (!arrs[m].prop) {
                    self.isRightCol = true;
                    self.rightColWidth = arrs[m].width;
                  }
                  self.tableColumns.splice(n, 1);
                  self.tableColumns.push(arrs[m]);
                  self.fixedRightWidth += arrs[m].width - 1;
                  break;
                }
              }
            }
          }
        };
        // 对固定左侧的元素 进行重新排序
        if (fixedColumnsLeft.length > 0) {
          leftRightSort(fixedColumnsLeft, 'left');
        }
        // 对固定右侧的元素 进行重新排序
        if (fixedColumnsRight.length > 0) {
          leftRightSort(fixedColumnsRight, 'right');
        }
      },
      handleBodyScroll(event) {
        this.$refs.headWrapper.scrollLeft = event.target.scrollLeft;
        if (this.fixedColumnsLeft.length) {
          this.$refs.fixedLeftBody.scrollTop = event.target.scrollTop;
        }
        if (this.fixedColumnsRight.length) {
          this.$refs.fixedRightBody.scrollTop = event.target.scrollTop;
          this.$refs.hiddenColumns.scrollTop = event.target.scrollTop;
        }
      },
      handleMouseIn(index) {
        this.tableColumns[index].isHover = true;
        this.tableColumns = Object.assign({}, this.tableColumns);
      },
      handleMouseOut(index) {
        this.tableColumns[index].isHover = false;
        this.tableColumns = Object.assign({}, this.tableColumns);
      }
    }
  }
</script>