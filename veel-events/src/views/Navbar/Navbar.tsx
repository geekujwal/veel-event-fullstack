import { useState } from "react";
import { useMenuAnimation } from "../../hooks/useMenuAnimation";
import { MenuToggle } from "./MenuToggle/MenuToggle";
import { Link } from "react-router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scope = useMenuAnimation(isOpen);

  const baseRoutes = [
    {
      name: "Current Game",
      link: "current-game",
    },
    {
      name: "Tournament Bracket",
      link: "tournament-bracket",
    },
    {
      name: "Leaderboard",
      link: "leaderboard",
    },
    {
      name: "Prize List",
      link: "prize",
    },
  ];

  const routes = localStorage.getItem("code")
    ? baseRoutes
    : [
        ...baseRoutes,
        {
          name: "Login",
          link: "login",
        },
      ];

  return (
    <div className="flex padding-primary h-[100px] justify-start">
      <div className="h-[50px]">
        <Link to="/">
          <img src="/logo/veel.svg" className="h-full w-full object-contain" />
        </Link>
      </div>
      <div ref={scope}>
        <nav className="menu">
          <ul className="flex flex-col gap-[10px] p-[15px] m-0 list-none">
            {routes.map((item, idx) => (
              <li
                key={`${item.link}-${idx}`}
                className="font-bold text-primaryBlue text-[48px] p-[10px] m-0 list-none"
                style={{
                  transformOrigin: "-20px 50%",
                  willChange: "transform, opacity, filter",
                }}
              >
                <Link to={item.link} onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MenuToggle toggle={() => setIsOpen(!isOpen)} />
      </div>
    </div>
  );
}
