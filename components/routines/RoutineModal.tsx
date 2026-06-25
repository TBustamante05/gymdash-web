// RoutineModal.tsx
'use client'

import { Routine } from "@/types"
import { X } from "lucide-react"
import { useState } from "react"

interface FormProps {
  initialName: string
  initialDescription: string
  isEditing: boolean
  isPending: boolean
  onSubmit: (data: { name: string; description: string }) => void
  onClose: () => void
}

// Componente interno puro: se remonta cuando cambia el `key` del padre
function RoutineForm({ initialName, initialDescription, isEditing, isPending, onSubmit, onClose }: FormProps) {
  const [formData, setFormData] = useState({
    name: initialName,
    description: initialDescription,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/70">
          Nombre
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Rutina de Fuerza"
          required
          disabled={isPending}
          className="w-full rounded-md border border-border/30 bg-input px-4 py-3
                     text-sm outline-none
                     disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/70">
          Descripción
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Ej: Enfocada en el desarrollo de la fuerza muscular"
          rows={3}
          disabled={isPending}
          className="w-full rounded-md border border-border/30 bg-input px-4 py-3
                     text-sm outline-none resize-none
                     disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className="flex-1 py-3 rounded-md border border-border/50
                     text-sm font-medium text-muted-foreground
                     hover:bg-muted transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 py-3 rounded-md bg-primary text-primary-foreground
                     text-sm font-medium
                     hover:bg-primary/90 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending
            ? isEditing ? "Guardando..." : "Creando..."
            : isEditing ? "Guardar cambios" : "Crear Rutina"
          }
        </button>
      </div>
    </form>
  )
}

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (data: { name: string; description: string }) => void
  isPending: boolean
  routine?: Routine | null
}

function RoutineModal({ open, onClose, onSubmit, isPending, routine }: Props) {
  const isEditing = !!routine

  const handleClose = () => {
    if (!isPending) onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-md bg-background border border-border/50 rounded-lg p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {isEditing ? "Editar Rutina" : "Nueva Rutina"}
          </h2>
          <button
            onClick={handleClose}
            disabled={isPending}
            className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>

        {/*
          El key hace que RoutineForm se desmonte y remonte cuando cambia la rutina
          o cuando se alterna entre crear y editar. Así el estado del form
          siempre arranca limpio con los valores correctos, sin necesitar useEffect.
        */}
        <RoutineForm
          key={routine?.id ?? 'new'}
          initialName={routine?.name ?? ""}
          initialDescription={routine?.description ?? ""}
          isEditing={isEditing}
          isPending={isPending}
          onSubmit={onSubmit}
          onClose={handleClose}
        />
      </div>
    </div>
  )
}

export default RoutineModal