'use client';

import { useRouter } from 'next/navigation';
import { getAllCategories } from '@/actions/categories';
import { getAllFlowers } from '@/actions/flowers';
import { useQuery } from '@tanstack/react-query';
import { createProduct } from '@/actions/products';
import ProductForm from '@/components/product/ProductForm';
import { useToast } from '@/hooks/use-toast';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  flowers: { id: string; name: string }[];
  imageData: File | string;
}

export default function CreateProductPage() {
  const router = useRouter();
  const { toast } = useToast();

  const { data: categories, isError: errorCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
  });

  const { data: flowers, isError: errorFlowers } = useQuery({
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
      imageData: values.imageData,
      price: values.price,
      stock: values.stock,
      category: values.category,
      flowers: values.flowers,
    };
    const response = await createProduct(productData);

    if (!response.success) {
      toast({
        title: 'Error',
        description: response.message,
        variant: 'destructive'
      });
      return;
    }

    router.push('/admin/products/all');
    toast({
      title: 'Success',
      description: response.message,
    });
  }

  if (errorCategories || errorFlowers) {
    throw new Error('Failed to fetch data');
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
