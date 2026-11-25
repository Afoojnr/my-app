import { describe, expect, it } from 'vitest';
import { createFavouritesStore } from './favourites-store';

describe('favourites store', () => {
  it('adds a note, then removes it on the second toggle', () => {
    const store = createFavouritesStore();

    store.getState().toggle(1);
    expect(store.getState().ids).toEqual([1]);

    store.getState().toggle(1);
    expect(store.getState().ids).toEqual([]);
  });
});
