# Patrón Repository - Servicio de Persona

## Descripción

Este proyecto implementa el patrón Repository para el manejo de datos de personas de forma clara y sencilla. El patrón Repository proporciona una capa de abstracción entre la lógica de negocio y la capa de acceso a datos.

## Estructura de Archivos

```
src/person/
├── interfaces/
│   └── person-repository.interface.ts     # Interfaz del repositorio
├── repositories/
│   └── person.repository.ts                # Implementación del repositorio con Prisma
├── entities/
│   └── person.entity.ts                    # Entidad Person
├── dto/
│   ├── create-person.dto.ts                # DTO para crear persona
│   └── update-person.dto.ts                # DTO para actualizar persona
├── person.controller.ts                    # Controlador REST
├── person.service.ts                       # Servicio con lógica de negocio
├── person.module.ts                        # Módulo de NestJS
└── index.ts                                # Exportaciones del módulo
```

## Componentes Principales

### 1. Interfaz del Repositorio (IPersonRepository)

Define el contrato que debe cumplir cualquier implementación del repositorio:

```typescript
export interface IPersonRepository {
  create(createPersonDto: CreatePersonDto): Promise<Person>;
  findAll(): Promise<Person[]>;
  findById(id: string): Promise<Person | null>;
  findByEmail(email: string): Promise<Person | null>;
  update(id: string, updatePersonDto: UpdatePersonDto): Promise<Person>;
  delete(id: string): Promise<Person>;
  exists(id: string): Promise<boolean>;
}
```

### 2. Implementación del Repositorio (PersonRepository)

Implementa la interfaz usando Prisma ORM:

- ✅ Operaciones CRUD completas
- ✅ Búsqueda por ID y email
- ✅ Verificación de existencia
- ✅ Manejo de errores de base de datos

### 3. Servicio (PersonService)

Contiene la lógica de negocio:

- ✅ Validaciones de negocio (email único)
- ✅ Manejo de excepciones personalizadas
- ✅ Uso del repositorio através de la interfaz

### 4. Entidad (Person)

Representa el modelo de datos:

```typescript
export class Person {
  id: string;
  email: string;
  name: string;
  status: boolean;
}
```

### 5. DTOs (Data Transfer Objects)

- `CreatePersonDto`: Validaciones para creación de persona
- `UpdatePersonDto`: Validaciones para actualización (campos opcionales)

## Ventajas de esta Implementación

### 🔧 Separación de Responsabilidades
- **Repositorio**: Solo se encarga del acceso a datos
- **Servicio**: Contiene la lógica de negocio
- **Controlador**: Maneja las peticiones HTTP

### 🧪 Facilidad para Testing
- El repositorio puede ser fácilmente mockeado en las pruebas
- La interfaz permite inyección de dependencias de prueba

### 🔄 Flexibilidad
- Cambiar de Prisma a otro ORM solo requiere una nueva implementación del repositorio
- La lógica de negocio permanece intacta

### 📝 Mantenibilidad
- Código organizado y fácil de entender
- Cada componente tiene una responsabilidad específica

## Uso

### Crear una persona
```typescript
const newPerson = await personService.create({
  email: 'juan@example.com',
  name: 'Juan Pérez',
  status: true
});
```

### Buscar todas las personas
```typescript
const persons = await personService.findAll();
```

### Buscar por ID
```typescript
const person = await personService.findOne('uuid-here');
```

### Actualizar una persona
```typescript
const updatedPerson = await personService.update('uuid-here', {
  name: 'Juan Carlos Pérez'
});
```

### Eliminar una persona
```typescript
const deletedPerson = await personService.remove('uuid-here');
```

## Configuración del Módulo

El módulo está configurado con inyección de dependencias:

```typescript
@Module({
  controllers: [PersonController],
  providers: [
    PersonService,
    PrismaService,
    {
      provide: 'IPersonRepository',
      useClass: PersonRepository,
    },
  ],
  exports: [PersonService],
})
export class PersonModule {}
```

## Validaciones de Negocio

- ✅ Email único en el sistema
- ✅ Validación de existencia antes de actualizar/eliminar
- ✅ Validaciones de formato de datos con class-validator

## Manejo de Errores

- `NotFoundException`: Cuando no se encuentra una persona
- `ConflictException`: Cuando el email ya está en uso
- Validaciones automáticas con class-validator en los DTOs
