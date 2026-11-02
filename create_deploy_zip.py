import os
import zipfile

out_dir = os.path.abspath('front-end/out')
zip_path = os.path.abspath('athul-frontend-deploy.zip')

if os.path.exists(zip_path):
    os.remove(zip_path)

print(f"Creating {zip_path} from {out_dir}...")

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(out_dir):
        for file in files:
            full_path = os.path.join(root, file)
            # relative path inside zip
            rel_path = os.path.relpath(full_path, out_dir)
            zipf.write(full_path, rel_path)

size_mb = os.path.getsize(zip_path) / (1024 * 1024)
print(f"Deployment ZIP created successfully!")
print(f"Total size: {size_mb:.2f} MB")

