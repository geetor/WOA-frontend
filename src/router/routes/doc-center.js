export default [
  {
    path:'/doc-center/list',
    name:'doc-center-list',
    component: ()=>import('@/views/doc-center/BlogList.vue')
  },
  {
    path:'/doc-center/edit',
    name:'doc-center-edit',
    component:()=>import('@/views/doc-center/BlogEdit.vue')
  },
  {
    path: '/doc-center/detail/:id',
    name:'doc-center-detail',
    component:()=>import('@/views/doc-center/BlogDetail.vue')
  }

]
