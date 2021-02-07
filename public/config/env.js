// 开发环境
export const isDev = () => {
    const { NODE_ENV } = process.env;
    return NODE_ENV === 'development';
};
// 自主测试环境
export const isTest1 = () => {
    const { NODE_ENV } = process.env;
    return NODE_ENV === 'test1';
};
// 流程测试
export const isTest2 = () => {
    const { NODE_ENV } = process.env;
    return NODE_ENV === 'test2';
};
// 生产环境
export const isProd = () => {
    const { NODE_ENV } = process.env;
    return NODE_ENV === 'production';
};
