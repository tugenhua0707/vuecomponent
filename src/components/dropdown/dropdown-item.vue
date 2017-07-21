
<template>
  <li :class="classes" @click="handleClick"><slot></slot></li>
</template>

<script>
  
  const prefixCls = 'tb-dropdown-item';

  export default {
    name: 'tb-dropdown-item',
    props: {
      // 名称显示
      name: {
        type: [String, Number]
      },
      // 是否被禁用 默认为false
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否被选中，默认为false
      selected: {
        type: Boolean,
        default: false
      },
      // 是否显示分割线，默认为false
      isDivided: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls-disabled}`]: this.disabled,
            [`${prefixCls-selected}`]: this.selected,
            [`${prefixCls}-divided`]: this.isDivided
          }
        ]
      }
    },
    methods: {
      handleClick () {
        const $parent = this.$parent.$parent.$parent;
        // 是否有子元素
        const hasChildren = this.$parent && this.$parent.$options.name === 'tb-dropdown';
        if (this.disabled) {
          this.$nextTick(() => {
            $parent.currentVisible = true;
          });
        } else if (hasChildren) {
          this.$parent.$emit('on-haschild-click');
        } else {
          if ($parent && $parent.$options.name === 'tb-dropdown') {
            $parent.$emit('on-hover-click');
          }
        }
        $parent.$emit('on-click', this.name);
      }
    }
  }
</script>