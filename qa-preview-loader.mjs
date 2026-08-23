export default async function run(page) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(2500);
  return await page.evaluate(() => ({
    url: window.location.href,
    loader: document.querySelector('.site-loader')?.className,
    pointerEvents: document.querySelector('.site-loader') && getComputedStyle(document.querySelector('.site-loader')).pointerEvents,
    favicon: document.querySelector('link[rel="icon"]')?.href,
    logo: document.querySelector('.site-loader__logo')?.getAttribute('src'),
    mainScript: [...document.scripts].map((script) => script.src).filter(Boolean)
  }));
}
