'use client'

import api from "@/lib/api"
import { getToken, getUser, removeToken, setToken, setUser } from "@/lib/auth"
import { AuthResponse, User } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface LoginData {
  username: string
  password: string
}

interface RegisterData extends LoginData {
  email: string
}

export function useAuth() {
  const router = useRouter();

  // Inicializar con los datos que ya están en la cookie
  const [user, setUserState] = useState<User | null>(getUser);

  // Login
  const {
    mutate: login,
    isPending: isLoggingIn,
    error: loginError
  } = useMutation({
    mutationFn: (data: LoginData) => api.post<AuthResponse>("/api/auth/login", data).then(r => r.data),
    onSuccess: ({ token, username, role }) => {
      setToken(token)
      setUser({ username, role})
      setUserState({ username, role })
      router.push("/dashboard")
    }
  })

  // Register
  const {
    mutate: register,
    isPending: isRegistering,
    error: registerError
  } = useMutation({
    mutationFn: (data: RegisterData) => api.post<AuthResponse>("/api/auth/register", data).then(r => r.data),
    onSuccess: ({ token, username, role }) => {
      setToken(token)
      setUser({ username, role })
      setUserState({ username, role })

      router.push("/dashboard");
    }
  })

  const logout = () => {
    removeToken();
    setUserState(null);
    router.push('/login');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getErrorMessage = (error: any): string | null => {
    if (!error) return null
    return error.response?.data?.message || "Algo salió mal"
  }

  return {
    user,
    isAuthenticated: !!getToken(),
    // Login
    login,
    isLoggingIn,
    loginError: getErrorMessage(loginError),
    // Register
    register,
    isRegistering,
    registerError: getErrorMessage(registerError),
    // Logout
    logout
  }

}