import BreadCrumbHeader from "@/components/breadcrumb-header";
import DesktopSidebar from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] ">
          <BreadCrumbHeader />
          <div className="gap-1 flex items-center">
            <p>ModeToggle</p>
          </div>
        </header>
        <Separator />
        <div className="overflow-auto flex-1">
          <div className="flex-1 py-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
