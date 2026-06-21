import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ 
  executablePath: '/Users/cristiantuica/.cache/puppeteer/chrome/mac_arm-149.0.7827.22/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 
  args: ['--no-sandbox'] 
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
const absTop = await page.evaluate(() => {
  const el = document.querySelector('.ptl-nav');
  return el.getBoundingClientRect().top + window.scrollY;
});
await page.evaluate((s) => window.scrollTo(0, s), absTop - 50);
await new Promise(r => setTimeout(r, 600));
// Full viewport screenshot - no clip
await page.screenshot({ path: 'temporary screenshots/screenshot-ptl-ro.png' });
console.log('done - absTop was', absTop);
await browser.close();
