export default [

  // *===============================================---*
  // *--------- ATTENDANCE & IT'S FILTERS N LABELS -------------------------------*
  // *===============================================---*
  {
    path: '/office/attendance',
    name: 'office-attendance',
    component: () => import('@/views/office/attendance/Attendance.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'attendance-application',
    },
  },
  {
    path: '/office/attendance/:department',
    name: 'office-attendance-department',
    component: () => import('@/views/office/attendance/Attendance.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'attendance-application',
      navActiveLink: 'office-attendance',
    },
    beforeEnter (to, _, next) {
      if (['人事部门', '驾驶部门', '后勤部门', '武装部门', '管理部门'].includes(to.params.department)) {
        next()
      } else {
        next({ name: 'error-404' })
      }
    }
  },
  {
    path: '/office/attendance/calendar/:userId',
    name: 'office-attendance-calendar',
    component: () => import('@/views/office/attendance/calendar/Calendar.vue'),
    meta: {
      contentClass: 'attendance-application',
      navActiveLink: 'office-attendance',
    },
    beforeEnter (to, _, next) {
      if (!isNaN(Number(to.params.userId))) {
        next()
      } else {
        next({ name: 'error-404' })
      }
    }
  },

  // *===============================================---*
  // *--------- TRAINING & IT'S FILTERS N TAGS ---------------------------------------*
  // *===============================================---*
  {
    path: '/office/training/list',
    name: 'office-training-list',
    component: () => import('@/views/office/training/Training'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'training-application',
    },
  },
  {
    path: '/office/training/list/:department',
    name: 'office-training-list-department',
    component: () => import('@/views/office/training/Training'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'training-application',
      navActiveLink: 'office-training-list',
    },
    beforeEnter (to, _, next) {
      if (['人事部门', '驾驶部门', '后勤部门', '武装部门', '管理部门'].includes(to.params.department)) {
        next()
      } else {
        next({ name: 'error-404' })
      }
    }
  },
  {
    path: '/office/training/calendar',
    name: 'office-training-calendar',
    component: () => import('@/views/office/training/calendar/Calendar'),
    meta: {
      contentClass: 'training-application',
      navActiveLink: 'office-training-list',
    }
  },
]
