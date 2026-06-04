"use client";
import { Check, Heart, Loader2, MessageSquare } from "lucide-react";
import AiTrainingTab from "../components/ai-training-tab";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useAiTeamCenter } from "@/providers/ai-team-center";
import { BrandVoice } from "@/services/ai-training/types/ai-identity";

type BrandSettings = {
  brandVoice: Exclude<BrandVoice, BrandVoice.Custom>;
  useBusinessVerticalGuidance: boolean;
  loyalCustomerGreeting: boolean;
  allowEmojis: boolean;
  customInstructions: string;
};

const BRAND_VOICE_OPTIONS: BrandSettings["brandVoice"][] = [
  BrandVoice.Friendly,
  BrandVoice.Professional,
  BrandVoice.Sophisticated,
];

function formatBrandVoiceLabel(voice: BrandVoice): string {
  return voice.charAt(0).toUpperCase() + voice.slice(1);
}

const VoiceAndSettings = () => {
  const [brandSettings, setBrandSettings] = useState<BrandSettings>({
    brandVoice: BrandVoice.Professional,
    allowEmojis: false,
    customInstructions: "",
    useBusinessVerticalGuidance: false,
    loyalCustomerGreeting: false,
  });

  const { aiIdentity, updateAiIdentity, isLoading } = useAiTeamCenter();

  useEffect(() => {
    if (aiIdentity) {
      const voice =
        aiIdentity.brandVoice === BrandVoice.Custom
          ? BrandVoice.Professional
          : aiIdentity.brandVoice;

      setBrandSettings({
        brandVoice: voice,
        allowEmojis: aiIdentity.allowEmojiInResponses,
        customInstructions: aiIdentity.customInstructions ?? "",
        useBusinessVerticalGuidance: aiIdentity.industrySpecificGuidance,
        loyalCustomerGreeting: aiIdentity.thankLoyalCustomers,
      });
    }
  }, [aiIdentity]);

  const handleUpdateVoiceAndSetting = () => {
    updateAiIdentity({
      brandVoice: brandSettings.brandVoice,
      customBrandVoice: "",
      customInstructions: brandSettings.customInstructions,
      allowEmojiInResponses: brandSettings.allowEmojis,
      industrySpecificGuidance: brandSettings.useBusinessVerticalGuidance,
      thankLoyalCustomers: brandSettings.loyalCustomerGreeting,
    });
  };

  return (
    <AiTrainingTab.Root>
      <AiTrainingTab.Header
        heading="Voice & Settings"
        icon={<MessageSquare className="h-5 w-5" />}
        description="Configure how your AI should write responses to match your brand's communication style."
      />
      <AiTrainingTab.Body className="space-y-6">
        {/* Brand Voice Selection */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="brand-voice-select" className="text-sm font-medium">
            Brand Voice
          </Label>
          <Select
            value={brandSettings.brandVoice}
            onValueChange={(value) =>
              setBrandSettings({
                ...brandSettings,
                brandVoice: value as BrandSettings["brandVoice"],
              })
            }
            disabled={isLoading}
          >
            <SelectTrigger
              id="brand-voice-select"
              className="w-full shadow-none md:max-w-sm"
              data-testid="select-brand-voice"
            >
              <SelectValue placeholder="Select brand voice" />
            </SelectTrigger>
            <SelectContent>
              {BRAND_VOICE_OPTIONS.map((voice) => (
                <SelectItem key={voice} value={voice}>
                  {formatBrandVoiceLabel(voice)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Business Vertical Guidance Toggle */}
        {/* <div className="space-y-3">
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
              disabled={isLoading}
            />
          </div>
          <p className="text-xs text-gray-500">
            Test responses with and without this setting to find what works best
            for your business
          </p>
        </div> */}

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
              disabled={isLoading}
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
              disabled={isLoading}
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
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500">
            These instructions will be applied to all AI-generated responses
          </p>
        </div>

        {/* Submit Button */}
        <Button
          onClick={() => handleUpdateVoiceAndSetting()}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </AiTrainingTab.Body>
    </AiTrainingTab.Root>
  );
};

export default VoiceAndSettings;
