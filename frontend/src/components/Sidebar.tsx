import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

type TSidebar = {
  closeSidebar: () => void;
};
export const Sidebar: FC<TSidebar> = ({ closeSidebar }) => {
  const content: ReactNode = (
    <div
      onClick={closeSidebar}
      className="fixed top-0 left-0 w-screen h-[100svh] max-h-[100lvh] bg-black-300 p-4 z-[60]"
    >
      Sidebar
    </div>
  );

  return createPortal(
    content,
    document.getElementById("sidebar") as HTMLElement
  );
};
