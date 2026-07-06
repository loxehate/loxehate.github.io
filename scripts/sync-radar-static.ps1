$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$radarRoot = Join-Path $repoRoot 'radar'
$targetRoot = Join-Path $repoRoot 'source/radar'

if (-not (Test-Path -LiteralPath $radarRoot -PathType Container)) {
  throw "Radar project directory not found: $radarRoot"
}

New-Item -ItemType Directory -Force -Path $targetRoot | Out-Null

$files = @('index.html', 'manifest.json', 'feed.xml')
foreach ($file in $files) {
  $source = Join-Path $radarRoot $file
  if (-not (Test-Path -LiteralPath $source -PathType Leaf)) {
    throw "Radar static file not found: $source"
  }
  Copy-Item -LiteralPath $source -Destination (Join-Path $targetRoot $file) -Force
}

$sourceDigests = Join-Path $radarRoot 'digests'
$targetDigests = Join-Path $targetRoot 'digests'
if (-not (Test-Path -LiteralPath $sourceDigests -PathType Container)) {
  throw "Radar digests directory not found: $sourceDigests"
}

if (Test-Path -LiteralPath $targetDigests) {
  $resolvedTarget = (Resolve-Path -LiteralPath $targetDigests).Path
  $expectedPrefix = (Resolve-Path -LiteralPath $targetRoot).Path
  if (-not $resolvedTarget.StartsWith($expectedPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Refusing to remove unexpected path: $resolvedTarget"
  }
  Remove-Item -LiteralPath $targetDigests -Recurse -Force
}
Copy-Item -LiteralPath $sourceDigests -Destination $targetDigests -Recurse -Force

Write-Host "Radar static assets synced to $targetRoot"
