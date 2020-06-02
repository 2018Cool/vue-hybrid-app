import { Plugins } from '@capacitor/core'
import wa from '@webank/wa-sdk'
import { Toast } from 'vant'
import store from '../store'
import request from '@/utils/request'
import { showConfirm, showAlert } from '@/utils'

const { App } = Plugins
// let versionCode = ''
const isInitSuccess = false
let isSuspending = false // 是否检查更新
const appUpgradeUrl = process.env.NODE_ENV === 'production' ? 'https://aisp2-1251170195.cos.ap-guangzhou.myqcloud.com/trendos-app/upgrade/upgrade.json' : 'https://aisp-test-1251170195.cos.ap-guangzhou.myqcloud.com/trendos-app/upgrade/upgrade.json'
let isCheckedAppUpdate = true // 是否检测APP升级,每次打开APP时触发

function initListener() {
  document.addEventListener('resume', checkUpdate, false)
}

// 检查升级
export async function checkUpdate() {
  if (!isInitSuccess || isSuspending) {
    return
  }
  isSuspending = true
  checkAPPUpdate() // 检查APP是否有升级，如果有升级，就不检查热升级
}

// 检查 APP 全量升级
export async function checkAPPUpdate() {
  if (!isCheckedAppUpdate) {
    return Promise.resolve(false)
  }
  const deviceInfo = store.getters.deviceInfo || {}
  const platform = deviceInfo.platform || ''
  const appVersion = deviceInfo.appVersion
  const reqFun = request({
    method: 'get',
    noTip: true,
    timeout: 3
  }, appUpgradeUrl)
  try {
    const data = await reqFun
    const info = data[platform]
    if (info) {
      isCheckedAppUpdate = false
      const newAppVersion = info.appVersion || ''
      if (compareVersion(newAppVersion, appVersion)) {
        return showUpgradeConfirm(info)
      }
    }
  } catch (e) {
    console.error(e)
    wa.errorReport(e)
  }
  return Promise.resolve(false)
}

function compareVersion(newVersion, oldVersion) {
  const newVersionNums = newVersion.split('.')
  const oldVersionNums = oldVersion.split('.')
  for (let i = 0; i < newVersionNums.length; i++) {
    if (Number(newVersionNums[i]) > Number(oldVersionNums[i])) {
      return true
    } else if (Number(newVersionNums[i]) === Number(oldVersionNums[i])) {
      continue
    } else {
      return false
    }
  }
  return false
}

// 全量升级弹出框
function showUpgradeConfirm(info) {
  const option = {
    title: '发现新版本',
    message: (info.desc || ['是否升级到最新版本？']).join('\n'),
    messageAlign: 'left',
    showCancelButton: !info.forceUpgrade,
    confirmButtonText: '立即升级',
    cancelButtonText: '稍后升级'
  }
  let alertFun = showConfirm
  if (info.forceUpgrade) {
    alertFun = showAlert
  }
  return new Promise((resolve, reject) => {
    Toast.clear()
    alertFun(option).then(() => {
      App.openUrl({ url: info.downloadUrl }).then(() => {
        if (info.forceUpgrade) {
          App.exitApp()
        }
      })

      resolve(true)
    }, () => {
      isSuspending = true // 稍后升级，下次APP重新打开后再次检测升级
      resolve(false)
    })
  })
}

