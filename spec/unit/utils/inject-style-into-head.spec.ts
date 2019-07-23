import { testFunc, testFunc2 } from '../../../src/utils';
// import { Page, Browser } from 'puppeteer';

test('test the testFunc', () => {
  expect(testFunc()).toEqual(10);
});



// declare global {
//   const page: Page;
//   const browser: Browser;
//   const jestPuppeteer: any;
// }
