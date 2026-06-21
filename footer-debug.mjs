import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Users/cristiantuica/.cache/puppeteer/chrome/mac_arm-149.0.7827.22/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise(r => setTimeout(r, 600));

const info = await page.evaluate(() => {
  const grid = document.querySelector('.footer-grid');
  const cols = document.querySelectorAll('.footer-col');
  if (!grid) return { error: 'no footer-grid' };
  const gs = getComputedStyle(grid);
  return {
    gridDisplay: gs.display,
    gridTemplateCols: gs.gridTemplateColumns,
    colCount: cols.length,
    cols: Array.from(cols).map(c => ({
      classes: c.className,
      width: c.getBoundingClientRect().width,
      height: c.getBoundingClientRect().height,
      display: getComputedStyle(c).display,
    }))
  };
});
console.log(JSON.stringify(info, null, 2));

const footerEl = await page.$('footer');
const box = await footerEl.boundingBox();
await page.screenshot({
  path: 'temporary screenshots/footer-detail.png',
  clip: { x: box.x, y: box.y, width: box.width, height: box.height }
});

await browser.close();
console.log('done');
