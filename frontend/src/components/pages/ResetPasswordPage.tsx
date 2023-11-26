import { AuthLayout } from "components/ui/AuthLayout";
import email from "assets/svg/email.svg";
import { Button } from "components/ui/form/Button";

export const ResetPasswordPage = () => {
  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-y-16 items-center">
        <div className="w-full flex flex-col gap-8 items-center">
          <img
            src={email}
            alt="email"
            className="w-max h-auto object-contain object-center"
          />
          <p className="font-lato text-center w-full text-brand-main text-body-lg`d">
            Password reset link has been sent to your mail
          </p>
        </div>
        <div className="flex flex-col w-full gap-10">
          <p className="text-black-200 text-body-lg font-lato text-center">
            Password reset instructions sent to your email. Please check and
            follow the link provided.
          </p>
          <Button className="w-full" state={"text"}>
            I did not receive any link
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};
