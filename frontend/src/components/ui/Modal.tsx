import { XMarkIcon } from "@heroicons/react/20/solid";
import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

type TModal = {
  leftIcon?: ReactNode;
  title: string;
  children: ReactNode;
  close: () => void;
};

export const Modal: FC<TModal> = ({ leftIcon, title, children, close }) => {
  const content: ReactNode = (
    <div className="fixed w-screen h-screen bg-white-500/70 dark:bg-black-500/70 flex items-center justify-center z-[9999] top-0 left-0">
      <div className="p-3 pb-7 inline-flex justify-center items-center rounded-[10px] bg-white-main dark:bg-black-main w-full h-max max-w-xs">
        <div className="w-full flex flex-col gap-4 items-start relative">
          <div className="flex w-full items-center">
            {leftIcon && (
              <span className="w-10 h-10 flex-none">{leftIcon}</span>
            )}
            <p className="font-lato text-black-main dark:text-white-400 text-body-lg w-full text-center grow ">
              {title}
            </p>
            <span
              className="p-1.5 w-10 h-10 rounded-full flex items-center justify-center border border-white-500 cursor-pointer flex-none"
              onClick={close}
            >
              <XMarkIcon className="h-5 w-5 text-black-100 dark:text-white-400" />
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.getElementById("modal") as HTMLElement);
};
