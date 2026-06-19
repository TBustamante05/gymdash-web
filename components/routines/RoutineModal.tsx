'use client'

import { useRoutines } from "@/hooks/useRoutines"
import { X } from "lucide-react"
import { useState } from "react"

interface Props {
  open: boolean
  onClose: () => void
}

function RoutineModal({ open, onClose }: Props) {
  const { createRoutine, isCreating } = useRoutines()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createRoutine(formData, {
      onSuccess: () => {
        setFormData({ name: "", description: "" })
        onClose()
      }
    })
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-background border border-border/50 rounded-lg p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Nueva Rutina</h2>
          <button
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
              placeholder="Ej: Rutina de Fuerza"
              required
              disabled={isCreating}
              className="w-full rounded-md border border-border/50 bg-input px-4 py-3
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
              disabled={isCreating}
              className="w-full rounded-md border border-border/50 bg-input px-4 py-3
                         text-sm outline-none resize-none
                         disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isCreating}
              className="flex-1 py-3 rounded-md border border-border/50
                         text-sm font-medium text-muted-foreground
                         hover:bg-muted transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed
                         cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="flex-1 py-3 rounded-md bg-primary text-primary-foreground
                         text-sm font-medium
                         hover:bg-primary/90 transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed
                         cursor-pointer"
            >
              {isCreating ? "Creando..." : "Crear Rutina"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RoutineModal