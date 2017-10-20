
import Vue from 'vue';
import App from './App.vue'
import router from './routes.js'

import './styles/index.less';
import './assets/styles/base.css'
import './assets/styles/checkbox.css'
import './assets/styles/rate.css'
import './assets/styles/timeline.css'
import './assets/styles/icon.css'
import './assets/styles/button.css'
import './assets/styles/dropdown.css';

import './assets/styles/select2.css';
import './assets/styles/cityselect.css';
import './assets/styles/inputnumber.css';
import './assets/styles/sticky.css';
import './assets/styles/badge.css';
import './assets/styles/switchable.css';
import './assets/styles/backtop.css';
import './assets/styles/table.css';
import './assets/styles/right-menu.css';
import iView from './main';

Vue.use(iView);

// 开启错误提示
Vue.config.debug = true;

new Vue({
  router,
  el: '#appContainer',
  render: h => h(App)
})