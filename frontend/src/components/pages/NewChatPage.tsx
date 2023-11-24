import logo from "assets/images/logo.png";
import { Suggestions } from "components/Suggestions";

export const NewChatPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <div className="finline-lex flex-col w-max mt-9 gap-y-3 items-center">
        <img
          src={logo}
          alt="HealthGPT logo"
          className="w-[124px] h-[124px] object-center mx-auto"
        />
        <p className="font-lato text-black-100 text-body-lg">
          How are you feeling today?
        </p>
      </div>
      <Suggestions />
    </div>
  );
};
