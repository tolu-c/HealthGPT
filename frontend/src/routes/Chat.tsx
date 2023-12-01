import { ChatPage } from "components/pages/ChatPage";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { chatID } = useParams();
  // todo => confirm if chatid is actually a chat else render an error page

  return <ChatPage chatID={chatID!} />;
};

export default Chat;
