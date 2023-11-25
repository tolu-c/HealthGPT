import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { useNavigate } from "react-router";
import { cn } from "utils";

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
        secondary:
          "border border-white-500 text-black-100 hover:bg-white-200 disabled:border-white-500 disabled:text-black-500",
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
      {isLoading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="28"
          viewBox="0 0 29 28"
          fill="none"
          className="animate-spin"
        >
          <path
            d="M28.5 14C28.5 11.2311 27.6789 8.52431 26.1406 6.22202C24.6022 3.91973 22.4157 2.12531 19.8576 1.06569C17.2994 0.00605967 14.4845 -0.271187 11.7687 0.269006C9.053 0.809199 6.55844 2.14257 4.6005 4.10051C2.64257 6.05844 1.3092 8.553 0.769006 11.2687C0.228813 13.9845 0.50606 16.7994 1.56569 19.3576C2.62531 21.9157 4.41973 24.1022 6.72202 25.6406C9.02431 27.1789 11.7311 28 14.5 28V26.6228C12.0035 26.6228 9.56297 25.8825 7.48717 24.4954C5.41137 23.1084 3.79347 21.137 2.83809 18.8305C1.8827 16.524 1.63273 13.986 2.11978 11.5374C2.60683 9.08885 3.80903 6.83968 5.57436 5.07436C7.33968 3.30903 9.58885 2.10683 12.0374 1.61978C14.486 1.13273 17.024 1.3827 19.3305 2.33809C21.637 3.29347 23.6084 4.91137 24.9954 6.98717C26.3825 9.06297 27.1228 11.5035 27.1228 14H28.5Z"
            fill="white"
          />
        </svg>
      ) : (
        <>
          <span className="text-label-lg flex items-center gap-2">
            {children}
          </span>
          {icon ? icon : null}
        </>
      )}
    </button>
  );
};
