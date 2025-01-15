'use client';

import { useState, useEffect } from 'react';
import Filter from '@/components/ProductsPage/Filter';
import ProductCard from '@/components/ProductsPage/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/actions/products';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CircleCheckBig } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const DEFAULT_TAKE_SIZE = 9;

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All categories');
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const [viewedProducts, setViewedProducts] = useState<any[]>([]); 
  const [totalProducts, setTotalProducts] = useState<number>(0); 
  const searchName = searchParams.get('name') || '';

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart', productId);
  };

  const { data, isFetching } = useQuery({
    queryKey: ['products', selectedCategory, selectedFlowers, minPrice, maxPrice, skip, searchName],
    queryFn: () =>
      getAllProducts({
        name: searchName,
        category: selectedCategory,
        flowers: selectedFlowers,
        minPrice,
        maxPrice,
        skip,
        take: DEFAULT_TAKE_SIZE,
      }),
  });

  useEffect(() => {
    setSkip(0);
    setViewedProducts([]); 
    setTotalProducts(0); 
    window.scrollTo({
      top: 0,
    });
  }, [selectedCategory, selectedFlowers, minPrice, maxPrice, searchName]);

  useEffect(() => {
    if (data) {
      setViewedProducts((prev) => [...prev, ...data.products]);
      setTotalProducts(data.totalProducts);
    }
  }, [data]);

  const loadMore = () => {
    setSkip((prev) => prev + DEFAULT_TAKE_SIZE);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('name', term);
    } else {
      params.delete('name');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

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
        <div className='relative mb-5'>
          <Input
            type='text'
            placeholder='Search by product name . . .'
            className='pl-10 pr-3 py-5 bg-white border text-[40px]'
            onChange={(e) => {handleSearch(e.target.value.trim())}}
            defaultValue={searchParams.get('name')?.toString()}
          />
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-primary' size={18}/>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {viewedProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
        <div className='flex flex-col items-center gap-4 mt-20 mb-20'>
          {totalProducts === viewedProducts.length ? (
            <>
            <CircleCheckBig className='text-[#40A578] font-semibold' />
            <p className='text-[#40A578] font-semibold text-[16px]'>All products viewed!</p>
            </>
          ) : (
            <>
            <p className='text-sm font-semibold text-gray-500'>
              You've viewed {viewedProducts.length} of {totalProducts} products
            </p>
            <Progress
              value={((viewedProducts.length / (totalProducts || 1)) * 100)}
              className='w-[250px] border border-primary'
            />
            <Button
              className='w-[400px] h-[55px] mt-3 border border-gray-500'
              variant='outline'
              onClick={loadMore}
            >
              LOAD MORE
            </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
