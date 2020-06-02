# vue-mobile
vue hybrid APP开发脚手架
### 说明
```
集成了Vant2 使用参考  https://youzan.github.io/vant/#/zh-CN/intro
bootstrap4 工具类部分 使用参考 https://v4.bootcss.com/docs/4.0/utilities/borders/
mockjs  http://mockjs.com/examples.html
支持自定义样式
```
### 安装
```
npm install

添加ios平台
npx cap add ios
npx cap sync

添加Android平台
npx cap add android
npx cap sync
```

### 使用开发环境运行
```
npm run serve
```
### 使用mock模拟数据
```
npm run mock

```
### 使用生产环境编译打包
```
 npm run build
```
### 使用测试环境编译打包
```
npm run build:dev
```
### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### 单元测试
```
npm run test:unit
```
### 生成图片和启动页
```
npm run resources
```
### svg转字体图标
```
把svg图片放到 icons/svg2font目录下
npm run svg2font
```
### 打APP安装包
```
1.拷贝www 目录到打包目录
npx cap copy
2.android打包
npx cap open android 打开Android Studio编译打包
3.ios打包
npx cap open ios 打开Xcode编译打包
```
### 修改测试和生产环境服务器地址
```
在 src/utils/request.js
if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://host/production/api'
} else if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://10.107.117.81:8081/scvmadm/api'
}

分别在生产和开发环境中设置BASE_URL的值
```
### 自定义web打包配置参考
See [Configuration Reference](https://cli.vuejs.org/config/).

### 目录说明
```
android 原生android平台
ios 原生ios平台
public  不经webpack处理，直接拷贝到www目录，用来存放静态文件
resources 资源文件，APP图片和启动页
src 源代码
    api   存放接口信息
    assets 存放图片，字体等资源文件
    components 存放全局组件
    directives  存放全局指令
    mixins  存放全局或公共混合
    mock  mock数据，APP内开启
    native-plugins 存放原生插件js接口
    vue-plugins 存放vue 插件
    router  路由
    storage 持久化存储
    store  全局状态数据
    styles 全局样式
    utils 工具函数
    views  视图
tests   单元测试代码
www     打包输出目录， 运行cordova prepare 自动将www目录拷贝到各个原生平台中
capacitor.config.json  capacitor配置
vue.config.js 项目打包配置
```
### Capacitor 使用
[Capacitor 官方文档](https://capacitor.ionicframework.com/docs/getting-started) <br>

### 自定义Vant 主题
[vant 主题定义](https://youzan.github.io/vant/#/zh-CN/theme) <br>
[vant 样式变量](https://github.com/youzan/vant/blob/dev/packages/style/var.less)<br>

### vant 主题变量
```
// Color variables
@black: #000;
@white: #fff;
@red: #f44;
@blue: #1989fa;
@orange: #ff976a;
@orange-dark: #ed6a0c;
@orange-light: #fffbe8;
@green: #07c160;
@gray: #c8c9cc;
@gray-light: #e5e5e5;
@gray-darker: #7d7e80;
@gray-dark: #969799;

// Default colors
@text-color: #323233;
@border-color: #ebedf0;
@active-color: #f2f3f5;
@background-color: #f8f8f8;
@background-color-light: #fafafa;

// ActionSheet
@action-sheet-max-height: 90%;
@action-sheet-header-height: 44px;
@action-sheet-header-font-size: 16px;
@action-sheet-item-height: 50px;
@action-sheet-item-background: @white;
@action-sheet-item-font-size: 16px;
@action-sheet-item-text-color: @text-color;
@action-sheet-subname-color: @gray-darker;
@action-sheet-subname-font-size: 12px;
@action-sheet-close-icon-size: 18px;
@action-sheet-close-icon-color: @gray-dark;

// AddressEdit
@address-edit-buttons-padding: 30px 15px;
@address-edit-button-margin-bottom: 15px;
@address-edit-detail-finish-color: @blue;
@address-edit-detail-fnish-font-size: 12px;

// AddressList
@address-list-disabled-text-color: @gray-dark;
@address-list-disabled-text-font-size: 12px;
@address-list-disabled-text-line-height: 30px;
@address-list-add-button-z-index: 9999;
@address-list-item-padding: 15px;
@address-list-item-text-color: @gray-darker;
@address-list-item-disabled-text-color: @gray-dark;
@address-list-item-font-size: 12px;
@address-list-item-line-height: 16px;
@address-list-edit-icon-size: 16px;

// Button
@button-mini-height: 22px;
@button-mini-min-width: 50px;
@button-mini-font-size: 10px;
@button-mini-line-height: 20px;
@button-small-height: 30px;
@button-small-font-size: 12px;
@button-small-min-width: 60px;
@button-small-line-height: 28px;
@button-normal-font-size: 14px;
@button-large-height: 50px;
@button-large-line-height: 48px;
@button-default-height: 44px;
@button-default-line-height: 42px;
@button-default-font-size: 16px;
@button-default-color: @text-color;
@button-default-background-color: @white;
@button-default-border-color: @border-color;
@button-primary-color: @white;
@button-primary-background-color: @green;
@button-primary-border-color: @green;
@button-info-color: @white;
@button-info-background-color: @blue;
@button-info-border-color: @blue;
@button-danger-color: @white;
@button-danger-background-color: @red;
@button-danger-border-color: @red;
@button-warning-color: @white;
@button-warning-background-color: @orange;
@button-warning-border-color: @orange;
@button-border-width: 1px;
@button-border-radius: 2px;
@button-round-border-radius: 10em;
@button-plain-background-color: @white;
@button-disabled-opacity: .5;

// Card
@card-padding: 5px 15px;
@card-font-size: 12px;
@card-text-color: @text-color;
@card-background-color: @background-color-light;
@card-thumb-size: 90px;
@card-title-line-height: 16px;
@card-desc-color: @gray-darker;
@card-desc-line-height: 20px;
@card-price-color: @red;
@card-origin-price-color: @gray-darker;
@card-origin-price-font-size: 10px;

// Cell
@cell-font-size: 14px;
@cell-line-height: 24px;
@cell-vertical-padding: 10px;
@cell-horizontal-padding: 15px;
@cell-text-color: @text-color;
@cell-background-color: @white;
@cell-border-color: @border-color;
@cell-active-color: @active-color;
@cell-required-color: @red;
@cell-label-color: @gray-dark;
@cell-label-font-size: 12px;
@cell-label-line-height: 18px;
@cell-label-margin-top: 3px;
@cell-value-color: @gray-dark;
@cell-icon-size: 16px;
@cell-right-icon-color: @gray-dark;
@cell-large-vertical-padding: 12px;
@cell-large-title-font-size: 16px;
@cell-large-label-font-size: 14px;

// CellGroup
@cell-group-background-color: @white;
@cell-group-title-color: @gray-dark;
@cell-group-title-padding: 15px 15px 5px;
@cell-group-title-font-size: 14px;
@cell-group-title-line-height: 16px;

// Checkbox
@checkbox-size: 20px;
@checkbox-border-color: @gray-light;
@checkbox-transition-duration: .2s;
@checkbox-label-margin: 10px;
@checkbox-label-color: @text-color;
@checkbox-checked-icon-color: @blue;
@checkbox-disabled-icon-color: @gray;
@checkbox-disabled-label-color: @gray;
@checkbox-disabled-background-color: @border-color;

// Circle
@circle-text-color: @text-color;

// Collapse
@collapse-item-transition-duration: .3s;
@collapse-item-content-padding: 15px;
@collapse-item-content-font-size: 13px;
@collapse-item-content-line-height: 1.5;
@collapse-item-content-text-color: @gray-dark;
@collapse-item-content-background-color: @white;
@collapse-item-title-disabled-color: @gray;

// ContactCard
@contact-card-padding: 15px;
@contact-card-add-icon-size: 40px;
@contact-card-add-icon-color: @blue;
@contact-card-value-line-height: 20px;

// ContactEdit
@contact-edit-buttons-padding: 30px 15px;
@contact-edit-button-margin-bottom: 15px;
@contact-edit-field-label-width: 65px;

// ContactList
@contact-list-edit-icon-size: 16px;
@contact-list-add-button-z-index: 9999;
@contact-list-item-padding: 15px;

// Coupon
@coupon-margin: 0 15px 15px;
@coupon-content-height: 100px;
@coupon-content-padding: 24px 0 0 15px;
@coupon-background-color: @white;
@coupon-active-background-color: @active-color;
@coupon-border-radius: 4px;
@coupon-box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
@coupon-head-width: 85px;
@coupon-amount-color: @red;
@coupon-amount-font-size: 24px;
@coupon-currency-font-size: 50%;
@coupon-name-font-size: 16px;
@coupon-disabled-text-color: @gray-dark;
@coupon-description-padding: 7px 15px;
@coupon-description-background-color: @background-color-light;
@coupon-description-border-color: @border-color;

// CouponCell
@coupon-cell-selected-text-color: @text-color;

// CouponList
@coupon-list-background-color: @background-color;
@coupon-list-field-padding: 7px 15px;
@coupon-list-exchange-button-height: 32px;
@coupon-list-empty-image-size: 200px;
@coupon-list-empty-tip-color: @gray-dark;
@coupon-list-empty-tip-font-size: 14px;
@coupon-list-empty-tip-line-height: 20px;

// Dialog
@dialog-width: 85%;
@dialog-font-size: 16px;
@dialog-transition: .3s;
@dialog-border-radius: 4px;
@dialog-background-color: @white;
@dialog-header-font-weight: 500;
@dialog-header-padding-top: 25px;
@dialog-header-isolated-padding: 25px 0;
@dialog-message-padding: 25px;
@dialog-message-font-size: 14px;
@dialog-message-line-height: 1.5;
@dialog-message-max-height: 60vh;
@dialog-has-title-message-text-color: @gray-darker;
@dialog-has-title-message-padding-top: 12px;
@dialog-confirm-button-text-color: @blue;

// DropdownMenu
@dropdown-menu-height: 50px;
@dropdown-menu-background-color: @white;
@dropdown-menu-title-font-size: 15px;

// Field
@field-label-width: 90px;
@field-input-text-color: @text-color;
@field-input-error-text-color: @red;
@field-input-disabled-text-color: @gray-dark;
@field-placeholder-text-color: @gray-dark;
@field-icon-size: 16px;
@field-clear-icon-size: 16px;
@field-clear-icon-color: @gray;
@field-right-icon-color: @gray-dark;
@field-error-message-color: @red;
@field-error-message-text-color: 12px;
@field-text-area-min-height: 60px;

// GridItem
@grid-item-content-padding: 15px 10px;
@grid-item-content-background-color: @white;
@grid-item-content-active-color: @active-color;
@grid-item-icon-size: 28px;
@grid-item-text-color: @gray-darker;
@grid-item-text-font-size: 12px;

// GoodsAction
@goods-action-background-color: @white;
@goods-action-icon-width: 15%;
@goods-action-icon-height: 50px;
@goods-action-icon-color: @gray-darker;
@goods-action-icon-size: 20px;
@goods-action-icon-font-size: 10px;
@goods-action-icon-active-color: @active-color;

// IndexAnchor
@index-anchor-padding: 0 15px;
@index-anchor-text-color: @text-color;
@index-anchor-font-weight: 500;
@index-anchor-font-size: 14px;
@index-anchor-line-height: 32px;
@index-anchor-background-color: transparent;
@index-anchor-sticky-background-color: @white;

// IndexBar
@index-bar-index-font-size: 10px;
@index-bar-index-line-height: 14px;

// Info
@info-size: 16px;
@info-color: @white;
@info-padding: 0 3px;
@info-font-size: 12px;
@info-font-weight: 500;
@info-border-width: 1px;
@info-background-color: @red;
@info-font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;

// Image
@image-placeholder-text-color: @gray-dark;
@image-placeholder-font-size: 14px;
@image-placeholder-background-color: @background-color;

// ImagePreview
@image-preview-index-text-color: @white;
@image-preview-index-font-size: 14px;
@image-preview-overlay-background-color: rgba(0, 0, 0, .9);

// List
@list-icon-margin-right: 5px;
@list-text-color: @gray-dark;
@list-text-font-size: 13px;
@list-text-line-height: 50px;

// Loading
@loading-text-color: @gray-dark;
@loading-text-font-size: 14px;

// NavBar
@nav-bar-height: 46px;
@nav-bar-background-color: @white;
@nav-bar-arrow-size: 16px;
@nav-bar-icon-color: @blue;
@nav-bar-text-color: @blue;
@nav-bar-title-font-size: 16px;
@nav-bar-title-text-color: @text-color;

// NoticeBar
@notice-bar-height: 40px;
@notice-bar-padding: 0 15px;
@notice-bar-wrapable-padding: 8px 15px;
@notice-bar-text-color: @orange-dark;
@notice-bar-font-size: 14px;
@notice-bar-line-height: 24px;
@notice-bar-background-color: @orange-light;
@notice-bar-icon-size: 16px;
@notice-bar-icon-min-width: 22px;

// Notify
@notify-padding: 6px 15px;
@notify-font-size: 14px;
@notify-line-height: 20px;

// NumberKeyboard
@number-keyboard-background-color: @white;
@number-keyboard-key-height: 54px;
@number-keyboard-key-background: #ebedf0;
@number-keyboard-key-font-size: 24px;
@number-keyboard-key-active-color: @active-color;
@number-keyboard-delete-font-size: 16px;
@number-keyboard-title-color: @gray-darker;
@number-keyboard-title-height: 30px;
@number-keyboard-title-font-size: 14px;
@number-keyboard-close-padding: 0 15px;
@number-keyboard-close-color: @blue;
@number-keyboard-close-font-size: 14px;
@number-keyboard-button-text-color: @white;
@number-keyboard-button-background-color: @blue;

// Overlay
@overlay-background-color: rgba(0, 0, 0, 0.7);

// Pagination
@pagination-height: 40px;
@pagination-font-size: 14px;
@pagination-item-width: 36px;
@pagination-item-default-color: @blue;
@pagination-item-disabled-color: @gray-darker;
@pagination-item-disabled-background-color: @background-color;
@pagination-background-color: @white;
@pagination-desc-color: @gray-darker;
@pagination-disabled-opacity: 0.6;

// Panel
@panel-background-color: @white;
@panel-header-value-color: @red;
@panel-footer-padding: 10px 15px;

// PasswordInput
@password-input-height: 50px;
@password-input-margin: 0 15px;
@password-input-font-size: 20px;
@password-input-border-radius: 6px;
@password-input-background-color: @white;
@password-input-info-color: @gray-dark;
@password-input-info-font-size: 14px;
@password-input-error-info-color: @red;
@password-input-dot-size: 10px;
@password-input-dot-color: @black;

// Picker
@picker-background-color: @white;
@picker-toolbar-height: 44px;
@picker-title-font-size: 16px;
@picker-action-padding: 0 15px;
@picker-action-font-size: 14px;
@picker-action-text-color: @blue;
@picker-action-active-color: @active-color;
@picker-option-font-size: 16px;
@picker-option-text-color: @black;
@picker-option-disabled-opacity: .3;

// Popup
@popup-background-color: @white;
@popup-transition: .3s ease-out;

// Progress
@progress-height: 4px;
@progress-background-color: @gray-light;
@progress-pivot-padding: 0 5px;
@progress-pivot-font-size: 10px;
@progress-pivot-line-height: 1.6;
@progress-pivot-background-color: @gray-light;

// PullRefresh
@pull-refresh-head-height: 50px;
@pull-refresh-head-font-size: 14px;
@pull-refresh-head-text-color: @gray-dark;

// Radio
@radio-size: 20px;
@radio-border-color: @gray-light;
@radio-transition-duration: .2s;
@radio-label-margin: 10px;
@radio-label-color: @text-color;
@radio-checked-icon-color: @blue;
@radio-disabled-icon-color: @gray;
@radio-disabled-label-color: @gray;
@radio-disabled-background-color: @border-color;

// Rate
@rate-icon-size: 20px;
@rate-icon-gutter: 4px;

// Search
@search-padding: 10px 16px;
@search-background-color: #f7f8fA;
@search-input-height: 34px;
@search-label-padding: 0 5px;
@search-label-color: @text-color;
@search-label-font-size: 14px;
@search-left-icon-color: @gray-dark;
@search-action-padding: 0 10px;
@search-action-text-color: @text-color;
@search-action-font-size: 14px;

// Sidebar
@sidebar-width: 85px;

// SidebarItem
@sidebar-font-size: 14px;
@sidebar-line-height: 1.4;
@sidebar-text-color: @gray-darker;
@sidebar-padding: 20px 12px 20px 9px;
@sidebar-active-color: @active-color;
@sidebar-background-color: @background-color;
@sidebar-selected-font-weight: 500;
@sidebar-selected-text-color: @text-color;
@sidebar-selected-border-color: @red;
@sidebar-selected-background-color: @white;

// Skeleton
@skeleton-row-height: 16px;
@skeleton-row-background-color: @active-color;
@skeleton-row-margin-top: 12px;
@skeleton-avatar-background-color: @active-color;
@skeleton-animation-duration: 1.2s;

// Slider
@slider-active-background-color: @blue;
@slider-inactive-background-color: @gray-light;
@slider-disabled-opacity: .3;
@slider-button-width: 20px;
@slider-button-height: 20px;
@slider-button-border-radius: 50%;
@slider-button-background-color: @white;
@slider-button-box-shadow: 0 1px 2px rgba(0, 0, 0, .5);

// Step
@step-text-color: @gray-dark;
@step-process-text-color: @text-color;
@step-font-size: 14px;
@step-line-color: @border-color;
@step-finish-line-color: @green;
@step-finish-text-color: @text-color;
@step-icon-size: 12px;
@step-circle-size: 5px;
@step-circle-color: @gray-dark;
@step-horizontal-title-font-size: 12px;

// Steps
@steps-background-color: @white;

// Stepper
@stepper-active-color: #e8e8e8;
@stepper-background-color: @active-color;
@stepper-button-icon-color: @text-color;
@stepper-button-disabled-color: #f7f8fa;
@stepper-button-disabled-icon-color: @gray;
@stepper-input-width: 32px;
@stepper-input-height: 28px;
@stepper-input-font-size: 14px;
@stepper-input-text-color: @text-color;
@stepper-input-disabled-text-color: @gray;
@stepper-input-disabled-background-color: @active-color;
@stepper-border-radius: 4px;

// SubmitBar
@submit-bar-height: 50px;
@submit-bar-z-index: 100;
@submit-bar-background-color: @white;
@submit-bar-button-width: 110px;
@submit-bar-price-color: @red;
@submit-bar-price-font-size: 18px;
@submit-bar-currency-font-size: 14px;
@submit-bar-text-color: @text-color;
@submit-bar-text-font-size: 14px;
@submit-bar-tip-padding: 10px;
@submit-bar-tip-font-size: 12px;
@submit-bar-tip-line-height: 1.5;
@submit-bar-tip-color: #f56723;
@submit-bar-tip-background-color: #fff7cc;
@submit-bar-tip-icon-size: 12px;

// Swipe
@swipe-indicator-size: 6px;
@swipe-indicator-margin: 10px;
@swipe-indicator-active-opacity: 1;
@swipe-indicator-inactive-opacity: .3;
@swipe-indicator-active-background-color: @blue;
@swipe-indicator-inactive-background-color: @border-color;

// Switch
@switch-width: 2em;
@switch-height: 1em;
@switch-node-size: 1em;
@switch-node-z-index: 1;
@switch-node-background-color: @white;
@switch-node-box-shadow: 0 3px 1px 0 rgba(0, 0, 0, .05), 0 2px 2px 0 rgba(0, 0, 0, .1), 0 3px 3px 0 rgba(0, 0, 0, .05);
@switch-background-color: @white;
@switch-on-background-color: @blue;
@switch-transition-duration: .3s;
@switch-disabled-opacity: .4;
@switch-border: 1px solid rgba(0, 0, 0, .1);

// SwitchCell
@switch-cell-padding-top: @cell-vertical-padding - 1px;
@switch-cell-padding-bottom: @cell-vertical-padding -1px;
@switch-cell-large-padding-top: @cell-large-vertical-padding - 1px;
@switch-cell-large-padding-bottom: @cell-large-vertical-padding - 1px;

// Tabbar
@tabbar-height: 50px;
@tabbar-background-color: @white;

// TabbarItem
@tabbar-item-font-size: 12px;
@tabbar-item-text-color: @gray-darker;
@tabbar-item-active-color: @blue;
@tabbar-item-line-height: 1;
@tabbar-item-icon-size: 18px;
@tabbar-item-margin-bottom: 5px;

// Tab
@tab-text-color: @gray-darker;
@tab-active-text-color: @text-color;
@tab-disabled-text-color: @gray;
@tab-font-size: 14px;

// Tabs
@tabs-default-color: @red;
@tabs-line-height: 44px;
@tabs-card-height: 30px;
@tabs-nav-background-color: @white;
@tabs-bottom-bar-height: 3px;
@tabs-bottom-bar-color: @tabs-default-color;

// Tag
@tag-padding: .2em .5em;
@tag-font-size: 10px;
@tag-medium-font-size: 12px;
@tag-large-font-size: 14px;
@tag-text-color: @white;
@tag-border-radius: .2em;
@tag-round-border-radius: .8em;

// Toast
@toast-max-width: 70%;
@toast-font-size: 14px;
@toast-text-color: @white;
@toast-line-height: 20px;
@toast-border-radius: 4px;
@toast-background-color: rgba(@text-color, .88);
@toast-icon-size: 40px;
@toast-text-min-width: 96px;
@toast-text-padding: 8px 12px;
@toast-default-padding: 15px;
@toast-default-width: 90px;
@toast-default-min-height: 90px;
@toast-position-top-distance: 50px;
@toast-position-bottom-distance: 50px;

// TreeSelect
@tree-select-font-size: 14px;
@tree-select-nav-background-color: @background-color-light;
@tree-select-content-background-color: @white;
@tree-select-nav-item-padding: 0 9px 0 12px;
@tree-select-nav-item-active-border-color: @red;
@tree-select-nav-item-active-background-color: @white;
@tree-select-nav-item-disabled-color: @gray-dark;
@tree-select-item-height: 44px;
@tree-select-item-active-color: @red;
@tree-select-item-disabled-color: @gray;

// Uploader
@uploader-size: 80px;
@uploader-icon-size: 24px;
@uploader-icon-color: @gray-dark;
@uploader-text-color: @gray-dark;
@uploader-text-font-size: 12px;
@uploader-upload-border-color: @gray-light;
@uploader-upload-background-color: @white;
@uploader-delete-color: @white;
@uploader-delete-background-color: rgba(0, 0, 0, .45);
```