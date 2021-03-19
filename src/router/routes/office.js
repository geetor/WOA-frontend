export default [
  {
    path: '/office/attendance',
    name: 'office-attendance',
    component: () => import('@/views/office/attendance/Attendance.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'attendance-application',
    },
  },

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
    path: '/office/attendance/calendar/:userId',
    name: 'office-attendance-calendar',
    component: () => import('@/views/office/attendance/calendar/AttendanceCalendar.vue'),
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
    },
  },
  {
    path: '/office/attendance/rank/:rank',
    name: 'office-attendance-rank',
    component: () => import('@/views/office/attendance/Attendance.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'attendance-application',
      navActiveLink: 'office-attendance',
    },
    beforeEnter (to, _, next) {
      if ([6, 5, 4, 3, 2, 1].includes(to.params.rank)) {
        next()
      } else {
        next({ name: 'error-404' })
      }
    },
  },

  // *===============================================---*
  // *--------- EMAIL & IT'S FILTERS N LABELS -------------------------------*
  // *===============================================---*
  {
    path: '/office/email',
    name: 'office-email',
    component: () => import('@/views/office/email/Email.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'email-application',
    },
  },
  {
    path: '/office/email/:folder',
    name: 'office-email-folder',
    component: () => import('@/views/office/email/Email.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'email-application',
      navActiveLink: 'office-email',
    },
    beforeEnter (to, _, next) {
      if (['sent', 'draft', 'starred', 'spam', 'trash'].includes(to.params.folder)) {
        next()
      } else {
        next({ name: 'error-404' })
      }
    },
  },
  {
    path: '/office/email/label/:label',
    name: 'office-email-label',
    component: () => import('@/views/office/email/Email.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'email-application',
      navActiveLink: 'office-email',
    },
    beforeEnter (to, _, next) {
      if (['personal', 'company', 'important', 'private'].includes(to.params.label)) {
        next()
      } else {
        next({ name: 'error-404' })
      }
    },
  },

  // *===============================================---*
  // *--------- TRAINING & IT'S FILTERS N TAGS ---------------------------------------*
  // *===============================================---*
  {
    path: '/office/training',
    name: 'office-training',
    component: () => import('@/views/office/training/Todo.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'todo-application',
    },
  },
  {
    path: '/office/training/:filter',
    name: 'office-training-filter',
    component: () => import('@/views/office/training/Todo.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'todo-application',
      navActiveLink: 'office-training',
    },
    beforeEnter (to, _, next) {
      if (['important', 'completed', 'deleted'].includes(to.params.filter)) {
        next()
      } else {
        next({ name: 'error-404' })
      }
    },
  },
  {
    path: '/office/training/tag/:tag',
    name: 'office-training-tag',
    component: () => import('@/views/office/training/Todo.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'todo-application',
      navActiveLink: 'office-training',
    },
    beforeEnter (to, _, next) {
      if (['running', 'cross', 'flying', 'exercise', 'test'].includes(to.params.tag)) {
        next()
      } else {
        next({ name: 'error-404' })
      }
    },
  },
]
