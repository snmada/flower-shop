'use client';

import { useEffect, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/shadcn/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/shadcn/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/shadcn/popover';

interface ComboboxProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder: string;
  searchable?: boolean;
  className?: string;
}

export default function Combobox({
  options,
  value: selectedValue,
  onChange,
  placeholder,
  searchable = true,  
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedValue || '');  

  useEffect(() => {
    setValue(selectedValue || '');
  }, [selectedValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn('w-[200px] justify-between', className)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder
          }
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-[200px] p-0', className)}>
        <Command>
          {searchable && (
            <CommandInput placeholder='Search...' />
          )}
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    if (onChange) {
                      onChange(currentValue);
                    }
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                    'ml-auto',
                    value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
