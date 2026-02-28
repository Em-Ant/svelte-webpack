import { describe, it, expect, beforeEach } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import Alert from './Alert.svelte';
import { createRawSnippet, type Snippet } from 'svelte';

const getSnippet = (content: string): Snippet<[]> =>
  createRawSnippet(() => ({
    render: () => `<div class="children">${content}</div>`,
  }));

describe('Alert', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      const { container } = render(Alert, {
        children: getSnippet('Default message'),
      });
      const alert = container.querySelector('.wrap');
      expect(alert).toBeTruthy();
      expect(alert?.classList.contains('warn')).toBe(false);
      expect(alert?.classList.contains('err')).toBe(false);
      expect(alert?.classList.contains('ok')).toBe(false);
    });

    it('renders info type', () => {
      const { container } = render(Alert, {
        type: 'info',
        children: getSnippet('Info message'),
      });
      const alert = container.querySelector('.wrap');
      expect(alert).toBeTruthy();
      expect(alert?.classList.contains('warn')).toBe(false);
      expect(alert?.classList.contains('err')).toBe(false);
      expect(alert?.classList.contains('ok')).toBe(false);
    });

    it('renders warn type', () => {
      const { container } = render(Alert, {
        type: 'warn',
        children: getSnippet('Warning message'),
      });
      const alert = container.querySelector('.wrap');
      expect(alert).toBeTruthy();
      expect(alert?.classList.contains('warn')).toBe(true);
      expect(alert?.classList.contains('err')).toBe(false);
      expect(alert?.classList.contains('ok')).toBe(false);
    });

    it('renders error type', () => {
      const { container } = render(Alert, {
        type: 'error',
        children: getSnippet('Error message'),
      });
      const alert = container.querySelector('.wrap');
      expect(alert).toBeTruthy();
      expect(alert?.classList.contains('warn')).toBe(false);
      expect(alert?.classList.contains('err')).toBe(true);
      expect(alert?.classList.contains('ok')).toBe(false);
    });

    it('renders success type', () => {
      const { container } = render(Alert, {
        type: 'success',
        children: getSnippet('Success message'),
      });
      const alert = container.querySelector('.wrap');
      expect(alert).toBeTruthy();
      expect(alert?.classList.contains('warn')).toBe(false);
      expect(alert?.classList.contains('err')).toBe(false);
      expect(alert?.classList.contains('ok')).toBe(true);
    });

    it('renders fluid variant', () => {
      const { container } = render(Alert, {
        fluid: true,
        children: getSnippet('Fluid message'),
      });
      const alert = container.querySelector('.wrap');
      expect(alert).toBeTruthy();
      expect(alert?.classList.contains('fluid')).toBe(true);
    });

    it('renders non-fluid variant', () => {
      const { container } = render(Alert, {
        fluid: false,
        children: getSnippet('Non-fluid message'),
      });
      const alert = container.querySelector('.wrap');
      expect(alert).toBeTruthy();
      expect(alert?.classList.contains('fluid')).toBe(false);
    });

    it('renders children content', () => {
      const { container } = render(Alert, {
        children: getSnippet('Test content'),
      });
      const content = container.querySelector('.content');
      expect(content?.textContent).toContain('Test content');
    });

    it('renders icon element', () => {
      const { container } = render(Alert, {
        children: getSnippet('With icon'),
      });
      const icon = container.querySelector('.icon');
      expect(icon).toBeTruthy();
    });

    it('renders all type variants', () => {
      const types = ['info', 'warn', 'error', 'success'] as const;

      types.forEach((type) => {
        const { container } = render(Alert, {
          type,
          children: getSnippet(`${type} message`),
        });
        const alert = container.querySelector('.wrap');
        expect(alert).toBeTruthy();

        const expectedClasses = {
          info: { warn: false, err: false, ok: false },
          warn: { warn: true, err: false, ok: false },
          error: { warn: false, err: true, ok: false },
          success: { warn: false, err: false, ok: true },
        };

        expect(alert?.classList.contains('warn')).toBe(
          expectedClasses[type].warn,
        );
        expect(alert?.classList.contains('err')).toBe(
          expectedClasses[type].err,
        );
        expect(alert?.classList.contains('ok')).toBe(expectedClasses[type].ok);
      });
    });

    it('renders with all props combined', () => {
      const { container } = render(Alert, {
        type: 'error',
        fluid: true,
        children: getSnippet('Complete test'),
      });

      const alert = container.querySelector('.wrap');
      expect(alert).toBeTruthy();
      expect(alert?.classList.contains('err')).toBe(true);
      expect(alert?.classList.contains('fluid')).toBe(true);
      expect(alert?.textContent).toContain('Complete test');
    });
  });
});
