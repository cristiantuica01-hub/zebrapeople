import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'temporary screenshots');

const url = process.argv[2] || 'http://localhost:3000';
const selector = process.argv[3] || '#proces';
const label = process.argv[4] ? `-${process.argv[4]}` : '';

const existing = fs.readdirSync(screenshotDir)
  .map(f => f.match(/^screenshot-(\d+)/))
  .filter(Boolean)
  .map(m => parseInt(m[1], 10));
const next = existing.length > 0 ? Math.max(...existing) + 1 : 1;

const filename = `screenshot-${next}${label}.png`;
const outputPath = path.join(screenshotDir, filename);

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Users/cristiantuica/.cache/puppeteer/chrome/mac_arm-149.0.7827.22/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2' });

await page.evaluate((sel) => {
  const el = document.querySelector(sel);
  if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
}, selector);
await new Promise(r => setTimeout(r, 400));

await page.screenshot({ path: outputPath, fullPage: false });
await browser.close();

console.log(`Screenshot saved: temporary screenshots/${filename}`);
