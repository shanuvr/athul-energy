import os
import zipfile

def create_backend_zip():
    base_dir = r"c:\programers\athul-energy\back-end"
    output_zip = r"c:\programers\athul-energy\athul-backend-deploy.zip"
    
    print(f"Creating {output_zip} from {base_dir}...")
    
    exclude_dirs = {"node_modules", ".git"}
    exclude_files = {".env", "package-lock.json"} # Linux cPanel generates its own fresh lockfile
    
    count = 0
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Include .env.production.example as .env.example
        example_env = os.path.join(base_dir, ".env.production.example")
        if os.path.exists(example_env):
            zipf.write(example_env, ".env.example")
            count += 1
            
        for root, dirs, files in os.walk(base_dir):
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            for file in files:
                if file in exclude_files:
                    continue
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, base_dir)
                zipf.write(file_path, arcname)
                count += 1
                
    size_mb = os.path.getsize(output_zip) / (1024 * 1024)
    print(f"Backend ZIP created successfully! ({count} files, {size_mb:.2f} MB)")

if __name__ == "__main__":
    create_backend_zip()

