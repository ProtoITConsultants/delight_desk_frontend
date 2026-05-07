"use client";

import { useApprovalQueueContext } from "@/providers/approval-queue";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

/**
 * Returns the list of page slots to render for a given current page and
 * total page count. We always show the first and last page, the current
 * page, and one neighbor on each side. Long stretches between are collapsed
 * into a single "ellipsis" slot.
 */
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

export const ApprovalQueuePagination = () => {
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage,
    hasPreviousPage,
    isLoading,
  } = useApprovalQueueContext();

  if (isLoading || totalItems === 0 || totalPages <= 1) {
    return null;
  }

  const rangeStart = (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = Math.min(currentPage * itemsPerPage, totalItems);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const slots = getPageSlots(currentPage, totalPages);
  const showJumpButtons = totalPages > 7;

  return (
    <div className="mt-2 flex flex-col items-center gap-4 rounded-xl border bg-card px-4 py-3 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:gap-3">
      <div className="flex flex-col items-center gap-0.5 sm:items-start">
        <p className="text-sm text-foreground">
          Showing{" "}
          <span className="font-semibold">
            {rangeStart.toLocaleString()}
            {rangeStart !== rangeEnd && `–${rangeEnd.toLocaleString()}`}
          </span>{" "}
          of{" "}
          <span className="font-semibold">{totalItems.toLocaleString()}</span>{" "}
          {totalItems === 1 ? "item" : "items"}
        </p>
        <p className="text-xs text-muted-foreground">
          Page{" "}
          <span className="font-medium text-foreground">{currentPage}</span> of{" "}
          <span className="font-medium text-foreground">{totalPages}</span>
        </p>
      </div>

      <Pagination className="w-auto">
        <PaginationContent className="gap-1.5">
          {showJumpButtons && (
            <PaginationItem>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Go to first page"
                disabled={!hasPreviousPage}
                onClick={() => goToPage(1)}
                className="h-9 w-9"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>
          )}

          <PaginationItem>
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-label="Go to previous page"
              disabled={!hasPreviousPage}
              onClick={() => goToPage(currentPage - 1)}
              className="h-9 gap-1 px-3"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
          </PaginationItem>

          {slots.map((slot, index) => {
            if (slot === "ellipsis-left" || slot === "ellipsis-right") {
              return (
                <PaginationItem key={`${slot}-${index}`}>
                  <PaginationEllipsis className="h-9" />
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
                    "h-9 min-w-9 px-2 text-sm",
                    isActive
                      ? "bg-primary font-semibold text-primary-foreground border-primary shadow-sm hover:bg-primary/90 hover:text-primary-foreground"
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
              className="h-9 gap-1 px-3"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationItem>

          {showJumpButtons && (
            <PaginationItem>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Go to last page"
                disabled={!hasNextPage}
                onClick={() => goToPage(totalPages)}
                className="h-9 w-9"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ApprovalQueuePagination;
