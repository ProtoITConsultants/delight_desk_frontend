"use client";
import { useState } from "react";
import { FILE_UPLOADER_PROPS } from "../../utils/file-uploader/types";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileInput from "./components/file-input";

const FileUploader = ({
  triggerClassName,
  dialogClassName,
  dialogHeading,
  dialogDescription,
  maxFileSize = 10485760, // 10MB default
  fileType,
  children,
}: FILE_UPLOADER_PROPS) => {
  // Local State
  const [showInputModal, setInputShowModal] = useState(false);
  return (
    <Dialog open={showInputModal} onOpenChange={setInputShowModal}>
      <DialogTrigger
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 px-4 py-2 has-[>svg]:px-3 w-full cursor-pointer h-10",
          triggerClassName
        )}
      >
        {children}
      </DialogTrigger>
      <DialogContent className={cn("w-full sm:!w-[600px]", dialogClassName)}>
        <DialogHeader className="gap-1">
          <DialogTitle className="text-xl">{dialogHeading}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <FileInput maxFileSize={maxFileSize} fileType={fileType} />
        <DialogFooter className="text-muted-foreground text-sm">
          maximum file size: {maxFileSize / 1024 / 1024}MB
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploader;
