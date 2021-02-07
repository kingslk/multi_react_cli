/**
 * @file 命令行参数读取
 * @use: 相比于argv，可自定义规则
 */
function findParam(param) {
    let result = '';
    process.argv.forEach((argv) => {
        if (argv.indexOf(`--${param}`) === -1) return;
        result += argv.split('=')[1];
    });
    return result;
}
module.exports = findParam;
