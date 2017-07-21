<template>
  <div>
    <h4>基本</h4>
    <br><br>
    <tb-button-group>
      <tb-button>取消</tb-button>
      <tb-button type="primary">确定</tb-button>
    </tb-button-group>
    <tb-button-group>
      <tb-button disabled>昨日</tb-button>
      <tb-button disabled>今日</tb-button>
      <tb-button disabled>明日</tb-button>
    </tb-button-group>
    <tb-button-group>
      <tb-button type="primary">L</tb-button>
      <tb-button>M</tb-button>
      <tb-button type="ghost">M</tb-button>
      <tb-button type="dashed">R</tb-button>
    </tb-button-group>
    <br><br>
    <h4>配合图标</h4>
    <br><br>
    <tb-button-group>
      <tb-button type="primary">
        <tb-icon type="chevron-left"></tb-icon>
         前进
      </tb-button>
      <tb-button type="primary">
        后退
        <tb-icon type="chevron-right"></tb-icon>
      </tb-button>
    </tb-button-group>
    <tb-button-group>
      <tb-button type="primary" icon="ios-skipbackward"></tb-button>
      <tb-button type="primary" icon="ios-skipforward"></tb-button>
    </tb-button-group>
    <tb-button-group>
      <tb-button type="ghost" icon="ios-color-wand-outline"></tb-button>
      <tb-button type="ghost" icon="ios-sunny-outline"></tb-button>
      <tb-button type="ghost" icon="ios-crop"></tb-button>
      <tb-button type="ghost" icon="ios-color-filter-outline"></tb-button>
    </tb-button-group>
    <br><br>
    <h4>圆角</h4>
    <br><br>
    <tb-button-group shape="circle">
      <tb-button type="primary">
        <tb-icon type="chevron-left"></tb-icon>
          前进
      </tb-button>
      <tb-button type="primary">
        后退
        <tb-icon type="chevron-right"></tb-icon>
      </tb-button>
    </tb-button-group>
    <tb-button-group shape="circle">
        <tb-button type="primary" icon="ios-skipbackward"></tb-button>
        <tb-button type="primary" icon="ios-skipforward"></tb-button>
    </tb-button-group>
    <tb-button-group shape="circle">
        <tb-button type="ghost" icon="ios-color-wand-outline"></tb-button>
        <tb-button type="ghost" icon="ios-sunny-outline"></tb-button>
        <tb-button type="ghost" icon="ios-crop"></tb-button>
        <tb-button type="ghost" icon="ios-color-filter-outline"></tb-button>
    </tb-button-group>
    <br><br>
    <h4>尺寸</h4>
    <br><br>
    <tb-button-group size="large">
        <tb-button type="ghost">Large</tb-button>
        <tb-button type="ghost">Large</tb-button>
    </tb-button-group>
    <tb-button-group>
        <tb-button type="ghost">Default</tb-button>
        <tb-button type="ghost">Default</tb-button>
    </tb-button-group>
    <tb-button-group size="small">
        <tb-button type="ghost">Small</tb-button>
        <tb-button type="ghost">Small</tb-button>
    </tb-button-group>
    <br><br>
    <tb-button-group size="large" shape="circle">
        <tb-button type="ghost">Large</tb-button>
        <tb-button type="ghost">Large</tb-button>
    </tb-button-group>
    <tb-button-group shape="circle">
        <tb-button type="ghost">Default</tb-button>
        <tb-button type="ghost">Default</tb-button>
    </tb-button-group>
    <tb-button-group size="small" shape="circle">
        <tb-button type="ghost">Small</tb-button>
        <tb-button type="ghost">Small</tb-button>
    </tb-button-group>

    <tb-button-group vertical>
        <tb-button type="ghost" icon="social-facebook"></tb-button>
        <tb-button type="ghost" icon="social-twitter"></tb-button>
        <tb-button type="ghost" icon="social-googleplus"></tb-button>
        <tb-button type="ghost" icon="social-tumblr"></tb-button>
    </tb-button-group>
  </div>
</template>