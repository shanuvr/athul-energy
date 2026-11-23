"""
Post-build script: Flatten Next.js 16 RSC Segment files for static Apache hosting.

Next.js 16 (output: "export") generates RSC prefetch segment files in a directory structure:
  out/ROUTE/__next.TOKEN/SUB/PATH/__PAGE__.txt

But the browser requests them as a flat dot-notation filename:
  /ROUTE/__next.TOKEN.SUB.PATH.__PAGE__.txt

This script creates a flat copy at the expected URL path so Apache can serve them.
Run this AFTER `npm run build` and BEFORE packaging the zip.
"""

import os
import shutil
from pathlib import Path

out_dir = Path(__file__).parent.parent / "front-end" / "out"

if not out_dir.exists():
    print(f"ERROR: out/ directory not found at {out_dir}")
    exit(1)

created = 0
skipped = 0

# Walk the entire out directory looking for __next.TOKEN directories (not __next._ prefix)
for dirpath, dirnames, filenames in os.walk(out_dir):
    current_dir = Path(dirpath)

    for dirname in list(dirnames):
        # Only process directories like __next.!... or __next.ABC... (not __next._full etc.)
        if not dirname.startswith("__next."):
            continue
        # Skip plain metadata dirs like __next._not-found (they use underscore after dot)
        if dirname.startswith("__next._"):
            continue

        seg_dir = current_dir / dirname
        route_dir = current_dir  # the route directory where the flat file should land

        # Walk all files inside this segment directory recursively
        for file_dirpath, _, seg_files in os.walk(seg_dir):
            for filename in seg_files:
                file_path = Path(file_dirpath) / filename

                # Relative path from inside the segment directory
                rel_path = file_path.relative_to(seg_dir)

                # Convert path separators to dots: dashboard/gallery/__PAGE__.txt -> dashboard.gallery.__PAGE__.txt
                dot_parts = str(rel_path).replace("\\", "/").replace("/", ".")

                # Flat filename: __next.TOKEN.sub.path.__PAGE__.txt
                flat_name = f"{dirname}.{dot_parts}"
                flat_path = route_dir / flat_name

                if flat_path.exists():
                    skipped += 1
                    continue

                shutil.copy2(file_path, flat_path)
                print(f"  Created: {flat_path.relative_to(out_dir)}")
                created += 1

print(f"\nDone! Created {created} flat RSC segment file(s), skipped {skipped} existing.")
