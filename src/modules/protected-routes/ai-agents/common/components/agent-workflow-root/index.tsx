"use client";

import { cn } from "@/lib/utils";
import { WORKFLOW_ROOT_PROPS } from "../../types/agent-workflow-root";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useEffect, useRef } from "react";

const AgentWorkflowRoot = ({
  rootClassName,
  headerClassName,
  WrokflowCardsSectionClassName,
  workflowType,
  activeWorkflowsCount,
  sectionHeading,
  onRefresh,
  infiniteLoad,
  children,
}: WORKFLOW_ROOT_PROPS) => {
  const scrollRootRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadRef = useRef(infiniteLoad);
  loadRef.current = infiniteLoad;

  useEffect(() => {
    if (!infiniteLoad?.hasNextPage) return;
    const root = scrollRootRef.current;
    const sentinel = sentinelRef.current;
    if (!root || !sentinel) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        const l = loadRef.current;
        if (!l?.hasNextPage || l.isFetchingNextPage) return;
        void l.fetchNextPage();
      },
      { root, rootMargin: "80px", threshold: 0 },
    );

    io.observe(sentinel);
    return () => io.disconnect();
  }, [infiniteLoad?.hasNextPage]);

  return (
    <div className={cn("flex flex-col gap-4", rootClassName)}>
      <div className={cn("flex items-center justify-between", headerClassName)}>
        <h2 className="text-xl font-semibold">{sectionHeading}</h2>
        {workflowType === "active" && (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-gray-200/70">
              {activeWorkflowsCount} in progress
            </Badge>
            <Button onClick={onRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        )}
      </div>
      <div
        ref={scrollRootRef}
        className={cn(
          "flex flex-col gap-4 max-h-[600px] overflow-auto",
          WrokflowCardsSectionClassName,
        )}
      >
        {children}
        {infiniteLoad?.hasNextPage ? (
          <>
            <div
              ref={sentinelRef}
              className="h-1 w-full shrink-0"
              aria-hidden
            />
            {infiniteLoad.isFetchingNextPage && (
              <p className="text-center text-sm text-muted-foreground py-1">
                Loading more…
              </p>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AgentWorkflowRoot;
