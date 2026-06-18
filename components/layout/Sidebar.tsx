"use client";
import {
  CalendarDays,
  ChartLine,
  ChevronDown,
  Dumbbell,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  SquareChartGantt,
  Timer,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/hooks/useAuth";

type SideBarItemProp = {
  name: string;
  icon: React.ReactNode;
  route: string;
};

const SideBarItem = ({ name, icon, route }: SideBarItemProp) => {
  const router = useRouter();
  const pathname = usePathname();
  const { collapsed } = useSidebar();

  const isActive = pathname === route;

  return (
    <div
      title={collapsed ? name : undefined}
      className={`flex items-center py-4 gap-4 rounded-md cursor-pointer
              hover:bg-primary/10 hover:text-primary transition-all ease-in
              ${collapsed ? "justify-center w-full px-0" : "px-5"}
              ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
      onClick={() => router.push(route)}
    >
      <span className="shrink-0">{icon}</span>
      <p
        className={`overflow-hidden whitespace-nowrap transition-all duration-300
                 ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}
      >
        {name}
      </p>
    </div>
  );
};

function Sidebar() {
  const { collapsed, toggle } = useSidebar();
  const { user } = useAuth();

  const initials = user?.username
  ? user.username.slice(0, 2).toUpperCase()
  : ""

  const items: SideBarItemProp[] = [
    { name: "Inicio", icon: <Home />, route: "/home" },
    { name: "Rutinas", icon: <SquareChartGantt />, route: "/routines" },
    { name: "Progreso", icon: <ChartLine />, route: "/progress" },
    { name: "Entrenamientos", icon: <CalendarDays />, route: "/calendar" },
    { name: "Temporizador", icon: <Timer />, route: "/timer" },
  ];

  return (
    <div
      className={`h-screen flex flex-col py-7  transition-all duration-300
                     ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Toggle + Logo */}
      <div
        className={`flex pb-5 border-2 border-transparent
                 border-b-muted-foreground/10 transition-all duration-300
                 ${collapsed
                    ? "flex-col items-center gap-3 px-0"
                    : "flex-row items-center justify-between gap-2 px-5"}`}
      >
        <div className={`flex items-center ${collapsed ? "order-2" : "order-1 gap-3"}`}>
          <Dumbbell className="text-primary h-10 w-10 rotate-45 shrink-0" />
          {!collapsed && (
            <h1 className="text-2xl font-semibold whitespace-nowrap">GymDash</h1>
          )}
        </div>
        <button
          onClick={toggle}
          className={`p-2 rounded-md text-muted-foreground shrink-0
                     hover:bg-primary/10 hover:text-primary
                     transition-colors
                     ${collapsed ? "order-1" : "order-2"}`}
          title={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="cursor-pointer" />
          ) : (
            <PanelLeftClose className="cursor-pointer" />
          )}
        </button>
      </div>

      {/* Contenido */}
      <div
        className={`py-4 flex flex-col flex-1 transition-all duration-300
                 ${collapsed ? "px-2" : "px-5"}`}
      >
        <div className="space-y-3 ">
          {items.map((item, i) => (
            <SideBarItem key={i} {...item} />
          ))}
        </div>

        {/* Footer */}
        <footer
          className={`mt-auto px-3 py-4 rounded-md
                            flex items-center gap-3 cursor-pointer
                            ${collapsed ? "justify-center bg-none" : "bg-avatar"}`}
        >
          <Avatar size="lg">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>
              {initials || "U"}
            </AvatarFallback>
          </Avatar>
          <div
            className={`w-full overflow-hidden whitespace-nowrap transition-all duration-300
                           ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}
          >
            <p>{user?.username ?? "Usuario"}</p>
            <div className="flex text-sm items-center w-full justify-between text-muted-foreground">
              <span>Ver perfil</span>
              <ChevronDown className="h-5 w-5" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Sidebar;