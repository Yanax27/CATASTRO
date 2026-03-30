# Sistema Catastral Web

Sistema web para **consulta y gestión de información catastral**, desarrollado con **React + Vite + TailwindCSS + Redux Toolkit** en el frontend, y **Node.js + Express + SQL Server** en el backend.

El sistema permite:

- autenticación con usuarios internos y roles
- búsqueda de predios por referencia catastral y titular
- visualización de detalle de predios
- control de ubicación física de carpetas
- dashboard con resumen operativo
- control de acceso por rol para edición de ubicación

---

## Tabla de contenido

- [Características principales](#características-principales)
- [Arquitectura general](#arquitectura-general)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Módulos funcionales](#módulos-funcionales)
- [Autenticación y roles](#autenticación-y-roles)
- [Backend](#backend)
- [Frontend](#frontend)
- [Variables de entorno](#variables-de-entorno)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Rutas principales de la API](#rutas-principales-de-la-api)
- [Flujo de trabajo del sistema](#flujo-de-trabajo-del-sistema)
- [Dashboard](#dashboard)
- [Control de carpetas físicas](#control-de-carpetas-físicas)
- [Consideraciones de despliegue](#consideraciones-de-despliegue)
- [Mejoras futuras](#mejoras-futuras)
- [Autor](#autor)

---

## Características principales

### Consulta catastral
- búsqueda de predios por:
  - referencia catastral
  - nombre del titular
- visualización de resultados en:
  - tabla
  - tarjetas responsivas
- detalle de predio con información ampliada

### Gestión documental
- visualización de la ubicación actual de la carpeta física
- edición de ubicación de carpeta para usuarios autorizados
- registro automático de la fecha y hora del cambio de ubicación

### Seguridad
- autenticación con JWT en **cookie HttpOnly**
- sesiones persistentes
- protección de rutas privadas
- autorización por rol:
  - `admin`
  - `user`

### Dashboard
- total de predios
- total por ubicación de carpeta
- registros sin ubicación asignada
- actualizados hoy
- actualizados en los últimos 7 días
- indicadores de utilidad operativa

### Interfaz
- responsive para:
  - móvil
  - tablet
  - escritorio
- soporte para modo:
  - claro
  - oscuro

---

## Arquitectura general

El proyecto está dividido en dos partes:

### Frontend
Aplicación web SPA desarrollada en React, encargada de:
- autenticación de usuario
- navegación
- consultas
- visualización de resultados
- interacción con el dashboard
- edición de ubicación de carpeta según rol

### Backend
API REST desarrollada con Express, encargada de:
- conexión a SQL Server
- autenticación y autorización
- consultas a la base de datos
- actualización de ubicación de carpetas
- generación de resumen para dashboard

---

## Tecnologías utilizadas

### Frontend
- React 18
- Vite
- TailwindCSS
- Redux Toolkit
- React Router DOM
- Axios
- React Toastify
- SweetAlert2
- React Icons
- Leaflet

### Backend
- Node.js
- Express
- SQL Server (`mssql`)
- JWT (`jsonwebtoken`)
- bcryptjs
- cookie-parser
- cors
- dotenv

### Base de datos
- Microsoft SQL Server

---

## Estructura del proyecto

### Frontend

```bash
src/
│
├── api/
│   └── axios.js
│
├── app/
│   └── store.js
│
├── components/
│   └── layout/
│       ├── MainLayout.jsx
│       ├── Navbar.jsx
│       └── Sidebar.jsx
│
├── modules/
│   ├── auth/
│   │   ├── authApi.js
│   │   ├── authActions.js
│   │   ├── authSlice.js
│   │   └── pages/
│   │       └── LoginPage.jsx
│   │
│   └── predios/
│       ├── prediosApi.js
│       ├── predioActions.js
│       ├── predioSlice.js
│       ├── components/
│       │   ├── EditUbicacionModal.jsx
│       │   ├── PredioSearchCard.jsx
│       │   └── PredioSearchTable.jsx
│       └── pages/
│           ├── PrediosSearchPage.jsx
│           └── PredioViewPage.jsx
│
├── pages/
│   └── Dashboard.jsx
│
├── routes/
│   ├── AppRouter.jsx
│   ├── ProtectedRoute.jsx
│   └── PublicRoute.jsx
│
├── App.jsx
├── main.jsx
└── index.css

### Backend

```bash
src/
│
├── app.js
│
├── config/
│   ├── db.js
│   ├── authUsers.js
│   └── validateEnv.js
│
├── controllers/
│   ├── auth.controller.js
│   └── predio.controller.js
│
├── dao/
│   └── predio.dao.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── authorizeRoles.js
│   ├── validateLogin.js
│   ├── validatePredioSearch.js
│   └── validateUpdateUbicCarpeta.js
│
├── routes/
│   ├── index.js
│   ├── auth.routes.js
│   └── predio.routes.js
│
├── services/
│   ├── auth.service.js
│   └── predio.service.js
│
└── utils/
    ├── geojson.js
    └── mapPredioDomains.js
