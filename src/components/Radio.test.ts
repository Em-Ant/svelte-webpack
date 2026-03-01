import { describe, it, expect, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/svelte';
import Radio from './Radio.svelte';
import { createRawSnippet, type Snippet } from 'svelte';

const getSnippet = (content: string): Snippet<[]> =>
  createRawSnippet(() => ({
    render: () => `<div class="children">${content}</div>`,
  }));

describe('Radio', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      const { container } = render(Radio, {
        children: getSnippet('Radio label'),
      });
      const label = container.querySelector('label');
      expect(label).toBeTruthy();
      expect(label?.classList.contains('disabled')).toBe(false);
    });

    it('renders with custom id', () => {
      const { container } = render(Radio, {
        id: 'test-radio',
        children: getSnippet('Radio with ID'),
      });
      const input = container.querySelector('#test-radio');
      expect(input).toBeTruthy();
    });

    it('renders with name attribute', () => {
      const { container } = render(Radio, {
        name: 'test-name',
        children: getSnippet('Radio with name'),
      });
      const input = container.querySelector('input[name="test-name"]');
      expect(input).toBeTruthy();
    });

    it('renders with value attribute', () => {
      const { container } = render(Radio, {
        value: 'option1',
        children: getSnippet('Radio with value'),
      });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.value).toBe('option1');
    });

    it('renders disabled radio', () => {
      const { container } = render(Radio, {
        disabled: true,
        children: getSnippet('Disabled radio'),
      });
      const label = container.querySelector('label');
      expect(label).toBeTruthy();
      expect(label?.classList.contains('disabled')).toBe(true);
    });

    it('renders non-disabled radio', () => {
      const { container } = render(Radio, {
        disabled: false,
        children: getSnippet('Enabled radio'),
      });
      const label = container.querySelector('label');
      expect(label).toBeTruthy();
      expect(label?.classList.contains('disabled')).toBe(false);
    });

    it('renders checked radio when group matches value', () => {
      const { container } = render(Radio, {
        value: 'option1',
        group: 'option1',
        children: getSnippet('Checked radio'),
      });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.checked).toBe(true);
    });

    it('renders unchecked radio when group does not match value', () => {
      const { container } = render(Radio, {
        value: 'option1',
        group: 'option2',
        children: getSnippet('Unchecked radio'),
      });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.checked).toBe(false);
    });

    it('renders unchecked radio when group is undefined', () => {
      const { container } = render(Radio, {
        value: 'option1',
        group: undefined,
        children: getSnippet('Unchecked radio'),
      });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.checked).toBe(false);
    });

    it('renders error state', () => {
      const { container } = render(Radio, {
        error: true,
        children: getSnippet('Error radio'),
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
      expect(input?.getAttribute('data-invalid')).toBe('true');
    });

    it('renders non-error state', () => {
      const { container } = render(Radio, {
        error: false,
        children: getSnippet('Normal radio'),
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
      expect(input?.getAttribute('data-invalid')).toBe('false');
    });

    it('renders children content', () => {
      const { container } = render(Radio, {
        children: getSnippet('Test label'),
      });
      const labelContent = container.querySelector('.children');
      expect(labelContent?.textContent).toContain('Test label');
    });

    it('renders icon element', () => {
      const { container } = render(Radio, {
        children: getSnippet('With icon'),
      });
      const icon = container.querySelector('.icon');
      expect(icon).toBeTruthy();
    });

    it('renders with all props combined', () => {
      const { container } = render(Radio, {
        id: 'complete-radio',
        name: 'complete',
        value: 'option1',
        group: 'option1',
        disabled: true,
        error: true,
        children: getSnippet('Complete radio'),
      });

      const label = container.querySelector('label');
      expect(label).toBeTruthy();
      expect(label?.classList.contains('disabled')).toBe(true);

      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.value).toBe('option1');
      expect(input.checked).toBe(true);
      expect(input?.getAttribute('data-invalid')).toBe('true');
    });
  });

  describe('events', () => {
    it('calls onchange handler when changed', async () => {
      const onChange = vi.fn();
      const { container } = render(Radio, {
        onchange: onChange,
        children: getSnippet('Change me'),
      });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();

      await fireEvent.change(input);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('calls onclick handler when clicked', async () => {
      const onClick = vi.fn();
      const { container } = render(Radio, {
        onclick: onClick,
        children: getSnippet('Click me'),
      });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();

      await fireEvent.click(input);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('checks radio when clicked', async () => {
      const { container } = render(Radio, {
        value: 'option1',
        group: undefined,
        children: getSnippet('Select me'),
      });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.checked).toBe(false);

      await fireEvent.click(input);
      expect(input.checked).toBe(true);
    });

    it('passes change event to onchange handler', async () => {
      const onChange = vi.fn();
      const { container } = render(Radio, {
        onchange: onChange,
        children: getSnippet('Event test'),
      });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();

      await fireEvent.change(input);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'change',
        }),
      );
    });
  });

  describe('attributes', () => {
    it('spreads additional attributes', () => {
      const { container } = render(Radio, {
        attrs: { 'data-test': 'test-value', 'aria-label': 'Test radio' },
        children: getSnippet('Radio with attrs'),
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
      expect(input?.getAttribute('data-test')).toBe('test-value');
      expect(input?.getAttribute('aria-label')).toBe('Test radio');
    });

    it('renders radio group with same name', () => {
      const { container } = render(Radio, {
        name: 'group-name',
        value: 'option1',
        children: getSnippet('Option 1'),
      });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.name).toBe('group-name');
    });
  });

  describe('group binding', () => {
    it('selects radio when group value matches', () => {
      const { container } = render(Radio, {
        value: 'selected',
        group: 'selected',
        children: getSnippet('Selected'),
      });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.checked).toBe(true);
    });

    it('renders multiple radios with same group', () => {
      const { container } = render(Radio, {
        value: 'option1',
        group: 'option1',
        children: getSnippet('Option 1'),
      });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.checked).toBe(true);
    });
  });
});
