
describe('Alert', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:1350/pages/alert.html');
  });

  // it('should be titled "Google"', async () => {
  //   await expect(page.title()).resolves.toMatch('Google');
  // });

  it('should put test in debug mode', async () => {
    await jestPuppeteer.debug()
  })
});