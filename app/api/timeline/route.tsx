import { type NextRequest, NextResponse } from 'next/server';
import { getTimelineData } from '@/lib/yaml-parser';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const countParam = searchParams.get('count');

    const data = getTimelineData();
    let timeline = data.timeline;

    // Filter by type
    if (type) {
      timeline = timeline.filter((item) => item.type === type);
    }

    // Limit by count
    if (countParam) {
      const count = parseInt(countParam, 10);
      if (!Number.isNaN(count) && count > 0) {
        timeline = timeline.slice(0, count);
      }
    }

    return NextResponse.json({
      profile: data.profile,
      timeline: timeline,
    });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to fetch timeline data: ${errorMessage}` },
      { status: 500 },
    );
  }
}
