"use client";
import { FileText, Globe, RefreshCw } from "lucide-react";
import AiTrainingTab from "../components/ai-training-tab";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const TRAINING_SOURCES = [
  {
    url: "https://shop.humanfoodbar.com/lectin-free-bars/blueberry-muffin/",
    status: "completed",
    pageCount: 1,
    lastCrawled: "23/08/2025, 04:45:42",
  },
  {
    url: "https://shop.humanfoodbar.com/our-story/",
    status: "failed",
    pageCount: 1,
    lastCrawled: "23/08/2025, 04:45:42",
  },
  {
    url: "https://shop.humanfoodbar.com/whats-inside/",
    status: "crawling",
    pageCount: 1,
    lastCrawled: "23/08/2025, 04:45:42",
  },
];

const MANUAL_CONTENTS = [
  {
    title: "Test FAQ",
    createdAt: "23/08/2023",
    contentLength: 105,
  },
  {
    title: "No seed oils in the bars",
    createdAt: "23/08/2023",
    contentLength: 256,
  },
];

const AiKnowledge = () => {
  // AI Knowledge Source
  const [sourceURL, setSourceURL] = useState("");

  return (
    <AiTrainingTab.Root>
      <AiTrainingTab.Header
        heading="AI Knowledge Sources"
        icon={<Globe className="h-5 w-5" />}
        description="Share your business knowledge with your AI agent (FAQ pages, product pages, support docs, etc.)"
        rightSection={
          <Button variant="ghost" size="sm" onClick={() => {}}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        }
        tip="Add specific policy pages, FAQ sections, and product detail pages. Quality content that directly answers customer questions works better than generic marketing pages."
      />
      <AiTrainingTab.Body className="space-y-4">
        {/* AI Knowledge Source Crawled through URL */}
        <AiTrainingTab.SourceURLInput
          sourceURL={sourceURL}
          setSourceURL={setSourceURL}
        />
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {TRAINING_SOURCES.length < 1 ? (
            <div className="text-center py-12 text-gray-500">
              <Globe className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No training URLs added yet</p>
              <p className="text-sm">
                Add URLs above to train your AI on brand content
              </p>
            </div>
          ) : (
            TRAINING_SOURCES.map((source) => (
              <AiTrainingTab.AiKnowledgeSourceCard
                key={source.url}
                {...source}
              />
            ))
          )}
        </div>
        {/* Manual Content */}
        {MANUAL_CONTENTS.length > 1 && (
          <div className="space-y-3">
            {/* Manual Content List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Manual Content ({MANUAL_CONTENTS.length})
                </span>
              </div>
              {MANUAL_CONTENTS.map((content) => (
                <AiTrainingTab.ManuallyAddedSourceCard
                  key={content.title}
                  {...content}
                />
              ))}
            </div>
            {/* Separator */}
            <Separator />
            {/* Manuall Content Form */}
            <AiTrainingTab.ManuallContentForm />
          </div>
        )}
      </AiTrainingTab.Body>
    </AiTrainingTab.Root>
  );
};

export default AiKnowledge;
