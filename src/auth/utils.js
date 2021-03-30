export const isUserLoggedIn = () => {
  return localStorage.getItem('userData')
}

export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === '管理员') return '/'
  if (userRole === '用户') return { name: 'access-control' }
  return { name: 'auth-login' }
}
