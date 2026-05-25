import { AiAssistantProvider } from "@/providers/ai-assistant";

export default function WithAiAssistantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AiAssistantProvider>{children}</AiAssistantProvider>;
}
