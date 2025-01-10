'use client';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';

const categories: string[] = ['All categories', 'Birthday', 'Wedding', 'Anniversary'];
const flowers: string[] = ['Rose', 'Tulip', 'Lily', 'Orchid'];

interface FilterProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedFlowers: string[];
  setSelectedFlowers: (value: string[]) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
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
}: FilterProps){
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
          <SheetContent side='left'>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <Accordion type='multiple' defaultValue={['category', 'flowers', 'price']}>
              <FilterSection
                title='Category'
                value='category'
                options={categories}
                type='radio'
              />
              <FilterSection
                title='Flowers'
                value='flowers'
                options={flowers}
                type='checkbox'
              />
              <AccordionItem value='price'>
                <AccordionTrigger>Price Range</AccordionTrigger>
                <AccordionContent>
                  <div className='flex items-center gap-4 p-1'>
                    <div className='flex flex-col w-full'>
                      <Input
                        type='number'
                        id='min-price'
                        placeholder='Min'
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </div>
                    <span>-</span>
                    <div className='flex flex-col w-full'>
                      <Input
                        type='number'
                        id='max-price'
                        placeholder='Max'
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
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
              options={categories}
              type='radio'
            />
            <FilterSection
              title='Flowers'
              value='flowers'
              options={flowers}
              type='checkbox'
            />
            <AccordionItem value='price'>
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <div className='flex items-center gap-4 mt-0 p-1'>
                  <div className='flex flex-col w-full'>
                    <Input
                      type='number'
                      id='min-price'
                      placeholder='Min'
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <span>-</span>
                  <div className='flex flex-col w-full'>
                    <Input
                      type='number'
                      id='max-price'
                      placeholder='Max'
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
