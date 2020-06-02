
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validMobilePhone(value) {
  const reg = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/
  return reg.test(value)
}

export function validEmail(value) {
  const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
  return reg.test(value)
}

export function invalidInput(value) {
  const reg = /[<>&]+/
  return reg.test(value)
}
