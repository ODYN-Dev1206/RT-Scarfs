from pathlib import Path
import re

root = Path(r"c:\Users\HP-PC\Desktop\Dev Ops\RT Scarfs")
html_path = root / "shop.html"
blog_dir = root / "Blog Scarfs"

html = html_path.read_text(encoding="utf-8")

existing_images = set()
for src in re.findall(r'<img[^>]+src="([^"]+)"', html):
    if src.startswith("Blog Scarfs/"):
        existing_images.add(src.split("/", 1)[1])

files = sorted(
    p.name for p in blog_dir.iterdir()
    if p.is_file() and p.name not in existing_images
)

print(f"Existing blog images in shop: {len(existing_images)}")
print(f"New images to add: {len(files)}")

if not files:
    print("No new images to add.")
    raise SystemExit(0)

cards = []
for file_name in files:
    stem = Path(file_name).stem
    title = re.sub(r"[-_]+", " ", stem).title()
    slug = re.sub(r"[^a-z0-9]+", "-", stem.lower()).strip("-") or "product"
    cards.append(
        f'''          <article class="product-card">
            <a href="product.html?id={slug}">
              <div class="product-card-image">
                <img src="Blog Scarfs/{file_name}" alt="{title}">
              </div>
              <h3 class="product-card__name">{title}</h3>
              <p class="product-card__price">Price: &nbsp;$120</p>
            </a>
            <button type="button" class="buy-prod" data-id="{slug}">Add</button>
          </article>'''
    )

marker = '<section class="shop-grid">'
start_index = html.index(marker)
end_index = html.index('</section>', start_index)

insert_block = '\n' + '\n'.join(cards) + '\n'
html = html[:end_index] + insert_block + html[end_index:]
html_path.write_text(html, encoding="utf-8")
print(f"Inserted {len(cards)} cards into shop.html")
