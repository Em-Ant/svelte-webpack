import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import Toggle from './Toggle.svelte';
import { createRawSnippet, type Snippet } from 'svelte';

const getSnippet = (content: string): Snippet<[]> =>
  createRawSnippet(() => ({
    render: () => `<div class="children">${content}</div>`,
  }));

describe('Toggle', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      const { container } = render(Toggle, {
        children: getSnippet('Toggle label'),
      });
      const label = container.querySelector('label');
      expect(label).toBeTruthy();
      expect(label?.classList.contains('disabled')).toBe(false);
    });

    it('renders with custom id', () => {
      const { container } = render(Toggle, {
        id: 'test-toggle',
        children: getSnippet('Toggle with ID'),
      });
      const input = container.querySelector('#test-toggle');
      expect(input).toBeTruthy();
    });

    it('renders with name attribute', () => {
      const { container } = render(Toggle, {
        name: 'test-name',
        children: getSnippet('Toggle with name'),
      });
      const input = container.querySelector('input[name="test-name"]');
      expect(input).toBeTruthy();
    });

    it('renders disabled toggle', () => {
      const { container } = render(Toggle, {
        disabled: true,
        children: getSnippet('Disabled toggle'),
      });
      const label = container.querySelector('label');
      expect(label?.classList.contains('disabled')).toBe(true);
    });

    it('renders non-disabled toggle', () => {
      const { container } = render(Toggle, {
        disabled: false,
        children: getSnippet('Enabled toggle'),
      });
      const label = container.querySelector('label');
      expect(label?.classList.contains('disabled')).toBe(false);
    });

    it('renders checked toggle', () => {
      const { container } = render(Toggle, {
        on: true,
        children: getSnippet('Checked toggle'),
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
      expect((input as HTMLInputElement).checked).toBe(true);
    });

    it('renders unchecked toggle', () => {
      const { container } = render(Toggle, {
        on: false,
        children: getSnippet('Unchecked toggle'),
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
      expect((input as HTMLInputElement).checked).toBe(false);
    });

    it('renders error state', () => {
      const { container } = render(Toggle, {
        error: true,
        children: getSnippet('Error toggle'),
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });

    it('renders without error state', () => {
      const { container } = render(Toggle, {
        error: false,
        children: getSnippet('No error toggle'),
      });
      const input = container.querySelector('input');
      expect(input?.getAttribute('aria-invalid')).toBeNull();
    });
  });

  describe('interactions', () => {
    it('toggles on click', async () => {
      const { container } = render(Toggle, {
        on: false,
        children: getSnippet('Toggle me'),
      });

      const input = container.querySelector('input');
      await fireEvent.click(input!);
      expect((input as HTMLInputElement).checked).toBe(true);
    });

    it('calls onchange handler', async () => {
      const onchange = vi.fn();
      const { container } = render(Toggle, {
        onchange,
        children: getSnippet('Toggle with handler'),
      });

      const input = container.querySelector('input');
      await fireEvent.change(input!);
      expect(onchange).toHaveBeenCalled();
    });

    it('calls onclick handler', async () => {
      const onclick = vi.fn();
      const { container } = render(Toggle, {
        onclick,
        children: getSnippet('Toggle with click handler'),
      });

      const label = container.querySelector('label');
      await fireEvent.click(label!);
      expect(onclick).toHaveBeenCalled();
    });

    it('renders with disabled class when disabled', () => {
      const { container } = render(Toggle, {
        on: false,
        disabled: true,
        children: getSnippet('Disabled toggle'),
      });

      const label = container.querySelector('label');
      expect(label?.classList.contains('disabled')).toBe(true);
    });
  });

  describe('binding', () => {
    it('binds to elem', () => {
      const { container } = render(Toggle, {
        children: getSnippet('Toggle with ref'),
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
    });
  });
});
