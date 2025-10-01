type FILE_UPLOADER_PROP_TYPES = {
  maxNumberOfFiles?: number;
  maxFileSize?: number;
  onGetUploadParameters: () => void;
  onComplete?: () => void;
  buttonClassName?: string;
  children: React.ReactNode;
};

export type { FILE_UPLOADER_PROP_TYPES };
