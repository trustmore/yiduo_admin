export default {
    path: 'article',
    indexRoute: {
        onEnter: () => {},
        component: require('components/article')
    },
    childRoutes: [
        {
            path: 'add',
            onEnter: () => {},
            component: require('components/article/add')
        }
        // {
        //     path: 'detail(/:id)',
        //     onEnter: () => {},
        //     component: require('components/account/account-detail')
        // },
        // {
        //     path: 'edit(/:id)',
        //     onEnter: () => {},
        //     component: require('components/account/account-edit')
        // }
    ]
};
