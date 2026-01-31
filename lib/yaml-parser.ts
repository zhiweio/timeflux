import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import type { TimelineData } from './schema';
import { validateTimelineData } from './validator';

export function getTimelineData(): TimelineData {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data.yaml');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(fileContents);

    const validation = validateTimelineData(data);
    if (!validation.success) {
      console.error('Data validation failed:', validation.errors);
    }

    return data as TimelineData;
  } catch (error) {
    console.error('Error reading or parsing data.yaml:', error);
    // Return a default empty state or rethrow depending on requirement
    // For now, returning a safe empty object to prevent crash
    return {
      profile: {
        name: 'Error Loading Data',
        avatar: '',
        bio: 'Please check your data.yaml file.',
      },
      timeline: [],
    };
  }
}
