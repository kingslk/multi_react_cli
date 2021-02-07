import { addListener } from '@utils/listener';

//  部分miui软键盘弹起时，输入框消失
function resizeBottom(type) {
    const ua = window.navigator.userAgent;
    // 小米浏览器
    const isMiui = ua.indexOf('MiuiBrowser') > 0;
    if (!isMiui) return;
    if (type === 0) {
        return IM.setMiuiBottom('1.28125rem');
    }
    return IM.setMiuiBottom('0rem');
}
// 输入框进入视野
function activeElementScrollIntoView(ele, delay) {
    const edit = ele.getAttribute('contenteditable');
    if (ele.tagName === 'INPUT' || ele.tagName === 'TEXTAREA' || edit === '' || edit) {
        setTimeout(function () {
            ele.scrollIntoView();
        }, delay);
    }
}
// 软键盘弹出
function clipBoardShow(setVisible) {
    resizeBottom(0);
    setVisible(true);
    setTimeout(function () {
        IM.scrollToEnd();
    }, 500);
}
// 软键盘收起
function clipBoardHide(computed, setVisible, ele) {
    resizeBottom(1);
    const len = computed(ele.innerHTML);
    if (len <= 0) {
        ele.blur();
        setVisible(false);
    }
}
// ios软键盘
function clipBoardIos(computed, setVisible, ele) {
    // 收起
    addListener(window, 'focusout', function () {
        clipBoardHide(computed, setVisible, ele);
    });
    // 弹出
    addListener(window, 'focusin', function () {
        clipBoardShow(setVisible);
    });
}
// android软键盘
function cliBoardAndroid(computed, setVisible, ele) {
    const _innerHeight = document.documentElement.clientHeight || document.body.clientHeight;
    addListener(window, 'resize', function () {
        const newInnerHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // 收起
        if (_innerHeight <= newInnerHeight) {
            clipBoardHide(computed, setVisible, ele);
            // 弹出
        } else {
            activeElementScrollIntoView(ele, 300);
            clipBoardShow(setVisible);
        }
    });
}
// 注入软键盘监听
function cliBoardInitialize({ computed, setVisible, ele }) {
    const isAndorid = /Android/gi.test(window.navigator.userAgent);
    if (isAndorid) {
        cliBoardAndroid(computed, setVisible, ele);
    } else {
        clipBoardIos(computed, setVisible, ele);
    }
}
// 软键盘收起隐藏下拉框
function cliBoardHideCallback(callback) {
    if (/Android/gi.test(window.navigator.userAgent)) {
        const _innerHeight = window.innerHeight;
        addListener(window, 'resize', function () {
            const newInnerHeight = window.innerHeight;
            if (_innerHeight <= newInnerHeight) {
                callback();
            }
        });
    } else {
        addListener(window, 'focusout', function () {
            callback();
        });
    }
}
export { cliBoardInitialize, cliBoardHideCallback };
