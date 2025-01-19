'use server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllFlowers() {
  try {
    const flowers = await prisma.flower.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      }
    });

    return flowers;

  } catch (error) {
    console.error('Error fetching flowers:', error);
    return [];
  }
}
