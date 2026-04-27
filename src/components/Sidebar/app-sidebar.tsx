"use client";
import { ChevronUp, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import SIDEBAR_CONTENT from "@/constants/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../ui/collapsible";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const AI_AGENT_BASE_PATHS = [
  "/wismo-agent",
  "/subscription-agent",
  "/product-agent",
  "/returns-agent",
  "/promo-code-agent",
  "/address-change-agent",
  "/order-cancellation-agent",
] as const;

export function AppSidebar() {
  // Hook
  const pathname = usePathname();

  const isAiAgentsActive = AI_AGENT_BASE_PATHS.some(
    (p) => pathname === p || (pathname != null && pathname.startsWith(`${p}/`)),
  );

  return (
    <Sidebar>
      <SidebarHeader className="p-0">
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
          <Image
            src="/dashboard-logo.svg"
            alt="Logo"
            height={32}
            width={148.34}
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroupContent className="p-0">
          <SidebarMenu>
            {SIDEBAR_CONTENT.PRIMARY_NAVIGATION.map((item) => {
              const isActive = pathname === item.href;
              return item.name === "AI Agents" ? (
                <Collapsible key={item.name} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className={cn(
                          isAiAgentsActive
                            ? "text-primary border-primary/20 hover:bg-primary/10 hover:text-primary"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "w-full group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md border border-transparent cursor-pointer h-[38px]",
                        )}
                      >
                        <span className="flex items-center w-full">
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.name}
                          <ChevronUp className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                  <CollapsibleContent className="ml-6 mt-1 space-y-1">
                    {SIDEBAR_CONTENT.AI_AGENTS_NAVIGATION.map((subItem) => {
                      const isSubItemActive = pathname === subItem.href;
                      return (
                        <SidebarMenuItem key={subItem.name}>
                          <SidebarMenuButton
                            asChild
                            className={cn(
                              isSubItemActive
                                ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 hover:text-primary"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group flex items-center px-2 py-2 text-sm rounded-md border border-transparent cursor-pointer",
                            )}
                          >
                            <Link
                              href={subItem.href}
                              className="w-full min-w-0"
                            >
                              <div className="flex items-center w-full min-w-0 gap-1">
                                <subItem.icon className="mr-0 h-4 w-4 shrink-0" />
                                <span className="min-w-0 flex-1 text-left line-clamp-1">
                                  {subItem.name}
                                </span>
                                {subItem.comingSoon ? (
                                  <Badge
                                    variant="default"
                                    className="ml-auto shrink-0 text-[8px] leading-none px-1 py-0.5 font-medium"
                                    aria-label="Coming soon"
                                  >
                                    Soon
                                  </Badge>
                                ) : null}
                              </div>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      isActive
                        ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 hover:text-primary"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md border border-transparent cursor-pointer h-[38px]",
                      {
                        "opacity-50 cursor-not-allowed": item.isDisabled,
                      },
                    )}
                    disabled={true}
                  >
                    {item.isDisabled ? (
                      <span className="flex items-center w-full">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </span>
                    ) : (
                      <Link href={item.href}>
                        <span className="flex items-center w-full">
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.name}
                        </span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter className="px-4 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200 h-[38px]">
                  <div className="flex items-center">
                    <Settings className="mr-3 h-4 w-4 text-gray-400" />
                    Settings & More
                  </div>
                  <ChevronUp className="ml-auto h-4 w-4 text-gray-400" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-56 mb-2 z-[70]"
              >
                {SIDEBAR_CONTENT.SETTINGS_NAVIGATION.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href}>
                      <div className="flex items-center w-full cursor-pointer">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu> */}

            <Link
              href="/connections"
              className="w-full group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200 h-[38px]"
            >
              <div className="flex items-center w-full cursor-pointer">
                <Settings className="mr-3 h-4 w-4 text-gray-400" />
                Connections
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
