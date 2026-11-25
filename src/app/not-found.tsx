import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Link href="/" className="underline">
        Back home
      </Link>
    </div>
  );
}
