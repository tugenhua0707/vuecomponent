<template>
  <div>
    <tb-dropdown>
        <a href="javascript:void(0)">
            下拉菜单
            <tb-icon type="arrow-down-b"></tb-icon>
        </a>
        <tb-dropdown-menu slot="list">
            <tb-dropdown-item>前端开发</tb-dropdown-item>
            <tb-dropdown-item>java开发</tb-dropdown-item>
            <tb-dropdown-item disabled>测试</tb-dropdown-item>
            <tb-dropdown-item>产品</tb-dropdown-item>
            <tb-dropdown-item divided>IOS</tb-dropdown-item>
        </tb-dropdown-menu>
    </tb-dropdown>


    <tb-dropdown style="margin-left: 20px">
        <tb-button type="primary">
            下拉菜单
            <tb-icon type="arrow-down-b"></tb-icon>
        </tb-button>
        <tb-dropdown-menu slot="list">
            <tb-dropdown-item>测试1</tb-dropdown-item>
            <tb-dropdown-item>测试2</tb-dropdown-item>
            <tb-dropdown-item disabled>测试3</tb-dropdown-item>
            <tb-dropdown-item>测试4</tb-dropdown-item>
            <tb-dropdown-item divided>测试5</tb-dropdown-item>
        </tb-dropdown-menu>
    </tb-dropdown>
  </div>
</template>