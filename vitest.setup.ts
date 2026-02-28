import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/svelte';
import { beforeEach } from 'vitest';

beforeEach(() => {
  cleanup();
});
