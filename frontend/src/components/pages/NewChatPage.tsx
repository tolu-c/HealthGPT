import logo from "assets/images/logo.png";
import { Suggestions } from "components/Suggestions";
import { ChatLayout } from "components/ui/ChatLayout";

export const NewChatPage = () => {
  return (
    <ChatLayout>
      <div className="w-full lg:max-w-4xl lg:mx-auto h-full flex flex-col items-center justify-between">
        <div className="finline-lex flex-col w-max mt-9 gap-y-3 items-center">
          <img
            src={logo}
            alt="HealthGPT logo"
            className="w-[124px] h-[124px] object-center mx-auto"
          />
          <p className="font-lato text-black-100 dark:text-black-600 text-body-lg">
            How are you feeling today?
          </p>
        </div>
        <Suggestions />
      </div>
    </ChatLayout>
  );
};
