"use client";
import { Input } from "@/components/ui/input";
import { WEBSITE_URL_INPUT_PROPS } from "../../types";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

const WebsiteURLInput = ({
  heading,
  Icon,
  placeholder,
  isInputDisabled,
  addUrlMutation,
  isAddingContent,
}: WEBSITE_URL_INPUT_PROPS) => {
  const [websiteURL, setWebsiteURL] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {Icon}
        <span className="text-sm font-medium text-gray-700">{heading}</span>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={websiteURL}
          onChange={(e) => setWebsiteURL(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            websiteURL.trim() &&
            !isInputDisabled &&
            addUrlMutation(websiteURL)
          }
          disabled={isInputDisabled}
        />
        <Button
          onClick={() => addUrlMutation(websiteURL)}
          disabled={isInputDisabled || isAddingContent || !websiteURL.trim()}
        >
          {isAddingContent ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default WebsiteURLInput;
