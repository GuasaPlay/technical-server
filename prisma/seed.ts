import { PrismaClient } from '@prisma/client';
import { seedCoursesOffered } from './seeds/courses-offered.seed';
import { seedEnrollments } from './seeds/enrollments.seed';
import { seedOriginSchools } from './seeds/origin-schools.seed';
import { seedStudents } from './seeds/students.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Orden de seeding importante debido a las relaciones
    console.log('Seeding Origin Schools...');
    await seedOriginSchools(prisma);

    console.log('Seeding Courses Offered...');
    await seedCoursesOffered(prisma);

    console.log('Seeding Students...');
    await seedStudents(prisma);

    console.log('Seeding Enrollments...');
    await seedEnrollments(prisma);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
