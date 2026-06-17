"use client";

import { Bell, Plus } from "lucide-react";
import MainButton from "@/components/ui/MainButton";

export default function HomePage() {
  return (
    <div className="py-3">
      <div className="flex items-start justify-between ">
        <div className="flex items-center gap-4">
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