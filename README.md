# Frontend - Prueba Técnica

Este es el cliente del frontend desarrollado con **React**, **TypeScript**, **Vite** y **TailwindCSS**.

## Requisitos

- **Node.js**: Versión 20+ o 22+.

## Configuración y Ejecución (Local)

1. **Instalar dependencias**:

   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   Copia el archivo de ejemplo y configura la URL de la API del backend:

   ```bash
   cp .env.example .env
   ```

   _Por defecto apunta a `http://localhost:3000/api/v1`._

3. **Iniciar en modo desarrollo**:
   Levanta la aplicación en el puerto `5173` (http://localhost:5173):
   ```bash
   npm run dev
   ```

## Scripts Disponibles

- `npm run dev` - Levantar servidor local de desarrollo.
- `npm run build` - Compilar y empaquetar la aplicación para producción.
- `npm run lint` - Analizar el código en busca de problemas de sintaxis o estilo.
