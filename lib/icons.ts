import { create, insert, type Orama, search } from '@orama/orama';

const schema = {
  name: 'string',
  directory: 'string',
  filename: 'string',
} as const;

type IconDB = Orama<typeof schema>;

let db: IconDB | null = null;
let initPromise: Promise<IconDB> | null = null;
let aliases: Record<string, string> = {};

export const ICON_BASE_URL = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';

async function init() {
  const newDb = await create({ schema });

  // Load aliases and icons in parallel
  try {
    const [aliasRes, iconRes] = await Promise.all([
      fetch('/tech-alias.json'),
      fetch('/tech-icon.csv'),
    ]);

    if (aliasRes.ok) {
      try {
        aliases = await aliasRes.json();
      } catch (e) {
        console.error('Failed to parse aliases:', e);
      }
    }

    if (!iconRes.ok) throw new Error('Failed to fetch icons');
    const text = await iconRes.text();
    // Split by newlines and filter empty strings
    const lines = text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    // Insert into Orama
    for (const line of lines) {
      const [directory, filename] = line.split(',');
      if (directory && filename) {
        // Remove extension and common suffixes for cleaner search
        const cleanName = filename
          .replace(/\.(svg|eps)$/i, '')
          .replace(/-(original|plain|line)(-wordmark)?$/, '');

        await insert(newDb, {
          name: cleanName,
          directory,
          filename,
        });
      }
    }
  } catch (e) {
    console.error('Icon DB init error:', e);
  }
  return newDb;
}

export async function getIconDB() {
  if (db) return db;
  if (!initPromise) {
    initPromise = init().then((d) => {
      db = d;
      return d;
    });
  }
  return initPromise;
}

export async function matchIcon(tag: string): Promise<string | null> {
  const database = await getIconDB();

  const lowerTag = tag.toLowerCase();
  // Check alias first
  const searchTerm = aliases[lowerTag] || lowerTag;

  // Search with higher limit to ensure we find exact matches among similar items
  const searchResult = await search(database, {
    term: searchTerm,
    properties: ['name'],
    limit: 10,
    threshold: 0,
  });

  if (searchResult.count > 0) {
    // Strict exact match check
    const exactMatch = searchResult.hits.find(
      (hit) => hit.document.name.toLowerCase() === searchTerm,
    );

    // Only return if we found an exact match (either direct or via alias)
    if (exactMatch) {
      const { directory, filename } = exactMatch.document as {
        directory: string;
        filename: string;
      };

      // Ensure filename has .svg extension if it doesn't have one
      const finalFilename =
        filename.endsWith('.svg') || filename.endsWith('.eps')
          ? filename.replace('.eps', '.svg') // Prefer svg over eps
          : `${filename}.svg`;

      return `${ICON_BASE_URL}${directory}/${finalFilename}`;
    }
  }
  return null;
}
