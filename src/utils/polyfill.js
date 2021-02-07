/* eslint-disable no-restricted-syntax */
// 低版本不兼容toBlob
if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value(callback, type, quality) {
            const dataURL = this.toDataURL(type, quality).split(',')[1];
            setTimeout(function () {
                const binStr = atob(dataURL);
                const len = binStr.length;
                const arr = new Uint8Array(len);

                for (let i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i);
                }
                callback(new Blob([arr], { type: type || 'image/jpeg' }));
            });
        }
    });
}
