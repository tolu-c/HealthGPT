import { AuthLayout } from "components/ui/AuthLayout";
import hand from "assets/svg/hand.svg";
import { ZodError, z } from "zod";
import { changePasswordSchema } from "utils/zodValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Input } from "components/ui/form/Input";
import { Button } from "components/ui/form/Button";
import { FC } from "react";
import { useAuth } from "hooks/useAuth";

type FormData = z.infer<typeof changePasswordSchema>;
type TChangePassword = {
  token: string;
};
export const ChangePasswordPage: FC<TChangePassword> = ({ token }) => {
  // console.log(token);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(changePasswordSchema),
  });
  const navigate = useNavigate();
  const { resetUserPassword, status } = useAuth();

  const handleChangePassword = async ({
    newPassword,
    confirmPassword,
  }: FormData) => {
    try {
      const validPasswords = changePasswordSchema.parse({
        newPassword,
        confirmPassword,
      });
      // console.log(validPasswords);
      resetUserPassword(
        token,
        validPasswords.confirmPassword,
        validPasswords.newPassword
      ).then(() => {
        navigate("/password-change-success");
      });
    } catch (error) {
      if (error instanceof ZodError) {
        setError("newPassword", { message: error.message });
        setError("confirmPassword", { message: error.message });
      } else {
        setError("root", { message: "Something went wrong" });
      }
    }
  };

  const onSubmit = (data: FormData) => {
    handleChangePassword(data);
  };

  return (
    <AuthLayout title="Change Password">
      <div className="w-full flex flex-col gap-y-16 items-center">
        <div className="w-full flex flex-col gap-8 items-center">
          <img
            src={hand}
            alt="change password"
            className="w-max h-auto object-contain object-center"
          />
        </div>
        <form
          className="flex flex-col gap-y-2.5 items-center justify-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            register={register}
            name="newPassword"
            placeholder="Enter password"
            type="password"
            error={errors.newPassword?.message}
          />
          <Input
            register={register}
            name="confirmPassword"
            placeholder="Confirm password"
            type="password"
            error={errors.confirmPassword?.message}
          />
          <Button className="w-full" isLoading={status === "fetching"}>
            Save
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};
