export default [
  {
    path:'/doc-center/list',
    name:'doc-center-list',
    component: ()=>import('@/views/doc-center/BlogList.vue'),
    meta:{
      navActiveLink:'doc-center'
    }
  },
  {
    path:'/doc-center/edit',
    name:'doc-center-edit',
    component:()=>import('@/views/doc-center/BlogEdit.vue')
  },
  {
    path: '/doc-center/detail/:docId',
    name:'doc-center-detail',
    component:()=>import('@/views/doc-center/BlogDetail.vue'),
    meta:{
      navActiveLink:'doc-center'
    }
  },
  {
    path:'/doc-center/category/:category',
    name:'doc-center-category',
    component:()=>import('@/views/doc-center/BlogCategory.vue')
  }

]
