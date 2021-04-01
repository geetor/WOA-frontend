export default [
  {
    path: '/management/user',
    name: 'management-user',
    component: () => import('@/views/management/user/InvoiceList.vue'),
  },

  // User
  {
    path: '/management/user',
    name: 'management-user',
    component: () => import('@/views/management/user/InvoiceList.vue'),
  },

  // Department
  {
    path: '/management/department',
    name: 'management-department',
    component: () => import('@/views/management/department/InvoiceList.vue'),
  },

  // Document
  {
    path: '/management/document',
    name: 'management-document',
    component: () => import('@/views/management/document/InvoiceList.vue'),
  }

]
