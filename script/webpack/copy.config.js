const path = require('path');
const findParam = require('../config/get-param');
const { env, appConfig } = require('./module.config');
/**
 * 复制静态资源
 */
const copyPlugins = {
    copyEmoji: () => {
        return [
            {
                from: path.resolve(__dirname, `${env.rootPath}public/assets/emoji`),
                to: path.resolve(__dirname, `${env.rootPath}dist/${appConfig.appName}/assets/`)
            },
            {
                from: path.resolve(__dirname, `${env.rootPath}public/assets/*.ico`),
                to: path.resolve(__dirname, `${env.rootPath}dist/${appConfig.appName}/assets/`),
                flatten: true
            }
        ];
    },
    copyView: () => {
        const partterns = [];
        const copyPaths = findParam('copyPaths');
        if (!copyPaths) return [];
        const arr = copyPaths.replace(/[(\[)+(\])+]/g, '').split(',');
        for (let i = 0; i < arr.length; i++) {
            partterns.push({
                from: path.resolve(__dirname, `${env.rootPath}static/${arr[i]}`),
                globOptions: {
                    ignore: ['**/scss']
                },
                to: path.resolve(__dirname, `${env.rootPath}dist/${arr[i]}`)
            });
        }
        return partterns;
    }
};
module.exports = {
    copyPlugins
};
