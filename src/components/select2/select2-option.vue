
<template>
  <li :class="classes" @click.stop="select" ref="options">
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