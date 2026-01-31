'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Markdown } from '@/components/ui/Markdown';
import type { Profile } from '@/lib/types';
import { SocialCard } from './SocialCard';

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-sm h-full relative overflow-hidden">
      {/* Social links in top right */}
      <div className="absolute top-6 right-6 hidden md:block">
        <SocialCard profile={profile} />
      </div>

      <Avatar className="h-24 w-24 border border-zinc-200 dark:border-zinc-700 shrink-0">
        <AvatarImage src={profile.avatar} alt={profile.name} />
        <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
          {profile.name.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 w-full">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {profile.name}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl leading-relaxed">
          {profile.bio}
        </p>

        {/* Mobile Social links */}
        <div className="md:hidden pt-2">
          <SocialCard profile={profile} />
        </div>

        {profile.about && (
          <div className="w-full mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <div className="relative">
              <motion.div
                initial={false}
                animate={{ height: isExpanded ? 'auto' : 80 }}
                className="overflow-hidden text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed text-left"
              >
                <Markdown content={profile.about} />
              </motion.div>

              {!isExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent" />
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 h-8 px-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              {isExpanded ? (
                <span className="flex items-center gap-1">
                  Read less <ChevronUp className="w-3 h-3" />
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  Read more <ChevronDown className="w-3 h-3" />
                </span>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
