import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    code: '@increment',
    name: '@ctitle(5,15)',
    synopsis: '@cparagraph()'
  }))
}
export default [
  {
    url: '/list',
    type: 'post',
    response: res => {
      const { pageNo = 1, pageSize = 20, condition } = JSON.parse(res.body)
      const mockList = List.filter((item) => {
        if (condition !== '') {
          const { name } = item
          return name.includes(condition)
        }
        return true
      })
      const dataList = mockList.slice((pageNo - 1) * pageSize, pageNo * pageSize)
      return {
        code: 0,
        data: {
          dataList: dataList,
          totalCount: mockList.length
        }
      }
    }
  },

  {
    url: '/add',
    type: 'post',
    response: res => {
      return {
        code: 0,
        data: 'success'
      }
    }
  },
  {
    url: '/del',
    type: 'post',
    response: res => {
      return {
        code: 0,
        data: 'success'
      }
    }
  }
]
