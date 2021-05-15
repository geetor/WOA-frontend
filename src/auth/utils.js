export const isUserLoggedIn = () => {
  return localStorage.getItem('userData')
}

export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === '管理员' || userRole === '用户') return '/'
  return { name: 'auth-login' }
}
