'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div
      className={cn(
        'prose prose-sm dark:prose-invert max-w-none',
        'prose-p:leading-relaxed prose-p:my-2',
        'prose-ul:my-2 prose-li:my-0.5',
        'prose-headings:font-bold prose-headings:tracking-tight prose-headings:mb-2 prose-headings:mt-4',
        'prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100 prose-strong:font-bold',
        'prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none',
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
