import { AuthLayout } from "components/ui/AuthLayout";
import { FC } from "react";
import amico from "assets/svg/amico.svg";
import { useForm } from "react-hook-form";
import { ZodError, z } from "zod";
import { otpSchema } from "utils/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "components/ui/form/Input";
import { Button } from "components/ui/form/Button";
import { useNavigate } from "react-router-dom";

type TVerifyConfirmEmail = {
  action: "verify" | "confirm";
};

type FormData = z.infer<typeof otpSchema>;
export const VerifyConfirmEmail: FC<TVerifyConfirmEmail> = ({ action }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(otpSchema) });
  const navigate = useNavigate();

  const handleOtp = async ({ otp }: FormData) => {
    try {
      const validOtp = otpSchema.parse({ otp });
      if (action === "confirm") {
        // todo => confirm action
        console.log("confirm email");
        navigate("/change-password");
      } else if (action === "verify") {
        // todo => verify action
        console.log("verify email");
        navigate("/verification-success");
      }
      console.log(validOtp);
    } catch (error) {
      if (error instanceof ZodError) {
        setError("otp", { message: error.message });
      } else {
        setError("root", { message: "Something went wrong" });
      }
    }
  };

  const onSubmit = (data: FormData) => {
    handleOtp(data);
  };
  return (
    <AuthLayout title="Enter OTP">
      <div className="w-full flex flex-col gap-12">
        <div className="w-full flex flex-col gap-8 items-center">
          <img
            src={amico}
            alt="confirm email"
            className="w-max h-auto object-contain object-center"
          />
          <p className="font-lato text-center w-full text-black-300 text-body-lg">
            Please enter the 6 digit code sent to example@gmail.com to verify
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-10 items-center"
        >
          <Input
            name="otp"
            register={register}
            placeholder="Enter otp"
            error={errors.otp?.message}
            inputMode="numeric"
          />
          <Button type="button" disabled state={"text"} className="w-full">
            Resend
          </Button>
          <Button type="submit" className="w-full -mt-4">
            Submit
          </Button>
        </form>
        {/* ghg */}
      </div>
    </AuthLayout>
  );
};
