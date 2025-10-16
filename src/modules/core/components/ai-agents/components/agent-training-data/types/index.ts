type AGENT_TRAINING_PROPS = {
  className?: string;
  heading: string;
  Icon?: React.ReactNode;
  isInputDisabled: boolean;
  isAddingContent: boolean;
};

type WEBSITE_URL_INPUT_PROPS = AGENT_TRAINING_PROPS & {
  addUrlMutation: (value: string) => void;
  placeholder: string;
};

// Manual Content
type MANUAL_CONTENT_DATA = {
  title: string;
  content: string;
};

type MANUAL_CONTENT_INPUT_PROPS = AGENT_TRAINING_PROPS & {
  showManualInput: boolean;
  setShowManualInput: React.Dispatch<React.SetStateAction<boolean>>;
  titlePlaceholder: string;
  contentPlaceholder: string;
  addManualContent: (value: MANUAL_CONTENT_DATA) => void;
};

export type {
  WEBSITE_URL_INPUT_PROPS,
  MANUAL_CONTENT_DATA,
  MANUAL_CONTENT_INPUT_PROPS,
};
