import os
from PIL import Image

def optimize_image(src_path, dest_path, max_w, max_h, quality=80):
    try:
        with Image.open(src_path) as img:
            has_alpha = img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info)
            if has_alpha:
                img = img.convert("RGBA")
            else:
                img = img.convert("RGB")
                
            w, h = img.size
            scale = min(max_w / w, max_h / h, 1.0)
            if scale < 1.0:
                new_w = int(w * scale)
                new_h = int(h * scale)
                img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                
            img.save(dest_path, "WEBP", quality=quality, method=5)
            
            orig_sz = os.path.getsize(src_path)
            new_sz = os.path.getsize(dest_path)
            print(f"Optimized: {os.path.basename(src_path)} ({orig_sz//1024} KB) -> {os.path.basename(dest_path)} ({new_sz//1024} KB)")
            return orig_sz, new_sz
    except Exception as e:
        print(f"Error optimizing {src_path}: {e}")
        return 0, 0

total_orig = 0
total_new = 0

# 1. Optimize Hero & Background images in public/
public_dir = "front-end/public"
big_images = [
    ("hero-desk.png", "hero-desk.webp", 1920, 1080, 82),
    ("hero-mobile.png", "hero-mobile.webp", 750, 1000, 82),
    ("download-bg.png", "download-bg.webp", 1920, 1080, 80),
    ("new-download-bg.png", "new-download-bg.webp", 1920, 1080, 80),
    ("downloads-mobile-bg.png", "downloads-mobile-bg.webp", 750, 1000, 80),
    ("downloads-mobile-bg-v2.png", "downloads-mobile-bg-v2.webp", 750, 1000, 80),
    ("athul-logo.png", "athul-logo.webp", 600, 200, 90),
]

for orig, dest, mw, mh, q in big_images:
    p_orig = os.path.join(public_dir, orig)
    p_dest = os.path.join(public_dir, dest)
    if os.path.exists(p_orig):
        o, n = optimize_image(p_orig, p_dest, mw, mh, q)
        total_orig += o
        total_new += n

# 2. Optimize Services images in public/services/
services_dir = "front-end/public/services"
if os.path.exists(services_dir):
    for f in os.listdir(services_dir):
        if f.lower().endswith((".jpg", ".jpeg", ".png")):
            name, _ = os.path.splitext(f)
            p_orig = os.path.join(services_dir, f)
            p_dest = os.path.join(services_dir, f"{name}.webp")
            o, n = optimize_image(p_orig, p_dest, 800, 500, 78)
            total_orig += o
            total_new += n

print(f"\n==========================================")
print(f"TOTAL BEFORE: {total_orig / (1024*1024):.2f} MB")
print(f"TOTAL AFTER:  {total_new / (1024*1024):.2f} MB")
print(f"BANDWIDTH SAVED: {((total_orig - total_new) / total_orig) * 100:.1f}%")
print(f"==========================================")

