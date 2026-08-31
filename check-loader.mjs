import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('https://rt-scarfs.vercel.app', { waitUntil: 'networkidle' });
const result = await page.evaluate(() => ({
  mainScript: [...document.scripts].map(s => s.src).filter(Boolean),
}));
console.log(result);

const scriptUrl = result.mainScript.find(src => src.includes('main-'));
if (scriptUrl) {
  const res = await fetch(scriptUrl);
  const text = await res.text();
  console.log('Contains banner code:', text.includes('JS ERROR'));
}

await browser.close();