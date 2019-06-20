import style from './font-face.js';

const injectStyle = () => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl);
};

export { injectStyle };
