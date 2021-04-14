const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');
const CopyPlugin = require('copy-webpack-plugin');
const { output, env, appConfig } = require('./module.config');
const path = require('path');
const { copyPlugins } = require('./copy.config.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'none',
    output: output.Prod,
    // 优化配置
    optimization: {
        splitChunks: {
            maxInitialRequests: 30, //同时引入最大数量
            // automaticNameDelimiter: '-',
            // maxSize: 200000,
            // name: true,
            cacheGroups: {
                jquery: {
                    chunks: 'all',
                    minChunks: 1,
                    name: 'jquery',
                    test: /[\\/](node_modules)[\\/](jquery)/,
                    priority: -10
                },
                moment: {
                    chunks: 'all',
                    minChunks: 1,
                    name: 'moment',
                    test: /[\\/](node_modules)[\\/](moment)/,
                    priority: -10
                },
                lodash: {
                    chunks: 'all',
                    minChunks: 1,
                    name: 'lodash',
                    test: /[\\/](node_modules)[\\/](lodash)/,
                    priority: -10
                },
                react: {
                    chunks: 'all',
                    minChunks: 1,
                    name: 'react',
                    test: /[\\/](node_modules)[\\/](react|react-dom)/,
                    priority: -10
                }
            }
        },
        minimize: false,
        minimizer: [
            // 代码压缩及兼容
            new TerserPlugin({
                sourceMap: true,
                // 是否另外生成注释文件
                extractComments: false,
                terserOptions: {
                    ie8: true,
                    compress: {
                        drop_console: !env.isDev
                    }
                }
            })
        ]
    },
    plugins: [
        ...output.deletePlugin(),
        // new CopyPlugin({
        //     patterns: [...copyPlugins.copyEmoji(), ...copyPlugins.copyView()]
        // })
    ]
});
