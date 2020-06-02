const Storage = localStorage
const TokenKey = 'vue_mobile_token'
const DeviceKey = 'device_info'
const UserKey = 'user_info'
const OrgCodeKey = 'org_code'
const IsTopOrg = 'is_top_org'
const IsTobyTeam = 'is_toby_team'
export function getToken() {
  return Storage.getItem(TokenKey) || ''
}

export function setToken(token) {
  return Storage.setItem(TokenKey, token)
}

export function removeToken() {
  return Storage.removeItem(TokenKey)
}
export function setDeviceInfo(info) {
  return Storage.setItem(DeviceKey, info)
}

export function getDeviceInfo() {
  return JSON.parse(Storage.getItem(DeviceKey))
}

export function getUserInfo() {
  return JSON.parse(Storage.getItem(UserKey)) || {}
}

export function setUserInfo(info) {
  return Storage.setItem(UserKey, JSON.stringify(info))
}

export function removeUserInfo() {
  return Storage.removeItem(UserKey)
}

export function setOrgCode(code) {
  return Storage.setItem(OrgCodeKey, code)
}

export function getOrgCode() {
  return Storage.getItem(OrgCodeKey) || ''
}

export function setIsTopOrg(flag) {
  return Storage.setItem(IsTopOrg, flag)
}

export function getIsTopOrg() {
  return Storage.getItem(IsTopOrg) || ''
}

export function setIsTobyTeam(flag) {
  return Storage.setItem(IsTobyTeam, flag)
}

export function getIsTobyTeam() {
  return Storage.getItem(IsTobyTeam) || ''
}

export function getKeyValue(key) {
  return Storage.getItem(key)
}

export function setKeyValue(key, value) {
  key && Storage.setItem(key, value)
}
export function removeKeyValue(key) {
  key && Storage.removeItem(key)
}
