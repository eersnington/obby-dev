import { NextResponse } from 'next/server';
import { SUPPORTED_MODELS } from '@/ai/constants';
import { getAvailableModels } from '@/ai/gateway';

export async function GET() {
  const allModels = await getAvailableModels();
  return NextResponse.json({
    models: allModels.filter((model) => SUPPORTED_MODELS.includes(model.id)),
  });
}
