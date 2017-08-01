
<template lang='html'>
  <div id='container'>
    <header-tab></header-tab>
    <h2>{{msg}}</h2>
    <div class='nav'>
      <div class='nav-list'>
        <router-link class="nav-item" to="/">首页</router-link>
        <router-link class='nav-item' to='/about'>关于</router-link>
      </div>
      <div class='nav-list' style="margin-top:15px;">
        <h3>固定在顶部</h3>
        <router-link class='nav-item' to='/stickyTop'>固定在顶部</router-link>
      </div>
      <div class='nav-list' style="margin-top:15px;">
        <h3>固定在离顶部20px</h3>
        <router-link class='nav-item' to='/stickyTop2'>固定在离顶部20px</router-link>
      </div>
      <div class='nav-list' style="margin-top:15px;">
        <h3>固定在离低部20px</h3>
        <router-link class='nav-item' to='/stickyTop3'>固定在离低部20px</router-link>
      </div>
      <div class='nav-list' style="margin-top:15px;">
        <h3>下面是复选框的demo</h3>
        <router-link class='nav-item' to='/checkbox'>复选框简单使用</router-link>
        <router-link class='nav-item' to='/checkboxGroup'>复选框多选</router-link>
        <router-link class='nav-item' to='/checkboxGroup2'>复选框禁用</router-link>
        <router-link class='nav-item' to='/checkboxGroup3'>复选框全选</router-link>
      </div>
      <div class='nav-list' style="margin-top:15px;">
        <h3>下面是rate评分的demo</h3>
        <router-link class='nav-item' to='/rate'>rate评分</router-link>
        <router-link class='nav-item' to='/rateTips'>rate评分提示</router-link>
        <router-link class='nav-item' to='/rate2'>rate评分禁用</router-link>
      </div>
      <div class='nav-list' style="margin-top:15px;">
        <h3>下面是timeline时间轴</h3>
        <router-link class='nav-item' to='/timeline'>timeline时间轴</router-link>
        <router-link class='nav-item' to='/timeline2'>时间轴2</router-link>
        <router-link class='nav-item' to='/timeline3'>时间轴3</router-link>
      </div>
      <div class='nav-list' style="margin-top:15px;">
        <h3>icon</h3>
        <router-link class='nav-item' to='/icon'>icon DEMO</router-link>
      </div>
      <div class='nav-list' style="margin-top:15px;">
        <h3>button</h3>
        <router-link class='nav-item' to='/button'>button按钮</router-link>
      </div>
      <div class='nav-list' style="margin-top:15px;">
        <h3>button-group</h3>
        <router-link class='nav-item' to='/buttongroup'>buttongroup</router-link>
      </div>
      <div class='nav-list' style="margin-top:15px;">
        <h3>button-group</h3>
        <router-link class='nav-item' to='/dropdown'>buttongroup</router-link>
      </div>
      <div class='nav-list' style="margin-top:15px;">
        <h3>select2</h3>
        <router-link class='nav-item' to='/select2'>select2</router-link>
        <router-link class='nav-item' to='/select2Multiple'>select2Multiple</router-link>
        <router-link class='nav-item' to='/select2Filterable'>select2Filterable</router-link>
      </div>
      <div class='nav-list' style="margin-top:15px;">
        <h3>cityselect省市区</h3>
        <router-link class='nav-item' to='/cityselect'>cityselect</router-link>
      </div>
      <div class='nav-list' style="margin-top:15px;">
        <h3>数字输入框</h3>
        <router-link class='nav-item' to='/inputnumber'>inputnumber</router-link>
      </div>
      <div class='nav-list' style="margin-top:15px;">
        <h3>badge微标</h3>
        <router-link class='nav-item' to='/badge'>badge</router-link>
      </div>
      <div class='nav-list' style="margin-top:15px;">
        <h3>switchable</h3>
        <router-link class='nav-item' to='/switchable'>switchable</router-link>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderTab from './components/header.vue';
export default {
  name: 'app',
  data() {
    return {
      msg: '欢迎学习vue.js',
      single: false
    }
  },
  components: {
    'header-tab': HeaderTab
  }
}
</script>

<style lang='stylus'>
  h2 {
    color: #f00;
    font-weight: normal;
  }
  #container {
    margin-top: 50px;
    color: #2c3e50;
    margin-left: 50px;
    margin-bottom: 50px;
  }
  a {
    color: #42b983;
  }
</style>