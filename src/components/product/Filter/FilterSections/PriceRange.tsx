'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/shadcn/input';
import { Button } from '@/components/ui/shadcn/button';
import { ArrowRight } from 'lucide-react';

interface PriceRangeProps {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
}

export default function PriceRange({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice
}: PriceRangeProps) {
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);

  const handleSearchClick = () => {
    if (tempMinPrice > tempMaxPrice) {
      setTempMaxPrice(tempMinPrice);
    }
    setMinPrice(tempMinPrice); 
    setMaxPrice(tempMaxPrice); 
  };

  return (
    <div className='flex items-center gap-2 p-1'>
      <div className='flex flex-col w-full'>
        <Input
          type='number'
          id='min-price'
          placeholder='Min'
          value={tempMinPrice || ''}
          onChange={(e) => {
            const value = Math.max(0, Math.floor(Number(e.target.value))); 
            setTempMinPrice(value);
          }}
        />
      </div>
      <span>-</span>
      <div className='flex flex-col w-full'>
        <Input
          type='number'
          id='max-price'
          placeholder='Max'
          value={tempMaxPrice || ''}
          onChange={(e) => {
            const value = Math.max(0, Math.floor(Number(e.target.value))); 
            setTempMaxPrice(value);
          }}
        />
      </div>
      <div className='flex flex-col w-auto'>
        <Button 
          className='w-[35px] bg-white border border-primary'
          onClick={handleSearchClick}
          disabled={!tempMinPrice || !tempMaxPrice}
        >
          <ArrowRight className='text-primary' strokeWidth={3} size={28} />
        </Button>
      </div>
    </div>
  );
}
