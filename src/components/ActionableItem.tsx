import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionableItemProps {
  name: string;
  isActionable?: boolean;
  onAction: () => void;
}

export default function ActionableItem({
  name,
  isActionable = false,
  onAction,
}: ActionableItemProps) {
  return (
    <div className='flex items-center gap-1 border border-gray-300 px-3 rounded-full py-1'>
      {name}
      {isActionable && (
        <Button
          variant='ghost'
          onClick={onAction}
          className='text-red-500 rounded-full h-8 w-8'
        >
          <X />
        </Button>
      )}
    </div>
  );
}
