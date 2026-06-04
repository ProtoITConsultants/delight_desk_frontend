type FILE_UPLOADER_PROPS = {
  triggerClassName?: string;
  children: React.ReactNode;
  fileType: "image" | "";
  maxFileSize?: number;
  maxNumberOfFiles?: number;
  dialogClassName?: string;
  dialogHeading: string;
  dialogDescription?: string;
  onSaveSelectedFile: (file: string) => void;
};

type FILE_INPUT_FIELD_PROPS = Omit<
  FILE_UPLOADER_PROPS,
  | "triggerClassName"
  | "children"
  | "dialogClassName"
  | "dialogHeading"
  | "dialogDescription"
> & {
  maxFileSize: number; // enforce required
  maxNumberOfFiles?: number;
};

type SELECTED_IMAGE_DATA_TYPE = {
  fileURL: string | null;
  fileName: string | null;
  fileSize: number | null;
};

export type {
  FILE_UPLOADER_PROPS,
  FILE_INPUT_FIELD_PROPS,
  SELECTED_IMAGE_DATA_TYPE,
};
