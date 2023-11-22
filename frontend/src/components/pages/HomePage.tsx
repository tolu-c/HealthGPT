import logo from "assets/images/logo.png";
import { Button } from "components/ui/Button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

export const HomePage = () => {
  return (
    <div className="w-screen h-[100svh] flex items-center justify-center font-lato px-5">
      <div className="w-full flex flex-col items-center gap-y-[72px]">
        <div className="w-full flex flex-col gap-y-10 items-center">
          <img src={logo} alt="logo" className="w-max h-auto" />
          <p className="text-body-lg text-center text-black-main">
            Let's get started on your journey to better health. Our intelligent
            assistant is here to guide you through your health concerns, provide
            insights, and support your wellness goals. Get ready to experience
            personalized care, right at your fingertips.
          </p>
        </div>
        <Button
          className="w-full"
          icon={<ArrowRightIcon className="h-4 w-4 text-inherit" />}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};
