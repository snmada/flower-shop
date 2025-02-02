'use client';

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/shadcn/dialog';
import { Button } from '@/components/ui/shadcn/button';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/actions/products';
import Image from 'next/image';
import { Separator } from '@/components/ui/shadcn/separator';

interface ProductDetailsDialogProps {
  productId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailsDialog({
  productId,
  isOpen,
  onClose,
}: ProductDetailsDialogProps) {
  const { data: product } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productId ? getProductById(productId) : null,
    enabled: !!productId, 
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-[20px]'>{product?.name}</DialogTitle>
          <DialogDescription>Details of the selected product</DialogDescription>
        </DialogHeader>
        <Separator />
        <div className='flex flex-col gap-4'>
          <div>
            <span className='font-semibold'>Description:</span> {product?.description}
          </div>
          <div>
            <span className='font-semibold'>Price:</span> ${product?.price.toFixed(2)}
          </div>
          <div>
            <span className='font-semibold'>Stock:</span> {product?.stock}
          </div>
          <div>
            <span className='font-semibold'>Category:</span> {product?.category.name}
          </div>
          <div>
            <span className='font-semibold'>Flowers:</span>{' '}
            {product?.flowers.map((flower: any) => (
              <span
                key={flower.id}
                className='inline-block bg-[#FBFBFB] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 border border-gray-300 mr-2'
              >
                {flower.name}
              </span>
            ))}
          </div>
          <div>
            <span className='font-semibold'>Image:</span>
            <div className='mt-2'>
              <Image
                src='/default.jpg'  //src={product?.imageUrl}
                alt={product?.name || 'Product Image'}
                width={40}
                height={40}
                className='w-40 h-40 object-cover rounded-md mb-2'
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={onClose} 
            className='bg-white border border-gray-300'
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
