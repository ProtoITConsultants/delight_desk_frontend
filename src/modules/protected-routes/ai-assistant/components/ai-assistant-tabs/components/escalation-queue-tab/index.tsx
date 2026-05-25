"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useAiAssistant } from "@/providers/ai-assistant";
import EscalationQueueEmailsList from "./components/escalation-emails-list";
import EscalationEmailPreview from "./components/escalation_email_preview";
import EscalationEmailResponseFeedbackDialog from "./components/escalation_email_preview/components/feedback-dialog";
import EscalationFiltersBar from "./components/escalation-filters-bar";

/**
 * Master-detail layout.
 *
 *  - lg+ : list + preview always side-by-side (40% / 60%).
 *  - <lg : panels are mutually exclusive. The list is the default surface;
 *          tapping a card swaps it for the preview, which carries its own
 *          "Back to inbox" affordance in the sticky header. This keeps the
 *          mobile experience consistent with Gmail / Outlook / Linear and
 *          avoids the "scroll-past-the-list-to-see-the-preview" trap of a
 *          plain stacked layout.
 */
const EscalationQueueTab = () => {
  const { selectedEscalationForPreview, deepLinkedEscalationId } =
    useAiAssistant();
  const hasActivePreview =
    !!selectedEscalationForPreview || !!deepLinkedEscalationId;

  // The master-detail panel needs a scroll anchor so we can land the
  // viewport precisely at the top of the preview (where "Back to inbox"
  // lives) instead of slamming back to the page header. The DashboardNavbar
  // is `sticky top-0` with `h-16` (64px), so the scroll-margin has to be
  // at least that tall — otherwise the preview's top hides BEHIND the
  // navbar. `scroll-mt-20` = 80px = 64px navbar + 16px breathing room so
  // the back button is the first thing visible below the chrome.
  const previewSectionRef = useRef<HTMLDivElement>(null);

  // When the user taps into a preview on small screens, the preview replaces
  // the list at the same DOM position — but the user may have been scrolled
  // deep into the list. We want the Back-to-inbox button to be the first
  // thing they see, NOT the page header / stats strip / filters bar above
  // it. So we anchor the scroll to the preview section instead of the page
  // top. On lg+ we keep the user where they were because both panels stay
  // mounted side-by-side.
  useEffect(() => {
    if (!selectedEscalationForPreview) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    previewSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selectedEscalationForPreview]);

  return (
    <div className="flex flex-col gap-4">
      <EscalationFiltersBar />

      <div
        ref={previewSectionRef}
        className="grid grid-cols-1 gap-4 scroll-mt-20 lg:grid-cols-5"
      >
        <EscalationQueueEmailsList
          className={cn(
            "lg:col-span-2 lg:block",
            hasActivePreview && "hidden",
          )}
        />
        <EscalationEmailPreview
          className={cn(
            "lg:col-span-3 lg:block",
            !hasActivePreview && "hidden",
          )}
        />
      </div>

      <EscalationEmailResponseFeedbackDialog />
    </div>
  );
};

export default EscalationQueueTab;
