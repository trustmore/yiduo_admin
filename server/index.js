// Tell `require` calls to look into `/app` also
// it will avoid `../../../../../` require strings
process.env.NODE_PATH = 'app';
require('module').Module._initPaths();

// Install `babel` hook for ES6
require('babel-core/register');
require('babel-polyfill');

// Start the server
require('./main.js');
