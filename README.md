# Sistema de Gestión de Inscripciones

API REST desarrollada con NestJS para la gestión de inscripciones estudiantiles. Este sistema permite administrar estudiantes, escuelas de origen, carreras ofrecidas y el proceso completo de inscripción.

## Tecnologías Utilizadas

- **Backend**: NestJS (Framework de Node.js)
- **ORM**: Prisma
- **Base de Datos**: SQLite
- **Lenguaje**: TypeScript
- **Gestor de Paquetes**: pnpm

## Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- pnpm

### Pasos para ejecutar el proyecto

1. **Instalar dependencias**
   ```bash
   pnpm install
   ```

2. **Configurar la base de datos**
   
   El proyecto incluye las migraciones de Prisma ya aplicadas y una base de datos SQLite preconfigurada. Si necesitas reinicializar la base de datos:
   
   ```bash
   pnpm prisma migrate reset
   pnpm prisma db seed
   ```

3. **Ejecutar el proyecto en modo desarrollo**
   ```bash
   pnpm start:dev
   ```

   La API estará disponible en: `http://localhost:3000`

## Consideraciones de Desarrollo

### Archivos de Configuración

- **Archivo .env**: Se incluye en el repositorio únicamente para facilitar la ejecución inmediata del proyecto durante la evaluación. En un entorno productivo, este archivo **nunca** debe ser versionado por motivos de seguridad.

### Base de Datos

- **SQLite**: Se utiliza SQLite con una base de datos local incluida en el proyecto para simplificar la configuración inicial. En un entorno de producción se recomienda utilizar bases de datos más robustas como PostgreSQL, MySQL o MongoDB.

- **Migraciones**: Las migraciones de Prisma están incluidas en el directorio `prisma/migrations/` para facilitar la configuración.

## Estructura del Proyecto

```
src/
├── student/          # Gestión de estudiantes
├── origin-school/    # Gestión de escuelas de origen
├── career-offered/   # Gestión de carreras ofrecidas
├── enrollment/       # Gestión de matrículas
├── common/          # Utilidades compartidas
└── prisma.service.ts # Servicio de conexión a base de datos
```

## Funcionalidades Principales

- **Gestión de Estudiantes**: CRUD completo
- **Gestión de Escuelas**: Administración de instituciones de origen
- **Gestión de Carreras**: Control de capacidad y disponibilidad
- **Sistema de Matrículas**: Proceso completo de inscripción con validaciones

## Scripts Disponibles

- `pnpm start:dev` - Ejecuta el servidor en modo desarrollo
- `pnpm build` - Compila el proyecto para producción
- `pnpm start:prod` - Ejecuta el servidor en modo producción
- `pnpm test` - Ejecuta las pruebas unitarias
- `pnpm test:e2e` - Ejecuta las pruebas end-to-end

## Documentación de la API

Una vez iniciado el servidor, la documentación interactiva de la API está disponible en:
- Swagger UI: `http://localhost:3000/api`

## Consideraciones de Seguridad

Este proyecto está configurado para desarrollo y evaluación. Para uso en producción considere implementar:

- Variables de entorno seguras
- Autenticación y autorización
- Rate limiting
- Validación exhaustiva de datos
- Logging y monitoreo
- Base de datos externa segura

---

*Este proyecto fue desarrollado como parte de una prueba técnica para demostrar conocimientos en NestJS, Prisma y desarrollo de APIs REST.*****
