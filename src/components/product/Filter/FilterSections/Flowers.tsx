import CheckboxList from '@/components/ui/custom/checkbox-list';

interface FlowersProps {
  options: string[];
  selectedOptions: string[];
  onChange: (value: string[]) => void;
}

export default function Flowers({
  options,
  selectedOptions,
  onChange
}: FlowersProps) {
  return(
    <CheckboxList
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
    />
  );
}
