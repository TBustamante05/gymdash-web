import { User } from "@/types";

const TOKEN_KEY = 'gymdash_token';
const USER_KEY = 'gymdash_user';

export function setToken(token: string) {
  // expira en 7 días, disponible en toda la app y protección contra CSRF
  document.cookie = `${TOKEN_KEY}=${token}; max-age=${7 * 24 * 60 * 60}; path=/; SameSite=Strict`;
}

// Lee el token de las cookies
export function getToken(): string | null {
  if (typeof window === 'undefined') return null; 

  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith(`${TOKEN_KEY}=`));

  if (!tokenCookie) return null;

  return tokenCookie.split('=')[1];
}

// Eliminar token al hacer logout
export function removeToken() {
  document.cookie = `${TOKEN_KEY}=; max-age=0; path=/`;
  document.cookie = `${USER_KEY}=; max-age=0; path=/`;
}

// Guardar datos del usuario
export function setUser(user: User) {
  document.cookie = `${USER_KEY}=${JSON.stringify(user)}; max-age=${7 * 24 * 60 * 60}; path=/; SameSite=Strict`;
}

// Leer datos del usuario
export function getUser(): User | null {
  if (typeof window === 'undefined') return null;

  const cookies = document.cookie.split(';');
  const userCookie = cookies.find(cookie => cookie.trim().startsWith(`${USER_KEY}=`));

  if (!userCookie) return null;

  try {
    const value = userCookie.substring(userCookie.indexOf('=') + 1);
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
}

// Verificar si hay sesión activa
export function isAuthenticated(): boolean {
  return !!getToken();
}