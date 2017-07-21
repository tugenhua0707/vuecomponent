
<template>
  <tb-select2 v-model="select2Value" style="width:200px" @change="changeFunc" multiple>
    <tb-select2-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</tb-select2-option>
  </tb-select2>
</template>

<script>
  export default {
    data () {
      return {
        cityList: [
          {
            value: 'beijing',
            label: '北京市'
          },
          {
            value: 'shanghai',
            label: '上海市'
          },
          {
            value: 'shenzhen',
            label: '深圳市'
          },
          {
            value: 'hangzhou',
            label: '杭州市'
          },
          {
            value: 'nanjing',
            label: '南京市'
          },
          {
            value: 'chongqing',
            label: '重庆市'
          }
        ],
        select2Value: [],
        changeFunc(obj) {
          console.log(obj);
        }
      }
    }
  }
</script>