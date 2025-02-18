'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { uploadToS3, deleteFromS3 } from '@/lib/aws-s3';

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
      image: product.image,
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
  imageData,
  price,
  stock,
  category,
  flowers,
}: {
  name: string;
  description: string;
  imageData: File | string;
  price: number;
  stock: number;
  category: string;
  flowers: { id: string; name: string }[];
}) {
  let image;
  let uploadedImage;

  try {
    if (typeof imageData === 'string') {
      image = imageData;
    } else if (imageData instanceof File) {
      image = await uploadToS3(imageData);
      uploadedImage = image;
    }
  
    await prisma.product.create({
      data: {
        name,
        description,
        image,
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
      success: true,
      message: 'The product has been successfully added to the database.',
    };
  } catch (error) {
    if (uploadedImage) {
      try {
        await deleteFromS3(uploadedImage);
      } catch (cleanupError) {
        console.error('Failed to delete image from S3:', cleanupError);
      }
    }

    console.error('Error creating product:', error);
    return { 
      success: false, 
      message: 'Failed to create product. Please try again.' 
    };
  }
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
    image: product.image,
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
  imageData,
  price,
  stock,
  category,
  flowers,
}: {
  id: string;
  name: string;
  description: string;
  imageData: File | string;
  price: number;
  stock: number;
  category: string;
  flowers: { id: string; name: string }[];
}) {
  let image;
  let uploadedImage;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { image: true },
    });

    if (!product) {
      return { success: false, message: 'Product not found' };
    }

    if (typeof imageData === 'string') {
      image = imageData;
    } else if (imageData instanceof File) {
      if (product.image !== 'default.jpg') { 
        await deleteFromS3(product.image);
      }
      image = await uploadToS3(imageData);
      uploadedImage = image;
    }

    await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        image,
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
      success: true,
      message: 'The product details have been successfully updated in the database.',
    };
  } catch (error) {
    if (uploadedImage) {
      try {
        await deleteFromS3(uploadedImage);
      } catch (cleanupError) {
        console.error('Failed to delete image from S3:', cleanupError);
      }
    }

    console.error('Error updating product:', error);
    return { 
      success: false, 
      message: 'Failed to update product. Please try again.' 
    };
  }
}


export async function deleteProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
  
    if (!product) {
      return { success: false, message: 'Product not found' };
    }
  
    await prisma.product.delete({
      where: { id },
    });

    if (product.image !== 'default.jpg') { 
      await deleteFromS3(product.image);
    }
  
    return {
      success: true,
      message: 'The product has been successfully deleted from the database.',
    };
  } catch (error) {
    console.error('Error deleting product:', error);

    return {
      success: false,
      message: 'Failed to delete product. Please try again.',
    };
  }
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
      image: product.image,
      price: product.price,
      stock: product.stock,
      category: product.category?.name,
      flowers: product.flowers?.map(flower => flower.name),
    })),
  } 
}

export async function updateFeaturedProducts(productIds: string[]) {
  try {
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
  } catch (error) {
    console.error('Error updating featured products:', error);
    throw new Error('Failed to update featured products. Please try again.');
  }
}
