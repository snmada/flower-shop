'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import { montserrat} from '@/app/fonts';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState<string>('');

  const nav_items = [
    { href: '/', label: 'Home', id: 'hero' },
    { href: '/#discover', label: 'Discover', id: 'discover' },
  ];

  const handleScroll = () => {
    const sections = nav_items.map((item) => document.getElementById(item.id));
    let currentSection = '';

    sections.forEach((section) => {
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionHeight = rect.bottom - rect.top;
        const visiblePortion = Math.min(Math.max(0, window.innerHeight - rect.top), sectionHeight);

        if (visiblePortion >= sectionHeight / 2) {
          currentSection = section.id;
        }
      }
    });

    setActiveNav(currentSection);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    setActiveNav(pathname === '/' ? 'hero' : '');
  }, [pathname]);

  return (
    <header className='sticky top-0 left-0 w-full shadow-md z-10 bg-white'>
      <div className='container mx-auto p-6'>
        <div className='flex items-center justify-between relative'>
          <div className='absolute left-1/2 transform -translate-x-1/2'>
            <Link 
              href='/'
              className={`${montserrat.className} text-2xl cursor-pointer`}
            >
              Flower Shop
            </Link>
          </div>
          <div className='md:hidden flex items-center'>
            <Menu
              className='text-xl cursor-pointer hover:text-primary'
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
          <div className='hidden md:flex items-center space-x-6 w-full justify-between'>
            <nav className='flex space-x-8'>
              {nav_items.map(({ href, label, id }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-lg hover:text-primary ${activeNav === id ? 'border-b border-primary' : ''}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className='flex space-x-6 relative'>
            <div className='relative'>
              <Link href='/shop/cart'>
                <div className='relative'>
                  <ShoppingCart className='text-xl cursor-pointer hover:text-primary' />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <nav className='md:hidden bg-gray-800 text-white py-4 px-6 space-y-4'>
          {nav_items.map(({ href, label, id }) => (
            <Link
              key={href}
              href={href}
              className={`block text-lg text-center p-2 ${activeNav === id ? 'bg-primary hover:bg-primary' : 'hover:bg-gray-700'}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
