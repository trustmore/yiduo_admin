let data = {};

if (process.env.NODE_ENV === 'production') {
    let jsMap = require('./stats/js.json');
    let styleMap = require('./stats/style.json');

    data = {
        signinJs: `/assets/${jsMap['signin.js']}`,
        mainCss: `/assets/${styleMap['main.css']}`
    };
} else {
    data = {
        signinJs: '/public/js/signin.js',

        mainCss: '/public/css/main.css'
    };
}

export default data;
