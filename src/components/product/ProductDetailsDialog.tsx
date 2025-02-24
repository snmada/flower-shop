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
  const { data: product, isLoading, isError: errorProduct } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productId ? getProductById(productId) : null,
    enabled: !!productId, 
  });

  if (errorProduct) {
    throw new Error('Failed to fetch data');
  }

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
            <span className='font-semibold mr-2'>Description:</span> 
            {isLoading? <Skeleton className='bg-gray-300 h-6 w-1/2' /> : product?.description}
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
          <div className='flex flex-wrap items-center gap-2'>
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
            <div className='flex justify-center mt-2 border border-gray-200 border-dashed border-4 p-6'>
              {isLoading ? (
                <Skeleton className='bg-gray-300 w-40 h-40' />
              ) : (
                <div className='relative w-64 h-64'>
                  <Image
                    src={process.env.NEXT_PUBLIC_AWS_S3_URL? `${process.env.NEXT_PUBLIC_AWS_S3_URL}${product?.image}` : '/default.jpg'}
                    alt={product?.name || 'Product Image'}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-lg'
                  />
                </div>
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
