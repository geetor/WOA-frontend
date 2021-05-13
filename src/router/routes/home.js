export default [
    {
        path: '/',
        name: 'home-homepage',
        component: () => import('@/views/home/homepage.vue'),
    },

    ///////////////////////////////////////
    {
        path: '/bulletins',
        name: 'bulletin-page',
        component: () => import('@/views/home/bulletinDetail/BulletinList.vue'),
        meta: {
            navActiveLink: 'home-homepage',
            contentRenderer: 'sidebar-left',
            contentClass: 'training-application',
        }
    },
    // {
    //     path: '/bulletins/preview',
    //     name: 'bulletin-preview',
    //     component: () => import('@/views/home/bulletinDetail/BulletinPreview.vue'),
    //     meta: {
    //         navActiveLink: 'home-homepage',
    //     }
    // },
    {
        path: '/bulletins/preview',
        name: 'bulletin-preview',
        component: () => import('@/views/home/bulletinDetail/BulletinDetailCard.vue'),
        meta: {
            navActiveLink: 'home-homepage',
        }
    },
    {
        path: '/bulletins/edit',
        name: 'bulletin-edit',
        component: () => import('@/views/home/bulletinDetail/BulletinEdit.vue'),
        meta: {
            navActiveLink: 'home-homepage',
        }
    },

]
