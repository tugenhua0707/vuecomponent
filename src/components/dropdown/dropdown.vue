
<template>
  <div
    :class="[prefixCls]"
    v-clickClose='handleClose'
    @mouseenter='handleMouseenter',
    @mouseleave='handleMouseleave'>
    <div :class="[prefixCls + '-rel']" ref='reference' @click='handleClick'><slot></slot></div>
    <transition :name="transition">
      <Drop v-show='currentVisible' :placement='placement' ref='drop'><slot name='list'></slot></Drop>
    </transition>
  </div>
</template>

<script>
  import Drop from '../select/dropdown.vue';
  import clickoutside from '../../directives/clickoutside';
  import { oneOf, findComponentUpward } from '../../utils/utils';

  const prefixCls = 'tb-dropdown';
  export default {
    name: 'tb-dropdown',
    directives: { clickoutside },
    components: { Drop },
    props: {
      // 触发的方式。默认为 hover ,有 click(点击), hover(悬停)， custom(自定义)， 使用custom时，需要配合 visible一起使用
      trigger: {
        validator (value) {
          return oneOf(value, ['click', 'hover', 'custom']);
        },
        default: 'hover'
      },
      // 下拉框菜单出现的为止 默认为 bottom
      placement: {
        validator (value) {
          return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left',
                      'left-start', 'left-end', 'right', 'right-start', 'right-end'
                      ]);
        },
        default: 'bottom'
      },
      // 手动控制下拉框显示，在 trigger = 'custom' 时使用
      visible: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      transition () {
        return ['bottom-start', 'bottom', 'bottom-end'].indexOf(this.placement) > -1 ? 'slide-up' : 'fade';
      }
    },
    data () {
      return {
        prefixCls: prefixCls,
        currentVisible: this.visible
      };
    },
    watch: {
      visible (val) {
        this.currentVisible = val;
      },
      currentVisible (val) {
        if (val) {
          this.$refs.drop.update();
        } else {
          this.$refs.drop.destory();
        }
        this.$emit('on-visible-change', val);
      }
    },
    methods: {
      handleClick () {
        if (this.trigger !== 'click') {
          return false;
        }
        this.currentVisible = !this.currentVisible;
      },
      handleMouseenter () {
        if (this.trigger !== 'hover') {
          return false;
        }
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(()=>{
          this.currentVisible = true;
        }, 200);
      },
      handleMouseleave () {
        if (this.trigger !== 'hover') {
          return false;
        }
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(()=>{
          this.currentVisible = false;
        }, 200);
      },
      handleClose () {
        if(this.trigger !== 'click') {
          return false;
        }
        this.currentVisible = false;
      },
      hasParent () {
        const $parent = findComponentUpward(this, 'tb-dropdown');
        if($parent) {
          return $parent;
        } else {
          return false;
        }
      }
    },
    mounted () {
      this.$on('on-click', (key)=> {
        const $parent = this.hasParent();
        if($parent) {
          $parent.$emit('on-click', key);
        }
      });
      this.$on('on-hover-click', ()=>{
        const $parent = this.hasParent();
        if ($parent) {
          this.$nextTick(() => {
            if (this.trigger === 'custom') {
              return false;
            }
            this.currentVisible = false;
          });
          $parent.$emit('on-hover-click');
        } else {
          this.$nextTick(() => {
            if (this.trigger === 'custom') {
              return false;
            }
            this.currentVisible = false;
          })
        }
      });
      this.$on('on-haschild-click', () => {
        this.$nextTick(() => {
          if (this.trigger === 'custom') {
            return false;
          }
          this.currentVisible = true;
        });
        const $parent = this.hasParent();
        if ($parent) {
          $parent.$emit('on-haschild-click');
        }
      })
    }
  }
</script>