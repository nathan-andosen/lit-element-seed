import { ElementHandle } from "puppeteer";

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
export async function getDomElementHandle(...args: string[])
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


/**
 * Args for the listenForEventOnElement() function
 * 
 * selector - The selector to select the element from the page object, this is
 *    the element that will listen to the event
 * eventName - The name of the event you want to listen for
 * executeEventFn - The function to execute / fire the event
 * resolveData - The data to pass to the promise resolve
 *
 * @export
 * @interface IListenForEventOnElementArgs
 */
export interface IListenForEventOnElementArgs {
  selector: string;
  eventName: string;
  executeEventFn: () => void;
  resolveData?: any;
}


/**
 * Listen for an event on an element and fire that event, the listener will
 * resolve the promise.
 *
 * @export
 * @param {IListenForEventOnElementArgs} args
 * @returns
 */
export function listenForEventOnElement(args: IListenForEventOnElementArgs) {
  return new Promise((resolve, reject) => {
    page.$eval(args.selector, (node, eventName, resolveData) => {
      return new Promise((resolve, reject) => {
        node.addEventListener(eventName, () => {
          resolve(resolveData);
        });
      });
    }, args.eventName, args.resolveData)
    .then((result) => { resolve(result); }).catch((err) => { reject(err); });
    args.executeEventFn();
  });
}