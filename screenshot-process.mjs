import puppeteer from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const browser = await puppeteer.launch({
  executablePath: '/Users/cristiantuica/.cache/puppeteer/chrome/mac_arm-149.0.7827.22/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  args: ['--no-sandbox']
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

await page.evaluate(() => {
  const el = document.getElementById('proces') || document.querySelector('.ptl-nav');
  if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
});
await new Promise(r => setTimeout(r, 500));

const path = './temporary screenshots/screenshot-205-process-section.png';
await page.screenshot({ path, fullPage: false });
await browser.close();
console.log('Saved:', path);
