import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import AccordionSection from './FilterAccordion';

interface FilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedFlowers: string[];
  setSelectedFlowers: (flowers: string[]) => void;
  minPrice: number;
  setMinPrice: (price: number) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
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
            <AccordionSection 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedFlowers={selectedFlowers}
              setSelectedFlowers={setSelectedFlowers}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className='lg:block hidden'>
        <div className='w-[300px] min-h-[600px] max-h-content p-6 shadow-md rounded-lg space-y-6 bg-white'>
          <h1 className='flex items-center'>
            <SlidersHorizontal className='mr-2 h-4 w-4' /> Filters
          </h1>
          <AccordionSection 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedFlowers={selectedFlowers}
            setSelectedFlowers={setSelectedFlowers}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>
      </div>
    </div>
  );
}
