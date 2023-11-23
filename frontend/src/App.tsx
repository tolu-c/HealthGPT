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

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Fragment>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="/*" element={isLoggedIn ? <LoggedIn /> : <Home />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
