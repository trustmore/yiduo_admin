
export default {
    component: require('components/app'),
    indexRoute: {
        onEnter: () => {},
        component: require('../components/home/index')
    },
    childRoutes: [
        require('./home'),
        require('./student'),
        require('./teacher'),
        require('./course'),
        require('./clazz'),
        require('./dashboard'),
        require('./course-set'),
        // not found router must at last
        {
            path: '*',
            component: require('../components/home/index')
        }
    ]
};
