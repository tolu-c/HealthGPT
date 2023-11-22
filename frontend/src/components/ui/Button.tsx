import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { useNavigate } from "react-router";
import { cn } from "utils";
import { Loader } from "./Loader";

const buttonVariants = cva(
  "active:scale-95 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-[10px] h-[52px] w-[155px] px-6 py-2.5 font-lato",
  {
    variants: {
      state: {
        filled:
          "bg-brand-main text-white-main hover:shadow-hoverFilled active:shadow-pressedFilled disabled:bg-white-500 disabled:text-white-main disabled:shadow-none",
        outline:
          "border border-brand-main text-brand-main hover:shadow-hoverOutline active:shadow-pressedOutline disabled:border-white-500 disabled:text-black-500 disabled:shadow-none",
        text: "bg-transparent text-brand-main hover:bg-white-200 active:bg-white-200 disabled:bg-transparent disabled:text-black-500",
      },
    },
    defaultVariants: {
      state: "filled",
    },
  }
);

type TButton = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon?: ReactNode;
    isLoading?: boolean;
    to?: string;
  };

export const Button: FC<TButton> = ({
  icon,
  isLoading,
  to,
  className,
  children,
  state,
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <button
      className={cn(
        buttonVariants({
          state,
          className,
        })
      )}
      onClick={handleClick}
      disabled={isLoading}
      {...props}
    >
      <span className="text-label-lg">{children}</span>
      {isLoading ? <Loader /> : icon}
    </button>
  );
};
