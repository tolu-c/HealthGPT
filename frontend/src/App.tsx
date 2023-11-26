import { Loader } from "components/ui/Loader";
import { Fragment, Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getToken } from "utils/token";

// routes
const Home = lazy(() => import("./routes/Home"));
const Login = lazy(() => import("./routes/Login"));
const Register = lazy(() => import("./routes/Register"));
const LoggedIn = lazy(() => import("./routes/LoggedIn"));
const VerifyEmail = lazy(() => import("./routes/VerifyEmail"));
const ForgotPassword = lazy(() => import("./routes/ForgotPassword"));
const ChangePassword = lazy(() => import("./routes/ChangePassword"));
const ConfirmEmail = lazy(() => import("./routes/ConfirmEmail"));
const PasswordChangeSuccess = lazy(
  () => import("./routes/PasswordChangeSuccess")
);
const VerificationSuccess = lazy(() => import("./routes/VerificationSuccess"));
const ResetPassword = lazy(() => import("./routes/ResetPassword"));

function App() {
  const [userEmail, setUserEmail] = useState<string>("");
  const userHealthToken = getToken();

  // TODO => fix user logging in

  const receiveUserEmail = (email: string) => {
    setUserEmail(email);
  };

  return (
    <Fragment>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="register"
            element={<Register onSendEmail={receiveUserEmail} />}
          />
          <Route
            path="verify-email"
            element={<VerifyEmail email={userEmail} />}
          />
          {/* <Route path="confirm-email" element={<ConfirmEmail />} /> */}
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
          <Route
            path="/*"
            element={userHealthToken ? <LoggedIn /> : <Home />}
          />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
