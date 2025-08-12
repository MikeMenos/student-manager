"use client";

import {
  Sidebar as SidebarShadcn,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  Speech,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { SIGN_IN_PATH } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
  { title: "Therapists", icon: Speech, url: "/therapists" },
  { title: "Students", icon: Users, url: "/students" },
  { title: "Settings", icon: Settings, url: "#" },
];

export default function Sidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();

  const role = (user?.publicMetadata?.role as string) || "";

  if (!isSignedIn) return null;

  const isAdmin = role === "admin";
  const filteredTabItems = isAdmin
    ? menuItems
    : menuItems.filter((item) => item.title !== "Therapists");

  return (
    <SidebarShadcn collapsible="icon">
      <SidebarHeader className="border-b">
        {!open && <GraduationCap className="h-6 w-6 text-blue-600 mx-auto" />}
        {open && (
          <div className="flex items-center gap-2 py-2">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-lg">EduManage</span>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredTabItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem className="cursor-pointer">
                <SidebarMenuButton asChild>
                  <SignOutButton redirectUrl={`${SIGN_IN_PATH}`}>
                    <div>
                      <LogOut className="text-red-500" />
                      <span className="font-medium text-red-500">Log out</span>
                    </div>
                  </SignOutButton>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        {!open && (
          <Avatar className="h-8 w-8 mx-auto">
            <AvatarFallback>
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
        )}
        {open && (
          <div className="flex items-center gap-2 px-4 py-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.publicMetadata?.therapistRole as string}
              </span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </SidebarShadcn>
  );
}
