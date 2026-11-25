'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  retry
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <Button onClick={() => retry()}>Try again</Button>
    </div>
  );
}
