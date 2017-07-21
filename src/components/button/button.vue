
<template>
  <button :type="htmlType" :class="classes" :disabled="disabled" @click="handleClick">
    <tb-icon class='tb-load-loop' type='load-c' v-if='loading'></tb-icon>
    <tb-icon :type='icon' v-if="icon && !loading"></tb-icon>
    <span v-if="showSlot" ref='solt'><slot></slot></span>
  </button>
</template>

<script>
  import Icon from '../icon/index';
  import { oneOf } from '../../utils/utils';
  const prefixCls = 'tb-btn';

  export default {
    name: 'tb-button',
    components: {
      'tb-icon': Icon
    },
    props: {
      type: {
        validator (value) {
          return oneOf(value, ['primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error']);
        }
      },
      shape: {
        validator (value) {
          return oneOf(value, ['circle', 'circle-outline']);
        }
      },
      size: {
        validator (value) {
          return oneOf(value, ['small', 'large']);
        }
      },
      loading: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      htmlType: {
        type: String,
        defalut: 'button',
        validator (value) {
          return oneOf(value, ['button', 'submit', 'reset']);
        }
      },
      icon: {
        type: String
      },
      long: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showSlot: true
      }
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-${this.type}`]: !!this.type,
            [`${prefixCls}-long`]: !!this.long,
            [`${prefixCls}-${this.shape}`]: !!this.shape,
            [`${prefixCls}-${this.size}`]:  !!this.size,
            [`${prefixCls}-loading`]: !!this.loading,
            [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || this.loading)
          }
        ];
      }
    },
    methods: {
      handleClick (event) {
        this.$emit('click', event);
      }
    },
    mounted () {
      this.showSlot = this.$slots.default !== undefined;
    }
  }
</script>