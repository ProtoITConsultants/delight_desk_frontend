export type ProductKnowledgeSourceType = "manual" | "url";
export type ProductKnowledgeSourceStatus = "processing" | "ready" | "failed";

export interface ProductKnowledgeSourceMetadata {
  queuedAt?: string;
  ingestMode?: "async";
  queueType?: "url";
  normalizedCharacterCount?: number;
  chunkCount?: number;
  unchanged?: boolean;
  extractionMode?: "playwright_cheerio";
  finalUrl?: string;
  totalTextLength?: number;
  sectionCount?: number;
  jsonLdItems?: number;
  sample?: string;
  error?: string;
  [key: string]: unknown;
}

export interface ProductKnowledgeSource {
  id: string;
  userId: string;
  sourceType: ProductKnowledgeSourceType;
  title: string;
  sourceUrl: string | null;
  contentHash: string;
  status: ProductKnowledgeSourceStatus;
  metadata: ProductKnowledgeSourceMetadata | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListProductKnowledgeSourcesQuery {
  status?: ProductKnowledgeSourceStatus;
}

export type ListProductKnowledgeSourcesResponse = ProductKnowledgeSource[];

export interface AddManualProductKnowledgeParams {
  title: string;
  content: string;
}

export interface AddUrlProductKnowledgeParams {
  url: string;
  title?: string;
}

export interface IngestProductKnowledgeManualDeduplicatedResponse {
  sourceId: string;
  status: ProductKnowledgeSourceStatus;
  deduplicated: true;
  chunkCount: number;
}

export interface IngestProductKnowledgeManualQueuedResponse {
  sourceId: string;
  status: "processing";
  deduplicated: false;
  chunkCount: number;
  queued: true;
}

export type IngestProductKnowledgeManualResponse =
  | IngestProductKnowledgeManualDeduplicatedResponse
  | IngestProductKnowledgeManualQueuedResponse;

export interface IngestProductKnowledgeUrlResponse {
  sourceId: string;
  status: "processing";
  deduplicated: boolean;
  chunkCount: number;
  queued: boolean;
  reingesting: boolean;
}

export interface DeleteProductKnowledgeSourceResponse {
  deleted: true;
  sourceId: string;
}
