"use client";

import { Bell, PanelLeftClose, PanelLeftOpen, Plus } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import MainButton from "@/components/ui/MainButton";

export default function HomePage() {
  const { collapsed, toggle } = useSidebar();

  return (
    <div className="py-3">
      {/* Botón de toggle — esquina superior izquierda */}
      <div className="flex items-start justify-between ">
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="p-2 rounded-md text-muted-foreground
                               hover:bg-primary/10 hover:text-primary
                               transition-colors"
            title={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-6 h-6 cursor-pointer" />
            ) : (
              <PanelLeftClose className="w-6 h-6 cursor-pointer" />
            )}
          </button>
          <h2 className="text-2xl font-bold">
            ¡Bienvenido de nuevo, Thiago! 💪
          </h2>
        </div>
        <div className="flex gap-5 items-center">
          <Bell className="bg-avatar p-3 w-11 h-11 rounded-full cursor-pointer hover:bg-foreground/10 transition-all ease-in"/>
          <MainButton title="Nuevo Entrenamiento" icon={<Plus />} className="px-4"/>
        </div>
      </div>
      <p className="text-muted-foreground ps-2">Listo para superar los límites hoy?</p>
      <div className="ps-2">

      </div>
      {/* Contenido del dashboard */}
    </div>
  );
}
