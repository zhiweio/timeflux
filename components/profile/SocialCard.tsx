'use client';

import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Profile } from '@/lib/types';

interface SocialCardProps {
  profile: Profile;
}

export function SocialCard({ profile }: SocialCardProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {profile.social?.github && (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          asChild
        >
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" />
          </a>
        </Button>
      )}
      {profile.social?.linkedin && (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          asChild
        >
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-4 w-4" />
          </a>
        </Button>
      )}
      {profile.social?.twitter && (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          asChild
        >
          <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
            <Twitter className="h-4 w-4" />
          </a>
        </Button>
      )}
      {profile.social?.email && (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          asChild
        >
          <a href={`mailto:${profile.social.email}`}>
            <Mail className="h-4 w-4" />
          </a>
        </Button>
      )}
    </div>
  );
}
