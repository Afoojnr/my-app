'use client';

import { Star } from 'lucide-react';
import { cn } from 'cn';
import { useFavourites } from '../stores/favourites-provider';

export function FavouriteButton({
  noteId,
  noteTitle
}: {
  noteId: number;
  noteTitle: string;
}) {
  const isFavourite = useFavourites(state => state.ids.includes(noteId));
  const toggle = useFavourites(state => state.toggle);

  return (
    <button
      type="button"
      onClick={() => toggle(noteId)}
      aria-pressed={isFavourite}
      aria-label={`Favourite: ${noteTitle}`}
      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Star
        className={cn('size-4', isFavourite && 'fill-current text-foreground')}
        aria-hidden="true"
      />
    </button>
  );
}
