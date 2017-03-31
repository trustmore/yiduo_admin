export default {
    path: 'clazz',
    indexRoute: {
        onEnter: () => {},
        component: require('components/clazz')
    },
    childRoutes: [
        {
            path: 'add',
            onEnter: () => {},
            component: require('components/clazz/add')
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
