/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import api from "@/lib/api";
import { Routine } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface RoutineData {
  name: string
  description: string
}

const QUERY_KEY = ['routines'];

export function useRoutines() {
  const queryClient = useQueryClient();

  // GET todas las rutinas
  const {
    data: routines = [],
    isLoading,
    error
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => api.get<Routine[]>('/api/routines').then(r => r.data)
  })

  // POST crear rutina
  const { mutate: createRoutine, isPending: isCreating } = useMutation({
    mutationFn: (data: RoutineData) => api.post<Routine>('/api/routines', data).then(r => r.data),
    onSuccess: (newRoutine) => {

      queryClient.setQueryData<Routine[]>(QUERY_KEY, prev => [...(prev ?? []), newRoutine])
    }
  })

  // PUT actualizar rutina
  const { mutate: updateRoutine, isPending: isUpdating } = useMutation({
    mutationFn: ({id, data} :{ id: number, data: RoutineData }) => api.put<Routine>(`/api/routines/${id}`, data).then(r => r.data),
    
    onSuccess: (updatedRoutine) => {
      queryClient.setQueryData<Routine[]>(QUERY_KEY, prev => 
          (prev ?? []).map(r => r.id === updatedRoutine.id ? updatedRoutine : r)
      )
    }
  })

  // DELETE eliminar rutina
  const { mutate: deleteRoutine, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => api.delete(`/api/routines/${id}`),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Routine[]>(QUERY_KEY, prev => (prev ?? []).filter(r => r.id !== id))
    }
  })

  const getErrorMessage = (error: any): string | null => {
      if (!error) return null
      return error.response?.data?.message || 'Algo salió mal'
  }

  return {
      routines,
      isLoading,
      isCreating,
      isUpdating,
      isDeleting,
      error: getErrorMessage(error),
      createRoutine,
      updateRoutine,
      deleteRoutine
  }
}