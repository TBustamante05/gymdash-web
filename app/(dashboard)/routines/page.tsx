import RoutineCard from "@/components/routines/RoutineCard";
import MainButton from "@/components/ui/MainButton";
import { Routine } from "@/types";
import { Plus } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GymDash - Mis Rutinas",
  description: "",
};

function RoutinesPage() {
  const routinesMockup: Routine[] = [
    {
      id: 1,
      name: "Rutina de Fuerza",
      description: "Enfocada en el desarrollo de la fuerza muscular.",
      createdAt: "2024-06-01T12:00:00Z",
      exercises: [
        {
          id: 1,
          name: "Sentadillas",
          sets: 4,
          reps: 8,
          weight: 100,
          restTime: 90,
        },
        {
          id: 2,
          name: "Press de Banca",
          sets: 4,
          reps: 8,
          weight: 80,
          restTime: 90,
        },
      ],
    },
    {
      id: 2,
      name: "Rutina de Cardio",
      description: "Enfocada en mejorar la resistencia cardiovascular.",
      createdAt: "2024-06-05T15:30:00Z",
      exercises: [
        {
          id: 3,
          name: "Correr en Cinta",
          sets: 1,
          reps: 1,
          weight: 0,
          restTime: 0,
        },
        {
          id: 4,
          name: "Saltos de Tijera",
          sets: 3,
          reps: 20,
          weight: 0,
          restTime: 30,
        },
      ],
    }
  ];
  return (
    <div className="py-3">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <h2 className="text-4xl font-bold">Mis Rutinas</h2>
        </div>
        <MainButton title="Nueva Rutina" icon={<Plus />} className="px-8" />
      </div>
      <p className="text-muted-foreground text-lg">
        Todas tus rutinas de entrenamiento
      </p>

      {/* Rutinas */}
      <div className="mt-4 space-y-4">
        {routinesMockup.map((routine) => (
          <RoutineCard key={routine.id} {...routine} />
        ))}
      </div>
    </div>
  );
}

export default RoutinesPage;
