import { ReactNode } from "react";

type PropsInterface = {
  children: ReactNode;
  name: string;
};

export default function HeaderPanel({ children, name }: PropsInterface) {
  return (
    <header>
      <h2 className="text-xl font-bold flex justify-between">
        <div>{name}</div>

        {children}
      </h2>
    </header>
  );
}
