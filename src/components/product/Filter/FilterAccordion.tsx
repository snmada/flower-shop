import { useQuery } from '@tanstack/react-query';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/shadcn/accordion';
import Category from './FilterSections/Category';
import Flowers from './FilterSections/Flowers';
import PriceRange from './FilterSections/PriceRange';
import { getAllCategories } from '@/actions/categories';
import { getAllFlowers } from '@/actions/flowers';
import { Skeleton } from '@/components/ui/shadcn/skeleton';

interface FilterAccordionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedFlowers: string[];
  setSelectedFlowers: (flowers: string[]) => void;
  minPrice: number;
  setMinPrice: (price: number) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
}

export default function FilterAccordion({
  selectedCategory,
  setSelectedCategory,
  selectedFlowers,
  setSelectedFlowers,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice
}: FilterAccordionProps) {
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
  });
  
  const { data: flowers, isLoading: isLoadingFlowers } = useQuery({
    queryKey: ['flowers'],
    queryFn: () => getAllFlowers(),
  });

  return (
    <Accordion type='multiple' defaultValue={['category', 'flowers', 'price']}>
      <AccordionItem value='category'>
        <AccordionTrigger>Category</AccordionTrigger>
        <AccordionContent>
          {isLoadingCategories ? (
            Array.from({ length: 3 }).map((_, index) => 
              <Skeleton key={index} className='bg-gray-300 h-6 w-full mb-2' />)
          ) : (
            <Category
              value={selectedCategory}
              options={['All categories', ...categories?.map((category) => category.name) || []]}
              onChange={setSelectedCategory}
            />
          )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='flowers'>
        <AccordionTrigger>Flowers</AccordionTrigger>
        <AccordionContent>
          {isLoadingFlowers ? (
            Array.from({ length: 3 }).map((_, index) => 
              <Skeleton key={index} className='bg-gray-300 h-6 w-full mb-2' />)
          ) : (
            <Flowers
              options={flowers?.map((flower) => flower.name) || []}
              selectedOptions={selectedFlowers}
              onChange={setSelectedFlowers}
            />
          )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='price'>
        <AccordionTrigger>Price Range</AccordionTrigger>
        <AccordionContent>
          <PriceRange
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
