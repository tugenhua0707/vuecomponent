
<template> 
  <table cellpadding="0" cellspacing="0" width="100%" class="tb-table-head">
    <colgroup>
      <col v-if="columnsWidth.length > 0" v-for="w in columnsWidth" :width="(w-1)"></col>
      <col v-for="item in columns" :width="(item.width-1)" v-if="columnsWidth.length == 0"></col>
    </colgroup>
    <thead>
      <tr>
        <th v-for="item in columns">
          <div class="cell">{{item.label}}</div>
        </th>
        <th width="14" v-if="fixedHead"></th>
      </tr>
    </thead>
  </table>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  let arrs = [];
  export default {
    name: 'TbTableColumn',
    mixins: [ Emitter ],
    props: {
      columns: {
        type: [Array, Object],
        required: true
      },
      fixedHead: String,
      columnsWidth: {
        type: Array
      },
    },
    data() {
      return {

      }
    },
    beforeCreate() {
      
    },
    
    created() {
      
    },
    computed: {

    },
    mounted() {
      console.log(this)
    },
    beforeMount() {
      
    },
    methods: {
      
    }
  }
</script>