import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='container mx-auto p-6 min-h-screen'>
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
}