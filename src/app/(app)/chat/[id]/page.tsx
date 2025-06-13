import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  return <></>;
}
