import fs from 'fs';
import path from 'path';

const router = require('koa-router')();

import assetsPath from './assets-path';
import apiConfig from '../config/apiconfig/config-now';

global.globalApiConfig = apiConfig;

// 登录页面
router.get('/signin', async (ctx) => {
    await ctx.render('signin', {
        layout: false,
        title: '登录',
        assets: {
            css: assetsPath.mainCss,
            js: assetsPath.signinJs
        }
    });
});

export default {
    init: (app) => {
        app
            .use(router.routes())
            .use(router.allowedMethods());

        app.use(async function (ctx) {

            try {
                // Reload './stats/webpack-app'
                let assets = JSON.parse(fs.readFileSync(path.resolve(__dirname, './stats/webpack-app.json')));

                return await ctx.render('app', {
                    layout: false,
                    assets: assets.app
                });
            } catch (error) {
                if (error.redirect) {
                    return ctx.redirect(error.redirect);
                }
                throw error;
            }
        });
    }
};
