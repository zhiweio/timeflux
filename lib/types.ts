export interface Profile {
  name: string;
  avatar: string;
  bio: string;
  about?: string; // Longer description about the person
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export type EventType =
  | 'work'
  | 'internship'
  | 'education'
  | 'project'
  | 'research'
  | 'competition'
  | 'certificate'
  | 'award';

export interface TimelineEvent {
  startDate: string; // YYYY-MM format
  endDate?: string; // YYYY-MM format, optional (means "Present")
  title: string;
  type: EventType;
  org: string;
  summary: string; // Short summary visible by default
  description?: string; // Detailed description (markdown supported)
  tags?: string[];
  link?: string;
  images?: string[]; // Optional images to display
  logo?: string; // Organization logo URL
}

export interface TimelineData {
  profile: Profile;
  timeline: TimelineEvent[];
}
