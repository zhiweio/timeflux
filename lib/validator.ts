import { TimelineDataSchema } from './schema';

export interface ValidationResult {
  success: boolean;
  errors?: string[];
  data?: unknown;
}

/**
 * Validates and sorts timeline data.
 * Sort order:
 * 1. End date descending (null/present first)
 * 2. Start date descending
 */
export function validateTimelineData(data: unknown): ValidationResult {
  const result = TimelineDataSchema.safeParse(data);

  if (result.success) {
    const sortedTimeline = [...result.data.timeline].sort((a, b) => {
      // 1. Sort by end date descending
      // null/undefined endDate means "Present", which should be treated as the latest date
      const endA = a.endDate || '9999-12';
      const endB = b.endDate || '9999-12';

      if (endA !== endB) {
        return endB.localeCompare(endA);
      }

      // 2. Sort by start date descending
      return b.startDate.localeCompare(a.startDate);
    });

    return {
      success: true,
      data: {
        ...result.data,
        timeline: sortedTimeline,
      },
    };
  }

  const errors = result.error.issues.map((err) => {
    const path = err.path.join('.');
    return `${path ? `[${path}] ` : ''}${err.message}`;
  });

  return {
    success: false,
    errors,
  };
}
