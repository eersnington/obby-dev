import { env } from "env";
import type { FragmentSchema } from "lib/fragment";
import type { ExecutionResultInterpreter, ExecutionResultWeb } from "lib/types";
import { Sandbox } from "@e2b/code-interpreter";

const sandboxTimeout = 5 * 60 * 1000; // 5 minute in ms

export const maxDuration = 60;

export async function POST(req: Request) {
  const {
    fragment,
    userID,
    teamID,
  }: {
    fragment: FragmentSchema;
    userID: string | undefined;
    teamID: string | undefined;
  } = await req.json();
  // console.log("fragment", fragment);
  console.log("userID", userID);

  // Create an interpreter or a sandbox
  const sbx = await Sandbox.create(fragment.template, {
    apiKey: env.E2B_API_KEY,
    metadata: {
      template: fragment.template,
      userID: userID ?? "",
      teamID: teamID ?? "",
    },
    timeoutMs: sandboxTimeout,
  });

  console.log(
    `Created sandbox ${sbx.sandboxId} from template ${fragment.template}`,
  );

  // Install packages
  if (fragment.has_additional_dependencies) {
    await sbx.commands.run(fragment.install_dependencies_command);
    console.log(
      `Installed dependencies: ${fragment.additional_dependencies.join(", ")} in sandbox ${sbx.sandboxId}`,
    );
  }

  // Copy code to fs
  if (fragment.code && Array.isArray(fragment.code)) {
    // biome-ignore lint/complexity/noForEach: this is valid and preferred
    fragment.code.forEach(async (file) => {
      await sbx.files.write(file.file_path, file.file_content);
      console.log(`Copied file to ${file.file_path} in ${sbx.sandboxId}`);
    });
  } else {
    await sbx.files.write(fragment.file_path, fragment.code);
    console.log(`Copied file to ${fragment.file_path} in ${sbx.sandboxId}`);
  }

  // Execute code or return a URL to the running sandbox
  if (fragment.template === "code-interpreter-v1") {
    const { logs, error, results } = await sbx.runCode(fragment.code || "");

    return new Response(
      JSON.stringify({
        sbxId: sbx?.sandboxId,
        template: fragment.template,
        stdout: logs.stdout,
        stderr: logs.stderr,
        runtimeError: error,
        cellResults: results,
      } as ExecutionResultInterpreter),
    );
  }

  return new Response(
    JSON.stringify({
      sbxId: sbx?.sandboxId,
      template: fragment.template,
      url: `https://${sbx?.getHost(fragment.port || 80)}`,
    } as ExecutionResultWeb),
  );
}
