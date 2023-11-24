import { FC, ReactNode } from "react";
import { GoBack } from "./GoBack";

type TAuthLayout = {
  title: string;
  children: ReactNode;
};

export const AuthLayout: FC<TAuthLayout> = ({ title, children }) => {
  return (
    <div className="w-screen h-[100svh] flex justify-center px-5 pt-7 bg-white-main font-lato">
      <div className="w-full h-auto relative flex flex-col gap-y-16 items-center">
        <GoBack to="/" />
        <h1 className="w-max text-black-100 text-title-lg">{title}</h1>
        {children}
      </div>
    </div>
  );
};
