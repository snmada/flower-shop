import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface CartItemProps {
  product: Product;
  handleRemoveFromCart: (id: string) => void;
  handleUpdateQuantity: (id: string, newQuantity: number) => void;
}

export default function CartItem({ 
  product, 
  handleRemoveFromCart, 
  handleUpdateQuantity 
}: CartItemProps) {
  return (
    <div
      key={product.id}
      className='flex items-center p-6 border rounded-lg bg-white'
    >
      <Button
        onClick={() => handleRemoveFromCart(product.id)}
        className='rounded-full text-primary h-8 w-8 mr-5'
        variant='ghost'
      >
        <X size={16} />
      </Button>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={20}
        height={20}
        className='w-20 h-20 object-cover rounded-lg'
      />
      <div className='ml-4 flex-grow'>
        <h2 className='text-[16px] font-semibold'>{product.name}</h2>
        <p className='text-gray-500'>${product.price}</p>
      </div>
      <div className='flex items-center justify-between w-full max-w-xs'>
        <div className='flex flex-col items-center gap-2'>
          <span className='text-sm text-gray-600'>Quantity</span>
          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)}
              disabled={product.quantity <= 1}
              className='h-8 w-8'
            >
              <Minus />
            </Button>
            <span className='text-lg font-medium'>{product.quantity}</span>
            <Button
              variant='outline'
              onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}
              className='h-8 w-8'
            >
              <Plus size={16}/>
            </Button>
          </div>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <span className='text-sm text-gray-600'>Total</span>
          <span className='text-lg font-medium'>
            ${(product.price * product.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
