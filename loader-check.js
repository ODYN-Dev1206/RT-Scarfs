const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:4173/product.html?id=product-201');
  await page.waitForTimeout(1000);
  console.log('initial-url=' + page.url());

  const collectionCard = page.locator('.revolver-item').first();
  await collectionCard.click({ timeout: 10000 });
  await page.waitForTimeout(1200);
  console.log('after-click-url=' + page.url());

  await page.goBack();
  await page.waitForTimeout(2000);

  const info = await page.evaluate(() => {
    const el = document.querySelector('.site-loader');
    if (!el) return { exists: false, url: location.href };
    const cs = getComputedStyle(el);
    return {
      exists: true,
      url: location.href,
      className: el.className,
      opacity: cs.opacity,
      visibility: cs.visibility,
      pointerEvents: cs.pointerEvents,
      display: cs.display
    };
  });

  console.log(JSON.stringify(info));
  await browser.close();
})();
