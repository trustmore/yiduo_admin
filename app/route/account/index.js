export default {
    path: 'account',
    indexRoute: {
        onEnter: () => {},
        component: require('components/account')
    },
    childRoutes: [
        // {
        //     path: 'create',
        //     onEnter: () => {},
        //     component: require('components/account/account-create')
        // },
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
