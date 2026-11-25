import type { Metadata } from 'next';
import { LoginScreen } from '@/features/auth';

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Log in to your account.',
  alternates: { canonical: '/login' }
};

export default function LoginPage() {
  return <LoginScreen />;
}
