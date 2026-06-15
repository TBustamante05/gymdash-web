"use client";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Lock, LockKeyhole, Mail, User } from "lucide-react";
import { useState } from "react";

function RegisterForm() {
  const { register, isRegistering, registerError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpiar el error cuando el usuario empiece a corregir
    if (validationError) setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { confirmPass, ...registerData } = formData;

    if (formData.password !== confirmPass) {
      setValidationError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      setValidationError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    register(registerData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {registerError && (
        <div
          className="bg-destructive/10 text-destructive text-sm
                          px-4 py-3 rounded-lg border border-destructive/20"
        >
          {registerError}
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
            disabled={isRegistering} // desactiva mientras carga
            className="w-full  
                          text-sm
                          outline-none
                          border-none
                          disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-foreground/70"
        >
          Correo electrónico
        </label>
        <div className="rounded-md border-1 border-border/50 flex gap-3 items-center px-4 py-3.5 w-full bg-input mt-1">
          <Mail className="text-border" />
          <input
            id="email"
            name="email"
            // type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            required
            disabled={isRegistering} // desactiva mientras carga
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
            disabled={isRegistering}
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

      {/* Confirm Password */}
      <div className="space-y-2">
        <label
          htmlFor="confirmPass"
          className="text-sm font-medium text-foreground/70"
        >
          Confirmar contraseña
        </label>
        <div className="relative rounded-md border-1 border-border/50 flex gap-3 items-center px-4 py-3.5 w-full bg-input mt-1">
          <LockKeyhole className="text-border" />
          <input
            id="confirmPass"
            name="confirmPass"
            type={showPassword ? 'text' : 'password'}
            value={formData.confirmPass}
            onChange={handleChange}
            placeholder="••••••••"
            required
            disabled={isRegistering}
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
        {validationError && (
          <p className="text-destructive text-sm">{validationError}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isRegistering}
        className="w-full mt-7 py-4 px-4 bg-primary text-primary-foreground
                      rounded-md font-medium
                      hover:bg-primary/90 transition-colors
                      disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {/* Cambia el texto según el estado */}
        {isRegistering ? "Creando cuenta..." : "Crear cuenta"}
      </button>
    </form>
  );
}

export default RegisterForm;
