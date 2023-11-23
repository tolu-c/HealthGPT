import { MessageInput } from "components/MessageInput";
import { NavBar } from "components/NavBar";
import { FC, ReactNode } from "react";

type TChatLayout = {
  children: ReactNode;
};

export const ChatLayout: FC<TChatLayout> = ({ children }) => {
  return (
    <div className="flex flex-col w-screen h-[100svh] relative">
      <NavBar title="New Chat" />
      <main className="border">{children}</main>
      <div className="fixed bottom-0 w-full px-5 py-2 flex flex-col items-center">
        <MessageInput />
        <p className="font-lato text-black-500 text-[10px] leading-5 tracking-[0.25px]">
          HealthGPT is not perfect, please if symptoms persist, visit a medical
          specialist
        </p>
      </div>
    </div>
  );
};
