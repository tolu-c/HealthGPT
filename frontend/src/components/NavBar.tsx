import { Bars3BottomLeftIcon, PlusIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import logo from "assets/images/logo.png";
import { useNavigate } from "react-router-dom";

type TNavBar = {
  title: string;
  openSidebar: () => void;
};

export const NavBar: FC<TNavBar> = ({ title, openSidebar }) => {
  const navigate = useNavigate();
  const newChat = () => navigate("/chat/new");

  return (
    <div className="inline-flex flex-col px-5 py-3 w-full gap-y-5 items-center bg-white-main dark:bg-black-main justify-end border-b border-white-400 dark:border-black-400 shadow-nav">
      <div className="flex w-full items-center justify-between">
        <span
          className="w-8 h-8 p-2 flex items-center justify-center lg:hidden"
          onClick={openSidebar}
        >
          <Bars3BottomLeftIcon className="h-5 w-5 text-black-300 dark:text-white-400 cursor-pointer" />
        </span>
        <div className="w-max flex items-center gap-1">
          <img src={logo} alt="logo" className="w-9 h-9 object-center" />
          <h2 className="text-body-md font-lato text-black-300 dark:text-black-600">
            HealthGPT
          </h2>
        </div>
        <span
          className="p-1.5 border-[0.5px] rounded-md flexitems-center justify-center border-black-600 cursor-pointer"
          onClick={newChat}
        >
          <PlusIcon className="text-black-300 dark:text-white-main w-5 h-5" />
        </span>
      </div>
      <h3 className="font-lato text-body-md text-black-200 dark:text-black-600">
        {title}
      </h3>
    </div>
  );
};
