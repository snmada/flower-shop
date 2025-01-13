'use client';

import { useState, useEffect } from 'react';
import Filter from '@/components/ProductsPage/Filter';
import ProductCard from '@/components/ProductsPage/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/actions/products';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All categories');
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart', productId);
  };

  const { data: products = [], isFetching } = useQuery({
    queryKey: ['products', selectedCategory, selectedFlowers, minPrice, maxPrice],
    queryFn: () =>
      getAllProducts({
        category: selectedCategory,
        flowers: selectedFlowers,
        minPrice,
        maxPrice,
      }),
  });
  
  useEffect(() => {
    if (isFetching) {
      window.scrollTo({
        top: 0, 
      });
    }
  }, [isFetching]);

  return (
    <div className='flex flex-col lg:flex-row gap-6'>
      <Filter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedFlowers={selectedFlowers}
        setSelectedFlowers={setSelectedFlowers}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
      <div className='flex-1'>
        {isFetching && (
          <p>Fetching....</p>
        )}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
