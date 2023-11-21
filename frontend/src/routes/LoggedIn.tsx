import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

// routes
const Chat = lazy(() => import("./Chat"));

const LoggedIn = () => {
  return (
    <div>
      <Routes>
        <Route element={<Chat />} path="/" />
      </Routes>
    </div>
  );
};

export default LoggedIn;
