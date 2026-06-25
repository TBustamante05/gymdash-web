'use client'

import { Routine } from "@/types"
import {
  BicepsFlexed, Dumbbell, EllipsisVertical,
  Repeat, Timer, Pencil, Trash2, Loader2
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef, useState, useEffect } from "react"

type Props = {
  routine: Routine
  onEdit: () => void
  onDelete: () => void
  isDeleting: boolean
}

const RoutineCard = ({ routine, onEdit, onDelete, isDeleting }: Props) => {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Cierra el dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCardClick = () => {
    if (!menuOpen) router.push(`/routines/${routine.id}`)
  }

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation() // Evita que el click llegue al card
    setMenuOpen(prev => !prev)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMenuOpen(false)
    onEdit()
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMenuOpen(false)
    onDelete()
  }

  return (
    <div
      className="flex gap-5 bg-card hover:bg-card/80 rounded-md p-5 shadow-lg hover:shadow-md transition-shadow cursor-pointer max-w-7xl"
      onClick={handleCardClick}
    >
      <div className="w-27 h-27 bg-primary/90 rounded-md flex items-center justify-center">
        <BicepsFlexed className="text-white w-10 h-10" />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xl font-bold">{routine.name}</h3>

          {/* Dropdown menu */}
          <div ref={menuRef} className="relative">
            <button
              onClick={handleMenuToggle}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {isDeleting
                ? <Loader2 className="w-5 h-5 animate-spin" />
                : <EllipsisVertical className="w-5 h-5" />
              }
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-8 z-10 w-40 bg-background border border-border/50 rounded-md shadow-lg overflow-hidden">
                <button
                  onClick={handleEdit}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left
                             hover:bg-muted transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                  Editar
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left
                             text-destructive hover:bg-destructive/10 transition-colors
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              </div>
            )}
          </div>
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
              {routine.exercises.reduce((total, e) => total + e.restTime, 0)} seg. descanso
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Repeat className="text-muted-foreground w-5 h-5" />
            <span className="text-sm text-muted-foreground">
              {routine.exercises.reduce((total, e) => total + e.sets * e.reps, 0)} repeticiones
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
  )
}

export default RoutineCard