
<template>
  <span v-if="dot" :class="[prefixCls]" ref="badge">
    <slot></slot>
    <sup :class="[prefixCls]+'-dot'" v-show="badge"></sup>
  </span>
  <span v-else :class="[prefixCls]" ref="badge">
    <slot></slot>
    <sup v-if="count" :class="countClasses" v-show="badge">{{ countValue }}</sup>
  </span>
</template>

<script>
   const prefixCls = 'tb-badge';
   export default {
     name: 'Badge',
     componentName: 'Badge',
     props: {
       // 显示的数字，如果大于 capCount 时，会显示 ${capCount}+ 当为0时，隐藏。
       count: {
         type: [ Number, String ],
         default: 0
       },
       // 封顶的数字，默认为99
       capCount: {
         type: [Number, String],
         default: 99, 
       },
       // 不显示数字，只有一个小红点，如果需要隐藏dot，请设置count为0即可     
       dot: {
         type: Boolean,
         default: false
       },
       // 自定义的类名
       className: {
         type: String,
         default: ''
       }, 
     },
     computed: {
       countClasses () {
          return [
            `${prefixCls}-count`,
            {
              [`${this.className}`]: !!this.className
            }
          ]
       },
       countValue () {
         // 如果显示的数字大于 封顶的数字(99)的话，就直接显示 99+， 否则的话 就显示数字 
         return parseInt(this.count, 10) > parseInt(this.capCount, 10) ? `${this.capCount}+` : this.count;
       },
       badge () {
         let flag = false;
         if (this.dot || this.count) {
           flag = true;
         }
         return flag;
       }
     },
     data () {
       return {
         alone: false,
         prefixCls: prefixCls,
       }
     },
     mounted () {

     }
   }
</script>