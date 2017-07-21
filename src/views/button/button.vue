<template>
  <div>
    <tb-button>Default</tb-button>
    <tb-button type="primary">Primary</tb-button>
    <tb-button type="ghost">Ghost</tb-button>
    <tb-button type="dashed">Dashed</tb-button>
    <tb-button type="text">Text</tb-button>
    <br><br>
    <tb-button type="info">信息按钮</tb-button>
    <tb-button type="success">成功按钮</tb-button>
    <tb-button type="warning">警告按钮</tb-button>
    <tb-button type="error">错误按钮</tb-button>

    <tb-button type="primary" shape="circle" icon="ios-search"></tb-button>
    <tb-button type="primary" icon="ios-search">搜索</tb-button>
    <tb-button type="primary" shape="circle" icon="ios-search">搜索</tb-button>
    <tb-button type="primary" shape="circle">圆角按钮</tb-button>
    <br><br>
    <tb-button type="ghost" shape="circle" icon="ios-search"></tb-button>
    <tb-button type="ghost" icon="ios-search">搜索</tb-button>
    <tb-button type="ghost" shape="circle" icon="ios-search">搜索</tb-button>
    <tb-button type="ghost" shape="circle">圆角按钮</tb-button>

    <tb-button type="primary" size="large">Large</tb-button>
    <tb-button type="primary">Default</tb-button>
    <tb-button type="primary" size="small">Small</tb-button>
    <br><br>
    <tb-button type="primary" shape="circle" size="large">Large</tb-button>
    <tb-button type="primary" shape="circle">Default</tb-button>
    <tb-button type="primary" shape="circle" size="small">Small</tb-button>

    <tb-button type="success" long>确认提交</tb-button>
    <br><br>
    <tb-button type="error" long>确认删除</tb-button>

    <tb-button>Default</tb-button>
    <tb-button disabled>Default(Disabled)</tb-button>
    <br>
    <tb-button type="primary">Primary</tb-button>
    <tb-button type="primary" disabled>Primary(Disabled)</tb-button>
    <br>
    <tb-button type="ghost">Ghost</tb-button>
    <tb-button type="ghost" disabled>Ghost(Disabled)</tb-button>
    <br>
    <tb-button type="dashed">Dashed</tb-button>
    <tb-button type="dashed" disabled>Dashed(Disabled)</tb-button>
    <br>
    <tb-button type="text">Text</tb-button>
    <tb-button type="text" disabled>Text(Disabled)</tb-button>

    <tb-button type="primary" loading>Loading...</tb-button>
    <tb-button type="primary" :loading="loading" @click="toLoading">
      <span v-if="!loading">Click me!</span>
      <span v-else>Loading...</span>
    </tb-button>
    <tb-button type="primary" :loading="loading2" icon="checkmark-round" @click="toLoading2">
      <span v-if="!loading2">Click me!</span>
      <span v-else>Loading...</span>
    </tb-button>
  </div>
</template>
<script>
    export default {
      data () {
        return {
          loading: false,
          loading2: false
        }
      },
      methods: {
        toLoading () {
          this.loading = true;
        },
        toLoading2 () {
          this.loading2 = true;
        }
      }
    }
</script>