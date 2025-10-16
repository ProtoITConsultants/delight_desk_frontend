type WORKFLOW_OUTCOME_BANNER_PROPS =
  | {
      workflowCancelled: false;
      failingReason: string;
    }
  | ({
      workflowCancelled: true;
    } & (
      | {
          refundProcessed: true;
          refundAmount: number;
        }
      | {
          refundProcessed: false;
        }
    ));
export type { WORKFLOW_OUTCOME_BANNER_PROPS };
