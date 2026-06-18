'use client'
import { Routine } from "@/types";
import { BicepsFlexed, Dumbbell, EllipsisVertical, Repeat, Timer } from "lucide-react";
import { useRouter } from "next/navigation";

const RoutineCard = (routine: Routine) => { 
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/routines/${routine.id}`);
  };

  return (
    <div className="flex gap-5 bg-card hover:bg-card/80 rounded-md p-5 shadow-lg hover:shadow-md transition-shadow cursor-pointer max-w-7xl" onClick={handleCardClick}>
      <div className="w-27 h-27 bg-primary/90 rounded-md flex items-center justify-center">
        <BicepsFlexed className="text-white w-10 h-10" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xl font-bold">{routine.name}</h3>
          <EllipsisVertical className="text-muted-foreground cursor-pointer" />
        </div>
        <p className="text-muted-foreground">{routine.description}</p>
        <div className="flex gap-4 items-center mt-6">
          <div className="flex items-center gap-2">
            <Dumbbell className="text-muted-foreground w-5 h-5" />
            <span className="text-sm text-muted-foreground">
              {routine.exercises.length} ejercicios
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="text-muted-foreground w-5 h-5" />
            <span className="text-sm text-muted-foreground">
              {routine.exercises.reduce(
                (total, exercise) => total + exercise.restTime,
                0,
              )}{" "}
              segundos de descanso
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Repeat className="text-muted-foreground w-5 h-5" />
            <span className="text-sm text-muted-foreground">
              {routine.exercises.reduce(
                (total, exercise) => total + exercise.sets * exercise.reps,
                0,
              )}{" "}
              repeticiones
            </span>
          </div>
          <div className="ml-auto">
            <span className="text-sm text-muted-foreground">
              Creada el {new Date(routine.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineCard;
