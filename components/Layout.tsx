import React, {FC} from "react";
import Sidebar from "@/components/Sidebar";
import ActionSidebar from "@/components/ActionSidebar";

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout: FC<ILayoutProps> = ({children}) => {
    return (
        <div className="
        h-screen
        bg-black
        ">
            <div className="
            h-full
            mx-auto
            xl:px-30
            max-w-[78rem]
            ">
                <div className="
                    grid
                    grid-cols-4
                    h-full
                ">
                    <Sidebar />
                    <div className="
                    col-span-3
                    lg:col-span-2
                    border-x-[1px]
                    border-neutral-800
                    ">
                        {children}
                    </div>
                    <ActionSidebar />
                </div>
            </div>
        </div>
    );
};

export default Layout;