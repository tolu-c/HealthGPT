import { GoogleIcon } from "assets/svg/icons";
import { Button } from "components/ui/form/Button";
import { Input } from "components/ui/form/Input";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "utils/zodValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodError, z } from "zod";
import { AuthLayout } from "components/ui/AuthLayout";
import { AxiosError } from "axios";
import { useAuth } from "hooks/useAuth";
const api = process.env.REACT_APP_API;

type FormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });
  const { loginUser, status } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }: FormData) => {
    try {
      const validDetails = loginSchema.parse({ email, password });
      // * login action
      await loginUser(validDetails).then(() => {
        navigate("/chat/new");
        // redirect("/chat/new");
      });
    } catch (error) {
      if (error instanceof ZodError) {
        setError("email", {
          message: error.message,
        });
        setError("password", {
          message: error.message,
        });
      }

      setError("root", { message: "Something went wrong" });
    }
  };

  const onSubmit = (data: FormData) => {
    handleLogin(data);
  };

  return (
    <AuthLayout title="Log In">
      <div className="w-full flex flex-col items-start gap-y-8">
        <form
          className="w-full flex flex-col items-start gap-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full flex flex-col items-start gap-y-4">
            <Input
              type="email"
              name="email"
              register={register}
              placeholder="Email Address"
              // disabled
              error={errors.email?.message}
            />
            <Input
              type="password"
              name="password"
              register={register}
              placeholder="Password"
              // disabled
              error={errors.password?.message}
            />
            <Link
              to={"/forgot-password"}
              className="text-body-sm text-brand-main font-lato -mt-3 hover:underline"
            >
              I forgot my password
            </Link>
          </div>
          <Button className="w-full" isLoading={status === "fetching"}>
            Log In
          </Button>
          <p className="w-full text-center text-black-400 text-body-md">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-brand-main hover:underline">
              Sign Up
            </Link>
          </p>
          {errors.root ? (
            <span className="text-extra-error font-lato text-body-sm">
              {errors.root.message}
            </span>
          ) : null}
        </form>
        {/* line */}
        {/* <div className="w-full flex items-center justify-center relative">
          <span className="grow h-[1px] w-full bg-black-600"></span>
          <span className="text-black-500 text-sm font-medium leading-5 absolute left-1/2 -translate-x-1/2 z-30 bg-white-main px-1">
            OR
          </span>
        </div> */}
        <div className="w-full flex flex-col items-center gap-4">
          {/* <Link
            to={`${api}/auth/google`}
            className="text-brand-main hover:underline"
          >
            google
          </Link>
          <Button
            state={"secondary"}
            className="w-full"
            onClick={continueUserWithGoogle}
          >
            <GoogleIcon />
            Continue with Google
          </Button> */}
          <p className="font-lato text-body-sm text-black-400">
            By signing up, you agreed to our{" "}
            <Link to={"/terms"} className="text-brand-main">
              Terms of Use and Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};
