# Builds the dashboard into a single self-contained HTML file.
#
# Why a single file: the dashboard is published as a Claude Artifact, whose
# Content-Security-Policy blocks every external fetch. No CDN, no web fonts,
# no image hosts, no data API. Everything - markup, styles, logic and the
# full dataset - has to arrive in one document. That constraint shapes the
# whole codebase: company marks are drawn procedurally on canvas rather than
# loaded as images, and typography uses system font stacks only.
#
# Inputs
#   src/app.html        markup, CSS and application logic. Contains the marker
#                       /*__DATA__*/ where the dataset is injected.
#   src/data/*.js       the dataset, as plain `const` declarations rather than
#                       ES modules - they are concatenated and inlined, so
#                       there is no module loader to resolve imports.
#
# Load order matters: core.js defines THEMES, OPERATORS, HUBS and REGIONS that
# the later layers reference by id.
#
# Outputs (git-ignored - regenerate rather than commit)
#   build/index.html        standalone page. Open this locally; it is also what
#                           GitHub Pages serves, which is why it is index.html
#                           rather than radar.html.
#   build/radar.body.html   content only, no document wrapper - this is what
#                           gets published as a Claude Artifact.
#
# Usage:  .\build.ps1

$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path

$app = Get-Content (Join-Path $here 'src\app.html') -Raw -Encoding UTF8

$layers = @(
  'core.js',        # themes, operators, roles, geography, headline ventures
  'seedlings.js',   # funds + smaller ventures, compact rows
  'regional.js',    # the eight-region research layer, with provenance fields
  'seed-rounds.js', # verified pre-seed and seed rounds
  'niches.js'       # niche taxonomy, classification rules, exposure map
)

$parts = foreach ($layer in $layers) {
  $path = Join-Path $here "src\data\$layer"
  if (-not (Test-Path $path)) { throw "Missing data layer: src\data\$layer" }
  Get-Content $path -Raw -Encoding UTF8
}
$data = $parts -join "`r`n"

if ($app -notmatch [regex]::Escape('/*__DATA__*/')) {
  throw "src\app.html is missing the /*__DATA__*/ marker - nowhere to inject the dataset."
}

# Literal replace, not -replace: the dataset contains $ and backslashes that a
# regex replacement would interpret as capture-group and escape syntax.
$body = $app.Replace('/*__DATA__*/', $data)

$outDir = Join-Path $here 'build'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$utf8 = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText((Join-Path $outDir 'radar.body.html'), $body, $utf8)

$html = @"
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Founder Radar</title>
<style>*{margin:0}html,body{background:#080a12}</style>
</head>
<body>
$body
</body>
</html>
"@
$htmlPath = Join-Path $outDir 'index.html'
[System.IO.File]::WriteAllText($htmlPath, $html, $utf8)

$kb = [math]::Round((Get-Item $htmlPath).Length / 1KB)
Write-Host "Built build/index.html and build/radar.body.html ($kb KB) from $($layers.Count) data layers"
