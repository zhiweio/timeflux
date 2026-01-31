'use client';

import type { Profile } from '@/lib/types';
import { ProfileCard } from './ProfileCard';

interface HeaderProps {
  profile: Profile;
}

export function Header({ profile }: HeaderProps) {
  return (
    <div className="w-full max-w-5xl mx-auto mb-6 relative z-10">
      <ProfileCard profile={profile} />
    </div>
  );
}
