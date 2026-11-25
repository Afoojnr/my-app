'use client';

import { useFavourites } from '../stores/favourites-provider';

export function FavouritesCount() {
  const count = useFavourites(state => state.ids.length);
  return (
    <p className="text-sm text-muted-foreground">
      {count === 0
        ? 'No favourites yet. Star a note.'
        : `${count} favourite${count === 1 ? '' : 's'}`}
    </p>
  );
}
