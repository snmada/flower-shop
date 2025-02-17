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
} from '@/components/ui/shadcn/form';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import Image from 'next/image';
import { Trash2, ImagePlus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Combobox from '@/components/ui/shadcn/combobox';
import ActionableItem from '@/components/ui/custom/actionable-item';
import { Skeleton } from '@/components/ui/shadcn/skeleton';

const formSchema = z.object({
  name: 
    z.string()
     .min(1, 'This field is required'), 
  description: 
    z.string()
     .min(1, 'This field is required'),
  imageData: 
    z.union([
      z.string().min(1, { message: 'Image is required' }),
      z.instanceof(File),
    ]).nullable().refine(value => value !== null, { message: 'Image is required' }),
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
    image: string;
    price: number;
    stock: number;
    category: string;
    flowers: { id: string; name: string }[];
  };
  onCancel: () => void;
  onSubmit: (values: FormData) => void;
  categories: { id: string, name: string }[];
  flowers: { id: string, name: string }[];
  isLoading?: boolean;
}

export default function ProductForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  categories, 
  flowers,
  isLoading = false
}: ProductFormProps){
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image ? `${process.env.NEXT_PUBLIC_AWS_S3_URL}${initialData?.image}` : null
  );  
  const [inputKey, setInputKey] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      imageData: initialData?.image || undefined,
      price: initialData?.price || 0,
      stock: initialData?.stock || 0,
      category: initialData?.category || '',
      flowers: initialData?.flowers || [],
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
        imageData: initialData.image,
        price: initialData.price,
        stock: initialData.stock,
        category: initialData.category,
        flowers: initialData.flowers || [],
      });
      setImagePreview(initialData?.image ? `${process.env.NEXT_PUBLIC_AWS_S3_URL}${initialData?.image}` : null);
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
                  {isLoading ? (
                    <Skeleton className='bg-gray-300 h-8 w-full' />
                  ) : (
                    <Input 
                      placeholder='Enter product name'
                      {...field} 
                    />
                  )}
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
                  {isLoading ? (
                    <Skeleton className='bg-gray-300 h-8 w-full' />
                  ) : (
                    <Input 
                      type='number' 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || '')} 
                    />
                  )}
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
                  {isLoading ? (
                    <Skeleton className='bg-gray-300 h-8 w-full' />
                  ) : (
                    <Input 
                      type='number' 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || '')} 
                    />
                  )}
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
                {isLoading ? (
                  <Skeleton className='bg-gray-300 h-8 w-full' />
                ) : (
                  <Input 
                    placeholder='Enter product description'
                    {...field} 
                  />
                )}
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
                {isLoading ? (
                  <Skeleton className='bg-gray-300 h-8 w-[200px]' />
                ) : (
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
                )}
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
                  {isLoading ? (
                    <Skeleton className='bg-gray-300 h-8 w-[200px]' />
                  ) : (
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
                  )}
                </FormControl>
                {(field.value?.length ?? 0) > 0 && (
                <div className='mt-4 flex flex-wrap gap-2 items-center'>
                  <p>Selected flowers: </p>
                  {isLoading? (
                    Array.from({ length: 3 }).map((_, index) => 
                      <Skeleton key={index} className='bg-gray-300 h-7 w-20 rounded-full'/>)
                  ) : (
                    <>
                    {field.value?.map((flower: any) => (
                      <div key={flower.id}>
                        <ActionableItem
                          name={flower.name}
                          isActionable={true}
                          onAction={() => handleRemoveFlower(flower.id)}
                        />
                      </div>
                    ))}
                    </>
                  )}
                </div>
                )}
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name='imageData'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <div>
                  <div className='flex flex-col gap-3 items-center justify-center bg-white p-6 border border-gray-200 border-dashed border-4'>
                    {isLoading? (
                      <Skeleton className='bg-gray-300 w-40 h-40'/>
                    ) : (
                      <>
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
                          alt='Image preview'
                          width={40}
                          height={40}
                          className='w-40 h-40 object-cover rounded-md mb-2'
                        />
                        <Button
                          onClick={() => {
                            setImagePreview(null);
                            setInputKey((prevKey) => prevKey + 1);
                            field.onChange(null);
                          }}
                          className='bg-white text-red-500 border border-red-500 rounded-full p-2'
                        >
                          <Trash2 size={18} />
                        </Button>
                        </>
                      )}
                      </>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end gap-4'>
          <Button
            type='button'
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
}
