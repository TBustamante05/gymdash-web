"use client";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useState } from "react";

function LoginForm() {
  const { login, isLoggingIn, loginError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error del backend */}
      {loginError && (
        <div
          className="bg-destructive/10 text-destructive text-sm
                          px-4 py-3 rounded-lg border border-destructive/20"
        >
          {loginError}
        </div>
      )}

      {/* Username */}
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="text-sm font-medium text-foreground/70"
        >
          Usuario
        </label>
        <div className="rounded-md border-1 border-border/50 flex gap-3 items-center px-4 py-3.5 w-full bg-input mt-1">
          <User className="text-border" />
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Usuario123"
            required
            disabled={isLoggingIn} // desactiva mientras carga
            className="w-full  
                          text-sm
                          outline-none
                          border-none
                          disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-foreground/70"
        >
          Contraseña
        </label>
        <div className="relative rounded-md border-1 border-border/50 flex gap-3 items-center px-4 py-3.5 w-full bg-input mt-1">
          <Lock className="text-border" />
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            disabled={isLoggingIn}
            className="w-full text-sm
                          outline-none
                          border-none
                          disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {/* Toggle mostrar/ocultar password */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2
                                       text-muted-foreground hover:text-foreground
                                       transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4.5 h-4.5 cursor-pointer" />
            ) : (
              <Eye className="w-4.5 h-4.5 cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      <a href="#" className="text-primary font-medium text-sm hover:underline">¿Olvidaste tu contraseña?</a>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoggingIn}
        className="w-full mt-7 py-4 px-4 bg-primary text-primary-foreground
                      rounded-md font-medium
                      hover:bg-primary/90 transition-colors
                      disabled:opacity-50 disabled:cursor-not-allowed
                      cursor-pointer"
      >
        {/* Cambia el texto según el estado */}
        {isLoggingIn ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>
    </form>
  );
}

export default LoginForm;
