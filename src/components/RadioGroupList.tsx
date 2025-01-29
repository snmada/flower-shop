import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RadioGroupListProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function RadioGroupList({ 
  value, 
  options, 
  onChange 
}: RadioGroupListProps) {
  return ( 
    <RadioGroup 
      value={value} 
      onValueChange={onChange}
    >
      {options.map((option) => (
        <div 
          key={option} 
          className='flex items-center gap-3 p-1'
        >
          <RadioGroupItem 
            value={option} 
            id={option} 
          />
          <label 
            htmlFor={option} 
            className='text-sm cursor-pointer'
          >
            {option}
          </label>
        </div>
      ))}
    </RadioGroup>
  );
}
