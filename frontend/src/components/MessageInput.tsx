import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { questionSchema } from "utils/zodValidation";
import { ZodError, z } from "zod";
import { Input } from "./ui/form/Input";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";

type FormData = z.infer<typeof questionSchema>;

export const MessageInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(questionSchema),
  });

  const handleSendQuestion = async ({ message }: FormData) => {
    try {
      const validMessage = questionSchema.parse({ message });
      // todo => server action to send message
      console.log(validMessage);
    } catch (error) {
      if (error instanceof ZodError) {
        setError("message", { message: error.message });
      } else {
        setError("root", { message: "Something went wrong. Pls Try again" });
      }
    }
  };

  const onSubmit = (data: FormData) => {
    handleSendQuestion(data);
  };

  return (
    <form
      className="w-full flex items-start gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input register={register} name="message" placeholder="Type here.." />
      <button
        className="w-12 h-12 flex-none flex items-center justify-center rounded-[10px] bg-iconButton"
        type="submit"
        title="Send Message"
      >
        <PaperAirplaneIcon className="w-6 h-6 text-white-main" />
      </button>
    </form>
  );
};
