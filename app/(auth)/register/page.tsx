import RegisterForm from "@/components/auth/RegisterForm";
import { Dumbbell } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GymDash — Register",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D121B]">
      <div className="w-full max-w-md px-6 bg-background px-8 pt-15 pb-35 rounded-lg border-1 border-border/50">
        <Dumbbell
          size={60}
          strokeWidth={2.5}
          className="text-primary mx-auto mb-3"
        />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">GymDash</h1>
          <p className="text-muted-foreground mt-2">Crea tu cuenta</p>
        </div>

        <RegisterForm />

        <p className="text-center text-sm text-muted-foreground mt-6">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
