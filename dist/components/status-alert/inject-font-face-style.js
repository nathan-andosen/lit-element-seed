import style from './assets/icon-font/font-face.js';

const injectFontFaceStyle = () => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl);
};

export { injectFontFaceStyle };
