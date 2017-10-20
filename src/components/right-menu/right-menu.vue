
<template>
  <div 
    class="tb-right-menu" 
    :class="{'right-menu-open': isOpen}"
    :style="{
      width: width + 'px'
    }"
  ><slot></slot></div>
</template>

<script>
  export default {
    name: 'TbRightMenu',
    componentName: 'TbRightMenu',
    props: {
      width: {
        type: [String, Number],
        default: 260
      }
    },
    data() {
      return {
        isOpen: false
      }
    },
    beforeMount() {

    },
    mounted() {

    },
    methods: {
      showMenu() {
        /* 外部调用的方法 */
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;
        console.log(this.isOpen);
        this.$emit('showMenu', this, { 'isOpen': this.isOpen });
      }
    }
  }
</script>