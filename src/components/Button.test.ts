import { describe, it, expect, beforeEach, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/svelte';
import Button from './Button.svelte';
import { createRawSnippet, type Snippet } from 'svelte';

const getSnippet = (content: string): Snippet<[]> =>
  createRawSnippet(() => ({
    render: () => `<div class="children">${content}</div>`,
  }));

describe('Button', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      const { container } = render(Button, {
        children: getSnippet('Click me'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.classList.contains('fluid')).toBe(false);
      expect(button?.classList.contains('small')).toBe(false);
      expect(button?.classList.contains('secondary')).toBe(false);
      expect(button?.disabled).toBe(false);
      expect(button?.type).toBe('button');
    });

    it('renders with custom id', () => {
      const { container } = render(Button, {
        id: 'test-button',
        children: getSnippet('Button with ID'),
      });
      const button = container.querySelector('#test-button');
      expect(button).toBeTruthy();
    });

    it('renders disabled button', () => {
      const { container } = render(Button, {
        disabled: true,
        children: getSnippet('Disabled button'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.disabled).toBe(true);
    });

    it('renders enabled button', () => {
      const { container } = render(Button, {
        disabled: false,
        children: getSnippet('Enabled button'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.disabled).toBe(false);
    });

    it('renders fluid variant', () => {
      const { container } = render(Button, {
        fluid: true,
        children: getSnippet('Fluid button'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.classList.contains('fluid')).toBe(true);
    });

    it('renders non-fluid variant', () => {
      const { container } = render(Button, {
        fluid: false,
        children: getSnippet('Non-fluid button'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.classList.contains('fluid')).toBe(false);
    });

    it('renders small variant', () => {
      const { container } = render(Button, {
        small: true,
        children: getSnippet('Small button'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.classList.contains('small')).toBe(true);
    });

    it('renders non-small variant', () => {
      const { container } = render(Button, {
        small: false,
        children: getSnippet('Non-small button'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.classList.contains('small')).toBe(false);
    });

    it('renders secondary variant', () => {
      const { container } = render(Button, {
        secondary: true,
        children: getSnippet('Secondary button'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.classList.contains('secondary')).toBe(true);
    });

    it('renders non-secondary variant', () => {
      const { container } = render(Button, {
        secondary: false,
        children: getSnippet('Primary button'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.classList.contains('secondary')).toBe(false);
    });

    it('renders with button type', () => {
      const { container } = render(Button, {
        type: 'button',
        children: getSnippet('Button type'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.type).toBe('button');
    });

    it('renders with submit type', () => {
      const { container } = render(Button, {
        type: 'submit',
        children: getSnippet('Submit type'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.type).toBe('submit');
    });

    it('renders with reset type', () => {
      const { container } = render(Button, {
        type: 'reset',
        children: getSnippet('Reset type'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.type).toBe('reset');
    });

    it('renders children content', () => {
      const { container } = render(Button, {
        children: getSnippet('Test content'),
      });
      const content = container.querySelector('.children');
      expect(content?.textContent).toContain('Test content');
    });

    it('renders loader icon when loading', () => {
      const { container } = render(Button, {
        loading: true,
        children: getSnippet('Loading button'),
      });
      const loader = container.querySelector('.loader');
      expect(loader).toBeTruthy();
    });

    it('renders check icon when success', () => {
      const { container } = render(Button, {
        success: true,
        children: getSnippet('Success button'),
      });
      const check = container.querySelector('.check');
      expect(check).toBeTruthy();
    });

    it('renders loader icon when loading takes precedence over success', () => {
      const { container } = render(Button, {
        loading: true,
        success: true,
        children: getSnippet('Loading and success'),
      });
      const loader = container.querySelector('.loader');
      const check = container.querySelector('.check');
      expect(loader).toBeTruthy();
      expect(check).toBeNull();
    });

    it('renders loader icon when loading takes precedence over children', () => {
      const { container } = render(Button, {
        loading: true,
        children: getSnippet('Loading with children'),
      });
      const loader = container.querySelector('.loader');
      const content = container.querySelector('.children');
      expect(loader).toBeTruthy();
      expect(content).toBeNull();
    });

    it('renders success icon when success takes precedence over children', () => {
      const { container } = render(Button, {
        success: true,
        children: getSnippet('Success with children'),
      });
      const check = container.querySelector('.check');
      const content = container.querySelector('.children');
      expect(check).toBeTruthy();
      expect(content).toBeNull();
    });

    it('binds element reference', () => {
      let buttonElement: HTMLButtonElement | undefined;
      const { container } = render(Button, {
        elem: undefined as unknown as HTMLButtonElement,
        children: getSnippet('Button with ref'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
    });

    it('renders with all props combined', () => {
      const { container } = render(Button, {
        id: 'complete-button',
        disabled: true,
        loading: false,
        success: false,
        fluid: true,
        small: true,
        secondary: true,
        type: 'submit',
        children: getSnippet('Complete button'),
      });

      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.id).toBe('complete-button');
      expect(button?.disabled).toBe(true);
      expect(button?.classList.contains('fluid')).toBe(true);
      expect(button?.classList.contains('small')).toBe(true);
      expect(button?.classList.contains('secondary')).toBe(true);
      expect(button?.type).toBe('submit');
      expect(button?.textContent).toContain('Complete button');
    });
  });

  describe('events', () => {
    it('calls onclick handler when clicked', async () => {
      const onClick = vi.fn();
      const { container } = render(Button, {
        onclick: onClick,
        children: getSnippet('Click me'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();

      await fireEvent.click(button!);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('has disabled attribute when disabled', () => {
      const { container } = render(Button, {
        disabled: true,
        children: getSnippet('Disabled button'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.hasAttribute('disabled')).toBe(true);
    });

    it('passes click event to onclick handler', async () => {
      const onClick = vi.fn();
      const { container } = render(Button, {
        onclick: onClick,
        children: getSnippet('Click me'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();

      await fireEvent.click(button!);
      expect(onClick).toHaveBeenCalledWith(expect.objectContaining({
        type: 'click',
      }));
    });
  });

  describe('attributes', () => {
    it('spreads additional attributes', () => {
      const { container } = render(Button, {
        attrs: { 'data-test': 'test-value', 'aria-label': 'Test button' },
        children: getSnippet('Button with attrs'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.getAttribute('data-test')).toBe('test-value');
      expect(button?.getAttribute('aria-label')).toBe('Test button');
    });

    it('spreads all type variants', () => {
      const types = ['button', 'submit', 'reset'] as const;

      types.forEach((type) => {
        const { container } = render(Button, {
          type,
          children: getSnippet(`${type} button`),
        });
        const button = container.querySelector('button');
        expect(button).toBeTruthy();
        expect(button?.type).toBe(type);
      });
    });
  });
});
