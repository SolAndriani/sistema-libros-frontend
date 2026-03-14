# Sistema de Gestión de Libros — Frontend

Interfaz web desarrollada con **React** y **Vite**.  
Autora: Sol Andriani · 2025

---

## Tecnologías

- React 18
- Vite
- React Router DOM (enrutamiento)
- Axios (llamadas HTTP)
- Context API (manejo de estado de sesión)

---

## Requisitos previos

- Node.js 18 o superior instalado
- El backend corriendo en `http://localhost:8000`

---

## Instalación y ejecución local

### 1. Clonar el repositorio

git clone https://github.com/SolAndriani/sistema-libros-frontend
cd sistema-libros-frontend


### 2. Instalar dependencias

npm install


### 3. Configurar variables de entorno

cp .env.example .env

Editar `.env` con la URL del backend.

### 4. Iniciar la aplicación

npm run dev

La aplicación queda disponible en: `http://localhost:5173`

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

VITE_API_URL=http://localhost:8000

---

## Estructura del proyecto

src/
├── App.jsx                 # Rutas y estructura principal
├── index.css               # Estilos globales y variables CSS
├── context/
│   └── AuthContext.jsx     # Estado de autenticación (Context API)
├── services/
│   └── api.js              # Configuración de Axios e interceptores
└── components/
    ├── BooksTable.jsx      # Tabla paginada de libros
    ├── LoginForm.jsx       # Formulario de login
    └── RegisterForm.jsx    # Formulario de registro

---

## Funcionalidades

- Registro e inicio de sesión con email y contraseña
- Sesión persistente: al recargar la página se mantiene el login
- Listado de libros con paginación (10 por página)
- Agregar, editar y eliminar libros
- Confirmación antes de eliminar
- Rutas protegidas: redirige al login si no hay sesión activa
- Cierre de sesión con borrado de token