import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { SHIPPING, TAX } from '@/constants/constants';

export default function Summary() {
  const { cart, subtotal, total } = useCart();

  return (
    <div className='border p-6 rounded-lg min-h-[300px] bg-white'>
      <h2 className='text-2xl font-semibold mb-4'>Summary</h2>
      <div className='flex flex-col gap-2 mb-4'>
        {cart.map((product) => (
          <div 
            key={product.id} 
            className='flex justify-between'
          >
            <span className='text-lg'>
              {product.quantity} x {product.name}
            </span>
            <span className='font-medium text-lg'>
              ${(product.price * product.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <Separator />
      <div className='flex justify-between mb-2 pt-4'>
        <span className='text-lg'>Subtotal:</span>
        <span className='font-medium text-xl'>${subtotal}</span>
      </div>
      <div className='flex justify-between mb-2'>
        <span className='text-lg'>Shipping:</span>
        <span className='font-medium text-xl'>${SHIPPING}</span>
      </div>
      <div className='flex justify-between mb-4'>
        <span className='text-lg'>Tax:</span>
        <span className='font-medium text-xl'>${TAX}</span>
      </div>
      <Separator />
      <div className='flex justify-between text-lg font-semibold pt-4 text-[#40A578]'>
        <span>Total:</span>
        <span className='text-xl'>${total}</span>
      </div>
      <Button
        className='mt-6 w-full py-3 bg-primary text-white'
        onClick={() => alert('Proceeding to checkout...')}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}
