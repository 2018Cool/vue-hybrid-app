### svg 图片压缩优化
把需要优化的svg图片放到svg目录里
npm run svgo
### svg转字体图标
把需要转换为字体的svg图片放到svg2font目录下
运行 npm run svg2font
windows环境下运行需要修改 src/styles/my-icon.css中字体引入路径，把‘\’改为‘/’
使用自定义字体图片 name与svg名称一致
<van-icon class-prefix="my-icon" name="upload"  />