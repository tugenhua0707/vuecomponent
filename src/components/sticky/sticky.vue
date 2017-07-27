
<template>
    <div :class="classes" :style="styles">
      <slot></slot>
    </div>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  const prefixCls = "tb-sticky";
  function getScroll () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    return {
      'top': scrollTop,
      'left': scrollLeft
    }
  };
  function getOffset(elem) {
    // 返回一个矩形对象，包含四个属性：left、top、right 和 bottom
    const rect = elem.getBoundingClientRect();
    const scroll = getScroll();

    const docBody = window.document.body;
    const clientTop = docBody.clientTop || 0;
    const clientLeft = docBody.clientLeft || 0;
    const scrollTop = scroll.top;
    const scrollLeft = scroll.left;

    return {
      top: rect.top + scrollTop - clientTop,
      left: rect.left + scrollLeft - clientLeft
    };
  }
  export default {
    name: 'TbSticky',
    component: 'TbSticky',
    mixins: [ Emitter ],
    props: {
      offsetTop: {
        type: [Number, String],
        default: 0
      },
      offsetBottom: {
        type: [Number, String],
      },
      elemCls: {
        type: String,
        default: '.tb-sticky-elem'
      }
    },
    data() {
      return {
        sticky: false,
        styles: {}
      }
    },
    computed: {
      classes () {
        return {
          [`${prefixCls}`]: this.sticky
        }
      },
      // 判断是 top  还是 bottom
      isType () {
        let type = 'top';
        if (this.offsetBottom >= 0) {
          type = 'bottom';
        }
        return type;
      }
    },
    mounted () {
      this.addEvent('scroll', window, this.handleScroll);
      this.addEvent('resize', window, this.handleScroll);
      
      // 保存元素定位
      this.elOffset = getOffset(this.$el);
      console.log(this.offsetTop)
    },
    methods: {
      handleScroll () {
        const sticky = this.sticky;
        // 获取元素滚动的top
        const scrollTop = (getScroll()).top;
        // const elOffset = getOffset(this.$el);
        const windowHeight = window.innerHeight;

        // 获取元素的高度
        const elHeight = this.$el.querySelectorAll(this.elemCls)[0].offsetHeight;

        // top 固定 如果元素离顶部距离的top <= 滚动的top + 离顶部的距离(固定)fixed  且滚动的类型是 top 
        if ((this.elOffset.top < scrollTop + this.offsetTop) && this.isType == 'top' && !sticky) {
          this.sticky = true;
          this.styles = {
            position: 'fixed',
            top: `${this.offsetTop}px`,
            left: `${this.elOffset.left}px`,
            width: `${this.$el.offsetWidth}px`
          };
          this.$emit('change', this.sticky);
        } else if((this.elOffset.top > scrollTop + this.offsetTop) && this.isType == 'top' && sticky) {
          this.sticky = false;
          this.styles = null;
          this.$emit('change', this.sticky);
        }
        // bottom 固定 如果元素离顶部距离的top + 离底部的距离(固定)fixed + 元素的高度 >= 滚动的top + 浏览器的高度 
        if ((this.elOffset.top + this.offsetBottom + elHeight) > (scrollTop + windowHeight) && this.isType == 'bottom' && !sticky) {
          this.sticky = true;
          this.styles = {
            position: 'fixed',
            bottom: `${this.offsetBottom}px`,
            left: `${this.elOffset.left}px`,
            width: `${this.$el.offsetWidth}px`
          };
          this.$emit('change', this.sticky);
        } else if((this.elOffset.top + this.offsetBottom + elHeight) < (scrollTop + windowHeight) && this.isType == 'bottom' && sticky) {
          this.sticky = false;
          this.styles = null;
          this.$emit('change', this.sticky);
        }
      },
    }
  }
</script>