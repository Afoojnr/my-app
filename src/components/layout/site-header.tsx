'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from 'cn';
import { siteConfig } from '@/config/site';
import { ThemeToggle } from './theme-toggle';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/notes', label: 'Notes' }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 text-sm">
            {links.map(link => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  {/* aria-current tells screen readers which page you're on */}
                  <Link
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground',
                      isActive && 'bg-muted font-medium text-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <ThemeToggle />
            </li>
            <li>
              <Link
                href="/login"
                className="ml-2 rounded-md bg-primary px-3 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Log in
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
