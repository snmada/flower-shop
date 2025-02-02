import { SidebarProvider, SidebarTrigger } from '@/components/ui/shadcn/sidebar';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import DynamicBreadcrumb from '@/components/ui/custom/dynamic-breadcrumb';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className='container mx-auto p-6 min-h-screen'>
        <div className='flex flex-row items-center'>
          <SidebarTrigger />
          <DynamicBreadcrumb />
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}