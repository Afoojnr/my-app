'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { useStore, type StoreApi } from 'zustand';
import {
  createFavouritesStore,
  type FavouritesState
} from './favourites-store';

const FavouritesContext = createContext<StoreApi<FavouritesState> | null>(null);

export function FavouritesProvider({ children }: { children: ReactNode }) {
  // One store per visitor, created once
  const [store] = useState(createFavouritesStore);
  return <FavouritesContext value={store}>{children}</FavouritesContext>;
}

export function useFavourites<T>(selector: (state: FavouritesState) => T): T {
  const store = useContext(FavouritesContext);
  if (!store)
    throw new Error('useFavourites must be used inside FavouritesProvider');
  return useStore(store, selector);
}
