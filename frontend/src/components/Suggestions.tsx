import { FC } from "react";

export const Suggestions = () => {
  return (
    <div className="w-full h-auto inline-flex flex-col items-center gap-y-3 px-5 py-3">
      <Suggestion
        title="Dizziness"
        description="Vomiting and fever, surges at night"
      />
      <Suggestion
        title="Fatigue"
        description="Tiredness, Persistent weakness"
      />
      <Suggestion title="Nausea" description="Dizziness and vomiting" />
    </div>
  );
};

type TSuggestion = {
  title: string;
  description: string;
};

export const Suggestion: FC<TSuggestion> = ({ title, description }) => {
  return (
    <div className="flex w-full rounded-[10px] flex-col items-start gap-y-1.5 border border-white-500 p-2.5 font-lato cursor-pointer hover:bg-suggestion">
      <h5 className="text-title-md text-black-400">{title}</h5>
      <p className="text-body-sm text-black-500">{description}</p>
    </div>
  );
};
