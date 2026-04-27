// Agent Workflow Types
type WORKFLOW_TYPE = "active" | "recently-completed";

type WORKFLOW_ROOT_PROPS = {
  rootClassName?: string;
  headerClassName?: string;
  WrokflowCardsSectionClassName?: string;
  workflowType: WORKFLOW_TYPE;
  sectionHeading: string;
  // Active Workflows Section
  activeWorkflowsCount?: number;
  onRefresh?: () => void;
  /** When user scrolls this section to the bottom, load more from the shared paginated query. */
  infiniteLoad?: {
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
  };
  // Children (Workflow Cards)
  children: React.ReactNode;
};

export type { WORKFLOW_TYPE, WORKFLOW_ROOT_PROPS };
