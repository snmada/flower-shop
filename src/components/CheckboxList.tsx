import { Checkbox } from '@/components/ui/checkbox';

interface CheckboxListProps {
  options: string[];
  selectedOptions: string[];
  onChange: (value: string[]) => void;
}

export default function CheckboxList({
  options,
  selectedOptions,
  onChange
}: CheckboxListProps) {
  return (
    <>
    {options.map((option) => (
      <div 
        key={option} 
        className='flex items-center gap-3 p-2'
      >
        <Checkbox
          id={option}
          checked={selectedOptions.includes(option)}
          onCheckedChange={(checked) => {
            const updated = checked
              ? [...selectedOptions, option]
              : selectedOptions.filter((item) => item !== option);
            onChange(updated);
          }}
        />
        <label 
          htmlFor={option} 
          className='text-sm cursor-pointer'
        >
          {option}
        </label>
      </div>
    ))}
    </>
  );
}
