import { Loader } from "components/ui/Loader";
import { Fragment, Suspense, lazy, useState } from "react";
import { Route, Routes } from "react-router-dom";

// routes
const Home = lazy(() => import("./routes/Home"));
const Login = lazy(() => import("./routes/Login"));
const Register = lazy(() => import("./routes/Register"));
const LoggedIn = lazy(() => import("./routes/LoggedIn"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
    <Fragment>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/*" element={isLoggedIn ? <LoggedIn /> : <Home />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
