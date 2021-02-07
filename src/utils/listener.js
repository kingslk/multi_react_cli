export const addListener = (e, action, callback) => {
    if (e.addEventListener) {
        e.addEventListener(action, callback, false);
    } else {
        e.attachEvent(`on${action}`, callback);
    }
};
export const removeListener = (e, action, callback) => {
    if (e.removeEventListener) {
        e.removeEventListener(action, callback, false);
    } else {
        e.detachEvent(`on${action}`, callback);
    }
};
