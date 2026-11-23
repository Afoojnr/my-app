const config = {
  // Type check TypeScript files
  '**/*.{ts,tsx}': () => 'pnpm typecheck',

  // Lint & Prettify TS and JS files
  '**/*.{js,jsx,mjs,ts,tsx}': ['pnpm lint:fix', 'pnpm prettier:fix'],

  // Prettify only Markdown and JSON files
  '**/*.{json,md,css,yml,yaml}': 'pnpm prettier:fix'
};

export default config;
