import RadioGroupList from '@/components/ui/custom/radio-group-list';

interface CategoryProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function Category({
  value,
  options,
  onChange
}: CategoryProps) {
  return(
    <RadioGroupList
      value={value}
      options={options}
      onChange={onChange}
    />
  );
}
