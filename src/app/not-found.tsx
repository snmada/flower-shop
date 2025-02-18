'use client'
 
import { Flower } from 'lucide-react';
 
export default function NotFoundPage() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center text-center p-6'>
      <div className='flex flex-row items-center gap-2'>
        <h1 className='text-9xl font-extrabold text-primary'>4</h1>
        <Flower size={110} className='text-primary' />
        <h1 className='text-9xl font-extrabold text-primary'>4</h1>
      </div>
      <p className='text-2xl my-3 font-semibold text-gray-700'>So sorry! Nothing here....</p>
      <p className='my-3'>The page you are looking for cannot be found</p>
    </div>
  );
}