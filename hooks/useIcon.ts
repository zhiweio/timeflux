import { useEffect, useState } from 'react';
import { matchIcon } from '@/lib/icons';

export function useIcon(tag: string) {
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    matchIcon(tag).then((url) => {
      if (mounted) setIconUrl(url);
    });
    return () => {
      mounted = false;
    };
  }, [tag]);

  return iconUrl;
}
