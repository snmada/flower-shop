'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/shadcn/breadcrumb';

export default function DynamicBreadcrumb() {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  const pathname = usePathname();
  const pathnames = pathname
    .split('/')
    .filter((x) => x && x !== 'admin')
    .filter((x) => !uuidRegex.test(x));

  return (
    <Breadcrumb>
      <BreadcrumbList className='flex flex-row items-center'>
        {pathnames.map((value, index) => {
          const to = `/admin/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <div
              key={to} 
              className='flex items-center capitalize text-[16px]'
            >
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{value}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={to}>{value}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
