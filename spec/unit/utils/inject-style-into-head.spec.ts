import { testFunc } from '../../../src/utils';
import { Page, Browser } from 'puppeteer';

// test('test the testFunc', () => {
//   expect(testFunc()).toEqual(10);
// });

declare global {
  const page: Page;
  const browser: Browser;
  const jestPuppeteer: any;
}

describe('Google', () => {
  beforeAll(async () => {
    // await page.goto('https://google.com');
    await page.goto('http://localhost:1350/');
  });

  // it('should be titled "Google"', async () => {
  //   await expect(page.title()).resolves.toMatch('Google');
  // });

  it('should put test in debug mode', async () => {
    await jestPuppeteer.debug()
  })
});