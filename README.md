# ⚽ Fútbol & Asado Tracker

React Native app para registrar partidos de fútbol de los miércoles y asados con amigos.

## 🎯 Características

### ✅ Registro de Partidos
- Seleccionar jugadores presentes
- Asignar jugadores a equipos Blancos/Negros
- Función de auto-balance aleatorio
- Registrar resultado (goles por equipo)
- Marcar si hubo asado
- Seleccionar quién fue el asador
- Agregar nuevos jugadores sobre la marcha

### 📋 Historial
- Ver todos los partidos jugados
- Fecha, resultado, equipos
- Indicador de asado
- Eliminar partidos

### 📊 Estadísticas
- Estadísticas por jugador:
  - Total de partidos jugados
  - Partidos con Blancos vs Negros
  - Victorias por equipo
  - Porcentaje de victorias general
- Ordenar por partidos o % de victorias

### 👥 Gestión de Jugadores
- Ver lista completa de jugadores
- Agregar nuevos jugadores
- Eliminar jugadores
- Agregar jugadores rápidamente desde "Nuevo Partido"

## 🚀 Instalación

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app en tu teléfono (iOS/Android)

### Pasos

1. **Navegar al directorio del proyecto:**
```bash
cd futbol-asado-tracker
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo:**
```bash
npm start
# o
expo start
```

4. **Ejecutar en tu dispositivo:**
- Escanea el código QR con la app Expo Go (Android) o con la cámara (iOS)
- O presiona:
  - `i` para iOS simulator
  - `a` para Android emulator

## 📱 Uso

### Registrar un Nuevo Partido

1. Ve a la pestaña "⚽ Partido"
2. **Selecciona jugadores** que jugaron (tap sobre sus nombres)
3. **Arma los equipos:**
   - Toca jugadores para asignarlos a Blancos o Negros
   - O usa el botón "Auto 🎲" para balance aleatorio
4. **Ingresa el resultado** (goles de cada equipo)
5. **Marca si hubo asado** y selecciona el asador
6. Presiona "Guardar Partido ✓"

### Ver Historial

1. Ve a la pestaña "📋 Historial"
2. Desliza hacia abajo para refrescar
3. Toca "🗑️ Eliminar" para borrar un partido

### Ver Estadísticas

1. Ve a la pestaña "📊 Estadísticas"
2. Usa los botones de ordenamiento:
   - **Partidos**: Ordena por cantidad de partidos
   - **% Victoria**: Ordena por porcentaje de victorias
3. Ve stats detalladas por equipo de cada jugador

### Gestionar Jugadores

1. Ve a la pestaña "👥 Jugadores"
2. **Ver todos los jugadores**: Lista numerada con todos los jugadores
3. **Agregar jugador**: 
   - Toca el botón "+ Agregar"
   - Ingresa el nombre
   - Confirma
4. **Eliminar jugador**:
   - Toca el ícono 🗑️ junto al jugador
   - Confirma la eliminación
   - Nota: Esto NO afecta partidos anteriores
5. **Agregar rápido desde Nuevo Partido**:
   - En la pestaña "Partido", toca "+ Jugador"
   - Agrega el jugador sin cambiar de pantalla

## 🎨 Estructura del Proyecto

```
futbol-asado-tracker/
├── App.js                      # Navegación principal
├── screens/
│   ├── NewMatchScreen.js       # Pantalla nuevo partido
│   ├── HistoryScreen.js        # Pantalla historial
│   ├── StatsScreen.js          # Pantalla estadísticas
│   └── PlayersScreen.js        # Pantalla gestión jugadores
├── utils/
│   └── storage.js              # Manejo de datos con AsyncStorage
├── package.json
├── app.json
└── babel.config.js
```

## 💾 Almacenamiento de Datos

Los datos se guardan localmente en el dispositivo usando AsyncStorage:

- **Jugadores**: Lista de nombres
- **Partidos**: Fecha, equipos, resultado, asado

Los datos persisten entre sesiones de la app.

## 🔧 Personalización

### Agregar/Gestionar Jugadores

**Opción 1: Desde la App (Recomendado)**
1. Ve a la pestaña "👥 Jugadores"
2. Toca "+ Agregar" para agregar nuevos jugadores
3. Usa 🗑️ para eliminar jugadores que ya no juegan

**Opción 2: Desde Código**
Edita el array `DEFAULT_PLAYERS` en `utils/storage.js`:

```javascript
const DEFAULT_PLAYERS = [
  'Ger', 'Gaucho', 'Peter', 'Turfu', 'Alejo', 'Diego', 'Emi', 
  'Fabri', 'Gabo', 'Hernan', 'Monje', 'Juanfra', 'Pirlo', 
  'Turco', 'Miqueas', 'Nata', 'Yisus',
  // Agrega más jugadores aquí
];
```

**Nota**: Los jugadores por defecto solo se cargan la primera vez que abres la app.

### Cambiar Colores

Edita los colores en los archivos de pantalla:
- Verde principal: `#4CAF50`
- Naranja asado: `#FF5722`
- Amarillo empate: `#FFC107`

## 📦 Build para Producción

### Para iOS:
```bash
expo build:ios
```

### Para Android:
```bash
expo build:android
```

## 🛠️ Tecnologías Utilizadas

- **React Native** - Framework móvil
- **Expo** - Plataforma de desarrollo
- **React Navigation** - Navegación entre pantallas
- **AsyncStorage** - Almacenamiento local
- **JavaScript** - Lenguaje de programación

## 📝 Notas

- La app funciona 100% offline
- Los datos se guardan localmente en cada dispositivo
- No hay sincronización entre dispositivos (por ahora)

## 🎉 Próximas Características (Ideas)

- [ ] Exportar datos a Excel
- [ ] Compartir resultados por WhatsApp
- [ ] Gráficos de rendimiento
- [ ] Sistema de notificaciones
- [ ] Sincronización en la nube
- [ ] Racha de victorias
- [ ] MVP del mes
- [ ] Registro de goles individuales

## 👥 Jugadores Actuales

Ger, Gaucho, Peter, Turfu, Alejo, Diego, Emi, Fabri, Gabo, Hernan, Monje, Juanfra, Pirlo, Turco, Miqueas, Nata, Yisus

---

¡Disfruta registrando tus partidos! ⚽🔥
