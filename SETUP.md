# 🚀 Guía Rápida de Instalación

## Opción 1: Desarrollo con Expo Go (Recomendado)

### En tu computadora:

1. **Instala Node.js** (si no lo tienes):
   - Descarga desde: https://nodejs.org/
   - Versión recomendada: 18.x o superior

2. **Abre una terminal y ejecuta:**
   ```bash
   # Instala Expo CLI globalmente
   npm install -g expo-cli

   # Navega al proyecto
   cd futbol-asado-tracker

   # Instala dependencias
   npm install

   # Inicia el proyecto
   npm start
   ```

### En tu celular:

3. **Instala Expo Go**:
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

4. **Escanea el código QR**:
   - iOS: Usa la cámara del iPhone
   - Android: Usa la app Expo Go para escanear

¡Listo! La app se cargará en tu teléfono.

---

## Opción 2: Build Standalone (App Nativa)

Para crear una app instalable:

### iOS:
```bash
expo build:ios
```
Necesitarás una cuenta de Apple Developer ($99/año)

### Android:
```bash
expo build:android
```
Genera un archivo .apk que puedes instalar directamente

---

## Solución de Problemas Comunes

### ❌ "Command not found: expo"
```bash
npm install -g expo-cli
```

### ❌ "Network error"
- Asegúrate de que tu computadora y celular estén en la misma red WiFi
- Desactiva temporalmente el firewall/antivirus

### ❌ "Cannot connect to Metro"
```bash
# Limpia caché y reinicia
expo start -c
```

### ❌ Errores de dependencias
```bash
# Elimina node_modules y reinstala
rm -rf node_modules
npm install
```

---

## Comandos Útiles

```bash
# Iniciar en modo desarrollo
npm start

# Abrir en iOS simulator
npm run ios

# Abrir en Android emulator
npm run android

# Ver logs
expo start --dev-client

# Limpiar caché
expo start -c
```

---

## Requisitos Mínimos

- **Sistema Operativo**: macOS, Windows, o Linux
- **Node.js**: v16.0.0 o superior
- **RAM**: 4GB mínimo (8GB recomendado)
- **Espacio**: ~500MB para dependencias

---

## ¿Necesitas Ayuda?

1. Revisa la documentación de Expo: https://docs.expo.dev/
2. Asegúrate de tener la última versión de Node.js
3. Intenta reiniciar el servidor con `expo start -c`

---

## Primer Uso

Una vez instalada la app:

1. ✅ La app viene con los 17 jugadores pre-cargados
2. 🎮 Ve a "Nuevo Partido" para registrar tu primer partido
3. 📊 Las estadísticas se generan automáticamente
4. 💾 Los datos se guardan localmente en tu dispositivo

¡A jugar! ⚽🔥
