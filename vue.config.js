module.exports = {
  outputDir: 'www',
  productionSourceMap: true,
  publicPath: process.env.VUE_APP_PATH_TYPE === 'dev' ? '/' : './',
  assetsDir: process.env.VUE_APP_PATH_TYPE === 'dev' ? '' : './',
  parallel: true,
  pages: {
    index: {
      // page 的入口
      entry: process.env.VUE_APP_NATIVE_ENV ? 'src/shell-index/main.js' : 'src/main.js',
      template: 'src/index.html'
    }

  },
  configureWebpack: {
    devtool: 'source-map',
    output: {
      filename: '[name].[hash:8].js'
    }
  },
  devServer: {
    open: true,
    proxy: {
      // change xxx-api/login => /mock-api/v1/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_DEV_URL]: {
        target: process.env.VUE_APP_PROXY_TARGET || 'http://localhost',
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          ['^' + process.env.VUE_APP_DEV_URL]: ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      // 设置css全局变量
      scss: {
        prependData: `
          @import "@/styles/variables.scss";
          @import "@/styles/mixin.scss";
          `
      },
      less: {
        modifyVars: { // 自定义vant 主题
          // 'blue': '#409EFF',
          // 'green': '#67C23A',
          // 'button-border-radius': '10px',
          'nav-bar-background-color': '#1989fa',
          'nav-bar-arrow-size': '18px',
          'nav-bar-icon-color': '#fff',
          'nav-bar-text-color': '#fff',
          'nav-bar-title-text-color': '#fff',
          'tab-active-text-color': '#1989fa',
          'tabs-bottom-bar-color': '#1989fa',
          'cell-border-color': '#c8c7cc'
        }
      }
    }
  }
}
