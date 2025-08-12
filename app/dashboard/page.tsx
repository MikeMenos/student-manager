// app/(whatever)/dashboard/page.tsx (or your current file)
"use client";

import AdminTiles from "@/components/dashboard/admin-tiles";
import NonAdminTiles from "@/components/dashboard/non-admin-tiles";
import { WelcomeHeader } from "@/components/dashboard/welcome-header";
import {
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  const { user } = useUser();
  const role = (user?.publicMetadata?.role as string) || "";

  return (
    <>
      <header
        className={`border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-14 fixed top-0 z-10 ${
          isMobile ? "w-full" : ""
        }`}
        style={
          !isMobile
            ? state === "expanded"
              ? { width: `calc(100vw - ${SIDEBAR_WIDTH})` }
              : { width: `calc(100vw - ${SIDEBAR_WIDTH_ICON})` }
            : undefined
        }
      >
        <div className="flex items-center gap-4 px-5 h-14">
          <SidebarTrigger />
        </div>
      </header>

      <div className="p-4 mt-14">
        <WelcomeHeader firstName={user?.firstName} />

        {role !== "admin" ? (
          <NonAdminTiles therapistId={user?.id as string} />
        ) : (
          <AdminTiles />
        )}
      </div>
    </>
  );
}
