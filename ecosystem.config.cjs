const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
    path: path.join(__dirname, './.env'),
});

// set the below config if the app is stateless
// instances: -1,
// exec_mode: 'cluster',

module.exports = {
    apps: [
        {
            name: process.env.APP_NAME,
            script: 'dist/src/index.js',
            instances: 1,
            autorestart: true,
            watch: false,
            time: true,
            env: {},
        },
    ],
};
