'use client';

import type { TimelineEvent } from '@/lib/types';
import { CertificateItem } from './items/CertificateItem';
import { StandardItem } from './items/StandardItem';

interface ItemProps {
  event: TimelineEvent;
  index: number;
  isLeft: boolean;
}

export function Item({ event, index, isLeft }: ItemProps) {
  if (event.type === 'certificate') {
    return <CertificateItem event={event} index={index} isLeft={isLeft} />;
  }

  return <StandardItem event={event} index={index} isLeft={isLeft} />;
}
