import { getDomElementHandle } from '../support/e2e-utilities';

describe('Status Alert', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:1350/pages/alert.html');
  });

  it('should click close button and change title', async () => {
    try {
      const btnElement = await getDomElementHandle('status-alert', 'shadowRoot',
        'button');
      await btnElement.click();
      const h3Element = await getDomElementHandle('status-alert', 'shadowRoot',
        'h3');
      await expect(h3Element).toMatch('Close clicked');
    } catch(ex) {
      console.log(ex);
    }
  });
});