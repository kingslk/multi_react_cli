const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');
const findParam = require('../config/get-param');
const { env } = require('./module.config');

const name = findParam('name');
const type = findParam('type');
const shell = require('shelljs');
if (!type || !name) {
    shell.echo('请输入--name 项目/页面名称 --type 子目录');
    shell.exit(1);
}
const templateFunction = function (data) {
    var shared = `%${type}${name} { background-image: url(I); background-size: SWpx SHpx; }`
        .replace('I', data.sprites[0].image)
        .replace('SW', data.spritesheet.width)
        .replace('SH', data.spritesheet.height);
    var perSprite = data.sprites
        .map(function (sprite) {
            return '@mixin N { width: Wpx; height: Hpx;background-position: Xpx Ypx; }'
                .replace('N', sprite.name)
                .replace('W', sprite.width)
                .replace('H', sprite.height)
                .replace('X', sprite.offset_x)
                .replace('Y', sprite.offset_y);
        })
        .join('\n');

    return shared + '\n' + perSprite;
};

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'sprite.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].min.js'
    },
    plugins: [
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, `${env.rootPath}public/assets/${name}/${type}/sprite`),
                glob: '*.png'
            },
            target: {
                image: path.resolve(
                    __dirname,
                    `${env.rootPath}public/assets/${name}/sprite-${type}${name}.png`
                ),
                css: [
                    [
                        path.resolve(
                            __dirname,
                            `${env.rootPath}public/css/sprite-${type}${name}.scss`
                        ),
                        { format: 'function_based_template' }
                    ]
                ]
            },
            apiOptions: {
                cssImageRef: `~@assets/${name}/sprite-${type}${name}.png`
            },
            customTemplates: {
                function_based_template: templateFunction
            },
            spritesmithOptions: {
                algorithm: 'top-down',
                padding: 10
            }
        })
    ]
};
