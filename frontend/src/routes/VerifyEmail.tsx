import { VerifyConfirmEmail } from "components/pages/VerifyConfirmEmail";

const VerifyEmail = ({ email }: { email: string }) => {
  return <VerifyConfirmEmail email={email} />;
};

export default VerifyEmail;
