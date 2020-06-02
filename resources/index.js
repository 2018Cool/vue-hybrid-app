const Run = require('cordova-res')
const fs = require('fs')
const path = require('path')

function resolve() {
  return path.join(__dirname, '../')
}
const dir = resolve()

const iconPath = path.join(dir, 'resources/icon.png') // icon 路径
const splashPath = path.join(dir, 'resources/splash.png') // spalsh路径
const foregroundPath = path.join(dir, 'resources/icon-foreground.png') // Android 自适应前景图标
const backgroundPath = path.join(dir, 'resources/icon-background.png') // Android 自适应背景图标，可以使用16进制颜色
const androidPath = path.join(dir, 'resources/android') // Android 存放临时资源文件路径
const iosPath = path.join(dir, 'resources/ios') // ios 存放临时资源文件路径
const androidResPath = path.join(dir, 'android/app/src/main/res') // Android 资源文件路径
const iosResPath = path.join(dir, 'ios/App/App/Assets.xcassets') // iOS 资源文件路径

const iconExist = fs.existsSync(iconPath)
const splashExist = fs.existsSync(splashPath)
const foreExist = fs.existsSync(foregroundPath)
const backExist = fs.existsSync(backgroundPath)

// 清除之前生成的文件
function delDir(dir) {
  if (!fs.existsSync(dir)) {
    return
  }
  const files = fs.readdirSync(dir)
  files.forEach((file, index) => {
    const curPath = path.join(dir, file)
    if (fs.statSync(curPath).isDirectory()) {
      delDir(curPath) // 递归删除文件夹
    } else {
      fs.unlinkSync(curPath) // 删除文件
    }
  })
  fs.rmdirSync(dir)
}

// 删除目录下的所有问题，非目录
function delDirFiles(dir) {
  if (!fs.existsSync(dir)) {
    return
  }
  const files = fs.readdirSync(dir)
  files.forEach((file, index) => {
    const curPath = path.join(dir, file)
    if (fs.statSync(curPath).isFile()) {
      fs.unlinkSync(curPath) // 删除文件
    }
  })
}

// 清除旧文件
function clearFiles() {
  console.debug('清理旧文件...')
  delDir(androidPath)
  delDir(iosPath)
  console.debug('文件清理完成')
}

// 生成全平台 icon和splash的配置
function getOption1() {
  const option1 = {
    directory: dir,
    resourcesDirectory: 'resources',
    logstream: process.stdout, // Any WritableStream
    platforms: { }
  }
  const platforms = {
    android: {},
    ios: {}
  }
  if (iconExist) {
    platforms.android.icon = {
      sources: [iconPath]
    }

    platforms.ios.icon = {
      sources: [iconPath]
    }
  }
  if (splashExist) {
    platforms.android.splash = {
      sources: [splashPath]
    }
    platforms.ios.splash = {
      sources: [splashPath]
    }
  }
  option1.platforms = platforms
  return option1
}

const option2 = {
  directory: dir,
  resourcesDirectory: 'resources',
  logstream: process.stdout, // Any WritableStream
  platforms: {
    android: {
      'adaptive-icon': {
        foreground: {
          sources: [foregroundPath]
        },
        background: {
          sources: backExist ? [backgroundPath] : [{
            type: 'color',
            color: '#FFFFFF'
          }]
        }
      }
    }
  }
}
// 拷贝文件
function copyFile(src, dst, isCheckDst = true) {
  if (isCheckDst && !fs.existsSync(dst)) {
    return
  }
  fs.createReadStream(src).pipe(fs.createWriteStream(dst))
}
function copyFileSync(src, dst) {
  fs.copyFileSync(src, dst)
}
function copyAndroidFile() {
  if (!fs.existsSync(androidResPath)) {
    return
  }
  console.log('拷贝资源文件到Android打包目录')
  const iconFiles = fs.readdirSync(path.join(androidPath, 'icon'))
  const splashFiles = fs.readdirSync(path.join(androidPath, 'splash'))
  iconFiles.forEach((file) => {
    let size = file.slice(file.indexOf('-') + 1, file.lastIndexOf('-'))
    const filePath = path.join(androidPath, 'icon/' + file)
    if (size !== '') {
      const dstPath = path.join(androidResPath, `mipmap-${size}/ic_launcher.png`)
      copyFile(filePath, dstPath)
    } else {
      size = file.slice(0, file.lastIndexOf('-'))
      if (size === '') {
        return
      }
      const dstPath = path.join(androidResPath, `mipmap-${size}/ic_launcher_foreground.png`)
      copyFile(filePath, dstPath)
    }
  })
  splashFiles.forEach((file) => {
    const size = file.slice(file.indexOf('-') + 1, file.lastIndexOf('-'))
    const filePath = path.join(androidPath, 'splash/' + file)
    if (size !== '') {
      let dstPath = path.join(androidResPath, `drawable-${size}/splash.png`)
      copyFile(filePath, dstPath)
      if (size === 'land-mdpi') {
        dstPath = path.join(androidResPath, `drawable/splash.png`)
        copyFile(filePath, dstPath)
      }
    }
  })
}
function copyIosFile() {
  if (!fs.existsSync(iosResPath)) {
    return
  }
  console.log('拷贝资源文件到iOS打包目录')
  delDirFiles(path.join(iosResPath, 'AppIcon.appiconset'))
  delDirFiles(path.join(iosResPath, 'Splash.imageset'))

  const iconConfig = JSON.parse(fs.readFileSync(path.join(dir, 'resources/ios-config/icon.json')))
  const splashConfig = JSON.parse(fs.readFileSync(path.join(dir, 'resources/ios-config/splash.json')))
  copyFile(path.join(dir, 'resources/ios-config/icon.json'), path.join(iosResPath, 'AppIcon.appiconset/Contents.json'), false)
  copyFile(path.join(dir, 'resources/ios-config/splash.json'), path.join(iosResPath, 'Splash.imageset/Contents.json'), false)
  const copyFiles = ['icon-29@2x', 'icon-20@2x', 'icon-40@2x']
  copyFiles.forEach((name) => {
    const filePath = path.join(iosPath, `icon/${name}.png`)
    const dstPath = path.join(iosPath, `icon/${name}-1.png`)
    copyFileSync(filePath, dstPath)
  })
  const iconFiles = iconConfig.images || []
  iconFiles.forEach((file) => {
    const name = file.filename
    const filePath = path.join(iosPath, `icon/${name}`)
    const dstPath = path.join(iosResPath, `AppIcon.appiconset/${name}`)
    copyFile(filePath, dstPath, false)
  })

  const splashPath = path.join(dir, 'resources/splash.png')
  const splashFiles = splashConfig.images || []
  splashFiles.forEach((file) => {
    const name = file.filename
    const splashDstPath = path.join(iosResPath, `Splash.imageset/${name}`)
    copyFile(splashPath, splashDstPath, false)
  })
}

const runTask = async() => {
  clearFiles()
  const tasks = []
  if (iconExist || splashExist) {
    tasks.push(Run(getOption1()))
  }
  if (foreExist) {
    tasks.push(Run(option2))
  }
  if (tasks.length !== 0) {
    await Promise.all(tasks)
  }

  copyAndroidFile()
  copyIosFile()
}
// 执行任务
runTask()
