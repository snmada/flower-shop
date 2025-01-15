'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllProducts({
  category,
  flowers,
  minPrice,
  maxPrice,
  skip,
  take,
  name,
}: {
  category?: string;
  flowers?: string[];
  minPrice?: number;
  maxPrice?: number;
  skip?: number;
  take?: number;
  name?: string;
}) {
  const filterConditions: {
    category?: { name?: string };
    flowers?: { some: { name: { in: string[] } } };
    price?: { gte: number; lte: number };
    name?: { contains: string; mode: 'insensitive' };
  } = {};

  if (category && category !== 'All categories') {
    filterConditions.category = { name: category };
  }

  if (flowers && flowers.length > 0) {
    filterConditions.flowers = {
      some: {
        name: {
          in: flowers,
        },
      },
    };
  }

  if (minPrice && maxPrice) {
    filterConditions.price = {
      gte: minPrice,
      lte: maxPrice,
    };
  }

  if (name) {
    filterConditions.name = { contains: name, mode: 'insensitive' };
  }

  const products = await prisma.product.findMany({
    skip,
    take,
    where: filterConditions,
    include: {
      category: true,
      flowers: true,
    },
    orderBy: {
      name: 'asc',
    }
  });

  const totalProducts = await prisma.product.count({
    where: filterConditions,
  });

  return {
    products: products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category?.name,
      flowers: product.flowers?.map(flower => flower.name),
    })),
    totalProducts,
  } 
}
