import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { MobileHeader } from "@/components/layout/MobileHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:block">
      <Sidebar />
      <div className="md:pl-64 flex flex-col min-h-screen pb-20 md:pb-8">
        <MobileHeader />
        <main className="page-container flex-1">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
