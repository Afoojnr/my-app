import { z } from 'zod';

// The shape of one post from the API (JSONPlaceholder /posts)
export const noteSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string()
});

export const notesSchema = z.array(noteSchema);

export type Note = z.infer<typeof noteSchema>;
