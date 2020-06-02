// 异常捕获插件
// import wa from '@webank/wa-sdk'
export default {
  install(Vue) {
    // wa.init({
    //   appId: 'aisp',
    //   account: 'TrendOS',
    //   id: 0, // 业务ID
    //   pageId: 0, // 页面ID
    //   autoReport: true, // 是否开启自动上报，默认开启
    //   pageTime: false, // 是否统计页面加载时间，默认关闭
    //   errorCatch: true, // 是否启用错误捕获，默认开启
    //   // env: 'release' // release为生产，test为测试
    //   env: process.env.NODE_ENV === 'production' ? 'release' : 'test' // release为生产，test为测试
    //   // host: 'http://adm.webank.io/rcrm-codcs/wb-rcrm-codcs?' // 设置上报域名
    // })
    // Vue.$wa = wa

    // Vue.mixin({
    //   created() {
    //     if (!this.$wa) {
    //       this.$wa = wa
    //     }
    //   }
    // })

    Vue.config.errorHandler = function(err, vm, info) {
      console.error(err)
      // wa.errorReport(err)
    }
    window.addEventListener('unhandledrejection', function(e) {
      e.preventDefault()
      console.error('捕获到promise reject：', e)
      // wa.errorReport(e)
      return true
    })
  }
}
