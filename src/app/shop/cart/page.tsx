'use client';

import { LinkButton } from '@/components/ui/custom/link-button';
import { ChevronRight } from 'lucide-react';
import CartItem from '@/components/cart/CartItem';
import Summary from '@/components/cart/Summary';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, isLoading } = useCart();

  return (
    <div>
      <h1 className='flex flex-row items-center text-[24px] my-8 gap-3'>
        <ChevronRight/>
        My Cart
      </h1>
      <LinkButton
        href='/shop/products'
        variant='outline'
      >
        CONTINUE SHOPPING
      </LinkButton>
        {isLoading ? (
          <div className='flex flex-col justify-center items-center h-96'>
            <div className='border-t-4 border-primary border-solid rounded-full w-12 h-12 animate-spin'></div>
            <p className='mt-10'>Loading your cart . . . Almost ready!</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-5'>
            <div className='flex flex-col col-span-1 sm:col-span-2 lg:col-span-3 gap-6'>
              {cart.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cart.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))
              )}
            </div>
            <div className='col-span-1 sm:col-span-2 lg:col-span-2'>
              {cart.length > 0 && 
                <Summary />
              }
            </div>
          </div>
        )}
    </div>
  );
}
