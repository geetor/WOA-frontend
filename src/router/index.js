import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import home from './routes/home'
import docCenter from './routes/doc-center'
import office from './routes/office'
import management from './routes/management'
import pages from './routes/pages'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, //在vue下的配置文件中
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [
    {
      path: '/',
      redirect: { name: 'home-homepage' }
    },
    ...home,
    ...docCenter,
    ...office,
    ...management,
    ...pages,
    {
      path: '*',
      redirect: 'error-404'
    }
  ]
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (!isLoggedIn) {
    if (to.name !== 'auth-login') return next({ name: 'auth-login' })
  } else {
    let canNavigate = true
    const userData = getUserData()
    const adminRoutes = ['management-user', 'management-department', 'management-document']

    if (userData.userRole === '用户' && adminRoutes.includes(to.name)) {
      canNavigate = false
    }
    if (userData.deptCharger === false && to.name === 'office-leave') {
      canNavigate = false
    }

    if (!canNavigate) {
      next({ name: 'misc-not-authorized' })
    }

    if (to.meta.redirectIfLoggedIn) {
      next(getHomeRouteForLoggedInUser(userData ? userData.userRole : null))
    }
  }

  return next()
})

export default router
