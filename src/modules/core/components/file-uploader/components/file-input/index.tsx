"use client";
import { Button } from "@/components/ui/button";
import { FILE_INPUT_FIELD_PROPS } from "@/modules/core/utils/file-uploader/types";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type SelectedImageDataType = {
  fileURL: string | null;
  fileName: string | null;
  fileSize: number | null;
};

const FileInput = ({ maxFileSize, fileType }: FILE_INPUT_FIELD_PROPS) => {
  const [selectedImageData, setSelectedImageData] =
    useState<SelectedImageDataType>({
      fileURL: null,
      fileName: null,
      fileSize: null,
    });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const inputFile = e.target;

    if (!file) {
      console.log("No file selected");
      return;
    }

    // Verify that the file is of same type and size as specified in the props

    if (file.size > maxFileSize * 1024 * 1024) {
      console.log("File size is too large");
      return;
    }

    // Set File Name and Size
    setSelectedImageData({
      fileURL: URL.createObjectURL(file),
      fileName: file.name,
      fileSize: file.size / 1024,
    });

    // Reset the input field value so onChange can be triggered again if the same image is uploaded
    inputFile.value = "";
  };

  //   console.log("selectedImage", selectedImageData);

  return (
    <div className="h-[345px] py-2 w-full">
      {selectedImageData.fileURL ? (
        <div className="flex flex-col gap-4">
          <div className="w-full h-full px-8 py-4 bg-gray-100 rounded-lg flex justify-center">
            <div className="flex flex-col gap-2 relative w-fit">
              <Image
                src={selectedImageData.fileURL}
                alt="avatar-icon"
                width={200}
                height={200}
                className={`w-[200px] h-[200px] object-contain object-top rounded-lg`}
              />
              {/* Write Image Caption and Size */}
              <div className="flex flex-col gap-1">
                <span className="font-medium">
                  {selectedImageData.fileName}
                </span>
                {/* File Size in Kbs */}
                <span className="text-black/50 text-sm">
                  {selectedImageData.fileSize?.toFixed(2)} KBs
                </span>
              </div>

              <Button
                variant="destructive"
                className="absolute -top-2 -right-2 rounded-full !p-1 !h-fit w-fit"
                onClick={() =>
                  setSelectedImageData({
                    fileURL: null,
                    fileName: null,
                    fileSize: null,
                  })
                }
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button className="" onClick={() => {}}>
            Save File
          </Button>
        </div>
      ) : (
        <div className="w-full h-full border-dashed border-2 rounded-lg flex flex-col items-center justify-center p-4">
          <div className="flex gap-1">
            Drag and drop files or{" "}
            <label
              htmlFor="file-uploader-input"
              className="text-primary cursor-pointer hover:underline"
            >
              browse files
            </label>
          </div>
          <input
            id="file-uploader-input"
            type="file"
            accept={fileType}
            className="hidden"
            onChange={(e) => handleImageChange(e)}
          />
        </div>
      )}
    </div>
  );
};

export default FileInput;
