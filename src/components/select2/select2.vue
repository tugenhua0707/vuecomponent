
<template>
  <div :class="classes">
    <div :class="[prefixCls + '-selection']" @click="toggleMenu">
      <div class="tb-select2-tag" v-for="(item, index) in selectedMultiple">
        <span class="tb-select2-tag-text">{{ item.label }}</span><i @click.stop="delItem(item.value)">x</i>
      </div>
      <span :class="[prefixCls + '-placeholder']" v-show="showPlaceholder && !filterable">{{ placeholder }}</span>
      <span :class="[prefixCls + '-selected-value']" v-show="!showPlaceholder && !multiple && !filterable">{{ selectedSingle }}</span>
      <input 
        type="text"
        :class="[prefixCls + '-input']"
        v-if="filterable"
        ref="input"
        v-model="query"
        :style="inputStyle"
        @keydown="resetInputLength"
        :placeholder="showPlaceholder ? placeholder : ''"
      />
      <i class="tb-icon tb-icon-caret-down tb-select2-arrow" v-show="!visible"></i>
      <i class="tb-icon tb-icon-caret-up tb-select2-arrow" v-show="visible"></i>
    </div>
    <transition :name="transitionName">
      <div :class="[prefixCls + '-dropdown']" v-show="visible">
        <ul :class="[prefixCls + '-not-found']" v-show="notFound">
          <li>{{ notFoundText }}</li>
        </ul>
        <ul :class="[prefixCls + '-dropdown-list']" v-show="!notFound">
          <slot></slot>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  /*
    select2 下拉框，支持单选下拉，多选，模糊搜索， 初始化默认选中值
   */
  import Emitter from '../../mixins/emitter';
  const prefixCls = "tb-select2";

  export default {
    name: 'TbSelect2',
    mixins: [ Emitter ],
    props: {
      // 下拉框的值
      value: {
        type: [String, Array],
        default: ''
      },
      // 是否被禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否支持多选，默认情况下false 单选
      multiple: {
        type: Boolean,
        default: false
      },
      // 是否支持模糊搜索，默认不支持
      filterable: {
        type: Boolean,
        default: false
      },
      // 默认placeholder为请选择
      placeholder: {
        type: String,
        default: '请选择'
      },
      // 数据没有匹配到
      notFoundText: {
        type: String,
        default: '无匹配数据'
      }
    },
    data () {
      return {
        prefixCls: prefixCls,
        visible: false,
        selectedSingle: '',    // 存单选的label
        selectedMultiple: [],  // 保存多选框的   
        notFound: false,       // 没有匹配到
        inputLength: 20,
        query: '',             // 查询值
        focusIndex: 0,
        currentValue: this.value,       
      }
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-disabled`]: this.disabled,
            [`${prefixCls}-multiple`]: this.multiple,
            [`${prefixCls}-single`]: !this.multiple && !this.filterable,
            [`${prefixCls}-filterable`]: this.filterable,
            [`${prefixCls}-visible`]: this.visible
          }
        ]
      },
      showPlaceholder () {
        let isPlaceholder = false;
        // 如果当前的值为空
        if ((typeof this.currentValue) === 'string') {
          if (this.currentValue === '') {
            isPlaceholder = true;
          }
        } else if (Array.isArray(this.currentValue)) {
          if (this.currentValue.length === 0) {
            isPlaceholder = true;
          }
        }
        return isPlaceholder;
      },
      transitionName () {
        return this.visible ? 'slide-up' : 'slide-down';
      },
      inputStyle () {
        let style = {};
        if (this.filterable) {
          if (this.showPlaceholder) {
            style.width = '100%';
          } else {
            style.width = `${this.inputLength}px`;
          }
        }
        return style;
      },
    },
    watch: {
      query(curVal,oldVal) {
        this.searchMatch(curVal);
      }
    },
    mounted () {
      // 监听
      this.$on('on-select-selected', (value) => {
        // 判断是否是多选 还是 单选 
        if (this.multiple || this.filterable) {
          // 多选 或 模糊搜索(也支持多选)
          this.$children.forEach((child, index) => {
            const label = child.$el.innerHTML;
            const childValue = child.$options.propsData.value;
            if (childValue === value) {
              // 把值存入数组之前，先判断数组里面是否有该值，如果有该值的话，再次点击，说明是删除该标签的操作
              const obj = this.getSelectedStatus(value);
              const ishasValue = obj.status;
              const curIndex = obj.index;
              if (!ishasValue) {
                this.selectedMultiple.push({
                  "label": label,
                  "value": childValue,
                  "index": index
                });
                this.currentValue = this.selectedMultiple;
                // 设置子元素的数据
                child.selected = true;
                this.query = '';
              } else {
                // 删除数组的某一项
                this.removeItem(curIndex);

                // 设置子元素的数据
                child.selected = false;
                this.currentValue = this.selectedMultiple;
              }
              if (this.filterable) {
                this.$refs.input.focus();
              }
              this.focusIndex = index;
              // 对外提供回调 是一个数组对象 参数包括 key 和 value index 
              this.$emit('change', this.selectedMultiple); 
            }
          });
        } else {
          this.$children.forEach((child, index) => {
            const label = child.$el.innerHTML;
            const childValue = child.$options.propsData.value;
            if (childValue === value) {
              this.selectedSingle = label;
              this.currentValue = childValue;
              // 设置子元素的数据
              child.selected = true;
              this.hide();
              // 对外提供回调, 参数为对象 key 和 value index
              this.$emit('change', { 'key': label, 'value': childValue, "index": index });
              this.focusIndex = index;
            } else {
              // 设置子元素的数据
              child.selected = false;
            }
          });
        }
      });
      // 初始化 默认选中值 有2种情况，第一种传参是字符串，第二种是数组,
      // 判断是单选还是多选
      if (this.multiple || this.filterable) {
        // 多选 或者 模糊匹配(支持多选)
        if (this.currentValue !== '') {
          if (typeof this.currentValue === 'string') {
            // 如果是字符串的话，值可以使用逗号隔开的字符串
            this.currentValue = this.currentValue.split(',');
          }
          this.$children.forEach((child, index) => {
            this.defaultSelectedMultipleValue(child, index);
          });
          if (this.filterable) {
            this.$refs.input.focus();
          }
          // 对外提供回调 是一个数组对象 参数包括 key 和 value index 
          this.$emit('change', this.selectedMultiple); 
        }
      } else {
        // 单选
        if (this.currentValue !== '') {
          if (typeof this.currentValue === 'string') {
            this.$children.forEach((child, index) => {
              this.defaultSelectedSingleValue(child, this.currentValue, index);
            });
          } else if ((typeof Array.isArray(this.currentValue)) && this.currentValue.length === 1) {
            this.$children.forEach((child, index) => {
              var curValue = this.currentValue[0];
              this.defaultSelectedSingleValue(child, curValue, index);
            });
          }
        }
      }

      // 点击document事件
      const doc = document.getElementsByTagName('body')[0];
      this.addEvent('click', doc, (e) => {
        if (!this.checkIsInSelect(e.target)) {
          this.hide();
        }
      });
      // 监听 keydown 事件
      this.addEvent('keydown', doc, (e) => {
        this.handleKeydown(e);
      });
    },
    methods: {
      hide () {
        if (!this.visible) {
          return;
        }
        this.visible = false;
      },
      toggleMenu () {
        if (this.disabled) {
          return;
        }
        this.visible = !this.visible;
      },
      // 默认选中单选值
      defaultSelectedSingleValue (child, value, index) {
        const childValue = child.$options.propsData.value;
        if (childValue === value) {
          this.selectedSingle = child.$el.innerHTML;
          this.currentValue = childValue;
          // 设置子元素的数据
          child.selected = true;
          this.hide();
          this.focusIndex = index;
          // 对外提供回调, 参数为对象 key 和 value index
          this.$emit('change', { 'key': child.$el.innerHTML, 'value': childValue, "index": index });
        }
      },
      // 默认选中多选值
      defaultSelectedMultipleValue (child, index) {
        const childValue = child.$options.propsData.value;
        const label = child.$el.innerHTML;
        if (typeof Array.isArray(this.currentValue) && this.currentValue.length > 0) {
          for (let i = 0, ilen = this.currentValue.length; i < ilen; i++) {
            let curValue =  this.currentValue[i];
            if (childValue === curValue) {
              this.selectedMultiple.push({
                'label': label,
                'value': curValue,
                'index': index
              });
              child.selected = true;
              break;
            }
          }
          // 初始化多项值，那么focusIndex = 当前数组最后一项值的索引index
          this.focusIndex = this.currentValue.length - 1;
        }
      }, 
      // 重新设置input的长度 字体大小12px 
      resetInputLength () {
        this.inputLength = this.$refs.input.value.length * 12 + 20;
      },
      // 多选时 判断数组内 是否有该值，如果有的话，直接做删除操作，否则的话，返回true，做添加操作
      getSelectedStatus (value) {
        let status = false;
        let index = -1;
        if (this.selectedMultiple.length > 0) {
          for (let i = 0,ilen=this.selectedMultiple.length; i < ilen; i++) {
            if (value === this.selectedMultiple[i].value) {
              status = true;
              index = i;
              break;
            }
          }
        }
        let obj = {"status": status, "index": index};
        return obj;
      },
      // 根据索引值，删除数组的某一项
      removeItem (index) {
        return this.selectedMultiple.splice(index, 1);
      },
      checkIsInSelect(node) {

        if (!node) {
          return false;
        } else if (node.className && node.className.indexOf('tb-select2') !== -1) {
          return true;
        }
        return this.checkIsInSelect(node.parentNode);
      },
      handleKeydown (e) {
        // e.preventDefault();
        // 如果下拉框是下拉的情况下 
        if (this.visible) {
          const keyCode = e.keyCode;
          if (keyCode === 40) {
            // 键盘向下箭头 next 操作
            this.navOptions('next');
          }
          if (keyCode === 38) {
            // 键盘向上箭头 prev 操作
            this.navOptions('prev');
          }
          if (keyCode === 13) {
            // 回车键操作
            this.$children.forEach((child, index)=> {
              if (index === this.focusIndex) {
                if (!child.disabled) {
                  // 执行子元素的select方法，监听事件
                  child.select();
                }
              }
            });
          }
        }
      },
      navOptions(direction) {
        if (direction === 'next') {
          const next = this.focusIndex + 1;
          this.focusIndex = (this.focusIndex === (this.$children.length -1)) ? 0 : next;
        } else if (direction === 'prev') {
          const prev = this.focusIndex - 1;
          this.focusIndex = (this.focusIndex <= 0) ? (this.$children.length-1) : prev;
        }
        let child_status = false;

        this.$children.forEach((child, index) => {
          if (this.focusIndex === index) {
            const label = child.$el.innerHTML;
            const childValue = child.$options.propsData.value;
            child_status = child.disabled;
            if (!child.disabled) {
              // 判断是否是单选或多选操作
              if (this.multiple || this.filterable) {
                child.isHover = true;
              } else {
                child.selected = true;
                this.selectedSingle = label;
                this.currentValue = childValue;
                // 设置回调
                this.$emit('change', { 'key': label, 'value': childValue, "index": index });
              }
            }
          } else {
            // 设置子元素的数据
           child.isHover = false;
           if (this.multiple || this.filterable) {
             // 设置 selected 选项，判断该child是否在多选selectedMultiple数组内 如果在的话，设置该 child.selected = true, 否则的话， 设置false
             this.resetSetSelected(child);
           } else {
             child.selected = false;
           }
          }
        });
        // 如果状态为 disabled元素，重新调用下该方法，执行下一个
        if (child_status) {
          this.navOptions(direction);
        }
      },
      resetSetSelected(child) {
        const childValue = child.$options.propsData.value;
        if (this.selectedMultiple.length > 0) {
          this.selectedMultiple.forEach((item, index) => {
            if (item.value === childValue) {
              child.selected = true;
            }
          })
        }
      },
      delItem (value) {
        if (this.selectedMultiple.length > 0) {
          this.selectedMultiple.forEach((item, index) => {
            if (item.value === value) {
              this.removeItem(index);
              if (this.filterable) {
                this.$refs.input.focus();
              }
              // 设置回调
              this.$emit('change', this.selectedMultiple);
              this.removeSelectState(value);
            }
          });
        }
      },
      removeSelectState(value) {
        this.$children.forEach((child, index) => {
          const childValue = child.$options.propsData.value;
          if (childValue === value) {
            child.selected = false;
          }
        });
      },
      // 根据vlaue进行模糊匹配
      searchMatch(curLabel) {
        // 保存匹配的项
        let matchArrs = [];
        if (this.$children.length > 0) {
          this.$children.forEach((child, index) => {
            const label = child.$el.innerHTML;
            if (label.indexOf(curLabel) > -1) {
              // 说明已经匹配到了 给当前的子元素设置属性
              child.isMatch = true;
              matchArrs.push(child);
            } else {
              child.isMatch = false;
            }
          });
        }
        if (matchArrs.length < 1) {
          this.notFound = true;
        } else {
          this.notFound = false;
        }
      },
    }
  }
</script>