"use client";

import { useExercises } from "@/hooks/useExercises";
import { X } from "lucide-react";
import React, { useState } from "react";
import { NumberInput } from "../ui/NumberInput";
import { Exercise } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  routineId: number;
  onExerciseCreated: (exercise: Exercise) => void;
}

const ExerciseModal = ({ open, onClose, routineId, onExerciseCreated }: Props) => {
  const { createExercise, isCreating } = useExercises(routineId);

  const initValues = {
    name: "",
    sets: "",
    reps: "",
    weight: "",
    restTime: "",
  };
  const [formData, setFormData] = useState(initValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createExercise(
      {
        name: formData.name,
        sets: Number(formData.sets),
        reps: Number(formData.reps),
        weight: Number(formData.weight),
        restTime: Number(formData.restTime),
      },
      {
        onSuccess: (newExercise) => {
          setFormData(initValues);
          onExerciseCreated(newExercise);
          onClose();
        },
      },
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-background border border-border/50 rounded-lg p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Agregar Ejercicio</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/70">
              Nombre
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Press Banca"
              required
              disabled={isCreating}
              className="w-full rounded-md border border-border/30 bg-input px-4 py-3
                         text-sm outline-none
                         disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium text-foreground/70">
                Series
              </label>
              <NumberInput
                value={formData.sets}
                placeholder="3"
                disabled={isCreating}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, sets: value }))
                }
              />
            </div>
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium text-foreground/70">
                Repeticiones
              </label>
              <NumberInput
                value={formData.reps}
                placeholder="10"
                disabled={isCreating}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, reps: value }))
                }
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium text-foreground/70">
                Peso (kg)
              </label>
              <NumberInput
                value={formData.weight}
                placeholder="60"
                disabled={isCreating}
                step={2.5}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, weight: value }))
                }
              />
            </div>
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium text-foreground/70">
                Descanso (seg)
              </label>
              <NumberInput
                value={formData.restTime}
                min={0}
                placeholder="90"
                disabled={isCreating}
                step={15}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, restTime: value }))
                }
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isCreating}
                className="flex-1 py-3 rounded-md bg-primary text-primary-foreground
                         text-sm font-medium
                         hover:bg-primary/90 transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed
                         cursor-pointer"
              >
                {isCreating ? "Guardando..." : "Guardar Ejercicio"}
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ExerciseModal;