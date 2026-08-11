import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.test.{ts,tsx,js,jsx}'],
    exclude: ['**/tests/**', '**/node_modules/**', '**/dist/**', '**/.next/**'],
  },
});
