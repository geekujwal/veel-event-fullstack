import { HTMLProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: HTMLProps<"div">["className"];
}) {
  return (
    <div
      className={twMerge("bg-white shadow rounded-lg px-6 py-4 ", className)}
    >
      {children}
    </div>
  );
}

export default Card;
