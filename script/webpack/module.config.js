const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const getParam = require('../config/get-param');

const appName = getParam('appName');

const appNameSplit = appName.split('/');
// 是否单/多页面应用
const isSpa = appNameSplit.length === 1;
const fileName = isSpa ? '[name]' : appNameSplit[0];
/**
 * 命令行参数读取
 */
const appConfig = {
    appName,
    appNameSplit,
    isSpa,
    fileName
};
/**
 * 目录及资源环境配置
 */
const env = {
    projectDir: './src/project',
    isDev: process.env.NODE_ENV === 'development',
    rootPath: '../../',
    rootName: 'dist',
    // Tip 一定要从跟目录开始读
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/dist/',
    assetsPublicPath: (_path) => {
        const prefix = env.isDev ? `${appName}/` : `${appName}/assets/`;
        return prefix + _path;
    }
};
/**
 * 输出配置
 */
const commonConfig = {
    path: path.resolve(__dirname, env.rootPath + env.rootName),
    filename: `[name]/js/${fileName}.min.js?[hash:8]`,
    chunkFilename: `${appName}/chunkFile/chunk-${fileName}.min.js?[hash:8]`
};
const output = {
    Dev: {
        ...commonConfig,
        publicPath: env.publicPath
    },
    Prod: {
        ...commonConfig,
        publicPath: env.publicPath
    },
    deletePlugin: () => {
        const deletePlugins = [];
        deletePlugins.push(
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [commonConfig.path + `/${appConfig.appName}`]
            })
        );
        return deletePlugins;
    }
};
module.exports = {
    appConfig,
    output,
    env
};
