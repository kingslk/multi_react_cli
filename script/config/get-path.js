/**
 * @project: 遍历文件目录
 */

const fs = require('fs');

/**
 * 【遍历某文件下的文件目录】
 *
 * @param {String} path 路径
 * @returns {Array}
 */
module.exports = function getPath(path) {
    const arr = [];
    const existpath = fs.existsSync(path); // 是否存在目录
    if (existpath) {
        const readdirSync = fs.readdirSync(path); // 获取目录下所有文件
        readdirSync.forEach((item) => {
            const currentPath = `${path}/${item}`;
            const isDirector = fs.statSync(currentPath).isDirectory(); // 判断是不是一个文件夹
            if (isDirector && item !== 'component' && item !== 'hooks') {
                // component及静态资源目录 需要排除
                arr.push(item);
            }
        });
        return arr;
    }
};
