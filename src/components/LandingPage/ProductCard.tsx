import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
  price: string;
}

export default function ProductCard({ 
  imageSrc, 
  alt, 
  title, 
  description, 
  price 
} : ProductCardProps) {
  return(
    <div className='rounded-lg p-8 flex gap-8 items-center justify-center h-[360px]'>
      <Image
        src={imageSrc}
        alt={alt}
        width={170}
        height={250}
        className='rounded-[150px] shadow-lg md:w-[200px] md:h-[300px]'
      />
      <div className='flex flex-col text-left'>
        <h2 className='text-xl font-semibold'>{title}</h2>
        <p className='text-sm text-gray-600 mt-2'>{description}</p>
        <p className='text-lg font-semibold mt-2'>{price}</p>
        <Button className='mt-4 px-4 py-2 bg-secondary text-black rounded-lg'>
          <ShoppingCart />
          Add to cart
        </Button>
      </div>
    </div>
  );
};
