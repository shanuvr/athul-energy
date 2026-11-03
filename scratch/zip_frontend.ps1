$ProgressPreference = 'SilentlyContinue'
Add-Type -AssemblyName System.IO.Compression.FileSystem

$sourceDir = Join-Path (Get-Location) 'front-end\out'
$zipPath = Join-Path (Get-Location) 'frontend-public_html.zip'

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

[System.IO.Compression.ZipFile]::CreateFromDirectory($sourceDir, $zipPath)

Get-Item $zipPath | Select-Object Name, Length, LastWriteTime

