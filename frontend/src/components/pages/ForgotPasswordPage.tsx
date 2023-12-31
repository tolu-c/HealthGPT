import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "components/ui/AuthLayout";
import { Button } from "components/ui/form/Button";
import { Input } from "components/ui/form/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { emailSchema } from "utils/zodValidation";
import { ZodError, z } from "zod";
import forgot_password from "assets/svg/forgot-password.svg";
import { useAuth } from "hooks/useAuth";
import { AxiosError } from "axios";

type FormData = z.infer<typeof emailSchema>;
export const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(emailSchema),
  });
  const navigate = useNavigate();
  const { forgotUserPassword, status } = useAuth();

  const handlelverifyEmail = async ({ email }: FormData) => {
    try {
      const validEmail = emailSchema.parse({ email });
      // * forgot user password action
      forgotUserPassword(validEmail.email).then(() => {
        navigate("/reset-password");
      });
    } catch (error) {
      if (error instanceof ZodError) {
        setError("email", { message: error.message });
      }
      if (error instanceof AxiosError) {
        setError("root", { message: error.response?.data.message });
      }

      setError("root", { message: "Something went wrong" });
    }
  };

  const onSubmit = (data: FormData) => {
    handlelverifyEmail(data);
  };

  return (
    <AuthLayout title="Password Reset">
      <div className="w-full flex flex-col gap-y-16 items-center">
        <div className="w-full flex flex-col gap-8 items-center">
          <img
            src={forgot_password}
            alt="forgot password"
            className="w-max h-auto object-contain object-center"
          />
          <p className="font-lato text-center w-full text-black-300 text-title-md">
            Oops, seems like you've forgotten your password. No worries! Enter
            your email address below, and we'll guide you through the steps to
            reset your password securely. Your health information is safe with
            us; protecting your data is our priority."
          </p>
        </div>
        <form
          className="flex flex-col gap-y-2.5 items-center justify-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="email"
            name="email"
            register={register}
            placeholder="Email Address"
            // disabled
            error={errors.email?.message}
          />
          <Button className="w-full" isLoading={status === "fetching"}>
            Send Reset Link
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};
