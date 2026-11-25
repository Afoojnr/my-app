import { createStore } from 'zustand/vanilla';

export type FavouritesState = {
  ids: number[];
  toggle: (id: number) => void;
};

// A function that makes a store, not one global store: on the server,
// a global store would be shared between visitors.
export function createFavouritesStore() {
  return createStore<FavouritesState>()(set => ({
    ids: [],
    toggle: id =>
      set(state => ({
        ids: state.ids.includes(id)
          ? state.ids.filter(favouriteId => favouriteId !== id)
          : [...state.ids, id]
      }))
  }));
}
