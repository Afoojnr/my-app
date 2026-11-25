import { FavouritesCount } from '../components/favourites-count';
import { NotesList } from '../components/notes-list';

export function NotesScreen() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Notes</h1>
        <p className="text-muted-foreground">
          Five posts from JSONPlaceholder, a free fake API for testing.
        </p>
        <FavouritesCount />
      </div>
      {/* Hidden h2 keeps the headings in order (h1 → h2 → h3 note titles) for screen readers */}
      <section aria-labelledby="all-notes-heading">
        <h2 id="all-notes-heading" className="sr-only">
          All notes
        </h2>
        <NotesList />
      </section>
    </div>
  );
}
