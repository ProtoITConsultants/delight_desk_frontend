type AI_TRAINING_NOTIFICATION_PROPS = {
  hasTrainingUrls?: boolean;
  hasCompletedUrls?: boolean;
  completedUrlCount?: number;
  urlCount?: number;
  contentCount?: number;
  brandVoice?: "Friendly" | "Professional" | "Sophisticated" | "Custom";
};

export type { AI_TRAINING_NOTIFICATION_PROPS };
