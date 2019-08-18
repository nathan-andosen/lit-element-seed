import { JSHandle, ElementHandle } from "puppeteer";

/**
 * Get an element handle. Pass in query selectors, if you need to access
 * the shadow root, pass in the keyword shadowRoot.
 * 
 * EXAMPLE:
 * Method call:
 *   getShadowRootEl('status-alert', 'shadowRoot', 'button')
 * Output query:
 *   document.querySelector("status-alert").shadowRoot.querySelector("button")
 * 
 * @export
 * @param {...string[]} args
 * @returns {Promise<JSHandle>}
 */
export async function getElementHandle(...args: string[])
: Promise<ElementHandle> {
  let query = '';
  for(let i = 0; i < args.length; i++) {
    if (args[i] === 'shadowRoot') {
      query += '.shadowRoot'; continue;
    }
    const prefix = (i === 0) ? 'document.' : '.';
    query += prefix + 'querySelector("' + args[i] + '")';
  }
  const jsHandle = await page.evaluateHandle(<any>query);
  return jsHandle.asElement();
}

export function evaluateHandle(query: string): Promise<JSHandle> {
  return page.evaluateHandle(<any>query);
}