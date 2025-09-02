import { PrismaClient } from '@prisma/client';

export async function seedCoursesOffered(prisma: PrismaClient) {
  const careersOffered = [
    {
      id: '113061ec-0696-4ee7-9f98-4aa1754ebbf6',
      name: 'Medicina',
      originalCapacity: 25,
      currentCapacity: 24,
    },
    {
      id: '44a92b51-ee82-4d0a-a8a2-298859089af4',
      name: 'Ingeniería Civil',
      originalCapacity: 14,
      currentCapacity: 13,
    },
    {
      id: 'e72543ab-db58-4fb7-94ad-baef656d6037',
      name: 'Software',
      originalCapacity: 16,
      currentCapacity: 14,
    },
    {
      id: '07a5eb79-2dec-4404-93c4-3ac031a7722a',
      name: 'Administración de Empresas',
      originalCapacity: 30,
      currentCapacity: 27,
    },
  ];

  for (const careerData of careersOffered) {
    await prisma.careerOffered.upsert({
      where: { id: careerData.id },
      update: {},
      create: careerData,
    });
  }

  console.log(`✅ Created ${careersOffered.length} courses offered`);
}
