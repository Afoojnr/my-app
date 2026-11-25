import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import type { Note } from '../schemas/note';
import { FavouriteButton } from './favourite-button';

export function NoteCard({ note }: { note: Note }) {
  return (
    <Card className="h-full">
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold capitalize">{note.title}</h3>
          <FavouriteButton noteId={note.id} noteTitle={note.title} />
        </div>
        <CardDescription>{note.body}</CardDescription>
      </CardHeader>
    </Card>
  );
}
