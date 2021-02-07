const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const { output, appConfig } = require('./module.config');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    output: output.Dev,
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        hot: true,
        clientLogLevel: 'none',
        disableHostCheck: true,
        historyApiFallback: {
            index: `/${appConfig.appName}/index.html` //多页面应用的独立刷新配置
        } //缺少该配置，会出现刷新问题
    },
    plugins: [
        // 返回更新了哪些文件
        new webpack.HotModuleReplacementPlugin()
    ]
});
