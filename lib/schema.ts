import { z } from 'zod';

export const ProfileSchema = z.object({
  name: z.string().min(1),
  avatar: z.string().url().or(z.string().startsWith('/')),
  bio: z.string().min(1),
  about: z.string().optional(),
  social: z
    .object({
      github: z.url().optional(),
      linkedin: z.url().optional(),
      twitter: z.url().optional(),
      email: z.email().optional(),
    })
    .optional(),
});

export const EventTypeSchema = z.enum([
  'work',
  'internship',
  'education',
  'project',
  'research',
  'competition',
  'certificate',
  'award',
]);

export const TimelineEventSchema = z
  .object({
    startDate: z.string().regex(/^\d{4}-\d{2}$/, 'Start date must be in YYYY-MM format'),
    endDate: z
      .string()
      .regex(/^\d{4}-\d{2}$/, 'End date must be in YYYY-MM format')
      .optional(),
    title: z.string().min(1),
    type: EventTypeSchema,
    org: z.string().min(1),
    summary: z.string().min(1),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    link: z.string().url().optional(),
    images: z.array(z.string()).optional(),
    logo: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.endDate && data.startDate > data.endDate) {
        return false;
      }
      return true;
    },
    {
      message: 'Start date must be before end date.',
      path: ['startDate'],
    },
  )
  .refine(
    (data) => {
      if (data.type === 'certificate' && data.images && data.images.length > 1) {
        return false;
      }
      return true;
    },
    {
      message: 'Certificates can only have at most one image.',
      path: ['images'],
    },
  );

export const TimelineDataSchema = z.object({
  profile: ProfileSchema,
  timeline: z.array(TimelineEventSchema),
});

export type TimelineData = z.infer<typeof TimelineDataSchema>;
