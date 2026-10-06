param(
  [string]$EnvFile = ".env.production",
  [string]$OutDir  = "backups/json"
)

$envContent = Get-Content -LiteralPath $EnvFile -Encoding UTF8
$url  = $envContent | Where-Object { $_ -match '^NEXT_PUBLIC_SUPABASE_URL=' } | ForEach-Object { $_ -replace '^NEXT_PUBLIC_SUPABASE_URL=', '' }
$key  = $envContent | Where-Object { $_ -match '^NEXT_PUBLIC_SUPABASE_ANON_KEY=' } | ForEach-Object { $_ -replace '^NEXT_PUBLIC_SUPABASE_ANON_KEY=', '' }

if (-not $url -or -not $key) {
  Write-Error "Missing NEXT_PUBLIC_SUPABASE_URL or ANON_KEY in $EnvFile"
  exit 1
}

$base = $url.TrimEnd('/')
if (-not (Test-Path -LiteralPath $OutDir)) { New-Item -ItemType Directory -Path $OutDir -Force | Out-Null }

$tables = @("profiles", "categories", "tags", "posts", "courses", "lessons", "comments", "reviews", "tags_on_posts")

foreach ($t in $tables) {
  $uri = "$base/rest/v1/$t`?select=*"
  try {
    $r = Invoke-RestMethod -Uri $uri -Method Get -Headers @{ apikey = $key; Authorization = "Bearer $key" } -ErrorAction Stop
    $rows = if ($r -is [array]) { $r } else { @($r) }
    $out = "$OutDir\$t.json"
    ($rows | ConvertTo-Json -Depth 15) | Set-Content -LiteralPath $out -Encoding UTF8
    Write-Output "$t : $($rows.Count) rows -> $out"
  } catch {
    Write-Warning "$t : SKIPPED ($($_.Exception.Message))"
  }
}

Write-Output "Backup done -> $OutDir"