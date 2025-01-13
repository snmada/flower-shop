'use server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        name: true,
      },
      orderBy: {
        name: 'asc',
      }
    });

    return categories.map(category => category.name);
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
