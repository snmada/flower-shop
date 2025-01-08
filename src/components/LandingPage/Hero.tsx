import Image from 'next/image';
import { LinkButton } from '@/components/ui/link-button';

export default function Hero() {
  return (
    <section 
      id='hero' 
      className='relative mb-10 min-h-screen'
    >
      <div className='absolute inset-0 w-full h-full'>
        <Image
          src='/evie-s-lJKzqr36EoE-unsplash.jpg'
          alt='Hero Image'
          layout='fill'
          objectFit='cover'
          quality={100}
        />
      </div>
      <div className='absolute inset-0 opacity-50 bg-black'></div>
      <div className='relative flex flex-col justify-center items-center min-h-screen text-center'>
        <p
          className='text-[75px] sm:text-[200px] font-semibold text-black'
          style={{
            backgroundImage: 'url(/evie-s-lJKzqr36EoE-unsplash.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'transparent',  
            WebkitBackgroundClip: 'text',  
            backgroundClip: 'text', 
          }}
        >
          FLOWERS
        </p>
        <h1 className='text-[25px] sm:text-[35px] font-semibold text-white mb-4'>
          Spring delivered to your door
        </h1>
        <LinkButton 
          href='/shop/products' 
          className='w-[150px] bg-secondary'
        >
          Shop Now
        </LinkButton>
      </div>
    </section>
  );
}
