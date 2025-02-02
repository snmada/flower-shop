import Image from 'next/image';
import { Button } from '@/components/ui/shadcn/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

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

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category?: string;
  variant?: 'standard' | 'detailed';
}

export default function ProductCard({
  id,
  name,
  description,
  imageUrl,
  price,
  category,
  variant = 'detailed',
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product = { id, name, imageUrl, price, quantity: 1 };
    addToCart(product);
  };

  const styles = VARIANTS[variant];

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={name}
          width={variant === 'detailed' ? 200 : 170}
          height={variant === 'detailed' ? 300 : 250}
          quality={100}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className='text-xl font-semibold mb-2'>{name}</h3>
        <p className={styles.description}>{description}</p>
        {category && variant === 'detailed' && (
          <div className='w-max my-2 px-2 py-1 bg-[#FFF7FC] text-primary border border-primary text-sm rounded-full'>
            {category}
          </div>
        )}
        <p className='text-xl font-semibold my-4'>${price}</p>
        <Button
          className='bg-secondary text-black w-full'
          onClick={handleAddToCart}
        >
          <ShoppingCart />
          Add to cart
        </Button>
      </div>
    </div>
  );
}
