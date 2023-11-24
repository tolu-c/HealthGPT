import {
  ChevronDoubleLeftIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowRightOnRectangleIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";
import { FC, ReactNode, useContext } from "react";
import { createPortal } from "react-dom";
import { ThemeContext } from "store/themeContext";
import profile from "assets/images/profile.png";
import { AuthContext } from "store/AuthContext";
import { useNavigate } from "react-router-dom";
import { ChatHistory } from "./ChatHistory";

type TSidebar = {
  closeSidebar: () => void;
};
export const Sidebar: FC<TSidebar> = ({ closeSidebar }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const newChat = () => navigate("/chat/new");

  const content: ReactNode = (
    <div className="fixed top-0 left-0 h-[100svh] max-h-[100lvh] bg-white-main z-[60] w-[343px] flex flex-col items-start">
      {/* close sidebar */}
      <span className="flex p-1.5 border border-black-400 rounded-md absolute right-0 top-1/2 -translate-y-1/2 z-[70]">
        <ChevronDoubleLeftIcon
          className="h-5 w-5 text-black-100 cursor-pointer"
          onClick={closeSidebar}
        />
      </span>
      {/* profile */}
      <div className="w-full flex items-center justify-between px-3 py-5 flex-none">
        <div className="flex w-max items-center gap-2">
          <img
            src={profile}
            alt="user.name"
            className="h-10 w-10 rounded-full object-cover object-center"
          />
          <p className="font-lato text-black-200 text-body-sm">
            Giwa Abdullahi
          </p>
        </div>
        <span
          className="h-10 w-10 flex items-center justify-center cursor-pointer p-2 border rounded-full border-white-500"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <MoonIcon className="w-5 h-5 text-black-100" />
          ) : (
            <SunIcon className="w-5 h-5 text-black-100" />
          )}
        </span>
      </div>
      {/* chat history */}
      <div className="w-full h-full grow overflow-y-scroll hide-scrollbar">
        <ChatHistory />
      </div>
      {/* settings */}
      <div className="inline-flex w-full flex-none flex-col gap-2 items-end bg-white-main shadow-sidebar pt-2.5">
        <div className="flex w-full justify-between items-center px-3">
          <div className="flex items-center justify-center gap-2">
            <span className="p-1.5 border-[0.5px] border-black-600 rounded-md">
              <MicrophoneIcon className="text-black-100 h-4 w-4" />
            </span>
            <p className="font-lato text-body-sm text-black-200">
              Voice and image recognition
            </p>
          </div>
          <div className="flex w-16 px-1.5 py-1 justify-center items-center rounded-full bg-comingSonn h-5">
            <p className="text-[8px] leading-4 text-[#00983D]">Coming soon</p>
          </div>
        </div>
        <div className="pb-5 px-3 flex w-full items-center justify-between">
          <div
            className="flex gap-2 items-center w-max cursor-pointer"
            onClick={newChat}
          >
            <span className="p-1.5 border-[0.5px] border-black-600 rounded-md">
              <PlusIcon className="text-black-100 h-4 w-4" />
            </span>
            <p className="font-lato text-body-sm text-black-200">New Chat</p>
          </div>
          <span
            className="p-1.5 w-8 h-8 cursor-pointer border-[0.5px] border-black-600 rounded-md"
            onClick={logout}
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 text-extra-error" />
          </span>
        </div>
      </div>
    </div>
  );

  return createPortal(
    content,
    document.getElementById("sidebar") as HTMLElement
  );
};
