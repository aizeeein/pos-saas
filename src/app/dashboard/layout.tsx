"use client";

import BreadCrumbHeader from "@/components/breadcrumb-header";
import { CartIcon } from "@/components/cartIcon";
import DesktopSidebar from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import { store } from "@/store";
import { Provider } from "react-redux";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div className="flex h-screen">
        <DesktopSidebar />
        <div className="flex flex-col flex-1 min-h-screen">
          <header className="flex items-center justify-between px-6 py-4 h-[50px] ">
            <BreadCrumbHeader />
            <div className="gap-1 flex items-center">
              <CartIcon />
              <p>ModeToggle</p>
            </div>
          </header>
          <Separator />
          <div className="overflow-auto flex-1">
            <div className="flex-1 py-4 text-accent-foreground p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default Layout;
