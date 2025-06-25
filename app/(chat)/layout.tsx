import { DynamicChatHeader } from "components/ai/dynamic-chat-header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <DynamicChatHeader />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
