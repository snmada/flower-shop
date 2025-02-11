'use client';

import { useRouter, useParams } from 'next/navigation';
import { getAllCategories } from '@/actions/categories';
import { getAllFlowers } from '@/actions/flowers';
import { useQuery } from '@tanstack/react-query';
import { getProductById, updateProduct } from '@/actions/products';
import ProductForm from '@/components/product/ProductForm';
import { useToast } from '@/hooks/use-toast';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  flowers: { id: string; name: string }[];
  imageUrl: string;
}

export default function UpdateProductPage() {
  const router = useRouter();
  const id = useParams().id;
  const { toast } = useToast();

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
  });

  const { data: flowers, isLoading: flowersLoading } = useQuery({
    queryKey: ['flowers'],
    queryFn: () => getAllFlowers(),
  });

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id as string),
  });

  const handleCancel = () => {
    router.push('/admin/products/all');
  }

  async function onSubmit(values: ProductFormData) {
    const productData = {
      id: product!.id,
      name: values.name,
      description: values.description,
      imageUrl: values.imageUrl.startsWith('/') ? values.imageUrl : '/' + values.imageUrl,
      price: values.price,
      stock: values.stock,
      category: values.category,
      flowers: values.flowers,
    };
    await updateProduct(productData);
    router.push('/admin/products/all');
    toast({
      title: 'Changes Saved',
      description: 'The product details have been successfully updated in the database.',
    });
  }

  const isLoading = categoriesLoading && flowersLoading && productLoading;

  return (
    <div className='bg-[#FBFBFB] px-6 py-6 mt-10 rounded-lg'>
      <ProductForm
        initialData={{
          name: product?.name || '',
          description: product?.description || '',
          imageUrl: product?.imageUrl || '',
          price: product?.price || 0,
          stock: product?.stock || 0,
          category: product?.category?.id || '',
          flowers: product?.flowers || [],
        }}
        onCancel={handleCancel}
        onSubmit={onSubmit}
        categories={categories || []}
        flowers={flowers || []}
        isLoading={isLoading}
      />
    </div>
  );
}
