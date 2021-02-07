const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const px2rem = require('postcss-plugin-px2rem');
const getEntry = require('../config/get-entry');
const createHtml = require('../config/create-html');
const webpack = require('webpack');
const { env, output, appConfig } = require('./module.config');

const resolveApp = (name) => path.resolve(__dirname, `../../src/${name}/`);
const resolvePublic = (name) => path.resolve(__dirname, `../../public/${name}/`);

const shell = require('shelljs');
if (!appConfig.appName) {
    shell.echo('请输入命令--appName启动/打包对应项目');
    shell.exit(1);
}

module.exports = {
    entry: getEntry(env.projectDir),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    env.isDev
                        ? 'style-loader'
                        : {
                              loader: MiniCssExtractPlugin.loader,
                              options: {
                                  publicPath: env.rootPath
                              }
                          },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')('last 100 version'),
                                px2rem({
                                    rootValue: 64,
                                    unitPrecision: 3,
                                    ignoreIdentifier: false,
                                    exclude: /(node_module|components|css\/PC)/,
                                    mediaQuery: false,
                                    minPixelValue: 2
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    //全局css
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [`${resolvePublic('css')}/mixin.scss`]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            attributes: {
                                list: [
                                    {
                                        tag: 'img',
                                        attribute: 'src',
                                        type: 'src'
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'data-src',
                                        type: 'src'
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|mp3)$/,
                loader: 'url-loader',
                options: {
                    // 是否生成文件
                    emitFile: true,
                    limit: 1000,
                    // 不加这个html-loader会出错
                    esModule: false,
                    // name: env.assetsPublicPath('/assets/[name].[ext]?[hash:8]'),
                    name: env.assetsPublicPath('[name].[ext]?[hash:8]')
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': path.resolve('src'),
            '@components': resolveApp('components'),
            '@assets': resolvePublic('assets'),
            '@utils': resolveApp('utils'),
            '@css': resolvePublic('css'),
            '@hooks': resolveApp('hooks'),
            '@config': resolvePublic('config'),
            '@api': resolveApp('api')
        }
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        // ...output.deletePlugin(),
        ...createHtml(env.projectDir),
        new MiniCssExtractPlugin({
            filename: `[name]/css/${appConfig.fileName}.css?[hash:8]`,
            chunkFilename: `[name]/css/${appConfig.fileName}.chunk.css?[hash:8]`
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'lodash',
            moment: 'moment',
            classnames: 'classnames'
        })
    ]
};
