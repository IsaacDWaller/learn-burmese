"use client";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BrainIcon,
  ChartColumnIcon,
  CopyIcon,
  LogOutIcon,
  Settings2Icon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

const data = {
  navMain: [
    {
      title: "Flashcards",
      url: "/",
      icon: <CopyIcon />,
    },
    {
      title: "Statistics",
      url: "statistics",
      icon: <ChartColumnIcon />,
    },
  ],
  navSecondary: [
    {
      title: "Account",
      url: "account",
      icon: <Settings2Icon />,
    },
    {
      title: "Settings",
      url: "settings",
      icon: <SettingsIcon />,
    },
    {
      title: "Sign Out",
      url: "sign-out",
      icon: <LogOutIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link href="/" />}
            >
              <BrainIcon className="size-5!" />
              <span className="text-base font-semibold">Learn Burmese</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
