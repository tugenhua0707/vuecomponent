
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
        type: [Number, String],
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
        const targetVal = Number(e.target.value);
        if (this.upDisabled && isNaN(targetVal)) {
          return false;
        }
        this.changeStep('up', e);
      },
      down (e) {
        const targetVal = Number(e.target.value);
        if (this.downDisabled && isNaN(targetVal)) {
          return false;
        }
        this.changeStep('down', e);
      },
      getValue(value) {
        const max = this.max;
        const min = this.min;
        if (value > max) {
          value = max;
          this.currentValue = max;
          this.upDisabled = true;
          this.downDisabled = false;
        } else if(value < min) {
          value = min;
          this.currentValue = min;
          this.upDisabled = false;
          this.downDisabled = true;
        } else {
          this.upDisabled = false;
          this.downDisabled = false;
          this.currentValue = value;
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
        this.setValue(e, val);
      },
      setValue(e, val) {
        val = this.getValue(val);
        this.currentValue = val;
        this.$nextTick(() => {
          this.$emit('input', val);
          this.$emit('change', val);
        });
      },
      focus (e) {
        this.focused = true;
      },
      blur (e) {
        this.focused = false;
      },
      keyDown (e) {
        // 上下键 操作
        const keyCode = e.keyCode;
        if (keyCode === 38) {
          // 解决input光标移动到前面去的bug
          e.preventDefault();
          this.up(e);
        } else if(keyCode === 40) {
          // 解决input光标移动到前面去的bug
          e.preventDefault();
          this.down(e);
        }
      },
      keyUp (e) {
        const val = e.target.value;
        if (val !== '') {
          if (/^\d+$/.test(val) || /^\d+(\.)?$/.test(val) || /^\d+(\.\d+)?$/.test(val)) {

            this.setValue(e, val);

          } else {
            e.target.value = this.currentValue;
          }
        } else {
          this.currentValue = 1;
        }
        
      },
      isValueNumber(value) {
        return (/^\d+(\.\d+)?$/.test(value + ''));
      },
    }
  }
</script>