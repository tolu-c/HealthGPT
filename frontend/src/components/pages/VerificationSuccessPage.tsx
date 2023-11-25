import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { AuthLayout } from "components/ui/AuthLayout";
import { Button } from "components/ui/form/Button";

export const VerificationSuccessPage = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-10 w-full items-start">
        <div className="w-full flex flex-col gap-20 items-center">
          <div className="flex flex-col w-full gap-2.5 items-center">
            <CheckBadgeIcon className="text-brand-main w-28 h-28" />
            <p className="font-lato text-brand-main text-body-lg">
              Verification Successful
            </p>
          </div>
          <p className="font-lato text-black-200 text-body-lg text-center">
            Congratulations, you have been successfully verified. You're all set
            to explore HealthGPT and access personalized health insights.
          </p>
        </div>
        <Button className="w-full" to="/login">
          Continue
        </Button>
      </div>
    </AuthLayout>
  );
};
