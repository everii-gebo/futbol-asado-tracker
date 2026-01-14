#!/bin/bash

echo "🚀 Configurando Fútbol & Asado Tracker..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "📥 Descarga Node.js desde: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado"
    exit 1
fi

echo "✅ npm $(npm -v) detectado"

# Install Expo CLI if not present
if ! command -v expo &> /dev/null; then
    echo "📦 Instalando Expo CLI..."
    npm install -g expo-cli
else
    echo "✅ Expo CLI ya está instalado"
fi

# Install project dependencies
echo ""
echo "📦 Instalando dependencias del proyecto..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ¡Instalación completada exitosamente!"
    echo ""
    echo "🎯 Próximos pasos:"
    echo "   1. Instala 'Expo Go' en tu celular"
    echo "   2. Ejecuta: npm start"
    echo "   3. Escanea el código QR con tu celular"
    echo ""
    echo "📱 Descarga Expo Go:"
    echo "   iOS: https://apps.apple.com/app/expo-go/id982107779"
    echo "   Android: https://play.google.com/store/apps/details?id=host.exp.exponent"
    echo ""
    echo "¿Quieres iniciar la app ahora? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]; then
        npm start
    fi
else
    echo ""
    echo "❌ Hubo un error durante la instalación"
    echo "💡 Intenta ejecutar: rm -rf node_modules && npm install"
fi
