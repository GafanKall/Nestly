import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="md:pl-64 pb-[68px] md:pb-0">
        <main className="page-container">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
