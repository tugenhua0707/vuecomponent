
<template>
  <div :class="classes" :style="{height: tableheight + 'px'}">
    <div :class="isFixedColumn">
      <div :class="[prefixCls + '-head-wrapper']" ref="header">
        <tableHead 
          :prefix-cls="prefixCls"
          :columns="columns"
          :fixedhead="fixedhead"
          :columnswidth="columnswidth"
          :columnsheight="columnsheight"
        >
        </tableHead>
      </div>
      <div :class="[prefixCls + '-body-wrapper']" ref="body" :style="{height: bodyHeight}" @scroll="handleBodyScroll">
        <tableBody
          :prefix-cls="prefixCls"
          :columns="columns"
          :data="objData"
          :stripe="stripe"
          :fixedhead="fixedhead"
          :columnswidth="columnswidth"
          :columnsheight="columnsheight"
        ></tableBody>
      </div>
    </div>
    
    <div 
      :class="[prefixCls + '-fixed-col-left']" 
      v-show="showleftcol"   
      :style="{width:leftwidth, height:leftheight}"
    >
      <div :class="[prefixCls + '-fixed-head-wrapper']">
        <tableHead 
          :prefix-cls="prefixCls"
          :columns="columns"
          :fixedhead="fixedhead"
          :columnswidth="columnswidth"
          :fixedcol="fixedcols"
          :columnsheight="columnsheight"
          :showcol="0"
        >
        </tableHead>
      </div>
      <div :class="[prefixCls + '-fixed-body-wrapper']" ref="fixedLeftBody" :style="{height: fixedBodyHeight}">
        <tableBody
          :prefix-cls="prefixCls"
          :columns="columns"
          :data="objData"
          :stripe="stripe"
          :fixedhead="fixedhead"
          :columnswidth="columnswidth"
          :fixedcol="fixedcols"
          :columnsheight="columnsheight"
          :showcol="0"
        ></tableBody>
      </div>
    </div>
    <div 
      :class="[prefixCls + '-fixed-col-right']" 
      v-show="showrightcol"  
      :style="{width:rightwidth, height:rightheight}"
    >
      <div :class="[prefixCls + '-fixed-head-wrapper']">
        <tableHead 
          :prefix-cls="prefixCls"
          :columns="columns"
          :fixedhead="fixedhead"
          :columnswidth="columnswidth"
          :fixedcol="fixedcols"
          :columnsheight="columnsheight"
          :showcol="columns.length - 1"
        >
        </tableHead>
      </div>
      <div :class="[prefixCls + '-fixed-body-wrapper']" ref="fixedRightBody" :style="{height: fixedBodyHeight}">
        <tableBody
          :prefix-cls="prefixCls"
          :columns="columns"
          :data="objData"
          :stripe="stripe"
          :fixedhead="fixedhead"
          :columnswidth="columnswidth"
          :fixedcol="fixedcols"
          :columnsheight="columnsheight"
          :showcol="columns.length - 1"
        ></tableBody>
      </div>
    </div>
    <div :class="[prefixCls + '-fixed-right-patch']" v-show="showheadcol" :style="{width:'14px', height: columnsheight + 'px'}"></div>
  </div>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  import tableHead from './table-head.vue';
  import tableBody from './table-body.vue';

  const prefixCls = "tb-table";

  export default {
    name: 'TbTable',
    mixins: [Emitter],
    components: {tableHead, tableBody},
    props: {
      data: {
        type: [Array, Object],
        default: []
      },
      tableheight: {
        type: [Number, String],
        default: 'auto'
      },
      columns: {
        type: Array,
        default: []
      },
      // 是否带边框
      border: {
        type: Boolean,
        default: false
      },
      // 是否固定表头
      fixedhead: {
        type: Boolean,
        default: false
      },
      // 是否显示间隔斑马纹
      stripe: {
        type: Boolean,
        default: false
      },
      // 需要固定列  ['0'] 就是最左侧固定， ["1"] 就是最右侧固定  ["0, 1"] 左右侧固定
      fixedcol: {
        type: Array
      }
    },
    data () {
      return {
        prefixCls: prefixCls,
        columnswidth: [],
        columnsheight: 0,
        fixedcols: [],
        leftwidth: 0,
        leftheight: 0,
        rightwidth: 0,
        rightheight: 0,
        fixedBodyHeight: 'auto',
        showleftcol: false,
        showrightcol: false,
        showheadcol: this.fixedcol && this.fixedcol.length && this.fixedhead,
        bodyHeight: '',
        objData: this.makeData()
      }
    },
    beforeMount() {
      var widthArrs = [];
      this.columns.forEach((item, index) => {
        widthArrs.push(item.width);
        if (index === 0) {
          this.columnsheight = item.height;
        }
      });
      // 获取数组里面最大值
      var maxValue = Math.max.apply(null, widthArrs);

      // 获取数组最大值的索引
      var maxIndex = widthArrs.indexOf(maxValue.toString());
      
      // 最大值的宽度 需要减去 15， 因为需要包括纵向滚动条的宽度
      var resetMaxValue = maxValue*1 - 15;
      // 最后重新设置数组的宽度
      widthArrs[maxIndex] = resetMaxValue.toString();
      this.columnswidth = widthArrs;

      this.fixedcols = this.fixedcol ? this.fixedcol : [];

      // 是否左右侧固定 如果是左右固定的话，给列和数据动态添加一个字段 ishow
      if (this.fixedcols.length > 0) {
        this.columns.forEach((item, i) => {
          item.fixHead = 'hidden';
          item.fixBody = 'hidden';
        });
      }
      if (this.fixedcols.length === 1) {
        // 如果长度等于1的话，说明是左侧固定 或者 右侧固定 
        if (this.fixedcols[0]*1 === 0) {
          // 说明是左侧固定 给columns 添加字段
          this.columns[0].fixHead = '';
          this.columns[0].fixBody = '';

          // 最左侧固定 获取第一列的宽度，然后计算出总高度 this.data.length 含义一共有多少列 但是还需要包括th，因此加1
          this.leftwidth = this.columns[0].width + 'px';
          this.leftheight = this.columnsheight*1 * (this.data.length+1) + 'px';

          this.showleftcol = true;

        } else if(this.fixedcols[0]*1 === 1){
          // 说明是右侧固定
          this.columns[this.columns.length - 1].fixHead = '';
          this.columns[this.columns.length - 1].fixBody = '';
          // 最右侧固定
          this.rightwidth = this.columns[this.columns.length - 1].width + 'px';
          this.rightheight = this.columnsheight*1 * (this.data.length+1) + 'px';

          this.showrightcol = true;
        }
      } else if(this.fixedcols.length === 2) {
        // 如果长度等于2的话，说明是左右固定
        this.fixedcols.forEach((item, index) => {
          if (item === '0') {
            this.columns[0].fixHead = '';
            this.columns[0].fixBody = '';
            // 最左侧固定 获取第一列的宽度，然后计算出总高度 this.data.length 含义一共有多少列 但是还需要包括th，因此加1
            this.leftwidth = this.columns[0].width + 'px';
            this.leftheight = this.columnsheight*1 * (this.data.length+1) + 'px';
            this.showleftcol = true;

          } else if(item === '1') {
            
            this.columns[this.columns.length - 1].fixHead = '';
            this.columns[this.columns.length - 1].fixBody = '';

            // 最右侧固定
            this.rightwidth = this.columns[this.columns.length - 1].width + 'px';
            this.rightheight = this.columnsheight*1 * (this.data.length+1) + 'px';
            this.showrightcol = true;
          }
        });
      }

      // 如果固定列和表头时 设置bodyHeight 
      if (this.fixedcol && this.fixedcol.length && this.fixedhead) {
        this.bodyHeight = this.tableheight*1 - 1 - this.columnsheight*1 + 'px';
        // 滚动条的高度貌似为15px 经过浏览器测试 ，再减去1px边框
        this.leftheight = this.tableheight*1 - 15 - 1 + 'px';
        this.rightheight = this.leftheight;

        // fixed 内容的高度
        this.fixedBodyHeight = this.tableheight*1 - 15 - 1 - this.columnsheight*1 + 'px';
      }
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          `${prefixCls}-bottom-none`,
          {
            [`${prefixCls}-border`]: this.border,
            [`${prefixCls}-fixed-head`]: this.fixedhead && !this.fixedcol,
            [`${prefixCls}-fixed-col-header-container`]: this.fixedhead && this.fixedcol
          }
        ]
      },
      // 是否需要固定列的class
      isFixedColumn () {
        // 是否需要固定的类名
        return [ 
          {
            [`${prefixCls}-fixed-col`]: this.fixedcol && this.fixedcol.length && !this.fixedhead,
            [`${prefixCls}-fixed-col-header`]: this.fixedcol && this.fixedcol.length && this.fixedhead,
          }  
        ]
      },
    },
    mounted() {
      
    },
    methods: {
      makeData () {
        var data = [];
        this.data.forEach((row, index) => {
          row._index = index;
          data[index] = row;
          data[index]._isHover = false;
        });
        return data;
      },
      handleMouseIn(_index) {
        if (this.objData[_index]._isHover) {
          return;
        }; 
        // this.objData[_index]._isHover = true;
        // 使用如下的方法，改变对象的属性 重新渲染view
        this.objData[_index]._isHover = true;
        this.objData = Object.assign({}, this.objData)
      },
      handleMouseOut(_index) {
       // this.objData[_index]._isHover = false;
       // 使用如下的方法，改变对象的属性 重新渲染view
       this.objData[_index]._isHover = false;
       this.objData = Object.assign({}, this.objData)
      },
      // 是否左侧固定
      isLeftFixed() {

      },
      // 是否右侧固定
      isRightFixed() {

      },
      handleBodyScroll(event) {
        this.$refs.header.scrollLeft = event.target.scrollLeft;
        this.$refs.fixedLeftBody.scrollTop = event.target.scrollTop;
        this.$refs.fixedRightBody.scrollTop = event.target.scrollTop;
      }
    }
  }
</script>