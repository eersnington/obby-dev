import { log } from '@repo/observability/log';
import { Sandbox } from '@vercel/sandbox';
import { APIError } from '@vercel/sandbox/dist/api-client/api-error';
import { type NextRequest, NextResponse } from 'next/server';
import { env } from '@/env';

/**
 * We must change the SDK to add data to the instance and then
 * use it to retrieve the status of the Sandbox.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ sandboxId: string }> }
) {
  const { sandboxId } = await params;
  try {
    log.info('getting sandbox', { sandboxId });
    const sandbox = await Sandbox.get({
      sandboxId,
      teamId: env.VERCEL_TEAM_ID ?? '',
      projectId: env.VERCEL_PROJECT_ID ?? '',
      token: env.VERCEL_TOKEN ?? '',
    });
    log.info('sandbox', { sandbox });

    await sandbox.runCommand({
      cmd: 'echo',
      args: ['Sandbox status check'],
    });

    log.info('sandbox running', { sandboxId });

    return NextResponse.json({ status: 'running' });
  } catch (error) {
    if (
      error instanceof APIError &&
      error.json.error.code === 'sandbox_stopped'
    ) {
      return NextResponse.json({ status: 'stopped' });
    }
    throw error;
  }
}
