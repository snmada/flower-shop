'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@/hooks/useSearch';
import Filter from '@/components/product/Filter/index';
import ProductGrid from '@/components/product/ProductGrid';
import SearchInput from '@/components/ui/custom/search-input';
import Combobox from '@/components/ui/shadcn/combobox';
import { getAllProducts } from '@/actions/products';
import { DEFAULT_TAKE_SIZE, SORT_CRITERIAS } from '@/constants/constants';

export default function ProductsPage() {
  const { searchName, handleSearch } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string>('All categories');
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const [selectedSortCriteria, setSelectedSortCriteria] = useState<string>('a-z');

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
              options={SORT_CRITERIAS} 
              value={selectedSortCriteria}
              onChange={setSelectedSortCriteria}
              placeholder='Sort by'  
              searchable={false}  
            />
          </div>
        </div>
        <ProductGrid
          data={data} 
          setSkip={setSkip} 
          searchName={searchName}
          selectedCategory={selectedCategory}
          selectedFlowers={selectedFlowers}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>
    </div>
  );
}
