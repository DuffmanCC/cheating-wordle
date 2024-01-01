import { ReactNode } from "react";

type PropsInterface = {
  children: ReactNode;
};

export default function Panel({ children }: PropsInterface) {
  return (
    <section className="absolute min-h-screen bg-white p-4 flex flex-col gap-4">
      {children}
    </section>
  );
}
