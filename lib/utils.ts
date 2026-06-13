import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatea fecha del backend a algo legible
// '2026-06-10T14:32:00' → '10 jun 2026'
export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}

// Convierte segundos a formato mm:ss para el temporizador
// 90 → '1:30'
export function formatRestTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Calcula el volumen total de un ejercicio
// Útil para las estadísticas del dashboard
// 4 sets × 8 reps × 80kg = 2560 kg
export function calculateVolume(sets: number, reps: number, weight: number): number {
    return sets * reps * weight
}