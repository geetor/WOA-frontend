export const isUserLoggedIn = () => {
  return localStorage.getItem('userData')
}

export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === 'admin') return '/'
  if (userRole === 'user') return { name: 'access-control' }
  return { name: 'auth-login' }
}
