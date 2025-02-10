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
import { Skeleton } from '@/components/ui/shadcn/skeleton';

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
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productId ? getProductById(productId) : null,
    enabled: !!productId, 
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-[20px]'>
            {isLoading? <Skeleton className='bg-gray-300 h-6 w-1/2' /> : product?.name}
          </DialogTitle>
          <DialogDescription>Details of the selected product</DialogDescription>
        </DialogHeader>
        <Separator />
        <div className='flex flex-col gap-4'>
          <div> 
            <p> 
              <span className='font-semibold mr-2'>Description:</span> 
              {isLoading? <Skeleton className='bg-gray-300 h-6 w-1/2' /> : product?.description}
            </p>
          </div>
          <div className='flex flex-row gap-2'>
            <span className='font-semibold'>Price:</span>
            {isLoading? <Skeleton className='bg-gray-300 h-6 w-12' /> : product?.price.toFixed(2)}
          </div>
          <div className='flex flex-row gap-2'>
            <span className='font-semibold'>Stock:</span>
            {isLoading? <Skeleton className='bg-gray-300 h-6 w-12' /> : product?.stock}
          </div>
          <div className='flex flex-row gap-2'>
            <span className='font-semibold'>Category:</span>
            {isLoading? <Skeleton className='bg-gray-300 h-6 w-24' /> : product?.category.name}
          </div>
          <div className='flex flex-wrap gap-2'>
            <span className='font-semibold'>Flowers:</span>{' '}
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => 
                <Skeleton key={index} className='bg-gray-300 h-7 w-20 rounded-full'/>)
            ) : (
              <>
              {product?.flowers.map((flower: any) => (
                <span
                  key={flower.id}
                  className='inline-block bg-[#FBFBFB] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 border border-gray-300 mr-2'
                >
                  {flower.name}
                </span>
              ))}
              </>
            )}
          </div>
          <div>
            <span className='font-semibold'>Image:</span>
            <div className='mt-2'>
              {isLoading ? (
                <Skeleton className='bg-gray-300 w-40 h-40' />
              ) : (
                <Image
                  src={product?.imageUrl ?? '/default.jpg'}
                  alt={product?.name || 'Product Image'}
                  width={40}
                  height={40}
                  className='w-40 h-40 object-cover rounded-md mb-2'
                />
              )}
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
