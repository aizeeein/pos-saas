import DesktopSidebar from "@/components/Sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <DesktopSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

export default Layout;
