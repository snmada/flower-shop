'use client';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/actions/categories';
import { getAllFlowers } from '@/actions/flowers';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface FilterProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedFlowers: string[];
  setSelectedFlowers: (value: string[]) => void;
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
}

export default function Filter({
  selectedCategory,
  setSelectedCategory,
  selectedFlowers,
  setSelectedFlowers,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: FilterProps) {
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
  });

  const { data: flowers } = useQuery({
    queryKey: ['flowers'],
    queryFn: () => getAllFlowers(),
  });

  const handleSearchClick = () => {
    if (tempMinPrice > tempMaxPrice) {
      setTempMaxPrice(tempMinPrice);
    }
    setMinPrice(tempMinPrice); 
    setMaxPrice(tempMaxPrice); 
  };

  const FilterSection = ({
    title,
    value,
    options,
    type = 'radio',
  }: {
    title: string;
    value: string;
    options: string[];
    type: 'radio' | 'checkbox';
  }) => {
    return (
      <AccordionItem value={value}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent className='transition-all duration-300 ease-in-out'>
          {type === 'radio' ? (
            <RadioGroup 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <div className='flex items-center gap-3 p-1'>
                <RadioGroupItem value='All categories' id='all-categories' />
                <label htmlFor='all-categories' className='text-sm cursor-pointer'>
                  All categories
                </label>
              </div>
              {options.map((option) => (
                <div 
                  key={option} 
                  className='flex items-center gap-3 p-1'
                >
                  <RadioGroupItem 
                    value={option} 
                    id={option} 
                  />
                  <label 
                    htmlFor={option} 
                    className='text-sm cursor-pointer'
                  >
                    {option}
                  </label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            options.map((option) => (
              <div 
                key={option} 
                className='flex items-center gap-3 p-2'
              >
                <Checkbox
                  id={option}
                  checked={selectedFlowers.includes(option)}
                  onCheckedChange={(checked) => {
                    const updatedFlowers = checked ?
                      [...selectedFlowers, option] : selectedFlowers.filter((flower) => flower !== option);
                    setSelectedFlowers(updatedFlowers);
                  }}
                />
                <label 
                  htmlFor={option} 
                  className='text-sm cursor-pointer'
                >
                  {option}
                </label>
              </div>
            ))
          )}
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <div>
      <div className='block lg:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline'>
              <SlidersHorizontal className='mr-2 h-4 w-4' /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='overflow-y-auto'>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <Accordion type='multiple' defaultValue={['category', 'flowers', 'price']}>
              <FilterSection
                title='Category'
                value='category'
                options={categories ? categories.map((category) => category.name) : []}
                type='radio'
              />
              <FilterSection
                title='Flowers'
                value='flowers'
                options={flowers ? flowers.map((flower) => flower.name) : []}
                type='checkbox'
              />
              <AccordionItem value='price'>
                <AccordionTrigger>Price Range</AccordionTrigger>
                <AccordionContent>
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
                        <ArrowRight className='text-primary' strokeWidth={3} size={28}/>
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SheetContent>
        </Sheet>
      </div>

      <div className='lg:block hidden'>
        <div className='w-[300px] min-h-[600px] max-h-content p-6 shadow-md rounded-lg space-y-6 bg-white'>
          <h1 className='flex items-center'>
            <SlidersHorizontal className='mr-2 h-4 w-4' /> Filters
          </h1>
          <Accordion type='multiple' defaultValue={['category', 'flowers', 'price']}>
            <FilterSection
              title='Category'
              value='category'
              options={categories ? categories.map((category) => category.name) : []}
              type='radio'
            />
            <FilterSection
              title='Flowers'
              value='flowers'
              options={flowers ? flowers.map((flower) => flower.name) : []}
              type='checkbox'
            />
            <AccordionItem value='price'>
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
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
                      <ArrowRight className='text-primary' strokeWidth={3} size={28}/>
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
