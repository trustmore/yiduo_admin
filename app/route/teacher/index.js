export default {
    path: 'teacher',
    indexRoute: {
        onEnter: () => {},
        component: require('components/teacher')
    },
    childRoutes: [
        {
            path: 'add',
            onEnter: () => {},
            component: require('components/teacher/add')
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
