'use client'

import { useRoutines } from "@/hooks/useRoutines"
import RoutineCard from "./RoutineCard"
import RoutineModal from "./RoutineModal"
import MainButton from "@/components/ui/MainButton"
import { Loader2, Plus } from "lucide-react"
import { useState } from "react"
import { Routine } from "@/types"

function RoutinesList() {
  const {
    routines, isLoading, error,
    createRoutine, isCreating,
    updateRoutine, isUpdating,
    deleteRoutine, isDeleting
  } = useRoutines()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null)
  // Rastrear qué rutina específica se está eliminando
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleOpenCreate = () => {
    setEditingRoutine(null)
    setModalOpen(true)
  }

  const handleOpenEdit = (routine: Routine) => {
    setEditingRoutine(routine)
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
    setEditingRoutine(null)
  }

  const handleSubmit = (data: { name: string; description: string }) => {
    if (editingRoutine) {
      updateRoutine(
        { id: editingRoutine.id, data },
        { onSuccess: handleClose }
      )
    } else {
      createRoutine(data, { onSuccess: handleClose })
    }
  }

  const handleDelete = (id: number) => {
    setDeletingId(id)
    deleteRoutine(id, {
      onSuccess: () => setDeletingId(null),
      onError: () => setDeletingId(null),
    })
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">Mis Rutinas</h2>
        <MainButton
          title="Nueva Rutina"
          icon={<Plus />}
          className="px-8"
          onClick={handleOpenCreate}
        />
      </div>
      <p className="text-muted-foreground text-lg mb-4">
        Todas tus rutinas de entrenamiento
      </p>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-primary w-8 h-8" />
        </div>
      ) : error ? (
        <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-lg border border-destructive/20">
          {error}
        </div>
      ) : routines.length === 0 ? (
        <p className="text-muted-foreground text-center py-20">
          No tienes rutinas todavía. ¡Crea una!
        </p>
      ) : (
        <div className="space-y-4">
          {routines.map((routine) => (
            <RoutineCard
              key={routine.id}
              routine={routine}
              onEdit={() => handleOpenEdit(routine)}
              onDelete={() => handleDelete(routine.id)}
              isDeleting={deletingId === routine.id}
            />
          ))}
        </div>
      )}

      <RoutineModal
        open={modalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        isPending={isCreating || isUpdating}
        routine={editingRoutine}
      />
    </>
  )
}

export default RoutinesList