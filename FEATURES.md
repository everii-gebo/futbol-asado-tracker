# 📱 Fútbol & Asado Tracker - Documentación de Funcionalidades

## 🎯 Objetivo de la App

Reemplazar tu Excel actual con una app móvil fácil de usar que te permite:
- ✅ Registrar partidos de fútbol de los miércoles
- ✅ Trackear equipos (Blancos vs Negros)
- ✅ Guardar resultados (goles)
- ✅ Marcar si hubo asado
- ✅ Ver estadísticas completas por jugador
- ✅ Ver historial de partidos

---

## 📊 Migración desde Excel

### Datos del Excel Original:
Tu Excel actual tiene:
- **Sheet "Futbol"**: Fecha, Se jugó?, jugadores presentes
- **Sheet "Asado"**: Fecha, Hubo asado?, asador, comensales
- **17 jugadores**: Ger, Gaucho, Peter, Turfu, Alejo, Diego, Emi, Fabri, Gabo, Hernan, Monje, Juanfra, Pirlo, Turco, Miqueas, Nata, Yisus

### ¿Qué NO tenía el Excel?
❌ Equipos (Blancos/Negros)
❌ Resultados/Goles
❌ Estadísticas por equipo
❌ Victorias/Derrotas

### Nueva Funcionalidad de la App:
✅ Todo lo del Excel +
✅ Asignación de equipos
✅ Registro de goles y ganadores
✅ Estadísticas automáticas
✅ Interfaz móvil intuitiva

---

## 🎮 Pantallas de la App

### 1️⃣ Nuevo Partido (⚽)

#### Paso 1: Seleccionar Jugadores
- Lista de los 17 jugadores
- Tap para seleccionar quién jugó
- Los seleccionados se marcan en verde
- **Botón "+ Jugador"**: Agrega nuevos jugadores rápidamente

#### Paso 2: Armar Equipos
- **Opción Manual**: 
  - Tap en un jugador bajo "⚪ Blancos" para asignarlo
  - Tap en un jugador bajo "⚫ Negros" para asignarlo
  - Los jugadores aparecen en su equipo correspondiente

- **Opción Auto 🎲**:
  - Divide automáticamente en equipos balanceados
  - Aleatorio y justo
  - Puedes ajustar manualmente después

#### Paso 3: Ingresar Resultado
- Campo para goles de Blancos
- Campo para goles de Negros
- Formato numérico grande y claro

#### Paso 4: Asado
- Switch para marcar si hubo asado
- Si hubo asado → aparece selector de asador
- Lista de jugadores que participaron

#### Guardar
- Botón verde grande "Guardar Partido ✓"
- Validación automática
- Confirmación al guardar

---

### 2️⃣ Historial (📋)

#### Lista de Partidos
Cada tarjeta muestra:
- 📅 Fecha del partido
- 🔥 Badge si hubo asado
- ⚪ X - Y ⚫ Resultado
- Ganador destacado en verde
- 👥 Lista de jugadores por equipo
- 👨‍🍳 Quién fue el asador

#### Acciones
- **Deslizar hacia abajo**: Refresca la lista
- **Botón Eliminar**: Borra un partido (con confirmación)
- **Vista ordenada**: Más recientes primero

---

### 3️⃣ Estadísticas (📊)

#### Ordenamiento
Dos opciones de vista:
1. **Por Partidos**: Jugadores con más partidos primero
2. **Por % Victoria**: Mejor win rate primero

#### Tarjeta por Jugador
Muestra:

**Header:**
- Nombre del jugador
- Badge con % de victorias total

**Totales:**
- Total de partidos jugados
- Total de victorias

**Por Equipo:**
- ⚪ **Blancos**:
  - Partidos jugados con Blancos
  - Victorias con Blancos
  - % de victorias con Blancos

- ⚫ **Negros**:
  - Partidos jugados con Negros
  - Victorias con Negros
  - % de victorias con Negros

#### Ejemplo de Stat Card:
```
┌─────────────────────────────────┐
│ Peter           [75% victorias] │
├─────────────────────────────────┤
│   12 Partidos    9 Victorias    │
├─────────────────────────────────┤
│ ⚪ Blancos    │  ⚫ Negros      │
│ 6 partidos    │  6 partidos     │
│ 5 victorias   │  4 victorias    │
│ (83%)         │  (67%)          │
└─────────────────────────────────┘
```

---

### 4️⃣ Jugadores (👥)

#### Vista de Jugadores
Lista numerada de todos los jugadores:
- **Número**: Posición en la lista
- **Nombre**: Nombre del jugador
- **Botón 🗑️**: Eliminar jugador

#### Agregar Jugador
1. Toca el botón "+ Agregar" (esquina superior derecha)
2. Se abre un modal
3. Ingresa el nombre del jugador
4. Toca "Agregar" o "Cancelar"
5. El jugador se agrega inmediatamente
6. Aparece disponible en todas las pantallas

#### Eliminar Jugador
1. Toca el ícono 🗑️ junto al jugador
2. Confirmación: "¿Eliminar a [nombre]?"
3. Nota: "Esto no afectará partidos anteriores"
4. Confirma o cancela

#### Consideraciones Importantes
- **Eliminar NO borra stats**: Los partidos anteriores se mantienen
- **Sin límite**: Agrega tantos jugadores como necesites
- **Orden alfabético automático**: Se ordenan automáticamente
- **Persistencia**: Los cambios se guardan inmediatamente
- **Sincronización**: Los cambios se reflejan en todas las pantallas

#### Dos Formas de Agregar
1. **Desde pestaña Jugadores**: 
   - Gestión completa
   - Ver todos los jugadores
   - Agregar y eliminar

2. **Desde Nuevo Partido**:
   - Botón "+ Jugador" 
   - Agrega sin cambiar de pantalla
   - Útil durante el registro de partidos

---

## 💾 Almacenamiento de Datos

### Estructura de Datos

#### Match (Partido):
```javascript
{
  id: "1705432800000",
  date: "2026-01-15T19:00:00.000Z",
  whiteTeam: ["Ger", "Peter", "Alejo", "Emi", "Gabo"],
  blackTeam: ["Gaucho", "Turfu", "Diego", "Fabri", "Hernan"],
  whiteGoals: 5,
  blackGoals: 3,
  hadAsado: true,
  asador: "Fabri"
}
```

#### Players (Jugadores):
```javascript
[
  "Ger", "Gaucho", "Peter", "Turfu", "Alejo", 
  "Diego", "Emi", "Fabri", "Gabo", "Hernan",
  "Monje", "Juanfra", "Pirlo", "Turco", 
  "Miqueas", "Nata", "Yisus"
]
```

### Persistencia
- **AsyncStorage**: Datos locales en el dispositivo
- **Sin conexión requerida**: 100% offline
- **Persistente**: Los datos se mantienen entre sesiones

---

## 🎨 Diseño Visual

### Colores
- **Verde principal**: #4CAF50 (botones, victorias)
- **Naranja**: #FF9800 (auto-balance)
- **Rojo**: #FF5722 (asado)
- **Amarillo**: #FFC107 (empates)
- **Gris claro**: #f5f5f5 (backgrounds)
- **Negro**: #424242 (equipo negro)

### Iconos
- ⚽ Partido nuevo
- 📋 Historial
- 📊 Estadísticas
- ⚪ Equipo Blancos
- ⚫ Equipo Negros
- 🔥 Asado
- 👨‍🍳 Asador
- 🎲 Auto-balance
- ✓ Guardar

---

## 🔄 Flujo Típico de Uso

### Día del Partido (Miércoles)

1. **Antes del Partido**:
   - Abrir app
   - Ir a "Nuevo Partido"
   - Seleccionar jugadores presentes
   - Usar "Auto 🎲" para armar equipos
   - (Opcional) Ajustar equipos manualmente

2. **Después del Partido**:
   - Ingresar goles finales
   - Marcar si hubo asado
   - Seleccionar asador si corresponde
   - Guardar partido

3. **Ver Resultados**:
   - Ir a "Historial" para ver el partido recién guardado
   - Ir a "Estadísticas" para ver cómo afectó las stats

---

## 📈 Cálculo de Estadísticas

### Victorias Totales
```
victorias_totales = victorias_con_blancos + victorias_con_negros
```

### Porcentaje de Victoria
```
% victoria = (victorias_totales / partidos_totales) × 100
```

### Win Rate por Equipo
```
% victoria blancos = (victorias_con_blancos / partidos_con_blancos) × 100
% victoria negros = (victorias_con_negros / partidos_con_negros) × 100
```

### Ejemplo:
Si Peter jugó:
- 6 partidos con Blancos → ganó 5 → 83% win rate blancos
- 6 partidos con Negros → ganó 4 → 67% win rate negros
- **Total**: 12 partidos, 9 victorias → **75% win rate**

---

## 🚀 Ventajas vs Excel

| Feature | Excel | App |
|---------|-------|-----|
| Acceso móvil | ❌ Difícil | ✅ Nativo |
| Equipos | ❌ No | ✅ Sí |
| Resultados | ❌ No | ✅ Sí |
| Stats auto | ❌ Manual | ✅ Automático |
| UI intuitiva | ❌ Tablas | ✅ Visual |
| Offline | ✅ Sí | ✅ Sí |
| Validación | ❌ No | ✅ Sí |
| Auto-balance | ❌ No | ✅ Sí |
| Gestión jugadores | ❌ Manual | ✅ En la app |
| Agregar jugadores | ❌ Editar Excel | ✅ Un toque |

---

## 🎯 Casos de Uso Especiales

### ¿Qué pasa si...?

**...alguien no puede jugar?**
→ No lo selecciones en el primer paso

**...los equipos quedaron desbalanceados?**
→ Usa el botón "Auto 🎲" o ajusta manualmente

**...no hubo asado?**
→ Deja el switch en OFF, no es obligatorio

**...olvidé registrar un partido?**
→ La fecha se guarda automáticamente cuando registras

**...quiero ver quién gana más?**
→ Ve a Estadísticas y ordena por "% Victoria"

**...quiero ver partidos anteriores?**
→ Ve a Historial, están ordenados por fecha

**...quiero borrar un partido mal cargado?**
→ En Historial, toca "🗑️ Eliminar"

**...viene un jugador nuevo?**
→ Ve a "Jugadores" y toca "+ Agregar", o usa "+ Jugador" en Nuevo Partido

**...un jugador ya no juega más?**
→ Ve a "Jugadores", toca 🗑️ junto a su nombre. Sus partidos anteriores se mantienen

**...eliminé un jugador por error?**
→ Vuelve a agregarlo con el mismo nombre. Sus stats antiguas se mantienen separadas

---

## 📱 Compatibilidad

- ✅ iOS 12+
- ✅ Android 5.0+
- ✅ Funciona offline
- ✅ No requiere cuenta
- ✅ No requiere conexión
- ✅ Gratis, sin ads

---

## 🔮 Posibles Mejoras Futuras

1. **Goles individuales**: Trackear quién metió cada gol
2. **Racha de victorias**: "Peter ganó 5 partidos seguidos"
3. **MVP del mes**: Mejor jugador del mes
4. **Exportar a Excel**: Backup de datos
5. **Fotos**: Agregar fotos de cada partido
6. **Comentarios**: Notas sobre jugadas destacadas
7. **Sincronización**: Compartir datos entre dispositivos
8. **Notificaciones**: "¡Mañana es miércoles de fútbol!"
9. **Predicción**: "Este equipo tiene 70% chances de ganar"
10. **Fútbol fantasy**: Puntos por performance

---

¡Disfruta la app! ⚽🔥
