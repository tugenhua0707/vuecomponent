
import Vue from 'vue';
import Router from 'vue-router';
import indexPage from './components/header.vue';
import homePage from './views/home.vue';
import aboutPage from './views/about.vue';
import checkbox from './views/checkbox/checkbox.vue';
import checkboxGroup from './views/checkbox/checkbox-group.vue';
import checkboxGroup2 from './views/checkbox/checkbox-group2.vue';
import checkboxGroup3 from './views/checkbox/checkbox-group3.vue';
import rate from './views/rate/rate.vue';
import rateTips from './views/rate/rate1.vue';
import rate2 from './views/rate/rate2.vue';
import timeline from './views/timeline/timeline.vue';
import timeline2 from './views/timeline/timeline2.vue';
import timeline3 from './views/timeline/timeline3.vue';
import icon from './views/icon/icon.vue';
import button from './views/button/button.vue';
import buttongroup from './views/button/buttongroup.vue';
import dropdown from './views/dropdown/dropdown.vue';
import select2 from './views/select2/select2.vue';
import select2Multiple from './views/select2/select2Multiple.vue';
import select2Filterable from './views/select2/select2Filterable.vue';
import cityselect from './views/cityselect/cityselect.vue';
import inputnumber from './views/input-number/input-number.vue';
import stickyTop from './views/sticky/sticky.vue';
import stickyTop2 from './views/sticky/sticky2.vue';
import stickyTop3 from './views/sticky/sticky3.vue';
import badge from './views/badge/badge.vue';
import switchable from './views/switchable/switchable.vue';
import backtop from './views/back-top/back-top.vue';
import table from './views/table/table.vue';
import table2 from './views/table2/table2.vue';
import rightmenu from './views/right-menu/right-menu.vue';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: homePage
    },
    {
      path: '/about',
      component: aboutPage
    },
    {
      path: '/checkbox',
      component: checkbox
    },
    {
      path: '/checkboxGroup',
      component: checkboxGroup
    },
    {
      path: '/checkboxGroup2',
      component: checkboxGroup2
    },
    {
      path: '/checkboxGroup3',
      component: checkboxGroup3
    },
    {
      path: '/rate',
      component: rate
    },
    {
      path: '/rateTips',
      component: rateTips
    },
    {
      path: '/rate2',
      component: rate2
    },
    {
      path: '/timeline',
      component: timeline
    },
    {
      path: '/timeline2',
      component: timeline2
    },
    {
      path: '/timeline3',
      component: timeline3
    },
    {
      path: '/icon',
      component: icon
    },
    {
      path: '/button',
      component: button
    },
    {
      path: '/buttongroup',
      component: buttongroup
    },
    {
      path: '/dropdown',
      component: dropdown
    },
    {
      path: '/select2',
      component: select2
    },
    {
      path: '/select2Multiple',
      component: select2Multiple
    },
    {
      path: '/select2Filterable',
      component: select2Filterable
    },
    {
      path: '/cityselect',
      component: cityselect
    },
    {
      path: '/inputnumber',
      component: inputnumber
    },
    {
      path: '/stickyTop',
      component: stickyTop
    },
    {
      path: '/stickyTop2',
      component: stickyTop2
    },
    {
      path: '/stickyTop3',
      component: stickyTop3
    }, 
    {
      path: '/badge',
      component: badge
    },
    {
      path: '/switchable',
      component: switchable
    },
    {
      path: '/backtop',
      component: backtop
    },
    {
      path: '/table',
      component: table
    },
    {
      path: '/table2',
      component: table2
    },
    {
      path: '/rightmenu',
      component: rightmenu
    }
  ]
})