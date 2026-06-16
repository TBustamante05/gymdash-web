import { SidebarProvider } from "@/context/SidebarContext";
import Sidebar from "@/components/layout/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GymDash - Dashboard",
  description: "",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 bg-dark-background">{children}</main>
      </div>
    </SidebarProvider>
  );
}
