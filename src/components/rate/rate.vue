
<template>
  <div :class='classes' @mouseleave='handleMouseleave'>
    <div 
      v-for='item in count' 
      :class='starCls(item)' 
      @mousemove='handleMousemove(item, $event)' 
      @click='handleClick(item)'>
      <span :class="[prefixCls + '-star-content']"></span>
    </div>
    <div :class="[prefixCls + '-text']" v-if="showText" v-show="currentValue > 0">
      <slot>{{ currentValue }} 
        <template v-if="currentValue <= 1">{{ t('i.rate.star') }}</template>
        <template v-else>{{ t('i.rate.stars') }}</template>
      </slot>
    </div>
  </div>
</template>

<script>
  import Locale from '../../mixins/locale';
  import Emitter from '../../mixins/emitter';

  const prefixCls = 'tb-rate';
  export default {
    mixins: [ Locale, Emitter ],
    props: {
      count: {
        type: Number,
        default: 5
      },
      value: {
        type: Number,
        default: 0
      },
      allowHalf: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      showText: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        prefixCls: prefixCls,
        hoverIndex: -1,
        isHover: false,
        isHalf: false,
        currentValue: this.value
      }
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-disabled`]: this.disabled
          }
        ]
      }
    },
    watch: {
      value (val) {
        console.log('value');
        this.currentValue = val;
      },
      currentValue (val) {
        console.log('currentValue');
        this.setHalf(val);
      }
    },
    methods: {
      starCls (value) {
        console.log('starCls');
        const hoverIndex = this.hoverIndex;

        // 当前的值
        const currentIndex = this.isHover ? hoverIndex : this.currentValue;
        
        var full = false;
        if (currentIndex >= value) {
          full = true;
        }

        var isLast = false;
        if (this.isHover) {
          isLast = currentIndex === value;
        } else {
          isLast = Math.ceil(this.currentValue) === value;
        }
        return [
          `${prefixCls}-star`,
          {
            [`${prefixCls}-star-full`]: (!isLast && full) || (isLast && !this.isHalf),
            [`${prefixCls}-star-half`]: isLast && this.isHalf
          }
        ];
      },
      handleMousemove(value, event) {
        if(this.disabled) {
          return;
        }
        this.isHover = true;
        if (this.allowHalf) {
          this.isHalf = true;
        } else {
          this.isHalf = false;
        }
        this.hoverIndex = value;
      },
      handleMouseleave () {
        if (this.disabled) {
          return;
        }
        this.isHover = false;
        this.setHalf(this.currentValue);
        this.hoverIndex = -1;
      },
      setHalf (val) {
        console.log('setHalf');
        this.isHalf = val.toString().indexOf('.') >= 0;
      },
      handleClick (value) {
        if(this.disabled) {
          return;
        }
        if(this.isHalf) {
          value -= 0.5;
        }
        this.currentValue = value;
        this.$emit('input', value);
        this.$emit('on-change', value);
        this.dispatch('FormItem', 'on-form-change', value);
      }
    }
  }
</script>