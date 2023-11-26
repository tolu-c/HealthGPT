import {
  ArrowLeftOnRectangleIcon,
  ChevronDoubleLeftIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowRightOnRectangleIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";
import { FC, ReactNode, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { ThemeContext } from "store/themeContext";
import profile from "assets/images/profile.png";
import { AuthContext } from "store/AuthContext";
import { useNavigate } from "react-router-dom";
import { ChatHistory } from "./ChatHistory";
import { Modal } from "./ui/Modal";
import { useAuth } from "hooks/useAuth";

type TSidebar = {
  closeSidebar: () => void;
};

export const Sidebar: FC<TSidebar> = ({ closeSidebar }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false);
  const { logoutUser } = useAuth();

  const newChat = () => navigate("/chat/new");
  const closeModal = () => setOpenConfirmationModal(false);
  const openModal = () => setOpenConfirmationModal(true);

  const content: ReactNode = (
    <div className="fixed top-0 left-0 h-[100svh] max-h-[100lvh] w-screen bg-white-500/70 dark:bg-black-500/70">
      {/* close sidebar */}
      <span className="flex p-1.5 border border-black-400 dark:border-white-main rounded-md absolute left-[343px] top-12 z-[70]">
        <ChevronDoubleLeftIcon
          className="h-5 w-5 text-black-100 dark:text-white-400 cursor-pointer"
          onClick={closeSidebar}
        />
      </span>
      <div className="h-full bg-white-main dark:bg-black-main z-[60] w-[343px] flex flex-col items-start">
        {/* profile */}
        <div className="w-full flex items-center justify-between px-3 py-5 flex-none">
          <div className="flex w-max items-center gap-2">
            <img
              src={profile}
              alt="user.name"
              className="h-10 w-10 rounded-full object-cover object-center"
            />
            <p className="font-lato text-black-200 dark:text-black-600 text-body-sm">
              Giwa Abdullahi
            </p>
          </div>
          <span
            className="h-10 w-10 flex items-center justify-center cursor-pointer p-2 border rounded-full border-white-500 dark:text-black-600"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <MoonIcon className="w-5 h-5 text-black-100" />
            ) : (
              <SunIcon className="w-5 h-5 text-black-100 dark:text-black-600" />
            )}
          </span>
        </div>
        {/* chat history */}
        <div className="w-full h-full grow overflow-y-scroll hide-scrollbar">
          <ChatHistory />
        </div>
        {/* settings */}
        <div className="inline-flex w-full flex-none flex-col gap-2 items-end bg-white-main dark:bg-black-main shadow-sidebar pt-2.5">
          <div className="flex w-full justify-between items-center px-3">
            <div className="flex items-center justify-center gap-2">
              <span className="p-1.5 border-[0.5px] border-black-600 rounded-md">
                <MicrophoneIcon className="text-black-100 dark:text-white-400 h-4 w-4" />
              </span>
              <p className="font-lato text-body-sm text-black-200 dark:text-black-600">
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
                <PlusIcon className="text-black-100 dark:text-white-400 h-4 w-4" />
              </span>
              <p className="font-lato text-body-sm text-black-200 dark:text-black-600">
                New Chat
              </p>
            </div>
            <span
              className="p-1.5 w-8 h-8 cursor-pointer border-[0.5px] border-black-600 rounded-md"
              onClick={openModal}
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 text-extra-error" />
            </span>
          </div>
        </div>
        {openConfirmationModal ? (
          <Modal
            close={closeModal}
            title="Logout"
            leftIcon={
              <span className="w-full h-full rounded-full p-1.5 flex items-center justify-center bg-extra-error/10">
                <ArrowLeftOnRectangleIcon className="h-5 w-5 text-extra-error" />
              </span>
            }
          >
            <div className="w-full flex flex-col gap-4">
              <p className="w-full text-center font-lato text-body-sm text-black-200 dark:text-black-600">
                Are you sure you want to logout?
              </p>
              <div className="w-full flex items-center gap-8">
                <button
                  className="w-full border border-black-500 rounded-[10px] h-[38px] flex items-center justify-center font-lato text-body-sm text-black-200 hover:shadow-pressedOutline active:shadow-pressedOutline"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="w-full border border-extra-error rounded-[10px] h-[38px] flex items-center justify-center font-lato text-body-sm text-extra-error hover:shadow-pressedOutline active:shadow-pressedOutline"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );

  return createPortal(
    content,
    document.getElementById("sidebar") as HTMLElement
  );
};
