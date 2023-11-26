import { RegisterPage } from "components/pages/RegisterPage";
import { FC } from "react";

type TRegister = {
  onSendEmail: (email: string) => void;
};
const Register: FC<TRegister> = ({ onSendEmail }) => {
  const saveEmail = (email: string) => {
    onSendEmail(email);
  };

  return <RegisterPage onSaveEmail={saveEmail} />;
};

export default Register;
