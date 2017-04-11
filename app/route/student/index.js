export default {
    path: 'student',
    indexRoute: {
        onEnter: () => {},
        component: require('components/student')
    },
    childRoutes: [
        {
            path: 'add',
            onEnter: () => {},
            component: require('components/student/add')
        },
        {
            path: ':id',
            onEnter: () => {},
            component: require('components/student/detail')
        }
        // {
        //     path: 'edit(/:id)',
        //     onEnter: () => {},
        //     component: require('components/account/account-edit')
        // }
    ]
};
