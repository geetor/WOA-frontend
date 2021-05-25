export default [
  // User
  {
    path: '/management/user',
    name: 'management-user',
    component: () => import('@/views/management/user/User.vue')
  },

  // Department
  {
    path: '/management/department',
    name: 'management-department',
    component: () => import('@/views/management/department/Department.vue')
  },

  // Document
  {
    path: '/management/document',
    name: 'management-document',
    component: () => import('@/views/management/document/Document.vue')
  }

]
