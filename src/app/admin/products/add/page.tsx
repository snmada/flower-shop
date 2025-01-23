'use client';

import { useRouter } from 'next/navigation';
import { getAllCategories } from '@/actions/categories';
import { getAllFlowers } from '@/actions/flowers';
import { useQuery } from '@tanstack/react-query';
import { createProduct } from '@/actions/products';
import ProductForm from '@/components/ProductForm';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  flowers: { id: string; name: string }[];
  imageUrl: string;
}

export default function CreateProductPage() {
  const router = useRouter();

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
  });

  const { data: flowers } = useQuery({
    queryKey: ['flowers'],
    queryFn: () => getAllFlowers(),
  });

  const handleCancel = () => {
    router.push('/admin/products/all');
  }

  async function onSubmit(values: ProductFormData) {
    const productData = {
      name: values.name,
      description: values.description,
      imageUrl: values.imageUrl.startsWith('/') ? values.imageUrl : '/' + values.imageUrl,
      price: values.price,
      stock: values.stock,
      category: values.category,
      flowers: values.flowers,
    };
    await createProduct(productData);
    router.push('/admin/products/all');
  }

  return (
    <div className='bg-[#FBFBFB] px-6 py-6 mt-10 rounded-lg'>
      <ProductForm
        onSubmit={onSubmit}
        onCancel={handleCancel} 
        categories={categories || []}
        flowers={flowers || []}
      />
    </div>
  );
};
