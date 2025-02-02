'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { Progress } from '@/components/ui/shadcn/progress';
import { Button } from '@/components/ui/shadcn/button';
import { PackageOpen, CircleCheckBig } from 'lucide-react';
import { DEFAULT_TAKE_SIZE } from '@/constants/constants';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  stock: number;
  category: string;
  flowers: string[];
}

interface ProductGridProps {
  data: {
    products: Product[];
    totalProducts: number;
  } | undefined;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  searchName: string;
  selectedCategory: string;
  selectedFlowers: string[];
  minPrice: number;
  maxPrice: number;
}

export default function ProductGrid({
  data,
  setSkip,
  searchName,
  selectedCategory,
  selectedFlowers,
  minPrice,
  maxPrice,
}: ProductGridProps) {
  const [viewedProducts, setViewedProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  useEffect(() => {
    setSkip(0);
    setViewedProducts([]);
    setTotalProducts(0);
    window.scrollTo({ top: 0 });
  }, [searchName, selectedCategory, selectedFlowers, minPrice, maxPrice]);

  useEffect(() => {
    if (data) {
      setViewedProducts((prev) => [...prev, ...data.products]);
      setTotalProducts(data.totalProducts);
    }
  }, [data]);

  const loadMore = () => {
    setSkip((prev: number) => prev + DEFAULT_TAKE_SIZE);
  };

  const noResults = data && totalProducts === 0;
  const allProductsViewed = totalProducts > 0 && totalProducts === viewedProducts.length;

  return (
    <>
    {noResults ? (
      <div className='flex flex-col items-center mt-40'>
        <PackageOpen className='text-primary' size={60} strokeWidth={0.75} />
        <p className='text-primary font-semibold text-[16px]'>It seems empty here</p>
        <p>Sorry, we couldn't find what you're looking for</p>
      </div>
    ) : (
      <>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {viewedProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>
        <div className='flex flex-col items-center gap-4 mt-20 mb-20'>
          {viewedProducts.length < totalProducts && (
            <>
            <p className='text-sm font-semibold text-gray-500'>
              You've viewed {viewedProducts.length} of {totalProducts} products
            </p>
            <Progress
              value={(viewedProducts.length / (totalProducts || 1)) * 100}
              className='w-[250px] border border-primary'
            />
            <Button
              className='w-[400px] h-[55px] mt-3'
              variant='outline'
              onClick={loadMore}
            >
              LOAD MORE
            </Button>
            </>
          )}
          {allProductsViewed && (
            <>
            <CircleCheckBig
              className='text-[#40A578] font-semibold'
              size={48}
              strokeWidth={1}
            />
            <p className='text-[#40A578] font-semibold text-[16px]'>All products viewed</p>
            <p>You've explored everything we have to offer you</p>
            </>
          )}
        </div>
      </>
    )}
    </>
  );
}
