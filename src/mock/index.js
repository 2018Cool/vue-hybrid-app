import Mock from 'mockjs'
import mocks from './modules'

// Fix an issue with setting withCredentials = true, cross-domain request lost cookies
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}
// Mock.setup({
//   timeout: '350-600'
// })

// User
for (let i = 0; i < mocks.length; i++) {
  const item = mocks[i]
  let url = item.url
  if (url.startsWith('?')) {
    url = '\\' + url
  }
  Mock.mock(new RegExp(url), item.type, item.response)
}

export default Mock
