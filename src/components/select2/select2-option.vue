
<template>
  <li :class="classes" @click.stop="select" ref="options" v-show="isMatch">
    <slot>{{ showLabel }}</slot>
  </li>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  const prefixCls = "tb-select2-item";

  export default {
    name: 'TbSelect2Option',
    mixins: [ Emitter ],
    props: {
      value: {
        type: [String, Number],
        required: true
      },
      label: {
        type: [String, Number]
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        selected: false,
        isHover: false,
        isMatch: true,    // 模糊匹配是否匹配到了 默认为true 
      }
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-disabled`]: this.disabled,
            [`${prefixCls}-selected`]: this.selected,
            [`${prefixCls}-hover`]: this.isHover
          }
        ]
      },
      showLabel () {
        return (this.label) ? this.label : this.value;
      }
    },
    methods: {
      select () {
        if (this.disabled) {
          return;
        }
        this.dispatch('TbSelect2', 'on-select-selected', this.value);
      }
    },
    mounted () {
      
    }
  }
</script>