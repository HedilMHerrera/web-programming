## Proyecto: Web Programming (Backend)

## Descripción

Este repositorio contiene un backend en Node.js para el proyecto de programación web. Está diseñado como una API ligera basada en Express, con conexión a MongoDB mediante Mongoose. Incluye configuración básica de ESLint, scripts de desarrollo y despliegue, y estructura modular por controladores, rutas y modelos.

## Características principales

- API REST construida con Express
- Conexión a MongoDB con Mongoose
- Protección básica con Helmet y CORS
- Logging con Morgan
- Scripts de desarrollo (nodemon) y linting (ESLint)

## Requisitos

- Node.js 16+ (recomendado)
- npm 8+ o Yarn
- MongoDB (local o servicio en la nube)

## Instalación (Windows - PowerShell)

1. Clona el repositorio y sitúate en la carpeta del backend:

```powershell
cd C:\Users\User\Documents\VSCode\prgrmcn-web\web-programming\Backend
```

2. Instala dependencias:

```powershell
npm install
```

3. Crea un archivo `.env` en `Backend` (si usas variables de entorno). Ejemplo mínimo:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/mi-base-datos
```

## Scripts útiles

- Iniciar en modo producción:

```powershell
npm start
```

- Ejecutar en modo desarrollo (con nodemon):

```powershell
npm run dev
```

- Ejecutar ESLint (lint):

```powershell
npm run lint
```

- Ejecutar ESLint y aplicar correcciones automáticas:

```powershell
npm run lint:fix
```

## Variables de entorno

- `PORT` — puerto en el que corre la API (por defecto 4000)
- `MONGO_URI` — cadena de conexión a MongoDB

Coloca estas variables en un archivo `.env` en la raíz de `Backend` o en tu entorno.

## Linting y estilo de código

Este proyecto incluye configuración de ESLint. Usa el script `npm run lint` para comprobar la base de código. Si prefieres formateo automático, se puede integrar Prettier y añadir un script `format`.

Notas:
- Si tu ESLint está configurado en modo "flat" (`eslint.config.mjs`), asegúrate de que la versión de ESLint instalada soporte esa forma. En caso de conflicto (por ejemplo, `env` o `extends` no soportados), revisa la configuración y usa la variante clásica (`.eslintrc.cjs`) o usa `FlatCompat`.

## Contribución

1. Haz un fork del repositorio.
2. Crea una rama para tu feature o bugfix: `git checkout -b feat/nombre-feature`.
3. Realiza tus cambios.
4. Ejecuta linters y pruebas localmente.
5. Abre un pull request describiendo los cambios.

## Buenas prácticas y recomendaciones

- Mantén las variables sensibles fuera del repositorio (usa `.env` y/o secretos de CI).
- Añade documentación mínima para cada endpoint nuevo en `README` o en un archivo `docs/`.

## Licencia

Este proyecto está bajo la licencia ISC (ver `package.json`).

# web-programming