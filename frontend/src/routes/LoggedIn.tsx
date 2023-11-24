import { ChatLayout } from "components/ui/ChatLayout";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// routes
const Chat = lazy(() => import("./Chat"));
const NewChat = lazy(() => import("./NewChat"));

const LoggedIn = () => {
  return (
    <ChatLayout>
      <Routes>
        <Route path="/" element={<NewChat />} />
        <Route element={<Chat />} path="chat/:chatID" />
        <Route path="chat/new" element={<NewChat />} />
        <Route path="*" element={<Navigate replace to="/chat/new" />} />
      </Routes>
    </ChatLayout>
  );
};

export default LoggedIn;
