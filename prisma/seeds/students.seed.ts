import { PrismaClient } from '@prisma/client';

export async function seedStudents(prisma: PrismaClient) {
  const students = [
    {
      id: '1',
      dni: '12345678',
      names: 'María Elena',
      surnames: 'González Pérez',
      email: 'maria.gonzalez@email.com',
      originSchoolId: '1',
    },
    {
      id: '2',
      dni: '87654321',
      names: 'Carlos Alberto',
      surnames: 'Rodríguez Silva',
      email: 'carlos.rodriguez@email.com',
      originSchoolId: '2',
    },
    {
      id: '3',
      dni: '11223344',
      names: 'Ana Sofía',
      surnames: 'Martínez López',
      email: 'ana.martinez@email.com',
      originSchoolId: '3',
    },
    {
      id: '4',
      dni: '44332211',
      names: 'Luis Fernando',
      surnames: 'Sánchez Torres',
      email: 'luis.sanchez@email.com',
      originSchoolId: '4',
    },
    {
      id: '5',
      dni: '55667788',
      names: 'Carmen Rosa',
      surnames: 'Herrera Díaz',
      email: 'carmen.herrera@email.com',
      originSchoolId: '5',
    },
    {
      id: '6',
      dni: '99887766',
      names: 'José Miguel',
      surnames: 'Vargas Mendoza',
      email: 'jose.vargas@email.com',
      originSchoolId: '1',
    },
    {
      id: '7',
      dni: '13579246',
      names: 'Patricia Isabel',
      surnames: 'Castro Ruiz',
      email: 'patricia.castro@email.com',
      originSchoolId: '6',
    },
    {
      id: '8',
      dni: '24681357',
      names: 'Ricardo Andrés',
      surnames: 'Morales Vega',
      email: 'ricardo.morales@email.com',
      originSchoolId: '7',
    },
    {
      id: '9',
      dni: '36925814',
      names: 'Claudia Alejandra',
      surnames: 'Jiménez Flores',
      email: 'claudia.jimenez@email.com',
      originSchoolId: '8',
    },
    {
      id: '10',
      dni: '74185296',
      names: 'Fernando José',
      surnames: 'Ramírez Ortega',
      email: 'fernando.ramirez@email.com',
      originSchoolId: '2',
    },
    {
      id: '11',
      dni: '85296374',
      names: 'Gabriela María',
      surnames: 'Delgado Campos',
      email: 'gabriela.delgado@email.com',
      originSchoolId: '3',
    },
    {
      id: '12',
      dni: '96374185',
      names: 'Roberto Carlos',
      surnames: 'Navarro Reyes',
      email: 'roberto.navarro@email.com',
      originSchoolId: '4',
    },
  ];

  for (const studentData of students) {
    await prisma.student.upsert({
      where: { id: studentData.id },
      update: {},
      create: studentData,
    });
  }

  console.log(`✅ Created ${students.length} students`);
}
