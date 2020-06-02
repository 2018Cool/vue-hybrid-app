import request from '@/utils/request'
export function getListData(data) {
  return request({
    url: '/list',
    method: 'post',
    data
  })
}

export function addProject(data) {
  return request({
    url: '/add',
    method: 'post',
    data
  })
}

export function updateProject(data) {
  return request({
    url: '/update',
    method: 'post',
    data
  })
}

export function delProject(data) {
  return request({
    url: '/del',
    method: 'post',
    data
  })
}

