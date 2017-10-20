
<template>
  <div>
    <div @showMenu="showMenu2">修改1</div>
    <div @showMenu="showMenu2">修改2</div>
    <tb-right-menu
      :width="300"
    >
      <div>测试</div>
    </tb-right-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      showMenu2(e, isopen) {
        console.log(e);
        console.log(isOpen);
      }
    }
  }
</script>