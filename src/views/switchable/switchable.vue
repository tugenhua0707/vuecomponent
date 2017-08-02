
<template>
  <div>
    <div style="margin-top:20px;">初始化第一项，带有左右箭头</div>
    <tb-switchable v-model="value1" :width=600 :height=200 isArrow>
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
    <div style="margin-top:20px;">初始化切换到第四项</div>
    <tb-switchable v-model="value1" :width=600 :height=200 :switchToIndex="3">
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

    <div style="margin-top:20px;">自动播放</div>
    <tb-switchable v-model="value1" :width=600 :height=200 autoplay>
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

  </div>
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