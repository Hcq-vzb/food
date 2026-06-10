@echo off
cd /d "%~dp0"
echo Starting local preview server...
echo Open http://localhost:3000 in your browser after it starts.
echo Press Ctrl+C to stop.
npx --yes serve . -l 3000
