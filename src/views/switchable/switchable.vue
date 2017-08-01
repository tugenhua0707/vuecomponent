
<template>
    <tb-switchable v-model="value1" :width=600 :height=200>
        <tb-switchable-item>
          <div :style="{width:'600px',height:'200px', float:'left',background:'#506b9e', lineHeight: '200px', fontSize: '20px', textAlign:'center', color: '#fff'}">1</div>
        </tb-switchable-item>
        <tb-switchable-item>
          <div :style="{width:'600px',height:'200px', lineHeight: '200px', float:'left',background:'#506b9e', fontSize: '20px', textAlign:'center', color: '#fff'}">2</div>
        </tb-switchable-item>
        <tb-switchable-item>
          <div :style="{width:'600px',height:'200px', lineHeight: '200px', float:'left',background:'#506b9e', fontSize: '20px', textAlign:'center', color: '#fff'}">3</div>
        </tb-switchable-item>
        <tb-switchable-item>
          <div :style="{width:'600px',height:'200px', lineHeight: '200px', float:'left',background:'#506b9e', fontSize: '20px', textAlign:'center', color: '#fff'}">4</div>
        </tb-switchable-item>
    </tb-switchable>
</template>
<script>
  export default {
    data () {
      return {
        value1: 0
      }
    }
  }
</script>