import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  handleSearch: (value: string) => void;
  placeholder: string;
}

export default function SearchInput({
  value,
  handleSearch,
  placeholder,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const clearInput = () => {
    setInputValue('');
    handleSearch('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    handleSearch(value);
  };

  return (
    <div className='relative mb-5'>
      <Input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className='pl-10 pr-10 py-5 bg-white border'
      />
      <Search 
        className='absolute left-3 top-1/2 transform -translate-y-1/2 text-primary' 
        size={18}
      />
      {inputValue && (
        <X
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer'
          size={18}
          onClick={clearInput}
        />
      )}
    </div>
  );
}
