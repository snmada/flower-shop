import { MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-secondary text-black py-10 px-20'>
      <div className=' mx-auto px-4 md:px-20 flex flex-col md:flex-row items-center md:justify-between'>
        <div className='flex flex-col md:w-full md:flex-row md:items-center gap-6 md:gap-8 mb-6 md:mb-0 justify-center md:justify-between w-max'>
          <div className='flex items-center gap-2'>
            <MapPin size={20} /> 
            <div>
              <p className='text-lg font-semibold'>Our Location</p>
              <p className='text-sm text-black'>123 Flower Street, Flowertown</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Phone size={20} /> 
            <div>
              <p className='text-lg font-semibold'>Contact Us</p>
              <p className='text-sm text-black'>+1 (234) 567-890</p>
            </div>
          </div>
        </div>
      </div>
      <div className='border-t border-white mt-6 pt-6 text-center'>
        <p className='text-sm text-black'>&copy; 2024 Flower Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}
