/* eslint-disable import/no-dynamic-require */
// 表情
const faces = [
    '加一',
    '打酱油',
    '赞同',
    '喝茶',
    '开饭',
    '非常赞同',
    '礼花',
    '耍赖',
    '鬼脸',
    '别闹',
    '开心',
    '搞怪',
    '摇摆',
    '大哭',
    '小偷',
    '叹气',
    '发抖',
    '杀',
    '僵尸',
    '怒',
    '期盼',
    '羡慕嫉妒恨',
    '得意',
    '谢谢',
    '困',
    '雷人',
    '已阅',
    '羡慕',
    '嫉妒',
    '无语',
    '中秋',
    '鲜花',
    '晕倒',
    '吃西瓜',
    '喝咖啡',
    '无语了',
    '奸笑',
    '狮子座',
    '掏枪',
    '尿尿',
    '双子座',
    '摇哑铃',
    '窃笑',
    '白羊座',
    '射手座',
    '纳尼',
    '绝望',
    '砸蛋',
    '汗',
    '坑爹'
];
/**
 * @description 表情处理
 */
export const faceCtrl = {
    // 获取表情列表
    getFaces() {
        const data = [];
        let i = 0;
        const len = faces.length;
        let j;
        let tmp;
        for (; i < len; i++) {
            j = (i < 9 ? '0' : '') + String(i + 1);
            tmp = { desc: faces[i], id: j, text: '' };
            data[i] = tmp;
        }
        return data;
    },
    // 选择表情
    onSelectFace(item) {
        const _path = require(`@assets/emoji/s${item.id}.gif`);
        const html = `<img src=${_path} alt=${item.desc} title=${item.desc} data-face="${item.id}/${item.desc}">`;
        return html;
    },
    // 表情正则转换
    regFace(html) {
        const reg = /<img[^>]*data-face="([^"]*)"[^>]*>/gi;
        return html.replace(reg, '[face=$1]');
    },
    // 表情转回html
    faceToHtml(html) {
        const _path = 'assets/s$1.gif';
        const face = `<img src='{id}' alt='$2' data-face='$1/$2'>`.replace('{id}', _path);
        return html.replace(/\[face=(\d+)\/([^\]]*)\]/gi, face);
    }
};
/**
 * @description 图片处理
 */
export const imgCtrl = {
    // 图片压缩
    Compress(base64, rate, callback) {
        const _img = new Image();
        const type = base64.includes('jpeg') ? 'jpeg' : 'png';
        _img.src = base64;
        _img.onload = function () {
            const _canvas = document.createElement('canvas');
            const w = this.width / rate;
            const h = this.height / rate;
            _canvas.setAttribute('width', w);
            _canvas.setAttribute('height', h);
            _canvas.getContext('2d').drawImage(this, 0, 0, w, h);
            const base64_return = _canvas.toDataURL(`image/${type}`, 0.5);
            _canvas.toBlob(function (blob) {
                if (blob.size > 750 * 1334) {
                    // 如果还大，继续压缩
                    imgCtrl.Compress(base64_return, 2, callback);
                } else {
                    callback(base64_return);
                }
            }, `image/${type}`);
        };
    },
    // 图片加载拍端
    imgLoad(message_list, callback) {
        const imgs = [];
        $(message_list)
            .children('li')
            .last()
            .find('img')
            .each(function () {
                const dfd = $.Deferred();
                $(this)
                    .on('load', function () {
                        dfd.resolve();
                    })
                    .on('error', function () {
                        // 图片加载错误，加入错误处理
                        dfd.resolve();
                    });
                if (this.complete) {
                    dfd.resolve();
                }
                imgs.push(dfd);
            });
        $.when.apply(null, imgs).done(function () {
            if (callback) {
                callback();
            }
        });
    }
};
/**
 * @description 数据处理
 */
export const dataCtrl = {
    getParams(str, name) {
        // window.location.search.substr(1)
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
        const r = str.match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    setSess(name, data) {
        return localStorage.setItem(name, data);
    },
    getSess(name, isJson) {
        const sess = localStorage.getItem(name);
        // 过滤html标签
        const reg = /<[^>]+>/g;
        if (sess === 'undefined') {
            return '';
        }
        if (isJson || reg.test(sess)) {
            return JSON.parse(localStorage.getItem(name));
        }
        return localStorage.getItem(name);
    },
    removeSess(name) {
        localStorage.removeItem(name);
    }
};
/**
 * @description 读取剪切板
 */
export const clipBoardRead = {
    read(e, callback) {
        const clip = window.clipboardData || e.clipboardData;
        if (!clip || !clip.items) {
            return;
        }
        let i = 0;
        const len = clip.items.length;
        let item;
        let image = null;
        let html = null;
        let text = null;
        for (; i < len; i++) {
            item = clip.items[i];
            if (item.kind === 'file' && item.type.indexOf('image') !== -1) {
                image = item.getAsFile();
                const reader = new FileReader();
                reader.onload = function (ev) {
                    const name = `${moment().format('YYYY-MM-DD HH:mm:ss')}.png`;
                    callback(
                        'image',
                        `<img data-name="${name}" src="${ev.target.result}" data-src="src" />`
                    );
                };
                reader.readAsDataURL(image);
                return;
            }
            if (item.type === 'text/html') {
                html = item;
            } else {
                text = item;
            }
        }
        if (html) {
            html.getAsString(function (str) {
                callback('string', str);
            });
        } else if (text) {
            text.getAsString(function (str) {
                callback('string', str);
            });
        } else {
            callback('string', clip.getData('Text'));
        }
    },
    readText(e, callback) {
        if (!e.clipboardData || !e.clipboardData.items) {
            return false;
        }
        let i = 0;
        const len = e.clipboardData.items.length;
        let item;
        for (; i < len; i++) {
            item = e.clipboardData.items[i];
            if (item.type === 'text/plain') {
                item.getAsString(function (str) {
                    callback(str);
                });
                return true;
            }
        }
        callback(null);
        e.preventDefault();
    }
};
