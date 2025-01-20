'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Trash2, ImagePlus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Combobox from '@/components/ui/combobox';

const formSchema = z.object({
  name: 
    z.string()
     .min(1, 'This field is required'), 
  description: 
    z.string()
     .min(1, 'This field is required'),
  image: 
    z.instanceof(File, { message: 'This field is required' })
     .refine((file) => file instanceof File, { message: 'This field is required' }),
  price: 
    z.preprocess(
     (value) => (value === '' ? 0 : Number(value)),
      z.number()
       .positive('Price must be greater than 0')),
  stock: 
    z.preprocess(
     (value) => (value === '' ? 0 : Number(value)),
      z.number()
       .int('Stock must be an integer')
       .nonnegative('Stock must be 0 or more')), 
  category: 
    z.string()
     .min(1, 'This field is required'),
  flowers: 
    z.array(
      z.object({ 
        id: z.string().min(1, 'This field is required'),
        name: z.string().min(1, 'This field is required'),
      })
    ).min(1, 'At least one flower must be added'),
});

type FormData = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData?: {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    flowers: { id: string; name: string }[];
    image?: File;
    imageUrl: string; 
  };
  onCancel: () => void;
  onSubmit: (values: FormData) => void;
  categories: { id: string, name: string }[];
  flowers: { id: string, name: string }[];
}

export default function ProductForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  categories, 
  flowers 
}: ProductFormProps){
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const [inputKey, setInputKey] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: '',
      flowers: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData, 
      });
    }
  }, [initialData, form]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <div className='grid grid-cols-3 gap-10'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder='Enter product name'
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input 
                    type='number' 
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || '')} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input 
                    type='number' 
                    {...field} 
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || '')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <Input 
                  placeholder='Enter product description'
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1 mt-2'>
              <FormLabel>Choose category</FormLabel>
              <FormControl>
                <Combobox
                  options={
                    categories
                      ? categories.map((category) => ({
                          label: category.name,
                          value: category.id,
                        }))
                      : []
                  }
                  value={field.value}
                  onChange={(value: any) => field.onChange(value)}
                  placeholder='See options'  
                  searchable={true} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='flowers'
          render={({ field }) => {
            const handleAddFlower = (selectedId: string) => {
              const selectedFlower = flowers?.find((flower) => flower.id === selectedId);
              if (selectedFlower && !field.value?.some((f: any) => f.id === selectedId)) {
                field.onChange([...field.value ?? [], selectedFlower]);
              }
            };

            const handleRemoveFlower = (flowerId: string) => {
              field.onChange(field.value?.filter((flower: any) => flower.id !== flowerId));
            };

            return (
              <FormItem className='flex flex-col gap-1 mt-2'>
                <FormLabel>Choose flowers</FormLabel>
                <FormControl>
                  <Combobox
                    options={
                      flowers
                        ? flowers.map((flower) => ({
                            label: flower.name,
                            value: flower.id,
                          }))
                        : []
                    }
                    placeholder='See options'
                    onChange={handleAddFlower}
                    searchable={true}
                  />
                </FormControl>
                {(field.value?.length ?? 0) > 0 && (
                <div className='mt-4 flex flex-wrap gap-2 items-center'>
                  <p>Selected flowers: </p>
                  {field.value?.map((flower: any) => (
                    <div
                      key={flower.id}
                      className='flex items-center gap-1 border border-gray-300 px-3 rounded-full'
                    >
                      {flower.name}
                      <Button
                        variant='ghost'
                        onClick={() => handleRemoveFlower(flower.id)}
                        className='text-red-500 rounded-full h-8 w-8 '
                      >
                        <X />
                      </Button>
                    </div>
                  ))}
                </div>
                )}
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name='image'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <div className='flex flex-col gap-3 items-center justify-center bg-white p-6 border border-gray-200 border-dashed border-4'>
                  <label 
                    htmlFor='file-input' 
                    className='flex flex-col gap-3 items-center cursor-pointer'
                  >
                    {!imagePreview && (
                      <>
                      <ImagePlus 
                        size={40}
                        strokeWidth={0.75}
                      />
                      Choose an image
                      </>
                    )}
                  </label>
                  <Input
                    key={inputKey}
                    id='file-input' 
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImagePreview(URL.createObjectURL(file)); 
                        field.onChange(file);
                      }
                    }}
                  />
                  {imagePreview && (
                    <>
                    <Image
                      src={imagePreview}
                      alt='Selected image preview'
                      width={40}
                      height={40}
                      className='w-40 h-40 object-cover rounded-md mb-2'
                    />
                    <Button
                      onClick={() => {
                        setImagePreview(null); 
                        setInputKey(prevKey => prevKey + 1);
                      }}
                      className='bg-white text-red-500 border border-red-500 rounded-full p-2'
                    >
                      <Trash2 size={18} />
                    </Button>
                    </>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end gap-4 mt-5'>
          <Button
            className='bg-white border border-gray-300'
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type='submit'
            className='bg-black text-white'
          >
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

