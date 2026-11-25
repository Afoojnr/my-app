import type { Metadata } from 'next';
import { DashboardScreen } from '@/features/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your notes at a glance.',
  alternates: { canonical: '/' }
};

export default function HomePage() {
  return <DashboardScreen />;
}
