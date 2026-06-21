import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Users/cristiantuica/.cache/puppeteer/chrome/mac_arm-149.0.7827.22/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

const fullHeight = await page.evaluate(() => document.body.scrollHeight);
console.log('Full page height:', fullHeight);

const footerInfo = await page.evaluate(() => {
  const footer = document.querySelector('footer');
  if (!footer) return null;
  const rect = footer.getBoundingClientRect();
  const scrollY = window.scrollY;
  return { 
    top: rect.top + scrollY, 
    height: rect.height,
    width: rect.width
  };
});
console.log('Footer absolute position:', footerInfo);

await page.screenshot({
  path: 'temporary screenshots/footer-detail.png',
  clip: { 
    x: 0, 
    y: footerInfo.top, 
    width: 1440, 
    height: footerInfo.height 
  },
  fullPage: false
});

await browser.close();
console.log('done');
