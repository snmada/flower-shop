import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  handleAddToCart: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  handleAddToCart
}: ProductCardProps) {
  return (
    <div className='rounded-md shadow-lg bg-white'>
      <div className='w-full h-[300px]'>
        <Image
          src={imageUrl}
          alt={name}
          width={200}
          height={300}
          quality={100}
          className='w-full h-full object-cover rounded-t-md'
        />
      </div>
      <div className='p-5'>
        <h3 className='text-xl font-semibold text-gray-800 mb-2'>{name}</h3>
        <div className='text-sm font-small text-gray-500 h-[45px]'>{description}</div>
        <div className='w-max mt-3 px-2 py-1 bg-[#FFF7FC] text-primary border border-primary text-sm rounded-full'>{category}</div>
        <p className='text-xl font-semibold text-black mt-2 mb-4'>${price}</p>
        <Button 
          className='bg-secondary text-black w-full'
          onClick={() => handleAddToCart(id)}
        >
          <ShoppingCart />
          Add to cart
        </Button>
      </div>
    </div>
  );
}
