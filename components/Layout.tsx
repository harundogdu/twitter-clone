import React, { FC } from "react";

import ActionSidebar from "@/components/ActionSidebar";
import Sidebar from "@/components/Sidebar";
interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div
      className="h-screen bg-black overflow-auto scrollbar-thin  scrollbar-thumb-neutral-500 scrollbar-track-neutral-800 scrollbar-thumb-rounded-md scrollbar-track-rounded-sm"
      id="layout"
    >
      <div className="h-full mx-auto xl:px-24 max-w-[108rem]">
        <div className="grid grid-cols-4 h-full w-full px-8">
          <Sidebar />
          <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
            {children}
          </div>
          <div>
            <ActionSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
