import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

type TGoBack = {
  to: string;
};

export const GoBack: FC<TGoBack> = ({ to }) => {
  const navigate = useNavigate();

  return (
    <span
      className="w-6 h-6 flex items-center justify-center cursor-pointer p-2.5 absolute top-0 left-0 flex-none z-50"
      onClick={() => navigate(to)}
    >
      <ChevronLeftIcon className="w-6 h-6 text-black-100" />
    </span>
  );
};
