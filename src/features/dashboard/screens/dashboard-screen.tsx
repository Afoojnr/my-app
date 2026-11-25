import Link from 'next/link';
import { NotesList } from '@/features/notes';
import { QuickLinks } from '../components/quick-links';

export function DashboardScreen() {
  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          A small example app, organised by feature.
        </p>
      </div>

      {/* Headings go in order (h1 → h2 → h3), so screen reader users can jump through the page */}
      <section aria-labelledby="quick-links-heading" className="space-y-4">
        <h2 id="quick-links-heading" className="text-lg font-semibold">
          Quick links
        </h2>
        <QuickLinks />
      </section>

      <section aria-labelledby="notes-heading" className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 id="notes-heading" className="text-lg font-semibold">
            Latest notes
          </h2>
          <Link href="/notes" className="text-sm underline underline-offset-4">
            See all notes
          </Link>
        </div>
        {/* Uses the notes feature through its front door */}
        <NotesList limit={3} />
      </section>
    </div>
  );
}
