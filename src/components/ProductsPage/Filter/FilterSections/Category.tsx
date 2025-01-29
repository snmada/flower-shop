import RadioGroupList from '@/components/RadioGroupList';

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
