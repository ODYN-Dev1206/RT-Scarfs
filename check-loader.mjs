import { chromium } from 'playwright';

async function run(page) {
  await page.waitForTimeout(2500);
  return await page.evaluate(() => ({
    url: window.location.href,
    loader: document.querySelector('.site-loader')?.className,
    pointerEvents: document.querySelector('.site-loader') && getComputedStyle(document.querySelector('.site-loader')).pointerEvents,
    innerWidth: window.innerWidth,
    userAgent: navigator.userAgent,
  }));
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 }, // desktop-mode reported width
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  isMobile: false,
  hasTouch: true, // still a real touchscreen phone underneath
});
await page.goto('https://rt-scarfs.vercel.app');
const result = await run(page);
console.log(result);
await browser.close();