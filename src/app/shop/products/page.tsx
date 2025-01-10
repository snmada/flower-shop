'use client';
import { useState } from 'react';
import Filter from '@/components/ProductsPage/Filter';
import ProductCard from '@/components/ProductsPage/ProductCard';

const products = [
  {
    id: 1,
    name: 'Flower1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 56,
    imageUrl: '/',
    category: 'Birthday',
    flowers: ['Rose', 'Tulip'],
  },
  {
    id: 2,
    name: 'Flower2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 25,
    imageUrl: '/',
    category: 'Wedding',
    flowers: ['Lily'],
  },
  {
    id: 3,
    name: 'Flower3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 10,
    imageUrl: '/',
    category: 'Anniversary',
    flowers: ['Rose', 'Orchid'],
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All categories');
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleAddToCart = (productId: number) => {
    console.log('Add to cart', productId);
  };

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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products
            .filter((product) => {
              const isCategoryMatch =
                selectedCategory === 'All categories' || product.category.includes(selectedCategory);
              
              const isFlowerMatch =
                selectedFlowers.length === 0 ||
                product.flowers.some((flower) => selectedFlowers.includes(flower));

              const min = minPrice ? parseFloat(minPrice) : Number.NEGATIVE_INFINITY;
              const max = maxPrice ? parseFloat(maxPrice) : Number.POSITIVE_INFINITY;
              const isPriceMatch = product.price >= min && product.price <= max;
          
              return isCategoryMatch && isFlowerMatch && isPriceMatch;
            })
            .map((product) => (
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
