@echo off
echo.
echo 🚀 Configurando Futbol ^& Asado Tracker...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js no esta instalado
    echo 📥 Descarga Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% detectado

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm no esta instalado
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✅ npm %NPM_VERSION% detectado

REM Install Expo CLI if not present
where expo >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo 📦 Instalando Expo CLI...
    call npm install -g expo-cli
) else (
    echo ✅ Expo CLI ya esta instalado
)

REM Install project dependencies
echo.
echo 📦 Instalando dependencias del proyecto...
call npm install

if %errorlevel% equ 0 (
    echo.
    echo ✅ ¡Instalacion completada exitosamente!
    echo.
    echo 🎯 Proximos pasos:
    echo    1. Instala 'Expo Go' en tu celular
    echo    2. Ejecuta: npm start
    echo    3. Escanea el codigo QR con tu celular
    echo.
    echo 📱 Descarga Expo Go:
    echo    iOS: https://apps.apple.com/app/expo-go/id982107779
    echo    Android: https://play.google.com/store/apps/details?id=host.exp.exponent
    echo.
    echo ¿Quieres iniciar la app ahora? (S/N)
    set /p response=
    if /i "%response%"=="S" (
        call npm start
    )
) else (
    echo.
    echo ❌ Hubo un error durante la instalacion
    echo 💡 Intenta ejecutar: rmdir /s /q node_modules ^&^& npm install
)

pause
