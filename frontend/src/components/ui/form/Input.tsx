import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { VariantProps, cva } from "class-variance-authority";
import {
  FC,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { cn } from "utils";

const inputVariants = cva(
  "w-full p-3 rounded-[10px] h-[46px] flex items-center border border-black-600 dark:bg-transparent placeholder:text-black-500 placeholder:text-body-md font-lato focus:border-0 focus:ring-1 focus:ring-brand-400 focus:text-black-100 invalid:border-0 invalid:ring-1 invalid:ring-extra-error disabled:cursor-not-allowed disabled:border-black-600 disabled:text-black-600 text-black-100",
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
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type!);
  const [isInputPassword, setIsInputPassword] = useState<boolean>(
    type === "password"
  );

  const toggleViewPassword = () => {
    if (inputType === "password") {
      setInputType("text");
    } else if (inputType === "text") {
      setInputType("password");
    }
  };

  return (
    <div className="w-full flex flex-col items-start gap-y-1.5 relative">
      {isInputPassword ? (
        <span
          className="absolute top-1/2 -translate-y-1/2 right-3 z-50 cursor-pointer"
          onClick={toggleViewPassword}
        >
          {inputType === "password" ? (
            <EyeIcon className="h-6 w-6 text-black-300" />
          ) : (
            <EyeSlashIcon className="h-6 w-6 text-black-300" />
          )}
        </span>
      ) : null}
      <input
        type={inputType}
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
