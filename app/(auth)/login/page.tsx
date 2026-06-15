import LoginForm from "@/components/auth/LoginForm";
import { Dumbbell } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GymDash — Login",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D121B] px-4">
      <div
        className="w-full max-w-md bg-background rounded-lg border border-border/50
                  flex flex-col justify-center
                  px-6 py-8
                  sm:px-8 sm:py-10
                  sm:min-h-[722px] sm:max-h-[722px]"
      >
        <Dumbbell
          size={60}
          strokeWidth={2.5}
          className="text-primary mx-auto mb-3"
        />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">GymDash</h1>
          <p className="text-muted-foreground mt-2">Bienvenido de vuelta</p>
        </div>

        <LoginForm />

        <p className="text-center text-sm text-muted-foreground mt-6">
          ¿No tienes cuenta?{" "}
          <a
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
