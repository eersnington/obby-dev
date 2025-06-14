import { EditorClient } from "@/components/ai/editor-client";

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  console.log("Chat ID", id);

  return (
    <div className="h-full w-full overflow-hidden">
      <EditorClient />
    </div>
  );
}
