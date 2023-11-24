import { FC } from "react";

type TChatPage = {
  chatID: string;
};

export const ChatPage: FC<TChatPage> = ({ chatID }) => {
  return <div>chat for {chatID}</div>;
};
