import { PrismaClient } from '@prisma/client';

export async function seedStudents(prisma: PrismaClient) {
  const students = [
    {
      id: '07346830-03c5-48fa-bf4f-a860972a338a',
      dni: '0106179450',
      names: 'OSCAR ROMARIO',
      surnames: 'CALLE SAQUICELA',
      email: 'oscarrcs123@gmail.com',
      originSchoolId: '12a1d8e6-a16c-44cc-ad8d-7924fa93bd61',
    },
    {
      id: 'c7445401-a21b-4f5e-90a3-51d5ad729df3',
      dni: '0924699945',
      names: 'CARLOS ALBERTO',
      surnames: 'RODRÍGUEZ SILVA',
      email: 'carlos.rodriguez@email.com',
      originSchoolId: '4480bd3d-d4cb-4e0b-95d0-71a8a193daa1',
    },
    {
      id: '9efddc29-808b-4a8a-b49d-79b1858e6c91',
      dni: '0101470961',
      names: 'ANA SOFÍA',
      surnames: 'MARTÍNEZ LÓPEZ',
      email: 'ana.martinez@email.com',
      originSchoolId: 'e2d51d68-01f2-4e24-b370-8adb5424759f',
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
