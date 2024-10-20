# Autenticación y Autorización con Node.js, Express, JWT y Next.js

Este proyecto es parte de una serie donde aprenderás a configurar y desarrollar un sistema de autenticación y autorización utilizando Node.js, Express, JWT y Next.js. La configuración incluye tanto el backend como el frontend, y se enfoca en la creación de una REST API segura y un frontend funcional con Next.js.

## Introducción

Este repositorio contiene el código para configurar y desarrollar una aplicación de autenticación y autorización. Utilizaremos:

- **Node.js** y **Express** para el backend, creando una REST API.
- **Prisma** como ORM para gestionar nuestra base de datos **SQLite**.
- **JWT (JSON Web Tokens)** para gestionar la autenticación de los usuarios.
- **Next.js** como framework de frontend para construir la interfaz de usuario.

## Requisitos

- **Node.js v20 o superior**
- **npm**, **yarn** o **pnpm** (administrador de paquetes)

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/FranciscoJBrito/auth-node-next.git
   cd auth-node-next
   ```

2. Instala las dependencias para el backend:

   ```bash
   cd backend
   npm install
   ```

3. Instala las dependencias para el frontend:

   ```bash
   cd frontend
   npm install
   ```

### Backend

- **`npm run dev`**: Inicia el servidor en modo desarrollo, observando cambios y cargando variables de entorno desde `.env`.

### Frontend

- **`npm run dev`**: Inicia la aplicación de Next.js en modo desarrollo.

## Configuración del Entorno

Crea un archivo `.env` en la carpeta `backend` con la siguiente configuración para la base de datos SQLite:

```env
DATABASE_URL="file:./dev.db"
```

## Uso

1. Para iniciar el backend:

   ```bash
   cd backend
   npm run dev
   ```

2. Para iniciar el frontend:

   ```bash
   cd ../frontend
   npm run dev
   ```

3. Para ver la aplicación, ingresa a `http://localhost:3000`. La API se encuentra en `http://localhost:8080`.
