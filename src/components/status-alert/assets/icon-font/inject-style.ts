import style from './font-face.scss';

export const injectStyle = () => {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = style;
  document.head.appendChild(styleEl);
};

