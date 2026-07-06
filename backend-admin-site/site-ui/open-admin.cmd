@echo off
setlocal
set "SITE_DIR=%~dp0"
set "ADMIN_INDEX=%SITE_DIR%..\admin-ui\index.html"
if exist "%ADMIN_INDEX%" (
  start "" "%ADMIN_INDEX%"
) else (
  echo Admin UI index not found: %ADMIN_INDEX%
  echo Make sure admin-ui exists at C:\Users\User\Desktop\superapp\admin-ui
  pause
)
