import ChatPageClient from "./ChatPageClient";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ convoId: string }>;
}) {
  const { convoId } = await params;
  return <ChatPageClient convoId={convoId} />;
}