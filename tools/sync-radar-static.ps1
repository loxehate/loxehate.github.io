$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$radarRoot = Join-Path $repoRoot 'radar'

if (-not (Test-Path -LiteralPath $radarRoot -PathType Container)) {
  throw "Radar project directory not found: $radarRoot"
}

Push-Location $radarRoot
try {
  node scripts/export-hexo.mjs
}
finally {
  Pop-Location
}
