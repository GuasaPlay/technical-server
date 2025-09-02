import { PrismaClient } from '@prisma/client';

export async function seedEnrollments(prisma: PrismaClient) {
  const enrollments = [
    {
      id: 'd2159917-3cc5-4488-a0c3-e5b634109464',
      enrollmentFee: 97,
      studentId: '07346830-03c5-48fa-bf4f-a860972a338a',
      careerOfferedId: '113061ec-0696-4ee7-9f98-4aa1754ebbf6',
    },
    {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      enrollmentFee: 97,
      studentId: '07346830-03c5-48fa-bf4f-a860972a338a',
      careerOfferedId: 'e72543ab-db58-4fb7-94ad-baef656d6037',
    },
    {
      id: 'b2c3d4e5-f6g7-8901-bcde-f23456789012',
      enrollmentFee: 97,
      studentId: 'c7445401-a21b-4f5e-90a3-51d5ad729df3',
      careerOfferedId: '44a92b51-ee82-4d0a-a8a2-298859089af4',
    },
    {
      id: 'c3d4e5f6-g7h8-9012-cdef-345678901234',
      enrollmentFee: 97,
      studentId: 'c7445401-a21b-4f5e-90a3-51d5ad729df3',
      careerOfferedId: '07a5eb79-2dec-4404-93c4-3ac031a7722a',
    },
    {
      id: 'd4e5f6g7-h8i9-0123-defg-456789012345',
      enrollmentFee: 97,
      studentId: '9efddc29-808b-4a8a-b49d-79b1858e6c91',
      careerOfferedId: 'e72543ab-db58-4fb7-94ad-baef656d6037',
    },
    {
      id: 'e5f6g7h8-i9j0-1234-efgh-567890123456',
      enrollmentFee: 97,
      studentId: '9efddc29-808b-4a8a-b49d-79b1858e6c91',
      careerOfferedId: '07a5eb79-2dec-4404-93c4-3ac031a7722a',
    },
    {
      id: 'f6g7h8i9-j0k1-2345-fghi-678901234567',
      enrollmentFee: 97,
      studentId: '07346830-03c5-48fa-bf4f-a860972a338a',
      careerOfferedId: '07a5eb79-2dec-4404-93c4-3ac031a7722a',
    },
  ];

  for (const enrollmentData of enrollments) {
    await prisma.enrollment.upsert({
      where: { id: enrollmentData.id },
      update: {},
      create: enrollmentData,
    });
  }

  console.log(`✅ Created ${enrollments.length} enrollments`);
}
