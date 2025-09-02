import { PrismaClient } from '@prisma/client';

export async function seedOriginSchools(prisma: PrismaClient) {
  const originSchools = [
    {
      id: '12a1d8e6-a16c-44cc-ad8d-7924fa93bd61',
      name: 'Técnico Ecuador',
      city: 'Cuenca',
      type: 'Fiscal',
    },
    {
      id: '90d30ec0-46e0-4d6c-b4ca-5611fb2444c6',
      name: 'Técnico Ecuador',
      city: 'Quito',
      type: 'Fiscal',
    },
    {
      id: '4480bd3d-d4cb-4e0b-95d0-71a8a193daa1',
      name: 'Benigno Malo',
      city: 'Cuenca',
      type: 'Fiscal',
    },
    {
      id: 'f7499297-7752-4320-982f-226d7de9278f',
      name: 'Camilo Gallegos',
      city: 'Gualaquiza',
      type: 'Fiscal',
    },
    {
      id: '0e3ca8f6-cf3b-476e-9a60-b1738c99227e',
      name: 'Camilo Gallegos',
      city: 'Quito',
      type: 'Fiscal',
    },
    {
      id: 'ba3bd7a7-acb9-4f65-911e-3bc21f6c0236',
      name: 'Borja',
      city: 'Cuenca',
      type: 'Particular',
    },
    {
      id: 'a4c1cc6d-83de-4a9a-83f8-b50fdc55f2c8',
      name: 'Catalinas',
      city: 'Cuenca',
      type: 'Particular',
    },
    {
      id: 'e2d51d68-01f2-4e24-b370-8adb5424759f',
      name: 'Técnico Salesiano',
      city: 'Cuenca',
      type: 'Fiscal',
    },
  ];

  for (const schoolData of originSchools) {
    await prisma.originSchool.upsert({
      where: { id: schoolData.id },
      update: {},
      create: schoolData,
    });
  }

  console.log(`✅ Created ${originSchools.length} origin schools`);
}
