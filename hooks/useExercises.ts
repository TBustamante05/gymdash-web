/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import api from "@/lib/api"
import { Exercise } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface ExerciseData {
  name: string
  sets: number
  reps: number,
  weight: number,
  restTime: number
}

export function useExercises(routineId: number) {
  const queryClient = useQueryClient();
  const QUERY_KEY = ['exercises', routineId]

  // GET todos los ejercicios de una rutina
  const {
    data: exercises = [],
    isLoading,
    error
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => api.get<Exercise[]>(`/api/routines/${routineId}/exercises`).then(r => r.data)
  })

  // POST crear ejercicio
  const { mutate: createExercise, isPending: isCreating} = useMutation({
    mutationFn: (data: ExerciseData) => api.post<Exercise>(`/api/routines/${routineId}/exercises`, data).then(r => r.data),
    onSuccess: (newExercise) => {
      queryClient.setQueryData<Exercise[]>(QUERY_KEY, prev => [...(prev ?? []), newExercise])
    }
  })

  // PUT actualizar ejercicio
  const { mutate: updateExercise, isPending: isUpdating } = useMutation({
    mutationFn: ({id, data} :{ id: number, data: ExerciseData }) => api.put<Exercise>(`/api/routines/${routineId}/exercises/${id}`, data).then(r => r.data),

    onSuccess: (updatedExercise) => {
      queryClient.setQueryData<Exercise[]>(QUERY_KEY, prev => (prev ?? []).map(r => r.id === updatedExercise.id ? updatedExercise : r))
    }
  })

  const { mutate: deleteExercise, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => api.delete(`/api/routines/${routineId}/exercises/${id}`),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Exercise[]>(QUERY_KEY, prev => (prev ?? []).filter(r => r.id !== id))
    }
  })

  const getErrorMessage = (error: any): string | null => {
      if (!error) return null
      return error.response?.data?.message || 'Algo salió mal'
  }

  return {
    exercises,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error: getErrorMessage(error),
    createExercise,
    updateExercise,
    deleteExercise
  }
}