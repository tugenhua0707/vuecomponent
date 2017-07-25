
<template>
  <div>
<!--
    <div :class="classes" @change="provFunc" v-model="provValue" @click="toggleMenu">
      <div :class="[prefixCls + '-selection']">
        <span :class="[prefixCls + '-selected-value']" v-show="!showPlaceholder">{{ selectedSingle }}</span>
        <i class="tb-icon tb-icon-caret-down tb-select2-arrow" v-show="!visible"></i>
        <i class="tb-icon tb-icon-caret-up tb-select2-arrow" v-show="visible"></i>
      </div>
      <transition :name="transitionName">
        <div :class="[prefixCls + '-dropdown']">
          <ul :class="[prefixCls + '-dropdown-list']">
            <li>请选择</li>
            <li v-for="item in provinces" :value="item.code" :key="item.code">{{ item.name }}</li>
          </ul>
        </div>
      </transition>
    </div>

    <div :class="classes" @change="cityFunc" v-model="cityValue" @click="toggleMenu">
      <div :class="[prefixCls + '-selection']">
        <span :class="[prefixCls + '-selected-value']" v-show="!showPlaceholder">{{ selectedSingle }}</span>
        <i class="tb-icon tb-icon-caret-down tb-select2-arrow" v-show="!visible"></i>
        <i class="tb-icon tb-icon-caret-up tb-select2-arrow" v-show="visible"></i>
      </div>
      <transition :name="transitionName">
        <div :class="[prefixCls + '-dropdown']">
          <ul :class="[prefixCls + '-dropdown-list']">
            <li>请选择</li>
            <li v-for="item in citys" :value="item.code" :key="item.code">{{ item.name }}</li>
          </ul>
        </div>
      </transition>
    </div>

    <div :class="classes" @change="areaFunc" v-model="areaValue" @click="toggleMenu">
      <div :class="[prefixCls + '-selection']">
        <span :class="[prefixCls + '-selected-value']" v-show="!showPlaceholder">{{ selectedSingle }}</span>
        <i class="tb-icon tb-icon-caret-down tb-select2-arrow" v-show="!visible"></i>
        <i class="tb-icon tb-icon-caret-up tb-select2-arrow" v-show="visible"></i>
      </div>
      <transition :name="transitionName">
        <div :class="[prefixCls + '-dropdown']">
          <ul :class="[prefixCls + '-dropdown-list']">
            <li>请选择</li>
            <li v-for="item in areas" :value="item.code" :key="item.code">{{ item.name }}</li>
          </ul>
        </div>
      </transition>
    </div>
-->
  </div>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  import citydata from './cityData/citydata';

  const prefixCls = "tb-select2";
  export default {
    name: 'TbCitySelect',
    component: 'TbCitySelect',
    mixins: [ Emitter ],
    props: {
      provCode: {
        type: [String, Number],
        default: ''
      },
      cityCode: {
        type: [String, Number],
        default: ''
      },
      areaCode: {
        type: [String, Number],
        default: ''
      },
      isSelectFirst: {
        type: Boolean,
        // 默认为true， 选中第一项, 如果页面有指定省市区项时，就显示指定项，如果为false，就选中 请选择
        default: false
      },
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-disabled`]: this.disabled,
            [`${prefixCls}-visible`]: this.visible
          }
        ]
      },
    },
    mounted () {
      const citydatas = citydata;
      // 渲染省数据
      citydatas.forEach((item, i) => {
        this.provinces.push({
          name: item.name,
          code: item.code
        });
      });
    },
    watch: {
      
    },
    data () {
      return {
        provValue: '',
        cityValue: '',
        areaValue: '',
        provinces: [],               // 保存省数据
        citys: [],                   // 保存市数据
        areas: [],                   // 保存区数据
      }
    },
    methods: {
      
    }
  }
</script>