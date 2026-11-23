$ProgressPreference = 'SilentlyContinue'
Add-Type -AssemblyName System.IO.Compression.FileSystem

$sourceDir = Join-Path (Get-Location) 'front-end\out'
$zipPath = Join-Path (Get-Location) 'frontend-public_html.zip'

# Run the RSC segment flattening script (fixes Next.js 16 __PAGE__.txt 404s on Apache)
Write-Host "Flattening RSC segment files for Apache static hosting..."
python (Join-Path (Get-Location) 'scratch\flatten_rsc_segments.py')

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

[System.IO.Compression.ZipFile]::CreateFromDirectory($sourceDir, $zipPath)

Get-Item $zipPath | Select-Object Name, Length, LastWriteTime

