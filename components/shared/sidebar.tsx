"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar as SidebarShadcn,
  useSidebar,
} from "@/components/ui/sidebar";
import { SIGN_IN_PATH } from "@/lib/utils";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { LayoutDashboard, LogOut, Speech, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
  { title: "Therapists", icon: Speech, url: "/therapists" },
  { title: "Students", icon: Users, url: "/students" },
  // { title: "Settings", icon: Settings, url: "#" },
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
        {!open && (
          <div className="flex items-center gap-2 py-2 justify-center">
            <Image
              src="/logo-collapsed.png"
              alt="ενλόγω"
              width={50}
              height={50}
            />
          </div>
        )}
        {open && (
          <div className="flex items-center gap-2 py-2 justify-center">
            <Image src="/logo.png" alt="ενλόγω" width={120} height={120} />
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
