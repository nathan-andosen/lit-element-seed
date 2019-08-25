# Unit test help

### Create component in DOM and interact with it

```typescript
// create the component and append it to the body
const el = document.createElement('status-alert');
el.setAttribute('id', 'elAlert');
document.body.append(el);

// listen to events like normal
el.addEventListener('some-event', () => {});

// query for the element in the next event loop, hence the timeout
setTimeout(() => {
  // get the element from the dom and do what you want with it
  const h3El = document.querySelector("#elAlert")
    .shadowRoot.querySelector("h3");
  
  // clean up the test and remove the element form the dom
  el.remove();
}, 0);
```

### Listen to events

```typescript
const comp = new StatusAlertComponent();
comp.addEventListener('close', () => {
  console.log('I should get fired...');
});
comp.someFunctionThatFiresTheCloseEvent();
```

# E2e test help

Useful sites:

* [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer)
* [expect-puppeteer](https://github.com/smooth-code/jest-puppeteer/blob/master/packages/expect-puppeteer/README.md)

---

### Pause browser

Useful for debugging. __Note:__ Seems buggy.

```typescript
// place this in your it() functions to pause the browser
await jestPuppeteer.debug();
```

---

### Get shadow dom element

The ``getDomElementHandle()`` function returns an [ElementHandle](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-elementhandle) object. 

```typescript
import { getDomElementHandle } from '../support/e2e-utilities';

const btnElement = await getDomElementHandle('status-alert', 'shadowRoot', 'button');
// this will create the following js path:
// document.querySelector("status-alert").shadowRoot.querySelector("button")
```

---

### Check elements _innerText_ is equal to value

```typescript
// <h3>Hello World!</h3>
const h3Element = await getDomElementHandle('status-alert', 'shadowRoot', 'h3');
await expect(h3Element).toMatch('Hello World!');
```

---

### Listen to DOM event

```typescript
const btnElement = await getDomElementHandle('status-alert', 'shadowRoot',
  'button');
const executeEventFn = () => { btnElement.click(); };
const result = await listenForEventOnElement({
  selector: 'status-alert',
  eventName: 'click',
  executeEventFn: executeEventFn,
  resolveData: 'clicked'
});
expect(result).toEqual('clicked');
```