'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllProducts({
  name,
  category,
  flowers,
  minPrice,
  maxPrice,
  skip,
  take,
  sortCriteria,
}: {
  name?: string;
  category?: string;
  flowers?: string[];
  minPrice?: number;
  maxPrice?: number;
  skip?: number;
  take?: number;
  sortCriteria?: string;
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
    filterConditions.name = { contains: name.trim(), mode: 'insensitive' };
  }

  let criteria: any = {};

  switch (sortCriteria) {
    case 'price-asc':
      criteria = { price: 'asc' };
      break;
    case 'price-desc':
      criteria = { price: 'desc' };
      break;
    case 'a-z':
      criteria = { name: 'asc' };
      break;
    case 'z-a':
      criteria = { name: 'desc' };
      break;
    default:
      criteria = { name: 'asc' }; 
  }
  
  const products = await prisma.product.findMany({
    skip,
    take,
    where: filterConditions,
    include: {
      category: true,
      flowers: true,
    },
    orderBy: criteria,
  });

  const totalProducts = await prisma.product.count({
    where: filterConditions,
  });

  return {
    products: products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      stock: product.stock,
      category: product.category?.name,
      flowers: product.flowers?.map(flower => flower.name),
    })),
    totalProducts,
  } 
}

export async function createProduct({
  name,
  description,
  imageUrl,
  price,
  stock,
  category,
  flowers,
}: {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  stock: number;
  category: string;
  flowers: { id: string; name: string }[];
}) {
  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl, 
      price,
      stock,
      category: {
        connect: {
          id: category,
        },
      },
      flowers: {
        connect: flowers.map(flower => ({ id: flower.id })),
      },
    },
  });
  return {
    message: 'Product created successfully',
  };
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      flowers: true,
    },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    imageUrl: product.imageUrl,
    price: product.price,
    stock: product.stock,
    category: {
      id: product.category.id,
      name: product.category.name,
    },
    flowers: product.flowers.map(flower => ({
      id: flower.id,
      name: flower.name,
    })),
  };
}

export async function updateProduct({
  id,
  name,
  description,
  imageUrl,
  price,
  stock,
  category,
  flowers,
}: {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  stock: number;
  category: string;
  flowers: { id: string; name: string }[];
}) {
  await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      imageUrl,
      price,
      stock,
      category: {
        connect: {
          id: category,
        },
      },
      flowers: {
        set: [],
        connect: flowers.map(flower => ({ id: flower.id })),
      },
    },
  });

  return {
    message: 'Product updated successfully',
  };
}

export async function deleteProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  await prisma.product.delete({
    where: { id },
  });

  return {
    message: 'Product deleted successfully',
  };
}

export async function getFeaturedProducts() {
  const featuredProducts = await prisma.product.findMany({
    where: {
      isFeatured: true, 
    },
    include: {
      category: true,
      flowers: true,
    },
  });

  return {
    featuredProducts: featuredProducts.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      stock: product.stock,
      category: product.category?.name,
      flowers: product.flowers?.map(flower => flower.name),
    })),
  } 
}

export async function updateFeaturedProducts(productIds: string[]) {
  await prisma.product.updateMany({
    data: { 
      isFeatured: false,
    },
  });

  await prisma.product.updateMany({
    where: {
      id: { 
        in: productIds,
      },
    },
    data: { 
      isFeatured: true,
    },
  });

  return {
    message: 'Featured products updated successfully',
  };
}
