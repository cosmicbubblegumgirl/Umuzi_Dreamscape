@echo off
setlocal

set "APP_URL=https://cosmicbubblegumgirl.github.io/Umuzi_Dreamscape/"
set "EDGE_X64=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
set "EDGE_X86=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
set "CHROME_X64=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
set "CHROME_X86=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"

if exist "%EDGE_X64%" (
  start "" "%EDGE_X64%" --app="%APP_URL%"
  exit /b 0
)

if exist "%EDGE_X86%" (
  start "" "%EDGE_X86%" --app="%APP_URL%"
  exit /b 0
)

if exist "%CHROME_X64%" (
  start "" "%CHROME_X64%" --app="%APP_URL%"
  exit /b 0
)

if exist "%CHROME_X86%" (
  start "" "%CHROME_X86%" --app="%APP_URL%"
  exit /b 0
)

start "" "%APP_URL%"
