type WORKFLOW_OUTCOME_BANNER_PROPS =
  | {
      addressChanged: true;
      newAddress: string;
    }
  | { addressChanged: false; failingReason: string };

export type { WORKFLOW_OUTCOME_BANNER_PROPS };
