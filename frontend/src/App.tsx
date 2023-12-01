import { Loader } from "components/ui/Loader";
import { Fragment, Suspense, lazy, useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "store/userContext";
import { getUser } from "utils/token";

// routes
const Home = lazy(() => import("./routes/Home"));
const Login = lazy(() => import("./routes/Login"));
const Register = lazy(() => import("./routes/Register"));
const VerifyEmail = lazy(() => import("./routes/VerifyEmail"));
const ForgotPassword = lazy(() => import("./routes/ForgotPassword"));
const ChangePassword = lazy(() => import("./routes/ChangePassword"));
const PasswordChangeSuccess = lazy(
  () => import("./routes/PasswordChangeSuccess")
);
const VerificationSuccess = lazy(() => import("./routes/VerificationSuccess"));
const ResetPassword = lazy(() => import("./routes/ResetPassword"));
// chat routes
const Chat = lazy(() => import("./routes/Chat"));
const NewChat = lazy(() => import("./routes/NewChat"));

function App() {
  const [userEmail, setUserEmail] = useState<string>("");
  const { user } = useContext(UserContext);

  const receiveUserEmail = (email: string) => {
    setUserEmail(email);
  };

  return (
    <Fragment>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {user && (
            <>
              <Route
                path="chat/:chatID"
                element={user ? <Chat /> : <Navigate to={"/login"} />}
              />
              <Route path="chat/new" element={<NewChat />} />
            </>
          )}
          <Route path="login" element={<Login />} />
          <Route
            path="register"
            element={<Register onSendEmail={receiveUserEmail} />}
          />
          <Route
            path="verify-email"
            element={<VerifyEmail email={userEmail} />}
          />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route
            path="password-change-success"
            element={<PasswordChangeSuccess />}
          />
          <Route
            path="verification-success"
            element={<VerificationSuccess />}
          />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
