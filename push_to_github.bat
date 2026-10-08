@echo off
setlocal
echo ========================================================
echo     Kamlesh Bargal Portfolio - Push to GitHub
echo ========================================================
echo.

:: Check if git remote origin is already configured
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo [STEP 1] Please create a new empty repository on GitHub:
    echo          https://github.com/new
    echo.
    echo Recommendation: Name it 'portfolio' or 'kamleshbargal.github.io'
    echo (Do NOT initialize with README, .gitignore or license)
    echo.
    set /p REPO_NAME="Enter your repository name (e.g. portfolio): "
    if "!REPO_NAME!"=="" set REPO_NAME=portfolio

    echo.
    echo Linking remote origin to https://github.com/kamleshbargal/%REPO_NAME%.git ...
    git remote add origin https://github.com/kamleshbargal/%REPO_NAME%.git
) else (
    echo Remote repository already connected:
    git remote -v
)

echo.
echo [STEP 2] Pushing latest code to GitHub main branch...
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   SUCCESS! Your portfolio code is now live on GitHub!
    echo ========================================================
    echo.
    echo Next step to make it a live website:
    echo 1. Go to your repo on github.com
    echo 2. Go to Settings -^> Pages
    echo 3. Under Branch, select 'main' and '/ (root)'
    echo 4. Click Save - your portfolio will have a live public URL!
) else (
    echo.
    echo [NOTE] Push failed. Common reasons:
    echo 1. The repository has not been created yet on GitHub (go to https://github.com/new to create it).
    echo 2. You need to authenticate with your GitHub account / Personal Access Token.
)

echo.
pause
