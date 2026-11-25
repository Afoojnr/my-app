import type { Metadata } from 'next';
import { NotesScreen } from '@/features/notes';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'All notes.',
  alternates: { canonical: '/notes' }
};

export default function NotesPage() {
  return <NotesScreen />;
}
