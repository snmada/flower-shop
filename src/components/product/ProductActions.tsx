import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/shadcn/dropdown-menu';
import { MoreHorizontal, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/shadcn/button';

interface ProductActionsProps {
  onViewDetails: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function ProductActions({ 
  onViewDetails, 
  onUpdate, 
  onDelete 
}: ProductActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={onViewDetails}
        >
          View item details
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={onUpdate}
        >
          Update item
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className='flex items-center text-red-600 cursor-pointer' 
          onClick={onDelete}
        >
          <TrashIcon className='w-4 h-4' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
