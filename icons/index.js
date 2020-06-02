var WebpackIconfontPluginNodejs = require('webpack-iconfont-plugin-nodejs')
var path = require('path')
function resolve(dir) {
  return path.join(__dirname, '../', dir)
}
var dir = resolve('src')
var options = {
  fontName: 'my-icon',
  svgs: 'icons/svg2font/*.svg',
  fontsOutput: path.join(dir, 'assets/fonts/'),
  cssOutput: path.join(dir, 'styles/my-icon.css'),
  jsOutput: 'icons/example/fonts.js',
  htmlOutput: 'icons/example/font-preview.html',
  formats: ['svg', 'ttf'],
  // formats: ['ttf', 'eot', 'woff'],
  cssPrefix: 'my-icon'
}
new WebpackIconfontPluginNodejs(options).build()
