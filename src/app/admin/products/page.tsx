'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/actions/products';
import { DataTable } from '@/components/ui/data-table';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

const DEFAULT_PAGE_SIZE = 10;

export default function AdminProductsPage() {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['products', currentPage, pageSize],
    queryFn: () =>
      getAllProducts({  
        skip: (currentPage - 1) * pageSize,
        take: pageSize
      }),
  });

  const { products = [], totalProducts = 0 } = data || {};

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalProducts);

  return (
    <div className='flex flex-col gap-5 pt-3'>
      <div className='flex justify-end'>
        <Button 
          onClick={() => router.push('/admin/products/add')}
          className='bg-black text-white'
        >
          Add New Product
          <Plus />
        </Button>
      </div>
      <DataTable
        data={products}
        columns={[
          {
            accessorKey: 'name',
            header: 'Name'
          },
          {
            accessorKey: 'price',
            header: 'Price',
          },
          {
            accessorKey: 'stock',
            header: 'Stock',
          },
          {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
              const productId = row.original.id;
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                      <span className='sr-only'>Open menu</span>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='cursor-pointer'>View item details</DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer'
                      onClick={() => router.push(`/admin/products/update/${productId}`)}
                    >
                      Update item
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='flex items-center text-red-600 cursor-pointer'>
                      <TrashIcon className='w-4 h-4' />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
          }
        ]}
      />
      {totalProducts > 0 && (
        <div className='flex mt-4 text-sm text-gray-600 justify-end'>
          Showing {startIndex} to {endIndex} of {totalProducts} products
        </div>
      )}
      <DataTablePagination
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={totalProducts}
      />
    </div>
  );
}