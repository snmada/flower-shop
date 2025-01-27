'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@/hooks/useSearch';
import Filter from '@/components/ProductsPage/Filter';
import ProductCard from '@/components/ProductsPage/ProductCard';
import SearchInput from '@/components/ui/search-input';
import Combobox from '@/components/ui/combobox';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CircleCheckBig, PackageOpen } from 'lucide-react';
import { getAllProducts } from '@/actions/products';

const DEFAULT_TAKE_SIZE = 9;

const sortCriterias = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'a-z', label: 'Product name: A to Z' },
  { value: 'z-a', label: 'Product name: Z to A' },
];

export default function ProductsPage() {
  const { searchName, handleSearch } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string>('All categories');
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const [viewedProducts, setViewedProducts] = useState<any[]>([]); 
  const [totalProducts, setTotalProducts] = useState<number>(0); 
  const [selectedSortCriteria, setSelectedSortCriteria] = useState<string>('a-z');

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart', productId);
  };

  const { data } = useQuery({
    queryKey: ['products', selectedCategory, selectedFlowers, minPrice, maxPrice, skip, searchName, selectedSortCriteria],
    queryFn: () =>
      getAllProducts({
        name: searchName,
        category: selectedCategory,
        flowers: selectedFlowers,
        minPrice,
        maxPrice,
        skip,
        take: DEFAULT_TAKE_SIZE,
        sortCriteria: selectedSortCriteria,
      }),
  });

  useEffect(() => {
    setSkip(0);
    setViewedProducts([]); 
    setTotalProducts(0); 
    window.scrollTo({
      top: 0,
    });
  }, [selectedCategory, selectedFlowers, minPrice, maxPrice, searchName, selectedSortCriteria]);

  useEffect(() => {
    if (data) {
      setViewedProducts((prev) => [...prev, ...data.products]);
      setTotalProducts(data.totalProducts);
    }
  }, [data]);

  const loadMore = () => {
    setSkip((prev) => prev + DEFAULT_TAKE_SIZE);
  };

  const noResults = data && totalProducts === 0;
  const allProductsViewed = totalProducts > 0 && totalProducts === viewedProducts.length;

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
        <div className='p-5 mb-5 rounded-md bg-white border border-gray-200'>
          <SearchInput 
            value={searchName}
            handleSearch={handleSearch}
          />
          <div className='flex flex-row gap-2 items-center justify-end'>
            <p>Sort by</p>
            <Combobox
              options={sortCriterias} 
              value={selectedSortCriteria}
              onChange={setSelectedSortCriteria}
              placeholder='Sort by'  
              searchable={false}  
            />
          </div>
        </div>
        {noResults ? (
          <div className='flex flex-col items-center mt-40'>
            <PackageOpen 
              className='text-primary' 
              size={60} 
              strokeWidth={0.75} 
            />
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
                handleAddToCart={handleAddToCart}
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
      </div>
    </div>
  );
}
