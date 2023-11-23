import { VariantProps, cva } from "class-variance-authority";
import { FC, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "utils";

const inputVariants = cva(
  "w-full p-3 rounded-[10px] h-[46px] flex items-center border border-black-600 placeholder:text-black-500 placeholder:text-body-md font-lato focus:border-0 focus:ring-1 focus:ring-brand-400 focus:text-black-100 invalid:border-0 invalid:ring-1 invalid:ring-extra-error disabled:cursor-not-allowed disabled:border-black-600 disabled:text-black-600 text-black-100",
  {
    variants: {
      state: {
        default: "",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

type TInput = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    name: string;
    register: any;
    error?: string;
    icon?: ReactNode;
  };

export const Input: FC<TInput> = ({
  name,
  register,
  error,
  className,
  type,
  disabled,
  state,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col items-start gap-y-1.5 relative">
      <input
        type={type}
        id={name}
        {...register(name)}
        disabled={disabled}
        className={cn(
          inputVariants({
            state,
            className,
          })
        )}
        {...props}
      />
      {error ? (
        <span className="text-sm font-lato text-extra-error text-body-sm">
          {error}
        </span>
      ) : null}
    </div>
  );
};
