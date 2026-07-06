@echo off
setlocal
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -Command "$p=(Resolve-Path '.\index.html').Path -replace '\\','/'; Start-Process ('file:///' + $p + '?visualAudit=1')"
