import style from './assets/icomoon/style.js';

const injectStyle = () => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl);
};

export { injectStyle };
