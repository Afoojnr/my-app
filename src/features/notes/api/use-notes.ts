import { useQuery } from '@tanstack/react-query';
import { env } from '@/config/env';
import { notesSchema } from '../schemas/note';

async function fetchNotes() {
  const response = await fetch(`${env.API_URL}/posts?_limit=5`);
  // fetch doesn't fail on 404 or 500 (axios does), so check the status ourselves
  if (!response.ok)
    throw new Error(`Could not load notes (${response.status})`);
  return notesSchema.parse(await response.json()); // check the data really has the shape we expect
}

export function useNotes() {
  return useQuery({ queryKey: ['notes'], queryFn: fetchNotes });
}
