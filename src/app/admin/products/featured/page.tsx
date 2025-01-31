'use client';

import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSearch } from '@/hooks/useSearch';
import { Button } from '@/components/ui/button';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import SearchInput from '@/components/ui/search-input';
import Combobox from '@/components/ui/combobox';
import { Package, Star, X } from 'lucide-react';
import { getAllProducts, updateFeaturedProducts } from '@/actions/products';
import { getAllCategories } from '@/actions/categories';
import { getFeaturedProducts } from '@/actions/products';
import ActionableItem from '@/components/ActionableItem';

const DEFAULT_PAGE_SIZE = 10;

export default function FeaturedProductsPage() {
  const { searchName, handleSearch } = useSearch();
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All categories');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [editingProducts, setEditingProducts] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const { data } = useQuery({
    queryKey: ['products', currentPage, pageSize, searchName, selectedCategory],
    queryFn: () =>
      getAllProducts({
        name: searchName,
        category: selectedCategory,
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      }),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
  });

  const { data: featuredProductsData } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: getFeaturedProducts,
  });

  const updateFeaturedProductsMutation = useMutation({
    mutationFn: updateFeaturedProducts, 
  });

  const { products = [], totalProducts = 0 } = data || {};
  const { featuredProducts = [] } = featuredProductsData || {};

  useEffect(() => {
    if (featuredProducts.length > 0) {
      setSelectedProducts(featuredProducts.map((p) => p.id));
    }
  }, [featuredProducts]);

  const handleEditClick = () => {
    setEditingProducts(selectedProducts);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setEditingProducts([]);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    updateFeaturedProductsMutation.mutate(editingProducts, {
      onSuccess: () => {
        setSelectedProducts(editingProducts);
        setEditingProducts([]);
        setIsEditing(false);
      },
    });
  };

  const handleSelectProduct = (id: string) => {
    if (!isEditing) return;

    if (editingProducts.includes(id)) {
      setEditingProducts(editingProducts.filter((productId) => productId !== id));
    } else if (editingProducts.length < 3) {
      setEditingProducts([...editingProducts, id]);
    }
  };

  return (
    <div className='bg-[#FBFBFB] px-6 py-6 mt-10 rounded-lg'>
      <div className='mb-4 flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center'>
            {isEditing ? (
              <p className='font-semibold pr-2'>Selected Products: </p>
            ) : (
              <div className='flex flex-row items-center'>
                <div className='h-3 w-3 bg-[#88D66C] rounded-full mr-3'></div>
                <p className='font-semibold pr-2'>Featured Products: {' '}
                  {featuredProducts.length === 0 && <span className='text-gray-400'>No featured products selected</span>}
                </p>
              </div>
            )}
            <div className='flex gap-4 flex-wrap'>
              {(isEditing ? editingProducts : selectedProducts).map((productId) => {
                const product = products.find((p) => p.id === productId) || featuredProducts.find((p) => p.id === productId);
                return (
                  product && (
                    <div key={product.id}>
                      <ActionableItem
                        name={product.name}
                        isActionable={isEditing}
                        onAction={() => handleSelectProduct(product.id)}
                      />
                    </div>
                  )
                );
              })}
            </div>
          </div>
          <div>
            {!isEditing ? (
              <Button
                variant='default'
                onClick={handleEditClick} 
                className='bg-black text-white'
              >
                Edit
              </Button>
            ) : (
              <div className='flex gap-4'>
                <Button
                  variant='outline'
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveClick} 
                  className='bg-black text-white'
                  disabled={editingProducts.length < 3}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
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
      {isEditing && (
        <p className='font-semibold text-gray-700'>
          Choose exactly 3 products to mark as featured. You can unselect a product if needed.
        </p>
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-5'>
        {products.map((product) => (
          <div
            key={product.id}
            className={`p-4 border rounded-lg shadow-md ${isEditing && 'cursor-pointer'} ${
              (isEditing ? editingProducts : selectedProducts).includes(product.id)
                ? 'bg-black text-white '
                : 'bg-white'
            }`}
            onClick={() => handleSelectProduct(product.id)}
          >
            <div className='flex items-center justify-between'>
              <Package className='text-xl' />
              {(isEditing ? editingProducts : selectedProducts).includes(product.id) && (
                <span className='text-[18px] text-black'>
                  <Star fill='yellow' size={32} />
                </span>
              )}
            </div>
            <h3 className='mt-2 text-lg font-semibold'>{product.name}</h3>
          </div>
        ))}
      </div>
      <div className='mt-10'>
        <DataTablePagination
          pageSize={pageSize}
          setPageSize={setPageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={totalProducts}
        />
      </div>
    </div>
  );
}
