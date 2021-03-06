// lit-element-seed v0.0.1 | 2019-11-24
/**
 * Inject a string of css styles into a style tag in the head element. This is
 * useful for style like font-face, which do not work in shadow dom's, they
 * must be in the global scope of the page.
 *
 * @param {string} style
 */
const injectStyleIntoHead = (style) => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl);
};
//# sourceMappingURL=inject-style-into-head.js.map

export { injectStyleIntoHead };
