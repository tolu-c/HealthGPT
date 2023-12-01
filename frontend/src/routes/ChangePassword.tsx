import { ChangePasswordPage } from "components/pages/ChangePasswordPage";
import { useLocation } from "react-router-dom";

const ChangePassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const resetToken = queryParams.get("token");

  return <ChangePasswordPage token={resetToken ? resetToken : ""} />;
};

export default ChangePassword;
