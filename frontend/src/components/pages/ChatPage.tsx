import { ChatLayout } from "components/ui/ChatLayout";
import { FC } from "react";

type TChatPage = {
  chatID: string;
};

export const ChatPage: FC<TChatPage> = ({ chatID }) => {
  return <ChatLayout>chat for {chatID}</ChatLayout>;
};
