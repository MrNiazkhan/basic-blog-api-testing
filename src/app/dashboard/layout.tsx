"use client";

import { ReactNode } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardSidebar from "@/components/DashboardSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        
        <DashboardSidebar />

      
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
