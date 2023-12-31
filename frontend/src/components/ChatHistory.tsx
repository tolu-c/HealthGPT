import { NavLink } from "react-router-dom";

export type TChatHistory = {
  date: string;
  historyList: [THistory, THistory, THistory];
};

type THistory = {
  id: string;
  name: string;
};

const chatHistoryList: TChatHistory[] = [
  {
    date: "Today",
    historyList: [
      { id: "1", name: "Knee Inflamation" },
      { id: "2", name: "Fever and nausea" },
      { id: "3", name: "Flu and running nose" },
    ],
  },
  {
    date: "Yesterday",
    historyList: [
      { id: "4", name: "Loss of hair and shaky teeth" },
      { id: "5", name: "Hole in my teeth" },
      { id: "6", name: "Dark inner thighs" },
    ],
  },
  {
    date: "2nd November, 2023",
    historyList: [
      { id: "7", name: "Burn on my tongue" },
      { id: "8", name: "Medical advice" },
      { id: "9", name: "Bleeding ear" },
    ],
  },
];

export const ChatHistory = () => {
  return (
    <div className="w-full h-full overscroll-y-scroll hide-scrollbar flex flex-col gap-9 items-start px-2.5">
      {chatHistoryList.map((chat, index) => (
        <div key={index} className="flex flex-col w-full items-start gap-3">
          <p className="px-3 text-body-sm text-black-500 dark:text-black-500 font-lato">
            {chat.date}
          </p>
          {chat.historyList.map((history) => (
            <NavLink
              key={history.id}
              to={`/chat/${history.id}`}
              className={({ isActive }) =>
                isActive
                  ? "rounded-[10px] dark:bg-black-100 bg-white-300 w-full font-lato py-2 lg:py-2.5 px-3 self-stretch text-black-300 dark:text-white-200 text-body-md leading-6"
                  : "font-lato py-2 lg:py-2.5 px-3 w-full self-stretch text-black-300 dark:text-white-200 text-body-md leading-6 hover:bg-white-300 dark:hover:bg-black-100 rounded-[10px]"
              }
            >
              {history.name}
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  );
};
