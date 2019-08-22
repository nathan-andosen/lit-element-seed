# Unit test help

# E2e test help

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