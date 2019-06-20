import style from './assets/icomoon/style.scss';

export const injectStyle = () => {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = style;
  document.head.appendChild(styleEl);
};

