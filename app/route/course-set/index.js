export default {
    path: 'cs',
    indexRoute: {
        onEnter: () => {},
        component: require('components/course-set')
    },
    childRoutes: [
        {
            path: ':id',
            onEnter: () => {},
            component: require('components/course-set/detail')
        },
        {
            path: ':id/edit',
            onEnter: () => {},
            component: require('components/course-set/edit')
        }
    ]
};
