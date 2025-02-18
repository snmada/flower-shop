'use client'
 
import { Flower } from 'lucide-react';
 
export default function ErrorPage() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center text-center p-6'>
      <div className='flex flex-row items-center gap-2'>
        <h1 className='text-9xl font-extrabold text-primary'>ERR</h1>
        <Flower size={110} className='text-primary' />
        <h1 className='text-9xl font-extrabold text-primary'>R</h1>
      </div>
      <p className='text-2xl my-3 font-semibold text-gray-700'>Ooops! Something went wrong</p>
      <p className='my-3'>Don't worry and please try again later</p>
    </div>
  );
}