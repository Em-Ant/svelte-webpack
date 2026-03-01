import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/svelte';
import { beforeEach, vi } from 'vitest';

beforeEach(() => {
  cleanup();
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

(Element.prototype as any).animate = vi.fn(() => ({
  cancel: vi.fn(),
  finish: vi.fn(),
  play: vi.fn(),
  pause: vi.fn(),
  onfinish: null,
  oncancel: null,
  ready: Promise.resolve(),
  finished: Promise.resolve(),
}));
