import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';
import DynamicBreadcrumb from '@/components/DynamicBreadcrumb';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
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