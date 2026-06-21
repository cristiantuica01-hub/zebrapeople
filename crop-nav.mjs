import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ executablePath: '/Users/cristiantuica/.cache/puppeteer/chrome/mac_arm-149.0.7827.22/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 80 });
await page.goto('http://localhost:3000');
await page.screenshot({ path: './temporary screenshots/nav-crop.png', clip: { x: 0, y: 0, width: 1440, height: 70 } });
await browser.close();
console.log('done');
