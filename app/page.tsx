import { Header } from '@/components/profile/Header';
import { TimelineContainer } from '@/components/timeline/Container';
import { BackToTop } from '@/components/ui/BackToTop';
import { getTimelineData } from '@/lib/yaml-parser';

export default function Home() {
  const data = getTimelineData();

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05]" />
      </div>

      <div className="relative z-10 container max-w-5xl mx-auto px-4 py-6 md:py-8">
        <Header profile={data.profile} />
        <TimelineContainer timeline={data.timeline} />
      </div>

      <BackToTop />
    </main>
  );
}
