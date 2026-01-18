import { AiAgentsProvider } from "@/providers/ai-agents";

export default function AIAgentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AiAgentsProvider>{children}</AiAgentsProvider>;
}
