import { Loader } from "components/ui/Loader";
import { Fragment, Suspense, lazy, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "store/AuthContext";

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

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Fragment>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="confirm-email" element={<ConfirmEmail />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route
            path="password-change-success"
            element={<PasswordChangeSuccess />}
          />
          <Route
            path="verification-success"
            element={<VerificationSuccess />}
          />
          <Route path="/*" element={isLoggedIn ? <LoggedIn /> : <Home />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
