// 用户设备判断
export class Device {
    constructor() {
        this.suggest = function () {
            const ua = window.navigator.userAgent;
            let s;
            if (ua.match(/UCBrowser/)) {
                s = 'UC';
            }
            if (ua.match(/MQQBrowser/)) {
                s = 'QQ';
            }
            if (ua.match(/SearchCraft/)) {
                s = 'Baidu';
            }
            if (ua.match(/360browser/)) {
                s = '360';
            }
            if (ua.match(/SogouMSE/)) {
                s = 'Sougou';
            }
            if (ua.match(/(?:opera|opr)/i)) {
                s = 'Opera';
            }
            if (ua.match(/Chrome/) && !ua.match(/HUAWEI/)) {
                s = 'Chrome';
            }
            if (ua.match(/Maxthon/)) {
                s = 'Maxthon';
            }
            return !s;
        };
        this.version = function () {
            const u = window.navigator.userAgent;
            return {
                trident: u.indexOf('Trident') > -1,
                presto: u.indexOf('Presto') > -1,
                webKit: u.indexOf('AppleWebKit') > -1,
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
                mobile: !!u.match(/AppleWebKit.*Mobile.*/),
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
                iPhone: u.indexOf('iPhone') > -1,
                iPad: u.indexOf('iPad') > -1,
                webApp: u.indexOf('Safari') === -1,
                weixin: u.indexOf('MicroMessenger') > -1,
                qq: u.match(/\sQQ/i) === ' qq' // 是否QQ
            };
        };
        return {
            issuggest: this.suggest(),
            version: this.version(),
            ismoble: this.version().mobile || this.version().android || this.version().ios
        };
    }
}
export const getOs = () => {
    const platform = String(navigator.platform);
    if (['Mac68K', 'MacPPC', 'Macintosh', 'MacIntel'].indexOf(platform) !== -1) {
        return 'Mac';
    }
    const isWin = ['Win32', 'Windows'].indexOf(platform) !== -1;
    if (!isWin && platform === 'X11') {
        return 'Unix';
    }
    const userAgent = navigator.userAgent.toLowerCase();
    if (platform.indexOf('Linux') > -1) {
        if (userAgent.indexOf('android') > -1) {
            return 'Android';
        }
        return 'Linux';
    }
    let item;
    const maps = {
        ipad: 'iPad',
        'iphone os': 'iPhone',
        'windows ce': 'wPhone',
        'windows mobile': 'wPhone',
        'windows nt 5.0': 'Windows 2000',
        'windows 2000': 'Windows 2000',
        'windows nt 5.1': 'Windows XP',
        'windows xp': 'Windows XP',
        'windows nt 5.2': 'Windows 2003',
        'windows 2003': 'Windows 2003',
        'windows nt 6.0': 'Windows Vista',
        'windows vista': 'Windows Vista',
        'windows nt 6.1': 'Windows 7',
        'windows 7': 'Windows 7',
        'windows nt 6.2': 'Windows 8',
        'windows 8': 'Windows 8',
        'windows nt 10.0': 'Windows 10',
        windows: 'Windows(Unknown)'
    };
    // eslint-disable-next-line no-restricted-syntax
    for (item in maps) {
        if (userAgent.indexOf(item) > -1) {
            return maps[item];
        }
    }
    return 'Unknown';
};
export const getBrowser = () => {
    const ua = navigator.userAgent;
    let res;
    const bs = [
        /(Chrome\/\d+(\.\d+){2,3}|MSIE \d+.\d+)/gi,
        /(Firefox|Opera|Safari|Camino|Gecko)\/\d+\.\d+/gi
    ];
    const len = bs.length;
    let i = 0;
    for (; i < len; i++) {
        res = ua.match(bs[i]);
        if (res) {
            return res[0].replace(/\s+/gi, '/');
        }
    }
    return 'Unknown';
};
