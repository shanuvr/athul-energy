$ProgressPreference = 'SilentlyContinue'
Add-Type -AssemblyName System.IO.Compression.FileSystem

$backendDir = Join-Path (Get-Location) 'back-end'
$tempDir = Join-Path (Get-Location) 'scratch\backend_staging'
$zipPath = Join-Path (Get-Location) 'athul-backend-deploy.zip'

if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy code folders
$folders = @('config', 'controller', 'middleware', 'model', 'routes', 'utils')
foreach ($f in $folders) {
    Copy-Item -Path (Join-Path $backendDir $f) -Destination (Join-Path $tempDir $f) -Recurse
}

# Ensure media folders with .gitkeep
$mediaSubdirs = @('blog', 'clients', 'downloads', 'gallery')
foreach ($sub in $mediaSubdirs) {
    $subPath = Join-Path $tempDir "media\$sub"
    New-Item -ItemType Directory -Path $subPath -Force | Out-Null
    Set-Content -Path (Join-Path $subPath '.gitkeep') -Value ''
}

# Copy root files
$rootFiles = @('package.json', 'package-lock.json', 'server.js', 'seedAdmin.js', '.env.production.example')
foreach ($file in $rootFiles) {
    $srcFile = Join-Path $backendDir $file
    if (Test-Path $srcFile) {
        Copy-Item -Path $srcFile -Destination (Join-Path $tempDir $file)
    }
}

# NOTE: We deliberately do NOT pack .env into the zip so future backend extractions 
# will never overwrite or erase your working database password on cPanel!

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

[System.IO.Compression.ZipFile]::CreateFromDirectory($tempDir, $zipPath)

Remove-Item $tempDir -Recurse -Force

Get-Item $zipPath | Select-Object Name, Length, LastWriteTime

