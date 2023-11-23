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
      className="w-9 h-9 flex items-center justify-center cursor-pointer absolute top-0 left-0 z-50 flex-none"
      onClick={() => navigate(to)}
    >
      <ChevronLeftIcon className="w-6 h-6 text-black-100" />
    </span>
  );
};
