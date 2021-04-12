import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import home from './routes/home'
import docCenter from './routes/doc-center'
import office from './routes/office'
import management from './routes/management'
import apps from './routes/apps'
import dashboard from './routes/dashboard'
import uiElements from './routes/ui-elements/index'
import pages from './routes/pages'
import chartsMaps from './routes/charts-maps'
import formsTable from './routes/forms-tables'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
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
    ...apps,
    ...dashboard,
    ...pages,
    ...chartsMaps,
    ...formsTable,
    ...uiElements,
    {
      path: '*',
      redirect: 'error-404',
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
