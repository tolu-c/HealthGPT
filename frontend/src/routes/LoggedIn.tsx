import { ChatLayout } from "components/ui/ChatLayout";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// routes
const Chat = lazy(() => import("./Chat"));

const LoggedIn = () => {
  return (
    <ChatLayout>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route element={<Chat />} path="chat" />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </ChatLayout>
  );
};

export default LoggedIn;
