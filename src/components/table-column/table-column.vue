
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  import Vue from 'vue';
  export default {
    mixins: [ Emitter ],
    name: 'TbTableColumn',
    props: {
      
    },
    data() {
      return {
        columns: []
      }
    },
    beforeMount() {
      
    },
    mounted() {
      
    },
    created() {

    },
    methods: {
      
    }
  }
</script>