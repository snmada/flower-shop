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
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const DEFAULT_TAKE_SIZE = 9;

const sortCriterias = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'a-z', label: 'Product name: A to Z' },
  { value: 'z-a', label: 'Product name: Z to A' },
];

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
  const [open, setOpen] = useState(false);
  const [selectedSortCriteria, setSelectedSortCriteria] = useState<string>('price-asc');

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart', productId);
  };

  const { data, isFetching } = useQuery({
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
        <div className='p-5 mb-5 rounded-md bg-white border border-gray-200'>
          <div className='relative mb-5'>
            <Input
              type='text'
              placeholder='Search by product name . . .'
              className='pl-10 pr-3 py-5 bg-white border'
              onChange={(e) => {handleSearch(e.target.value.trim())}}
              defaultValue={searchParams.get('name')?.toString()}
            />
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-primary' size={18}/>
          </div>
          <div className='flex flex-row items-center gap-2 justify-end'>
            <p>Sort by</p>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className='w-content justify-between'
                >
                  {sortCriterias.find((criteria) => criteria.value === selectedSortCriteria)?.label || 'No criteria found'}
                  <ChevronsUpDown className='opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[250px] p-0'>
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {sortCriterias.map((criteria) => (
                        <CommandItem
                          key={criteria.value}
                          value={criteria.value}
                          onSelect={(value) => {
                            setSelectedSortCriteria(value);
                            setOpen(false);
                          }}
                        >
                          {criteria.label}
                          <Check
                            className={cn(
                              'ml-auto',
                              selectedSortCriteria === criteria.value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
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
