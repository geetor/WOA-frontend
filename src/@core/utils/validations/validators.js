export const validatorPositive = value => {
  if (value >= 0) {
    return true
  }
  return false
}

export const validatorPassword = password => {
  /* eslint-disable no-useless-escape */
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/
  /* eslint-enable no-useless-escape */
  return regExp.test(password)
}

export const validatorPhone = phone => {
  /* eslint-disable no-useless-escape */
  const regExp = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
  /* eslint-enable no-useless-escape */
  return regExp.test(phone)
}

export const validatorCreditCard = creditNum => {
  /* eslint-disable no-useless-escape */
  const cRegExp = /^(?:3[47][0-9]{13})$/
  /* eslint-enable no-useless-escape */
  return cRegExp.test(creditNum)
}

export const validatorUrlValidator = val => {
  if (val === undefined || val === null || val.length === 0) {
    return true
  }
  /* eslint-disable no-useless-escape */
  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
  /* eslint-enable no-useless-escape */
  return re.test(val)
}
