$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$radarRoot = Join-Path $repoRoot 'radar'

if (-not (Test-Path -LiteralPath $radarRoot -PathType Container)) {
  throw "Radar project directory not found: $radarRoot"
}

Push-Location $radarRoot
try {
  node scripts/export-astro.mjs
}
finally {
  Pop-Location
}
