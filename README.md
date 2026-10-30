# AlibiForge — Frontend (Entrega Final) 

Aplicación web donde los estudiantes crean, votan y perfeccionan coartadas para situaciones académicas. Este repositorio contiene el **frontend** (React + Vite) del Proyecto 4 de Ingeniería Web.

## URLs públicas

| Servicio | URL |
|---|---|
| Frontend (Vercel) |https://proyecto-alibiforge-frontend.vercel.app|
| Backend (Render) | https://proyecto-alibiforge-backend.onrender.com |
| Documentación de la API | https://proyecto-alibiforge-backend.onrender.com/docs |
| Repositorio del backend | https://github.com/samuelacolvarez/proyecto-alibiforge-backend |

 
## Credenciales de prueba

| Rol | Email | Contraseña |
|---|---|---|
| Usuario estándar | `mente@eia.edu.co` | `password123` |
| Administrador | `admin@alibiforge.com` | `Admin12345` |

## Integrantes

- Matías Battistolo Castaño
- Samuel Acosta Álvarez

## Tecnologías

- **React 19** y **Vite**
- **React Router DOM v7** (rutas públicas, privadas y de administrador)
- **Redux Toolkit + React Redux** (`alibisSlice` y `communitySlice`)
- **Socket.io Client** (chat en vivo)
- **Fetch API** con un cliente central (`src/api/client.js`)
- **ESLint**, **CSS puro** con variables, **react-icons** (Phosphor) y Google Fonts (Special Elite, IBM Plex)

## Integración con el backend

No hay datos simulados: toda la información viene de la API real.

- `src/api/client.js`: URL desde `VITE_API_URL`, adjunta el JWT en el header `Authorization` y convierte las respuestas de error en mensajes para la interfaz (hace el papel de interceptor).
- `src/api/auth.js`, `alibis.js`, `community.js`, `admin.js`: una función por endpoint.
- `src/context/AuthContext.jsx`: registro, login, logout, perfil y sesión; el token se guarda en `localStorage` (`alibiforge_token`).
- `src/store/`: estado global con Redux Toolkit.
- `src/socket.js` y `src/context/SocketContext.jsx`: chat autenticado con el token.

## Roles y rutas

| Ruta | Acceso |
|---|---|
| `/`, `/login`, `/register`, `/situations`, `/situations/:id`, `/rankings`, `/coartadas/:id` | Público |
| `/perfil`, `/mis-coartadas`, `/coartadas/nueva`, `/situations/new`, `/live` | Usuario con sesión |
| `/admin` | Solo administrador (panel de moderación: eliminar coartadas y situaciones, ver usuarios) |

Votar, reportar, crear coartadas o situaciones requiere sesión. Si no hay sesión, la interfaz lo indica; el servidor además responde 401/403.

## Instalación y uso local

```bash
npm install
cp .env.example .env.local     # PowerShell: Copy-Item .env.example .env.local
npm run dev                    # http://localhost:5173
npm run build                  # compilar para producción
npm run lint                   # linter
```

Necesitas el backend corriendo (`http://localhost:4000`) o apuntar `VITE_API_URL` al de Render. Vite lee las variables al arrancar: si las cambias, reinicia `npm run dev`.

| Variable | Valor |
|---|---|
| `VITE_API_URL` (local) | `http://localhost:4000` |
| `VITE_API_URL` (producción) | `https://proyecto-alibiforge-backend.onrender.com` |

## Despliegue en Vercel

1. Importar el repositorio en Vercel (framework: Vite, se detecta solo).
2. Variable de entorno: `VITE_API_URL=https://proyecto-alibiforge-backend.onrender.com`.
3. `vercel.json` reescribe todas las rutas a `index.html` para que React Router funcione al recargar.
4. En Render, `CORS_ORIGIN` debe incluir la URL de Vercel.


**Administración:** Panel `/admin`.

## Estructura

```
src/
├── api/          # Cliente HTTP y llamadas a la API
├── components/   # Componentes reutilizables
├── context/      # AuthContext y SocketContext
├── pages/        # Páginas (live/ para el chat, AdminPanel)
├── store/        # Redux Toolkit: store y slices
├── styles/       # Estilos globales
└── utils/        # Constantes
```
