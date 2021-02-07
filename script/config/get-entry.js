/**
 * @project: 获取entry文件入口
 */
const getPath = require('./get-path');
const getParam = require('./get-param');
/**
 * 【获取entry文件入口】
 *
 * @param {String} path 引入根路径
 * @returns {Object} 返回的entry
 */
module.exports = function getEnty(path) {
    const entry = {};
    const appName = getParam('appName');
    entry[`${appName}`] = `${path}/${appName}/index.js`;
    return entry;
};
