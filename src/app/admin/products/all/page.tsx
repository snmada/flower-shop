'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@/hooks/useSearch';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Plus } from 'lucide-react';
import ProductDetailsDialog from '@/components/ProductDetailsDialog';
import ConfirmDialog from '@/components/ui/confirm-dialog';
import SearchInput from '@/components/ui/search-input';
import Combobox from '@/components/ui/combobox';
import { getAllProducts, deleteProductById } from '@/actions/products';
import { getAllCategories } from '@/actions/categories';
import ProductActions from '@/components/ProductActions';

const DEFAULT_PAGE_SIZE = 10;

export default function AllProductsPage() {
  const router = useRouter();
  const { searchName, handleSearch } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string>('All categories');
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ['products', currentPage, pageSize, searchName, selectedCategory],
    queryFn: () =>
      getAllProducts({
        name: searchName,
        category: selectedCategory,
        skip: (currentPage - 1) * pageSize,
        take: pageSize
      }),
  });

  const { products = [], totalProducts = 0 } = data || {};

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
  });

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalProducts);

  const handleViewDetails = (productId: string) => {
    setSelectedProductId(productId);
    setIsDialogOpen(true);
  };
  
  const closeDetailsDialog = () => {
    setSelectedProductId(null);
    setIsDialogOpen(false);
  };

  const confirmDelete = (productId: string) => {
    setSelectedProductId(productId);
    setIsConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    if (selectedProductId) {
      setSelectedProductId(null);
      setIsConfirmDialogOpen(false);
    }
  };

  async function handleDeleteProduct(productId: string){
    if (!productId) return;
    try {
      await deleteProductById(productId);
      refetch(); 
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      closeConfirmDialog();
    }
  };

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
      <div className='p-5 my-5 rounded-md bg-white border border-gray-200'>
          <SearchInput 
            value={searchName}
            handleSearch={handleSearch}
          />
        <div className='flex flex-row gap-2 items-center justify-end'>
          <p>Choose category</p>
          <Combobox
            options={
              categories
                ? categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))
                : []
            }
            value={categories?.find((category) => category.name === selectedCategory)?.id || ''}
            onChange={(value) => {
              const selectedCategoryName = categories?.find((category) => category.id === value)?.name;
              if (selectedCategoryName) {
                setSelectedCategory(selectedCategoryName);
              }
            }}
            placeholder='See options'
            searchable={false}
          />
          {selectedCategory !== 'All categories' && (
            <Button
              variant='outline'
              onClick={() => setSelectedCategory('All categories')}
              className='ml-2'
            >
              Reset
            </Button>
          )}
        </div>
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
                <ProductActions
                  onViewDetails={() => handleViewDetails(productId)}
                  onUpdate={() => router.push(`/admin/products/update/${productId}`)}
                  onDelete={() => confirmDelete(productId)}
                />
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
      <ProductDetailsDialog
        productId={selectedProductId}
        isOpen={isDialogOpen}
        onClose={closeDetailsDialog}
      />
       <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={closeConfirmDialog}
        onConfirm={() => handleDeleteProduct(selectedProductId as string)}
        description='This action cannot be undone. This will permanently delete selected product.'
        confirmButtonText='Delete'
      />
    </div>
  );
}
