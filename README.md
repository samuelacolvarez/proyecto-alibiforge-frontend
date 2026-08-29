# AlibiForge — Frontend

Aplicación web donde los estudiantes crean, votan y perfeccionan coartadas
para situaciones académicas. Este repositorio contiene el **frontend**
del proyecto, construido con React + Vite.

> **Primera entrega — Ingeniería Web**
> Parte de Frontend del proyecto AlibiForge.

## Integrantes

- Matías Battistolo Castaño
- Samuel Acosta Álvarez

## Tecnologías utilizadas

- **React 19** — librería de UI
- **Vite** — bundler y servidor de desarrollo
- **React Router DOM v7** — enrutamiento entre páginas
- **ESLint** — linter y reglas de código
- **CSS puro** (sin frameworks tipo Tailwind/Bootstrap) — sistema de diseño
  propio basado en variables CSS y clases reutilizables.
- **react-icons** (set Phosphor) — iconografía
- **Google Fonts**: Special Elite (títulos/sellos), IBM Plex Sans (texto),
  IBM Plex Mono (etiquetas/datos)
- **Fetch API** nativa para las llamadas HTTP (sin axios)

## Estado actual del proyecto

El backend todavía no está implementado. Para poder desarrollar y probar
el frontend de punta a punta sin depender de él, la autenticación y los
datos de coartadas están **simulados (mock) en `localStorage`**:

- `src/context/AuthContext.jsx` simula registro, login, logout y edición
  de perfil.
- `src/api/alibis.js` simula el CRUD de coartadas (crear, listar, editar,
  enviar, sumarse/salir como testigo) con datos semilla incluidos.
  
## Páginas implementadas

### Módulo de Identidad y Creación de Coartadas (Samuel)

- [x] Inicio (landing pública + dashboard con sesión)
- [x] Registro
- [x] Login
- [x] Perfil
- [x] Crear coartada (incluye edición de borradores)
- [x] Detalle de coartada (shell, con hueco para el módulo de votación)
- [x] Mis coartadas
- [x] 404 / No encontrado
- [x] Acceso no autorizado

### Módulo de Votación, Comunidad y Rankings (Matías)

- [x] Situaciones (listado + buscador)
- [x] Detalle de situación (top alibis rankeados)
- [x] Crear situación
- [x] Ranking (Master of Deceit, Most Creative, Most Consistent, Most Wanted)
- [x] Formato de votación 

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Levantar el servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Correr el linter
npm run lint
```
