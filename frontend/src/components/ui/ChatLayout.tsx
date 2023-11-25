import { MessageInput } from "components/MessageInput";
import { NavBar } from "components/NavBar";
import { Sidebar } from "components/Sidebar";
import { FC, ReactNode, useState } from "react";

type TChatLayout = {
  children: ReactNode;
};

export const ChatLayout: FC<TChatLayout> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex flex-col w-screen h-[100svh]">
      <NavBar title="New Chat" openSidebar={handleOpenSidebar} />
      <main className="grow h-full overflow-y-scroll hide-scrollbar">
        {children}
      </main>
      <div className="w-full px-5 py-2 flex flex-col items-center flex-none">
        <MessageInput />
        <p className="font-lato text-black-500 text-[10px] leading-5 tracking-[0.25px] text-center">
          HealthGPT is not perfect, please if symptoms persist, visit a medical
          specialist
        </p>
      </div>
      {isSidebarOpen ? <Sidebar closeSidebar={handleCloseSidebar} /> : null}
    </div>
  );
};
