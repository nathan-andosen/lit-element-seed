import {
  getDomElementHandle,
  listenForEventOnElement
} from './support/e2e-utilities';

describe('Status Alert', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:1350/pages/alert.html');
  });

  // it('should wait', async () => {
  //   await jestPuppeteer.debug();
  // });


  it('should click close button and change title', async () => {
    const btnElement = await getDomElementHandle('status-alert', 'shadowRoot',
      'button');
    await btnElement.click();
    const h3Element = await getDomElementHandle('status-alert', 'shadowRoot',
      'h3');
    await expect(h3Element).toMatch('Close clicked');
  });


  it('should fire event when clicking the close icon', async () => {
    const btnElement = await getDomElementHandle('status-alert', 'shadowRoot',
      'button');
    const executeEventFn = () => { btnElement.click(); };
    const result = await listenForEventOnElement({
      selector: 'status-alert',
      eventName: 'click',
      executeEventFn,
      resolveData: 'clicked'
    });
    expect(result).toEqual('clicked');
  });
});
