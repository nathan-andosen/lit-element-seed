import style from './assets/icon-font/font-face.js';

const injectFontFaceStyle = () => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl);
};
//# sourceMappingURL=inject-font-face-style.js.map

export { injectFontFaceStyle };
