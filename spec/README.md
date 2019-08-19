# Unit test help

# E2e test help

### spec structure

Your e2e specs will no doubt be async, copy the spec template below to start:

```typescript
it('should do something', async () => {
  try {
    //...
  } catch(ex) {
    console.log(ex);
  }
});
```

### Get shadow dom element

The ``getDomElementHandle()`` function returns an [ElementHandle](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-elementhandle) object. 

```typescript
import { getDomElementHandle } from '../support/e2e-utilities';

const btnElement = await getDomElementHandle('status-alert', 'shadowRoot', 'button');
// this will create the following js path:
// document.querySelector("status-alert").shadowRoot.querySelector("button")
```

### Check elements _innerText_ is equal to value

```typescript
const h3Element = await getDomElementHandle('status-alert', 'shadowRoot', 'h3');
await expect(h3Element).toMatch('Close clicked');
```

### Listen to DOM event

Todo