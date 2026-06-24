import RoutinesList from "@/components/routines/RoutinesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GymDash - Mis Rutinas",
  description: "",
};

function RoutinesPage() {
  
  return (
    <div className="py-3">
      <RoutinesList />
    </div>
  );
}

export default RoutinesPage;
