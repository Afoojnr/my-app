import Link from 'next/link';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';

const quickLinks = [
  {
    href: '/notes',
    title: 'Browse notes',
    description: 'The notes feature, on its own page.'
  },
  {
    href: '/login',
    title: 'Try the login form',
    description: 'React Hook Form and Zod, with accessible errors.'
  }
];

export function QuickLinks() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {quickLinks.map(link => (
        <li key={link.href}>
          {/* The whole card is one link: one stop for keyboard users */}
          <Link
            href={link.href}
            className="block rounded-xl transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Card className="h-full">
              <CardHeader>
                <h3 className="font-semibold">{link.title} →</h3>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
