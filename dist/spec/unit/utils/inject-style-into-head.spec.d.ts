import { Page, Browser } from 'puppeteer';
declare global {
    const page: Page;
    const browser: Browser;
    const jestPuppeteer: any;
}
