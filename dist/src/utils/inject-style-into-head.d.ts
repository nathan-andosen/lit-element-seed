/**
 * Inject a string of css styles into a style tag in the head element. This is
 * useful for style like font-face, which do not work in shadow dom's, they
 * must be in the global scope of the page.
 *
 * @param {string} style
 */
export declare const injectStyleIntoHead: (style: string) => void;
export declare const testFunc: () => number;
