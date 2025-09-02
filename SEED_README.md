# Database Seeding Documentation

## Configuración del Sistema de Seed

Este proyecto utiliza Prisma para el seeding de la base de datos con datos de prueba. La configuración está diseñada para poblar las siguientes entidades:

### Entidades Incluidas en el Seed

1. **Origin Schools** (8 registros)
   - Colegios de diferentes tipos: Público, Privado, Universitario, Técnico
   - Distribuidos en diferentes ciudades del Perú

2. **Courses Offered** (10 registros)
   - Cursos de programación y tecnología
   - Cada curso con capacidad original y actual

3. **Users** (5 registros)
   - Usuarios básicos del sistema
   - Incluye administrador y usuarios de prueba

4. **Students** (12 registros)
   - Estudiantes con información completa
   - Relacionados con las escuelas de origen

5. **Enrollments** (15 registros)
   - Inscripciones de estudiantes en cursos
   - Diferentes estados: PENDING, APPROVED, REJECTED, CANCELLED, COMPLETED
   - Fechas y tarifas realistas

## Comandos Disponibles

### Ejecutar el Seed
```bash
npm run prisma:seed
```

### Resetear la Base de Datos y Ejecutar Seed
```bash
npm run prisma:reset
```

### Migrar la Base de Datos
```bash
npm run prisma:migrate
```

### Generar Cliente de Prisma
```bash
npm run prisma:generate
```

## Estructura de Archivos

```
prisma/
├── seed.ts              # Archivo principal del seed
├── seeds/               # Directorio con seeds individuales
│   ├── users.seed.ts
│   ├── origin-schools.seed.ts
│   ├── courses-offered.seed.ts
│   ├── students.seed.ts
│   └── enrollments.seed.ts
├── schema.prisma        # Esquema de la base de datos
└── tsconfig.json        # Configuración TypeScript para seeds
```

## Características del Sistema de Seed

### 1. **Idempotencia**
- Utiliza `upsert` para evitar duplicados
- Puede ejecutarse múltiples veces sin problemas

### 2. **Datos Realistas**
- DNIs únicos para estudiantes
- Emails únicos
- Fechas coherentes
- Relaciones consistentes entre entidades

### 3. **Orden de Ejecución**
- Los seeds se ejecutan en orden correcto respetando las dependencias:
  1. Origin Schools (sin dependencias)
  2. Courses Offered (sin dependencias)
  3. Users (sin dependencias)
  4. Students (depende de Origin Schools)
  5. Enrollments (depende de Students y Courses Offered)

### 4. **Logging Detallado**
- Mensajes informativos durante la ejecución
- Conteo de registros creados
- Manejo de errores con mensajes descriptivos

## Personalización

### Agregar Nuevos Seeds

1. Crear un nuevo archivo en `prisma/seeds/`
2. Exportar una función que tome `PrismaClient` como parámetro
3. Importar y llamar la función en `prisma/seed.ts`

Ejemplo:
```typescript
// prisma/seeds/new-entity.seed.ts
import { PrismaClient } from '@prisma/client';

export async function seedNewEntity(prisma: PrismaClient) {
  const data = [
    // ... datos de prueba
  ];

  for (const item of data) {
    await prisma.newEntity.upsert({
      where: { id: item.id },
      update: {},
      create: item,
    });
  }

  console.log(\`✅ Created \${data.length} new entities\`);
}
```

### Modificar Datos Existentes

Los datos de seed están definidos en cada archivo individual. Puedes modificar:
- Cantidad de registros
- Valores específicos
- Relaciones entre entidades

## Consideraciones de Desarrollo

1. **Environment Variables**: Asegúrate de que `DATABASE_URL` esté configurada en `.env`
2. **TypeScript**: Los seeds utilizan TypeScript con configuración específica
3. **Prisma Client**: Se genera automáticamente después de cambios en el schema
4. **Testing**: Los seeds pueden usarse para preparar datos de prueba

## Troubleshooting

### Error: "Property 'modelName' does not exist"
- Ejecutar: `npx prisma generate`

### Error: "Database connection failed"
- Verificar `DATABASE_URL` en `.env`
- Asegurar que la base de datos esté accesible

### Error: "Foreign key constraint"
- Verificar el orden de ejecución de los seeds
- Comprobar que las claves foráneas existan

## Datos de Prueba Incluidos

### Estudiantes Ejemplo
- María Elena González Pérez (DNI: 12345678)
- Carlos Alberto Rodríguez Silva (DNI: 87654321)
- Ana Sofía Martínez López (DNI: 11223344)

### Cursos Disponibles
- Introducción a la Programación (30 cupos)
- Desarrollo Web Frontend (25 cupos)
- Base de Datos Relacionales (20 cupos)

### Estados de Inscripción
- PENDING: Pendiente de aprobación
- APPROVED: Aprobada
- REJECTED: Rechazada
- CANCELLED: Cancelada
- COMPLETED: Completada

---

**Nota**: Los datos del seed son ficticios y están diseñados únicamente para desarrollo y testing.
