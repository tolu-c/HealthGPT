import logo from "assets/images/logo.png";
import { Button } from "components/ui/form/Button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

export const HomePage = () => {
  return (
    <div className="w-screen h-[100svh] flex justify-center font-lato px-5 pt-7 lg:pt-20 lg:bg-black-main/30 lg:bg-home lg:bg-cover lg:bg-no-repeat lg:bg-left">
      {/* <div className="absolute hidden lg:block w-full h-full bg-home" /> */}
      <div className="w-full flex flex-col items-center gap-y-16 max-w-xl lg:px-5 lg:py-12 lg:gap-y-[72px] lg:rounded-[20px] lg:border lg:border-white-main/10 bg-white-main lg:h-max static z-50">
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
          to="/register"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};
