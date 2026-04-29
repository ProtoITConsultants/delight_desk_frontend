"use client";
import { FileText, Globe, RefreshCw } from "lucide-react";
import AiTrainingTab from "../components/ai-training-tab";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useAiTeamCenter } from "@/providers/ai-team-center";

const AiKnowledge = ({ isActive = false }: { isActive?: boolean }) => {
  // AI Knowledge Source
  const [sourceURL, setSourceURL] = useState("");
  const {
    productKnowledgeSources,
    addManualProductKnowledgeSource,
    addUrlProductKnowledgeSource,
    deleteProductKnowledgeSource,
    refetchProductKnowledgeSources,
    isFetchingProductKnowledgeSources,
    isAddingManualSource,
    isAddingUrlSource,
    isDeletingSource,
  } = useAiTeamCenter();

  const urlSources = useMemo(
    () =>
      productKnowledgeSources.filter((source) => source.sourceType === "url"),
    [productKnowledgeSources],
  );

  const manualSources = useMemo(
    () =>
      productKnowledgeSources.filter(
        (source) => source.sourceType === "manual",
      ),
    [productKnowledgeSources],
  );

  const handleAddSourceURL = async () => {
    const trimmedSourceURL = sourceURL.trim();
    if (!trimmedSourceURL) {
      return;
    }

    const isSuccess = await addUrlProductKnowledgeSource({
      url: trimmedSourceURL,
    });

    if (isSuccess) {
      setSourceURL("");
    }
  };

  return (
    <AiTrainingTab.Root>
      <AiTrainingTab.Header
        heading="AI Knowledge Sources"
        icon={<Globe className="h-5 w-5" />}
        description="Share your business knowledge with your AI agent (FAQ pages, product pages, support docs, etc.)"
        rightSection={
          <Button
            variant="ghost"
            size="sm"
            onClick={refetchProductKnowledgeSources}
            disabled={isFetchingProductKnowledgeSources}
          >
            <RefreshCw
              className={`h-4 w-4 ${
                isFetchingProductKnowledgeSources ? "animate-spin" : ""
              }`}
            />
          </Button>
        }
        tip="Add specific policy pages, FAQ sections, and product detail pages. Quality content that directly answers customer questions works better than generic marketing pages."
      />
      <AiTrainingTab.Body className="space-y-4">
        {/* AI Knowledge Source Crawled through URL */}
        <AiTrainingTab.SourceURLInput
          sourceURL={sourceURL}
          setSourceURL={setSourceURL}
          onAddSourceURL={handleAddSourceURL}
          isAddingSourceURL={isAddingUrlSource}
          isPanelActive={isActive}
        />
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {!isFetchingProductKnowledgeSources && urlSources.length < 1 ? (
            <div className="text-center py-12 text-gray-500">
              <Globe className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No training URLs added yet</p>
              <p className="text-sm">
                Add URLs above to train your AI on brand content
              </p>
            </div>
          ) : (
            urlSources.map((source) => (
              <AiTrainingTab.AiKnowledgeSourceCard
                key={source.id}
                id={source.id}
                title={source.title}
                sourceUrl={source.sourceUrl}
                status={source.status}
                errorMessage={
                  typeof source.metadata?.error === "string"
                    ? source.metadata.error
                    : undefined
                }
                onDelete={deleteProductKnowledgeSource}
                isDeleting={isDeletingSource}
              />
            ))
          )}
        </div>
        {/* Manual Content */}
        <div className="space-y-3">
          {/* Manual Content List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Manual Content ({manualSources.length})
              </span>
            </div>
            {manualSources.map((content) => (
              <AiTrainingTab.ManuallyAddedSourceCard
                key={content.id}
                id={content.id}
                title={content.title}
                createdAt={content.createdAt}
                onDelete={deleteProductKnowledgeSource}
                isDeleting={isDeletingSource}
              />
            ))}
          </div>
          {/* Separator */}
          <Separator />
          {/* Manuall Content Form */}
          <AiTrainingTab.ManuallContentForm
            onAddManualContent={async (manualContent) =>
              addManualProductKnowledgeSource(manualContent)
            }
            isAddingManualContent={isAddingManualSource}
          />
        </div>
      </AiTrainingTab.Body>
    </AiTrainingTab.Root>
  );
};

export default AiKnowledge;
