/**
 * @file 页面html配置
 * @use: 动态配置html页面，获取获取模版配置信息，解析到HtmlWebpackPlugin中
 */

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html文件
const getPath = require('./get-path');
const getParam = require('./get-param');
const { META } = require('../webpack/ejs');

const htmlArr = [];
function createHtml(page_path) {
    const appName = getParam('appName');
    htmlArr.push(
        new HtmlWebpackPlugin({
            chunks: [`${appName}`, 'lodash'], // 引入的js
            template: `${page_path}/${appName}/index.html`,
            filename: `${appName}/index.html`, // html位置,
            // meta: {
            //     ...META.common,
            //     ...META.moble
            // },
            minify: {
                // 压缩html
                collapseWhitespace: true,
                preserveLineBreaks: true
            }
        })
    );
    return htmlArr;
}
module.exports = createHtml;
