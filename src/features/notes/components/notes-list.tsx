'use client';

import { useNotes } from '../api/use-notes';
import { NoteCard } from './note-card';

type NotesListProps = {
  limit?: number; // show only the first few, e.g. on the dashboard
};

export function NotesList({ limit }: NotesListProps) {
  const { data: notes, isPending, isError } = useNotes();

  // role="status" and role="alert" make screen readers announce these messages when they appear
  if (isPending)
    return (
      <p role="status" className="text-sm text-muted-foreground">
        Loading notes…
      </p>
    );
  if (isError)
    return (
      <p role="alert" className="text-sm text-destructive">
        Could not load notes.
      </p>
    );
  if (notes.length === 0)
    return <p className="text-sm text-muted-foreground">No notes yet.</p>;

  const shown = limit ? notes.slice(0, limit) : notes;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {shown.map(note => (
        <li key={note.id}>
          <NoteCard note={note} />
        </li>
      ))}
    </ul>
  );
}
