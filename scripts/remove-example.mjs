// scripts/remove-example.mjs
// Removes the example app (auth, notes, dashboard) and leaves a clean starter.
// Run once, right after you create your project: pnpm remove-example
// It deletes itself at the end.
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

function remove(path) {
  rmSync(path, { recursive: true, force: true });
  console.log(`deleted  ${path}`);
}

function write(path, content) {
  writeFileSync(path, content);
  console.log(`wrote    ${path}`);
}

// Replace text in a file. Stops if the text isn't there (the file was already changed).
function edit(path, from, to) {
  const before = readFileSync(path, 'utf8');
  const after = before.replace(from, to);
  if (after === before) {
    console.error(
      `Could not update ${path}. Was it already changed? Stopping.`
    );
    process.exit(1);
  }
  writeFileSync(path, after);
  console.log(`updated  ${path}`);
}

if (!existsSync('src/features/notes')) {
  console.error('The example is already removed.');
  process.exit(1);
}

// 1. Delete the example features, their pages and their tests
for (const path of [
  'src/features/auth',
  'src/features/notes',
  'src/features/dashboard',
  'src/app/login',
  'src/app/notes',
  'e2e/app.spec.ts'
]) {
  remove(path);
}

// 2. A plain home page
write(
  'src/app/page.tsx',
  `export default function HomePage() {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-semibold tracking-tight">Home</h1>
      <p className="text-muted-foreground">Start building here.</p>
    </div>
  );
}
`
);

// 3. Layout: the favourites provider came from the notes feature
edit(
  'src/app/layout.tsx',
  /import \{ FavouritesProvider \} from '@\/features\/notes';\n/,
  ''
);
edit(
  'src/app/layout.tsx',
  /<FavouritesProvider>\{children\}<\/FavouritesProvider>/,
  '{children}'
);

// 4. Menu: only Home, no Log in button
edit(
  'src/components/layout/site-header.tsx',
  /const links = \[[\s\S]*?\];/,
  "const links = [{ href: '/', label: 'Home' }];"
);
edit(
  'src/components/layout/site-header.tsx',
  /\s*<li>\s*<Link\s+href="\/login"[\s\S]*?<\/li>/,
  ''
);

// 5. Sitemap: only the home page
edit(
  'src/app/sitemap.ts',
  /,\s*\{\s*url: `\$\{base\}\/notes`[\s\S]*?\}\s*,\s*\{\s*url: `\$\{base\}\/login`[\s\S]*?\}/,
  ''
);

// 6. One small test of each kind, so `pnpm test` and `pnpm test:e2e` still have something to run
write(
  'src/setup.test.tsx',
  `import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

it('test setup works', () => {
  render(<h1>Hello</h1>);
  expect(screen.getByRole('heading', { name: 'Hello' })).toBeInTheDocument();
});
`
);
write(
  'e2e/home.spec.ts',
  `import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('home page loads with no accessibility problems', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
`
);

// 7. Remove this script and its package.json entry
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
delete pkg.scripts['remove-example'];
write('package.json', `${JSON.stringify(pkg, null, 2)}\n`);
remove('scripts');

console.log(
  '\nDone. Commit it: git add -A && git commit -m "chore: remove example"'
);
