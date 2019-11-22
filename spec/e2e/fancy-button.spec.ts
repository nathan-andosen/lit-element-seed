import { getDomElementHandle } from './support/e2e-utilities';

describe('Fancy Button', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:1350/pages/button.html');
  });

  it('should render fancy button', async () => {
    try {
      const fancyBtnEl = await getDomElementHandle('fancy-button');
      await expect(fancyBtnEl).toMatch('Fancy button');
    } catch (ex) {
      console.log(ex);
    }
  });
});
