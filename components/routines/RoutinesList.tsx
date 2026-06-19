'use client'

import { useRoutines } from "@/hooks/useRoutines"
import RoutineCard from "./RoutineCard"
import RoutineModal from "./RoutineModal"
import MainButton from "@/components/ui/MainButton"
import { Loader2, Plus } from "lucide-react"
import { useState } from "react"

function RoutinesList() {
  const { routines, isLoading, error } = useRoutines()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">Mis Rutinas</h2>
        <MainButton
          title="Nueva Rutina"
          icon={<Plus />}
          className="px-8"
          onClick={() => setModalOpen(true)}
        />
      </div>
      <p className="text-muted-foreground text-lg mb-4">
        Todas tus rutinas de entrenamiento
      </p>

      {/* Contenido */}
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
            <RoutineCard key={routine.id} {...routine} />
          ))}
        </div>
      )}

      <RoutineModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}

export default RoutinesList