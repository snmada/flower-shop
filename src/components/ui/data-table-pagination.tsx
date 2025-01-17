import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PAGES_TO_SHOW = 10;

interface DataTablePaginationProps {
  pageSize: number;
  setPageSize: (size: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalItems: number;
}

export function DataTablePagination({
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  totalItems,
}: DataTablePaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const generatePageNumbers = () => {
    const half = Math.floor(PAGES_TO_SHOW / 2);
    const startPage = Math.max(1, currentPage - half);
    const endPage = Math.min(totalPages, startPage + PAGES_TO_SHOW - 1);

    const pages: (number | 'ellipsis')[] = [];

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('ellipsis');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('ellipsis');
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (value: string) => {
    const newPageSize = parseInt(value, 10);
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  return (
    <div className='flex flex-row justify-center gap-3'>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href='#'
                className={currentPage === 1 ? 'disabled' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
              />
            </PaginationItem>

            {generatePageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href='#'
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href='#'
                className={currentPage === totalPages ? 'disabled' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage !== totalPages)
                    handlePageChange(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div>
        <Select
          value={pageSize.toString()}
          onValueChange={(value: string) => handlePageSizeChange(value)}
        >
          <SelectTrigger>
            <SelectValue>{`${pageSize} / page`}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='25'>25</SelectItem>
            <SelectItem value='50'>50</SelectItem>
            <SelectItem value='100'>100</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
