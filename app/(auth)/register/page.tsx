import RegisterForm from "@/components/auth/RegisterForm";
import { Dumbbell } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GymDash — Register",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D121B] px-4">
      <div
        className="w-full max-w-md bg-background rounded-lg border border-border/50
                  flex flex-col justify-center
                  px-6 py-8
                  sm:px-8 sm:py-10
                  sm:min-h-[822px] sm:max-h-[822px]"
      >
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
          <a href="/login" className="text-primary font-medium hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
