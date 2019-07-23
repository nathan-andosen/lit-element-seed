
/**
 * Inject a string of css styles into a style tag in the head element. This is
 * useful for style like font-face, which do not work in shadow dom's, they
 * must be in the global scope of the page.
 *
 * @param {string} style
 */
export const injectStyleIntoHead = (style: string) => {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = style;
  document.head.appendChild(styleEl);
};


export const testFunc = () => {
  return 10;
};

export const testFunc2 = () => {
  return 10;
};