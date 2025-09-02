import { PrismaClient } from '@prisma/client';

export async function seedCoursesOffered(prisma: PrismaClient) {
  const coursesOffered = [
    {
      id: '113061ec-0696-4ee7-9f98-4aa1754ebbf6',
      name: 'Medicina',
      originalCapacity: 30,
      currentCapacity: 30,
    },
    {
      id: '44a92b51-ee82-4d0a-a8a2-298859089af4',
      name: 'Desarrollo Web Frontend',
      originalCapacity: 25,
      currentCapacity: 25,
    },
    {
      id: 'e72543ab-db58-4fb7-94ad-baef656d6037',
      name: 'Base de Datos Relacionales',
      originalCapacity: 20,
      currentCapacity: 20,
    },
    {
      id: '07a5eb79-2dec-4404-93c4-3ac031a7722a',
      name: 'Programación Orientada a Objetos',
      originalCapacity: 28,
      currentCapacity: 28,
    },
  ];

  for (const courseData of coursesOffered) {
    await prisma.courseOffered.upsert({
      where: { id: courseData.id },
      update: {},
      create: courseData,
    });
  }

  console.log(`✅ Created ${coursesOffered.length} courses offered`);
}
