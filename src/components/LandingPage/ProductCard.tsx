import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  handleAddToCart: (id: string) => void;
}

export default function ProductCard({ 
  id,
  name,
  description,
  price,
  imageUrl,
  handleAddToCart
} : ProductCardProps) {
  return(
    <div className='rounded-lg p-8 flex gap-8 items-center justify-center h-[360px]'>
      <Image
        src={imageUrl}
        alt={name}
        width={170}
        height={250}
        className='rounded-[150px] shadow-lg md:w-[200px] md:h-[300px]'
      />
      <div className='flex flex-col text-left'>
        <h2 className='text-xl font-semibold'>{name}</h2>
        <div className='text-sm text-gray-600 mt-2 w-[150px] h-[65px]'>{description}</div>
        <p className='text-lg font-semibold mt-2'>${price}</p>
        <Button 
          className='mt-4 bg-secondary text-black rounded-lg'
          onClick={() => handleAddToCart(id)}
        >
          <ShoppingCart />
          Add to cart
        </Button>
      </div>
    </div>
  );
}
