import { Skeleton } from '@/components/ui/shadcn/skeleton';

const VARIANTS = {
  standard: {
    card: 'flex items-center justify-center p-8 gap-8 h-[360px]',
    imageWrapper: '',
    image: 'rounded-[150px] shadow-lg md:w-[200px] md:h-[300px]', 
    description: 'text-sm text-gray-500 w-[150px] h-[65px]',
    content: 'flex flex-col text-left', 
  },
  detailed: {
    card: 'rounded-md shadow-lg bg-white',
    imageWrapper: 'w-full h-[300px]',
    image: 'w-full h-full object-cover rounded-t-md',
    description: 'text-sm text-gray-500 h-[45px]',
    content: 'p-5',
  },
}

export default function ProductCardSkeleton({ 
  variant = 'detailed' 
}: { variant?: 'standard' | 'detailed' }) {
      
  const styles = VARIANTS[variant];
  
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Skeleton className={`bg-gray-300 ${styles.image}`} />
      </div>
      <div className={styles.content}>
        <Skeleton className='bg-gray-300 h-6 w-[120px] mb-2' />
        <Skeleton className={`${styles.description} bg-gray-300 h-4`} />
        {variant === 'detailed' && (
          <Skeleton className='bg-gray-300 h-7 w-[70px] my-4 rounded-full' />
        )}
        <Skeleton className='bg-gray-300 h-6 w-[40px] my-4' />
        <Skeleton className='bg-gray-300 h-10 w-full mt-2' />
      </div>
    </div>
  );
}
