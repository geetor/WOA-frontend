export default [
  // User
  {
    path: '/management/user',
    name: 'management-user',
    component: () => import('@/views/management/user/User.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'training-application'
    }
  },

  // Department
  {
    path: '/management/department',
    name: 'management-department',
    component: () => import('@/views/management/department/Department.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'training-application'
    }
  },

  // Document
  {
    path: '/management/document',
    name: 'management-document',
    component: () => import('@/views/management/document/Document.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'training-application'
    }
  }

]
