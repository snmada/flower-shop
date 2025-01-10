export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-gradient-to-r from-[#E7EAE6] via-white to-[#E7EAE6]'>
      <div className='container mx-auto p-6 min-h-screen'>
        {children}
      </div>
    </div>
  );
}
