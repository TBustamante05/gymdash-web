"use client";

import ExerciseItem from "@/components/routines/ExerciseItem";
import MainButton from "@/components/ui/MainButton";
import { useExercises } from "@/hooks/useExercises";
import { useRoutines } from "@/hooks/useRoutines";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Loader2, MoveLeft, PlayIcon, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Exercise } from "@/types";
import ExerciseModal from "@/components/routines/ExerciseModal";

function RoutineDetailPage() {
  const { id } = useParams();
  const routineId = Number(id);
  const router = useRouter();

  const { routines, isLoading: isLoadingRoutine } = useRoutines();
  const {
    exercises,
    isLoading: isLoadingExercises,
    reorderExercises,
  } = useExercises(routineId);

  const [localExercises, setLocalExercises] = useState<Exercise[]>([]);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);

  // Inicializa solo cuando llegan por primera vez y localExercises está vacío
  if (exercises.length > 0 && localExercises.length === 0) {
    const sorted = [...exercises].sort((a, b) => a.position - b.position);
    setLocalExercises(sorted);
  }

  const routine = routines.find((r) => r.id === routineId);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localExercises.findIndex((e) => e.id === active.id);
    const newIndex = localExercises.findIndex((e) => e.id === over.id);

    // Actualiza el orden local inmediatamente (optimista)
    const reordered = arrayMove(localExercises, oldIndex, newIndex);
    setLocalExercises(reordered);

    // Manda el nuevo orden al backend
    reorderExercises(reordered.map((e) => e.id));
  };

  const isLoading = isLoadingRoutine || isLoadingExercises;

  return (
    <div className="py-3">
      {/* Volver */}
      <button
        onClick={() => router.push("/routines")}
        className="flex items-center gap-2 mb-6 text-muted-foreground
                   cursor-pointer hover:text-foreground transition-colors"
      >
        <MoveLeft className="w-6 h-6" />
        <span>Volver</span>
      </button>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-primary w-8 h-8" />
        </div>
      ) : !routine ? (
        <p className="text-muted-foreground">Rutina no encontrada.</p>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-1">
            <h1 className="text-4xl font-bold">{routine.name}</h1>
            <div className="flex gap-4">
              <MainButton
                title="Iniciar Rutina"
                icon={<PlayIcon className="w-5 h-5" />}
                className="px-8"
              />
              <button
                onClick={() => setModalOpen(true)}
                className="border border-muted-foreground/20 rounded-md p-3
                                 bg-card/90 cursor-pointer hover:bg-card transition-colors"
              >
                <Plus />
              </button>
            </div>
          </div>
          <p className="text-muted-foreground text-lg mb-6">
            {routine.description}
          </p>

          {/* Stats */}
          <div className="flex justify-evenly gap-10 bg-card rounded-lg p-6">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-2xl font-medium">{localExercises.length}</h2>
              <p className="text-muted-foreground">Ejercicios</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-2xl font-medium">
                75 <span className="text-lg">min</span>
              </h2>
              <p className="text-muted-foreground">Duración estimada</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-2xl font-medium">Intermedio</h2>
              <p className="text-muted-foreground">Dificultad</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-2xl font-medium text-green-600">Activa</h2>
              <p className="text-muted-foreground">Estado</p>
            </div>
          </div>

          {/* Ejercicios */}
          <h2 className="text-4xl font-bold mb-4 mt-14">Ejercicios</h2>
          <hr className="border-white/10 mb-2" />

          {localExercises.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">
              No hay ejercicios todavía.
            </p>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={localExercises.map((e) => e.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4 pt-5">
                  {localExercises.map((exercise) => (
                    <ExerciseItem key={exercise.id} {...exercise} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
          <ExerciseModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            routineId={routineId}
            onExerciseCreated={(newExercise) =>
              setLocalExercises((prev) => [...prev, newExercise])
            }
          />
        </>
      )}
    </div>
  );
}

export default RoutineDetailPage;
