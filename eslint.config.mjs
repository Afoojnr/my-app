import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import unusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
  js.configs.recommended,
  ...nextVitals,
  ...nextTs, // includes the typescript-eslint recommended rules

  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'unused-imports': unusedImports },
    rules: {
      'no-undef': 'off',
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',

      // One rule for unused code, so you don't get every warning twice.

      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],

      // Protects the feature folders.
      // Another feature is reached only through its public entries:
      // index (UI), server (server-only), shared (plain, browser-safe code).
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '@/features/*/*', // block reaching into a feature...
            '!@/features/*/server', // ...except its server entry
            '!@/features/*/shared', // ...and its shared entry
            '@/features/*/server/*', // but not deeper than those entries
            '@/features/*/shared/*'
          ]
        }
      ]
    }
  },

  prettier, // last: turns off rules that fight Prettier

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'public/**',
    // Playwright's generated output, not source code
    'playwright-report/**',
    'test-results/**',
    'blob-report/**'
  ])
]);
