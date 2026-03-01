import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import Checkbox from './Checkbox.svelte';
import { createRawSnippet, type Snippet } from 'svelte';

const getSnippet = (content: string): Snippet<[]> =>
  createRawSnippet(() => ({
    render: () => `<div class="children">${content}</div>`,
  }));

describe('Checkbox', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      const { container } = render(Checkbox, {
        children: getSnippet('Checkbox label'),
      });
      const label = container.querySelector('label');
      expect(label).toBeTruthy();
      expect(label?.classList.contains('disabled')).toBe(false);
    });

    it('renders with custom id', () => {
      const { container } = render(Checkbox, {
        id: 'test-checkbox',
        children: getSnippet('Checkbox with ID'),
      });
      const input = container.querySelector('#test-checkbox');
      expect(input).toBeTruthy();
    });

    it('renders with name attribute', () => {
      const { container } = render(Checkbox, {
        name: 'test-name',
        children: getSnippet('Checkbox with name'),
      });
      const input = container.querySelector('input[name="test-name"]');
      expect(input).toBeTruthy();
    });

    it('renders disabled checkbox', () => {
      const { container } = render(Checkbox, {
        disabled: true,
        children: getSnippet('Disabled checkbox'),
      });
      const label = container.querySelector('label');
      expect(label).toBeTruthy();
      expect(label?.classList.contains('disabled')).toBe(true);
    });

    it('renders non-disabled checkbox', () => {
      const { container } = render(Checkbox, {
        disabled: false,
        children: getSnippet('Enabled checkbox'),
      });
      const label = container.querySelector('label');
      expect(label).toBeTruthy();
      expect(label?.classList.contains('disabled')).toBe(false);
    });

    it('renders checked checkbox', () => {
      const { container } = render(Checkbox, {
        checked: true,
        children: getSnippet('Checked checkbox'),
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
      expect((input as HTMLInputElement).checked).toBe(true);
    });

    it('renders unchecked checkbox', () => {
      const { container } = render(Checkbox, {
        checked: false,
        children: getSnippet('Unchecked checkbox'),
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
      expect((input as HTMLInputElement).checked).toBe(false);
    });

    it('renders error state', () => {
      const { container } = render(Checkbox, {
        error: true,
        children: getSnippet('Error checkbox'),
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });

    it('renders non-error state', () => {
      const { container } = render(Checkbox, {
        error: false,
        children: getSnippet('Normal checkbox'),
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
      expect(input?.getAttribute('aria-invalid')).toBeNull();
    });

    it('renders children content', () => {
      const { container } = render(Checkbox, {
        children: getSnippet('Test label'),
      });
      const labelContent = container.querySelector('.children');
      expect(labelContent?.textContent).toContain('Test label');
    });

    it('renders icon element', () => {
      const { container } = render(Checkbox, {
        children: getSnippet('With icon'),
      });
      const icon = container.querySelector('.icon');
      expect(icon).toBeTruthy();
    });

    it('renders icon-bg element', () => {
      const { container } = render(Checkbox, {
        children: getSnippet('With icon-bg'),
      });
      const iconBg = container.querySelector('.icon-bg');
      expect(iconBg).toBeTruthy();
    });

    it('renders with all props combined', () => {
      const { container } = render(Checkbox, {
        id: 'complete-checkbox',
        name: 'complete',
        disabled: true,
        checked: true,
        error: true,
        children: getSnippet('Complete checkbox'),
      });

      const label = container.querySelector('label');
      expect(label).toBeTruthy();
      expect(label?.classList.contains('disabled')).toBe(true);

      const input = container.querySelector('input');
      expect(input).toBeTruthy();
      expect((input as HTMLInputElement).checked).toBe(true);
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('events', () => {
    it('calls onchange handler when changed', async () => {
      const onChange = vi.fn();
      const { container } = render(Checkbox, {
        onchange: onChange,
        children: getSnippet('Change me'),
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();

      await fireEvent.change(input!);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('calls onclick handler when clicked', async () => {
      const onClick = vi.fn();
      const { container } = render(Checkbox, {
        onclick: onClick,
        children: getSnippet('Click me'),
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();

      await fireEvent.click(input!);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('toggles checked state on click', async () => {
      const { container } = render(Checkbox, {
        checked: false,
        children: getSnippet('Toggle me'),
      });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.checked).toBe(false);

      await fireEvent.click(input);
      expect(input.checked).toBe(true);
    });

    it('passes change event to onchange handler', async () => {
      const onChange = vi.fn();
      const { container } = render(Checkbox, {
        onchange: onChange,
        children: getSnippet('Event test'),
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();

      await fireEvent.change(input!);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'change',
        }),
      );
    });
  });

  describe('attributes', () => {
    it('spreads additional attributes', () => {
      const { container } = render(Checkbox, {
        attrs: { 'data-test': 'test-value', 'aria-label': 'Test checkbox' },
        children: getSnippet('Checkbox with attrs'),
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
      expect(input?.getAttribute('data-test')).toBe('test-value');
      expect(input?.getAttribute('aria-label')).toBe('Test checkbox');
    });
  });
});
