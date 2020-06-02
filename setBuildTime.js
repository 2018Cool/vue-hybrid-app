/**
 * 设置打包时间.用于区分不同时间的包
 */
const fs = require('fs')
const fileName = '.env.local'
let content = ''
if (fs.existsSync(fileName)) {
  content = fs.readFileSync(fileName).toString()
}

if (content === '') {
  const data = Buffer.from(`VUE_APP_BUILD_TIME=${getTimeString()}`)
  fs.writeFileSync(fileName, data, { flag: 'w+' })
  return
}
const lines = content.split('\n')
let newLines = ''
let isHasBuildTime = false
lines.forEach((line) => {
  if (line.includes('VUE_APP_BUILD_TIME')) {
    newLines += `VUE_APP_BUILD_TIME=${getTimeString()}\n`
    isHasBuildTime = true
  } else if (line !== '') {
    newLines += line + '\n'
  }
})
if (!isHasBuildTime) {
  newLines += `VUE_APP_BUILD_TIME=${getTimeString()}\n`
}
fs.writeFileSync(fileName, Buffer.from(newLines), { flag: 'w+' })

function getTimeString() {
  // const format = '{y}{m}{d}{h}{i}'
  const format = '{y}{m}{d}{h}'
  const date = new Date()
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
