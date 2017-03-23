
export default {
    component: require('components/app'),
    indexRoute: {
        onEnter: () => {},
        component: require('../components/home/index')
    },
    childRoutes: [
        require('./home'),
        require('./account'),
        require('./dashboard'),
        // not found router must at last
        {
            path: '*',
            component: require('../components/home/index')
        }
    ]
};
