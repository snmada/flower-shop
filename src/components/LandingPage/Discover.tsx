'use client';

import { ArrowRight } from 'lucide-react'; 
import ProductCard from '@/components/ProductCard';
import { LinkButton } from '@/components/ui/link-button';
import { getFeaturedProducts } from '@/actions/products';
import { useQuery } from '@tanstack/react-query';

export default function Discover() {
  const { data } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: getFeaturedProducts,
  });

  const { featuredProducts = [] } = data || {};

  return (
    <section 
      id='discover' 
      className='flex flex-col items-center justify-center p-20 min-h-screen bg-gradient-to-r from-[#E7EAE6] via-white to-[#E7EAE6]'
    >
      <h1 className='text-xl font-semibold text-gray-800 mb-2'>THE</h1>
      <h1 className='text-4xl font-semibold text-gray-800 mb-12 text-center'>
        'You Can't Miss' COLLECTION
      </h1>
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-10'>
        {featuredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            {...product} 
            variant='standard'
          />
        ))}
      </div>
      <div className='mt-8 text-center'>
        <LinkButton
          href='/shop/products'
          className='w-[250px] bg-primary text-white shadow-xl flex items-center justify-center gap-2 transition transform hover:scale-105'
        >
          Discover All Products
          <ArrowRight size={20} /> 
        </LinkButton>
      </div>
    </section>
  );
}
