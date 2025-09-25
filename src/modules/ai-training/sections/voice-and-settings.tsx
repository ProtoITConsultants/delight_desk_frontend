"use client";
import { Heart, MessageSquare } from "lucide-react";
import AiTrainingTab from "../components/ai-training-tab";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

type BrandSettings = {
  brandVoice: "Friendly" | "Professional" | "Sophisticated" | "Custom";
  customVoice: string;
  useBusinessVerticalGuidance: boolean;
  loyalCustomerGreeting: boolean;
  allowEmojis: boolean;
  customInstructions: string;
};

const BRAND_VOICES = [
  "Friendly",
  "Professional",
  "Sophisticated",
  "Custom",
] as const;

const VoiceAndSettings = () => {
  const [brandSettings, setBrandSettings] = useState<BrandSettings>({
    brandVoice: "Professional",
    customVoice: "",
    allowEmojis: false,
    customInstructions: "",
    useBusinessVerticalGuidance: false,
    loyalCustomerGreeting: false,
  });
  return (
    <AiTrainingTab.Root>
      <AiTrainingTab.Header
        heading="AI Knowledge Sources"
        icon={<MessageSquare className="h-5 w-5" />}
        description="Configure how your AI should write responses to match your brand's communication style."
      />
      <AiTrainingTab.Body className="space-y-6">
        {/* Brand Voice Selection */}
        <div className="flex flex-col gap-3">
          <Label className="text-sm font-medium">Brand Voice</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {BRAND_VOICES.map((item, index) => (
              <Button
                key={index}
                variant={
                  brandSettings.brandVoice === item ? "default" : "outline"
                }
                size="sm"
                onClick={() =>
                  setBrandSettings({
                    ...brandSettings,
                    brandVoice: item,
                  })
                }
                className="text-xs"
              >
                {item}
              </Button>
            ))}
          </div>

          {brandSettings.brandVoice === "Custom" && (
            <Input
              placeholder="Describe your custom brand voice (e.g. Warm and conversational like a trusted family doctor, always explaining things clearly without medical jargon)"
              value={brandSettings.customVoice}
              onChange={(e) =>
                setBrandSettings({
                  ...brandSettings,
                  customVoice: e.target.value,
                })
              }
            />
          )}
        </div>

        {/* Business Vertical Guidance Toggle */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label className="text-sm font-medium">
                Industry-Specific Guidance
              </Label>
              <p className="text-xs text-gray-500">
                Include industry-specific guidance like health disclaimers,
                safety warnings, and compliance notes
              </p>
            </div>
            <Switch
              id="business-guidance-toggle"
              checked={brandSettings.useBusinessVerticalGuidance}
              onCheckedChange={() =>
                setBrandSettings({
                  ...brandSettings,
                  useBusinessVerticalGuidance:
                    !brandSettings.useBusinessVerticalGuidance,
                })
              }
              data-testid="toggle-business-guidance"
            />
          </div>
          <p className="text-xs text-gray-500">
            Test responses with and without this setting to find what works best
            for your business
          </p>
        </div>

        {/* Loyal Customer Greeting */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Heart className="h-4 w-4 text-blue-500" />
                Thank Loyal Customers
              </Label>
              <p className="text-xs text-gray-500">
                Automatically thank repeat customers for their loyalty in the
                first reply of email threads
              </p>
            </div>
            <Switch
              checked={brandSettings.loyalCustomerGreeting}
              onCheckedChange={() =>
                setBrandSettings({
                  ...brandSettings,
                  loyalCustomerGreeting: !brandSettings.loyalCustomerGreeting,
                })
              }
            />
          </div>
        </div>

        {/* Emoji Settings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label className="text-sm font-medium">
                Allow Emojis in Responses
              </Label>
              <p className="text-xs text-gray-500">
                Let the AI use emojis to make responses more friendly
              </p>
            </div>
            <Switch
              checked={brandSettings.allowEmojis}
              onCheckedChange={() =>
                setBrandSettings({
                  ...brandSettings,
                  allowEmojis: !brandSettings.allowEmojis,
                })
              }
            />
          </div>
        </div>

        {/* Custom Instructions */}
        <div className="space-y-3">
          <Label htmlFor="custom-instructions" className="text-sm font-medium">
            Custom Instructions (Optional)
          </Label>
          <Textarea
            id="custom-instructions"
            placeholder="Add any specific guidelines for how the AI should respond (e.g., 'Always mention our 30-day return policy', 'Be extra friendly with VIP customers', etc.)"
            value={brandSettings.customInstructions}
            onChange={(e) =>
              setBrandSettings({
                ...brandSettings,
                customInstructions: e.target.value,
              })
            }
            rows={4}
            className="resize-none h-30 overflow-auto placeholder:text-sm"
          />
          <p className="text-xs text-gray-500">
            These instructions will be applied to all AI-generated responses
          </p>
        </div>
      </AiTrainingTab.Body>
    </AiTrainingTab.Root>
  );
};

export default VoiceAndSettings;
