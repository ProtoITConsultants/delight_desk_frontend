"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useAiAssistant } from "@/providers/ai-assistant";
import { ChevronLeft, ChevronRight } from "lucide-react";

function getPageSlots(
  currentPage: number,
  totalPages: number,
): Array<number | "ellipsis-left" | "ellipsis-right"> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const slots: Array<number | "ellipsis-left" | "ellipsis-right"> = [];
  slots.push(1);

  const windowStart = Math.max(2, currentPage - 1);
  const windowEnd = Math.min(totalPages - 1, currentPage + 1);

  if (windowStart > 2) {
    slots.push("ellipsis-left");
  }

  for (let page = windowStart; page <= windowEnd; page++) {
    slots.push(page);
  }

  if (windowEnd < totalPages - 1) {
    slots.push("ellipsis-right");
  }

  slots.push(totalPages);
  return slots;
}

const EscalationPagination = () => {
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage,
    hasPreviousPage,
    isPending,
  } = useAiAssistant();

  if (isPending || totalItems === 0 || totalPages <= 1) {
    return null;
  }

  const rangeStart = (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = Math.min(currentPage * itemsPerPage, totalItems);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
  };

  const slots = getPageSlots(currentPage, totalPages);

  return (
    <div className="border-t bg-background px-3 py-2.5">
      <div className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground">
        <p>
          <span className="font-medium text-foreground tabular-nums">
            {rangeStart}
            {rangeStart !== rangeEnd ? `-${rangeEnd}` : ""}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground tabular-nums">
            {totalItems}
          </span>
        </p>
        <p>
          Page{" "}
          <span className="font-medium text-foreground tabular-nums">
            {currentPage}
          </span>{" "}
          /{" "}
          <span className="font-medium text-foreground tabular-nums">
            {totalPages}
          </span>
        </p>
      </div>

      <Pagination className="w-auto justify-center">
        <PaginationContent className="gap-1">
          <PaginationItem>
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-label="Go to previous page"
              disabled={!hasPreviousPage}
              onClick={() => goToPage(currentPage - 1)}
              className="h-8 gap-1 px-2.5"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Prev</span>
            </Button>
          </PaginationItem>

          {slots.map((slot, index) => {
            if (slot === "ellipsis-left" || slot === "ellipsis-right") {
              return (
                <PaginationItem key={`${slot}-${index}`}>
                  <PaginationEllipsis className="h-8 w-8" />
                </PaginationItem>
              );
            }

            const isActive = slot === currentPage;
            return (
              <PaginationItem key={slot}>
                <PaginationLink
                  href="#"
                  isActive={isActive}
                  aria-label={`Go to page ${slot}`}
                  className={cn(
                    "h-8 min-w-8 px-2 text-xs",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                      : "border bg-background hover:bg-accent hover:text-accent-foreground",
                  )}
                  onClick={(event) => {
                    event.preventDefault();
                    goToPage(slot);
                  }}
                >
                  {slot}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-label="Go to next page"
              disabled={!hasNextPage}
              onClick={() => goToPage(currentPage + 1)}
              className="h-8 gap-1 px-2.5"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default EscalationPagination;
