export default [
  // *===============================================---*
  // *--------- ATTENDANCE & IT'S FILTERS N LABELS -------------------------------*
  // *===============================================---*
  {
    path: '/office/attendance',
    name: 'office-attendance',
    component: () => import('@/views/office/attendance/Email.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'email-application',
    },
  },
  {
    path: '/office/attendance/:folder',
    name: 'office-attendance-folder',
    component: () => import('@/views/office/attendance/Email.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'email-application',
      navActiveLink: 'office-attendance',
    },
    beforeEnter(to, _, next) {
      if (['sent', 'draft', 'starred', 'spam', 'trash'].includes(to.params.folder)) next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/office/attendance/label/:label',
    name: 'office-attendance-label',
    component: () => import('@/views/office/attendance/Email.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'email-application',
      navActiveLink: 'office-attendance',
    },
    beforeEnter(to, _, next) {
      if (['personal', 'company', 'important', 'private'].includes(to.params.label)) next()
      else next({ name: 'error-404' })
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
    beforeEnter(to, _, next) {
      if (['important', 'completed', 'deleted'].includes(to.params.filter)) next()
      else next({ name: 'error-404' })
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
    beforeEnter(to, _, next) {
      if (['team', 'low', 'medium', 'high', 'update'].includes(to.params.tag)) next()
      else next({ name: 'error-404' })
    },
  },
]
