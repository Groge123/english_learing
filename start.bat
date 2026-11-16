@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo 没有找到 Node.js。请先安装 Node.js 18+，再双击本文件。
  echo.
  pause
  exit /b 1
)
echo.
echo 正在启动「砚台 · 考研英语作文工坊」...
echo 关闭这个窗口即可停止服务。
echo.
node server.js
pause
