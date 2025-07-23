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
import { BookOpen, GraduationCap, Settings, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const menuItems = [
  { title: "Classes", icon: BookOpen, url: "/" },
  { title: "Students", icon: Users, url: "/students" },
  { title: "Settings", icon: Settings, url: "#" },
];

export default function Sidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();

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
              {menuItems.map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        {!open && (
          <Avatar className="h-8 w-8 mx-auto">
            <AvatarFallback>TC</AvatarFallback>
          </Avatar>
        )}
        {open && (
          <div className="flex items-center gap-2 px-4 py-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>TC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Ms. Thompson</span>
              <span className="text-xs text-muted-foreground">Principal</span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </SidebarShadcn>
  );
}
