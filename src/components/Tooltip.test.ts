import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';
import Tooltip from './Tooltip.svelte';
import { createRawSnippet, type Snippet } from 'svelte';

const getSnippet = (content: string): Snippet<[]> =>
  createRawSnippet(() => ({
    render: () => `<div class="tooltip-content">${content}</div>`,
  }));

vi.mock('@popperjs/core', () => ({
  createPopper: vi.fn(() => ({
    destroy: vi.fn(),
    update: vi.fn(),
  })),
}));

describe('Tooltip', () => {
  describe('rendering', () => {
    it('renders nothing when no ref is provided', () => {
      const { container } = render(Tooltip, {
        children: getSnippet('Tooltip content'),
      });
      const tooltip = container.querySelector('div.tooltip');
      expect(tooltip).toBeFalsy();
    });

    it('renders tooltip when ref is provided', () => {
      const ref = document.createElement('div');
      document.body.appendChild(ref);

      const { container } = render(Tooltip, {
        ref,
        children: getSnippet('Tooltip content'),
      });

      const tooltip = container.querySelector('div.tooltip');
      expect(tooltip).toBeTruthy();

      document.body.removeChild(ref);
    });

    it('renders tooltip content', () => {
      const ref = document.createElement('div');
      document.body.appendChild(ref);

      const { container } = render(Tooltip, {
        ref,
        children: getSnippet('Test tooltip'),
      });

      const tooltip = container.querySelector('div.tooltip-content');
      expect(tooltip?.textContent).toBe('Test tooltip');

      document.body.removeChild(ref);
    });

    it('renders with custom attrs', () => {
      const ref = document.createElement('div');
      document.body.appendChild(ref);

      const { container } = render(Tooltip, {
        ref,
        attrs: { 'data-testid': 'custom-tooltip' },
        children: getSnippet('Content'),
      });

      const tooltip = container.querySelector('div[data-testid="custom-tooltip"]');
      expect(tooltip).toBeTruthy();

      document.body.removeChild(ref);
    });

    it('renders popper arrow element', () => {
      const ref = document.createElement('div');
      document.body.appendChild(ref);

      const { container } = render(Tooltip, {
        ref,
        children: getSnippet('Content'),
      });

      const arrow = container.querySelector('div[data-popper-arrow]');
      expect(arrow).toBeTruthy();

      document.body.removeChild(ref);
    });

    it('renders with custom options', () => {
      const ref = document.createElement('div');
      document.body.appendChild(ref);

      const { container } = render(Tooltip, {
        ref,
        options: { placement: 'top' },
        children: getSnippet('Content'),
      });

      const tooltip = container.querySelector('div.tooltip');
      expect(tooltip).toBeTruthy();

      document.body.removeChild(ref);
    });
  });

  describe('with boundary element', () => {
    it('renders with boundary element option', () => {
      const ref = document.createElement('div');
      const boundary = document.createElement('div');
      document.body.appendChild(ref);
      document.body.appendChild(boundary);

      const { container } = render(Tooltip, {
        ref,
        boundaryElem: boundary,
        children: getSnippet('Content'),
      });

      const tooltip = container.querySelector('div.tooltip');
      expect(tooltip).toBeTruthy();

      document.body.removeChild(ref);
      document.body.removeChild(boundary);
    });
  });
});
