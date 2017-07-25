
<template>
  <div :class="wrapClasses"> 
    <div :class="[prefixCls + '-handler-wrap']">
      <a 
        @click.prevent="up"
        :class="upClasses"
      >
        <span :class="">上</span>
      </a>
      <a 
        @click.prevent="down" 
        :class="downClasses"
      >
        <span :class="">下</span>
      </a>
    </div>
    <div :class="[prefixCls + '-input-wrap']">
      <input
        :class="[prefixCls + '-input']"
        :disabled="disabled"
        autocomplete="off"
        @focus="focus"
        @blur="blur"
        @keydown.stop="keyDown"
        @keyup.stop="keyUp"
        ref="input"
        :value="value">
    </div>
  </div>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  const prefixCls = "tb-input-number";
  export default {
    name: 'TbInputNumber',
    component: 'TbInputNumber',
    mixins: [ Emitter ],
    props: {
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: -Infinity
      },
      step: {
        type: [Number, String],
        default: 1
      },
      value: {
        type: Number,
        default: 1
      },
      disabled: {
        type: Boolean,
        default: false
      },
    },
    data () {
      return {
        prefixCls: prefixCls,
        upDisabled: false,
        downDisabled: false,
        focused: false,
        currentValue: this.value,
      }
    },
    computed: {
      wrapClasses () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-disabled`]: this.disabled,
            [`${prefixCls}-focused`]: this.focused,
          }
        ]
      },
      upClasses () {
        return [
          `${prefixCls}-handler`,
          `${prefixCls}-handler-up`,
          {
            [`${prefixCls}-handler-up-disabled`]: this.upDisabled
          }
        ]
      },
      downClasses () {
        return [
          `${prefixCls}-handler`,
          `${prefixCls}-handler-down`,
          {
            [`${prefixCls}-handler-down-disabled`]: this.downDisabled
          }
        ]
      },
    },
    watch: {
      
    },
    methods: {
      // 为了解决 计算机精度型，乘以多少 除以多少(但是不知道要乘以多少呢？所以判断小数点后面多少位，用位数乘以10的密指数方)
      addNum (num1, num2) {
        let sq1, sq2, m;
        try {
          sq1 = num1.toString().split('.')[1].length;
        } catch (e) {
          sq1 = 0;
        }
        try {
          sq2 = num2.toString().split('.')[1].length;
        } catch (e) {
          sq2 = 0;
        }
        m = Math.pow(10, Math.max(sq1, sq2));
        return (num1 * m + num2 * m) / m;
      },
      up (e) {
        // 判断向上按钮是否被禁用 或 值 是不是一个数字
        const targetValue = Number(this.$refs.input.value.trim());
        if (this.upDisabled || isNaN(targetValue)) {
          return;
        }
        this.changeStep('up', e);
      },
      down (e) {
        const targetValue = Number(this.$refs.input.value.trim());
        if (this.downDisabled || isNaN(targetValue)) {
          return;
        }
        this.changeStep('down', e);
      },
      getValue(value) {
        const max = this.max;
        const min = this.min;
        if (value > max) {
          value = max;
          this.upDisabled = true;
          this.downDisabled = false;
        } else if(value < min) {
          value = min;
          this.upDisabled = false;
          this.downDisabled = true;
        } else {
          this.upDisabled = false;
          this.downDisabled = false;
        }
        return value;
      },
      changeStep(type, e) {
        if (this.disabled) {
          return;
        }
        const step = Number(this.step);
        // 如果步长 不是数字的话 直接返回
        if (!this.isValueNumber(step)) {
          return;
        }
        const max = this.max;
        const min = this.min;
        let val = Number(this.currentValue);
        if (type === 'up') {
          val = this.addNum(val, step);
        } else if(type === 'down') {
          val = this.addNum(val, -step);
        }
        val = this.getValue(val);
        this.setValue(val);
      },
      setValue(val) {

        this.$nextTick(() => {
          this.currentValue = val;
          this.$emit('input', val);
          this.$emit('change', val);
        });
        
      },
      focus () {
        this.focused = true;
      },
      blur () {
        this.focused = false;
      },
      keyDown (e) {
        e.preventDefault();
        // 上下键 操作
        const keyCode = e.keyCode;
        if (keyCode === 38) {
          this.up(e);
        } else if(keyCode === 40) {
          this.down(e);
        }
      },
      isValueNumber(value) {
        return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
      },
      keyUp(e) {
        e.preventDefault();
        let val = e.target.value.trim();
        // 先判断 val 是否是数字型，如果不是的话，就把 currentValue保存的值 赋值给 当前值，否则的话，就把新值赋值给 currentValue
        if (this.isValueNumber(val)) {
          val = Number(val);
          // 判断当前值的大小 是否在最大和最小之间
          val = this.getValue(val);
          this.setValue(val);
        } else {  
          e.target.value = this.currentValue;
        }
      },
    }
  }
</script>