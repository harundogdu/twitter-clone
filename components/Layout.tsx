import React, { FC } from "react";
import Sidebar from "@/components/Sidebar";
import ActionSidebar from "@/components/ActionSidebar";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-black">
      <div className="h-full mx-auto xl:px-24 max-w-[108rem]">
        <div className="grid grid-cols-4 h-full w-full px-8">
          <Sidebar />
          <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
            {children}
          </div>
          <ActionSidebar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
