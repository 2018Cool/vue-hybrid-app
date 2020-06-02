export default [
  // user login
  {
    url: '/login',
    type: 'post',
    response: res => {
      const { username } = JSON.parse(res.body)
      return {
        code: 0,
        data: {
          token: 'mock-token',
          tokenHead: username
        }
      }
    }
  },
  // user logout
  {
    url: '/logout',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        data: 'success'
      }
    }
  }
]
