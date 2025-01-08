import { ArrowRight } from 'lucide-react'; 
import ProductCard from '@/components/LandingPage/ProductCard';
import { LinkButton } from '@/components/ui/link-button';

const products = [
  {
    id: 1,
    imageSrc: '/',
    alt: 'Flower Image',
    title: 'Flower',
    description: 'Lorem ipsum dolor sit amet.',
    price: '$25.00',
  },
  {
    id: 2,
    imageSrc: '/',
    alt: 'Flower Image',
    title: 'Flower',
    description: 'Lorem ipsum dolor sit amet.',
    price: '$25.00',
  },
  {
    id: 3,
    imageSrc: '/',
    alt: 'Flower Image',
    title: 'Flower',
    description: 'Lorem ipsum dolor sit amet.',
    price: '$25.00',
  },
];

export default function Discover() {
  return (
    <section 
      id='discover' 
      className='mb-20 flex flex-col items-center justify-center px-20 min-h-screen'
    >
      <h1 className='text-xl font-semibold text-gray-800 mb-2'>THE</h1>
      <h1 className='text-4xl font-semibold text-gray-800 mb-12 text-center'>
        'You Can't Miss' COLLECTION
      </h1>
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-10'>
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            {...product} 
          />
        ))}
      </div>
      <div className='mt-8 text-center'>
        <LinkButton
          href='/shop/products'
          className='w-[250px] bg-primary text-white shadow-xl flex items-center justify-center gap-2 transition transform hover:scale-105'
        >
          Discover All Products
          <ArrowRight size={20} /> 
        </LinkButton>
      </div>
    </section>
  );
}
