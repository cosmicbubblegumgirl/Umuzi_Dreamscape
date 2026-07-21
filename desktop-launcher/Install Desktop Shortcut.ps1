$appName = "Umuzi Dreamscape"
$appUrl = "https://cosmicbubblegumgirl.github.io/Umuzi_Dreamscape/"
$desktopPath = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktopPath "$appName.lnk"
$packagePath = Split-Path -Parent $MyInvocation.MyCommand.Path
$iconPath = Join-Path $packagePath "dreamscape.ico"

$browserCandidates = @(
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe"
)

$browserPath = $browserCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $browserPath) {
  Write-Host "Microsoft Edge or Google Chrome was not found."
  Write-Host "Opening the live app in the default browser instead."
  Start-Process $appUrl
  exit 0
}

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $browserPath
$shortcut.Arguments = "--app=`"$appUrl`""
$shortcut.WorkingDirectory = Split-Path -Parent $browserPath
$shortcut.Description = "Open Umuzi Dreamscape as a desktop browser app."

if (Test-Path $iconPath) {
  $shortcut.IconLocation = $iconPath
}

$shortcut.Save()
Write-Host "Desktop shortcut created: $shortcutPath"
