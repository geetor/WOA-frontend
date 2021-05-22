export default [
    {
        path: '/',
        name: 'home-homepage',
        component: () => import('@/views/home/Homepage.vue')
    },
    {
        path: '/bulletins',
        name: 'bulletin-page',
        component: () => import('@/views/home/bulletin-detail/BulletinList.vue'),
        meta: {
            navActiveLink: 'home-homepage',
            contentRenderer: 'sidebar-left',
            contentClass: 'training-application'
        }
    },
    {
        path: '/bulletins/preview',
        name: 'bulletin-preview',
        component: () => import('@/views/home/bulletin-detail/BulletinDetailCard.vue'),
        meta: {
            navActiveLink: 'home-homepage'
        }
    },
    {
        path: '/bulletins/edit',
        name: 'bulletin-edit',
        component: () => import('@/views/home/bulletin-detail/BulletinEdit.vue'),
        meta: {
            navActiveLink: 'home-homepage'
        }
    }
]
