# 📝 Changelog

Historial de cambios de Fútbol & Asado Tracker

---

## [1.1.0] - 2026-01-14

### ✨ Nuevas Funcionalidades
- **Gestión de Jugadores**: Nueva pestaña "👥 Jugadores"
  - Ver lista completa de jugadores
  - Agregar nuevos jugadores con un toque
  - Eliminar jugadores (sin afectar partidos anteriores)
  - Vista numerada con contador total

- **Agregar Jugador Rápido**: 
  - Botón "+ Jugador" en pantalla "Nuevo Partido"
  - Modal para agregar jugadores sin cambiar de pantalla
  - Útil cuando viene un jugador nuevo el día del partido

### 🎨 Mejoras de UI
- Botón "+ Agregar" destacado en pestaña Jugadores
- Modal mejorado con validación de nombres
- Confirmación antes de eliminar jugadores
- Actualización automática de listas al agregar/eliminar

### 📦 Cambios Técnicos
- Nueva función `removePlayer()` en storage.js
- Nueva pantalla `PlayersScreen.js`
- Navegación con 4 pestañas (agregada pestaña Jugadores)
- Validación de jugadores duplicados

---

## [1.0.0] - 2026-01-14

### 🎉 Lanzamiento Inicial

#### Funcionalidades Principales
- **Nuevo Partido**:
  - Selección de jugadores
  - Asignación a equipos (Blancos/Negros)
  - Auto-balance aleatorio
  - Registro de goles
  - Marcador de asado
  - Selección de asador

- **Historial**:
  - Lista de partidos anteriores
  - Vista detallada de cada partido
  - Eliminar partidos
  - Pull to refresh

- **Estadísticas**:
  - Stats por jugador
  - Partidos por equipo
  - Victorias por equipo
  - Porcentaje de victorias
  - Ordenamiento múltiple

#### Jugadores Iniciales
17 jugadores pre-cargados:
- Ger, Gaucho, Peter, Turfu, Alejo, Diego, Emi
- Fabri, Gabo, Hernan, Monje, Juanfra, Pirlo
- Turco, Miqueas, Nata, Yisus

#### Tecnologías
- React Native + Expo
- React Navigation (Bottom Tabs)
- AsyncStorage para persistencia
- Funciona 100% offline

---

## 🔮 Próximas Versiones

### En Desarrollo
- [ ] Exportar datos a Excel/CSV
- [ ] Compartir resultados por WhatsApp
- [ ] Gráficos de rendimiento
- [ ] Tema oscuro

### Ideas Futuras
- [ ] Goles individuales por jugador
- [ ] Racha de victorias
- [ ] MVP del mes
- [ ] Fotos de partidos
- [ ] Notificaciones de recordatorio
- [ ] Sincronización en la nube
- [ ] Múltiples grupos/canchas

---

## 📋 Notas de Versión

### Versión 1.1.0
**Disponible**: Enero 14, 2026  
**Tamaño**: ~2.5 MB  
**Compatibilidad**: iOS 12+, Android 5.0+

**Características destacadas**:
- ✅ Gestión completa de jugadores
- ✅ Agregar jugadores sobre la marcha
- ✅ 100% offline
- ✅ Sin límite de jugadores

**Migración desde v1.0.0**:
- Los datos existentes se mantienen
- Los jugadores pre-cargados siguen disponibles
- No requiere reinstalación

---

## 🐛 Bugs Corregidos

### v1.1.0
- N/A (primera versión con gestión de jugadores)

### v1.0.0
- N/A (lanzamiento inicial)

---

## 🙏 Agradecimientos

Gracias a todos los jugadores del grupo de fútbol de los miércoles por probar la app y dar feedback!

---

## 📞 Soporte

¿Encontraste un bug o tienes una sugerencia?
- 📧 Contacta al desarrollador
- 🐛 Reporta issues
- 💡 Sugiere nuevas features

---

**Última actualización**: Enero 14, 2026
