type FILE_UPLOADER_PROPS = {
  triggerClassName?: string;
  children: React.ReactNode;
  fileType: "image" | "";
  maxFileSize?: number;
  maxNumberOfFiles?: number;
  dialogClassName?: string;
  dialogHeading: string;
  dialogDescription?: string;
};

type FILE_INPUT_FIELD_PROPS = {
  maxFileSize: number;
  maxNumberOfFiles?: number;
  fileType: "image" | "";
};

export type { FILE_UPLOADER_PROPS, FILE_INPUT_FIELD_PROPS };
