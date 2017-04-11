export default {
    path: 'course',
    indexRoute: {
        onEnter: () => {},
        component: require('components/course')
    },
    childRoutes: [
        {
            path: 'add',
            onEnter: () => {},
            component: require('components/course/add')
        },
        {
            path: ':id/edit',
            onEnter: () => {},
            component: require('components/course/add')
        }
        // {
        //     path: 'edit(/:id)',
        //     onEnter: () => {},
        //     component: require('components/account/account-edit')
        // }
    ]
};
