import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import Select from './Select.svelte';

interface Option {
  name: string;
  value: string;
  key?: string;
}

const options: Option[] = [
  { name: 'Option 1', value: 'opt1' },
  { name: 'Option 2', value: 'opt2' },
  { name: 'Option 3', value: 'opt3' },
];

// Mock scrollIntoView for jsdom
beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe('Select', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      const { container } = render(Select, {
        options,
      });
      const button = container.querySelector('button.select');
      expect(button).toBeTruthy();
    });

    it('renders with custom name', () => {
      const { container } = render(Select, {
        options,
        name: 'custom-select',
      });
      const input = container.querySelector('input[name="custom-select"]');
      expect(input).toBeTruthy();
    });

    it('renders with placeholder when no value', () => {
      const { container } = render(Select, {
        options,
        value: undefined,
      });
      const valueSpan = container.querySelector('span.value');
      expect(valueSpan?.textContent).toBe('');
    });

    it('renders with selected value', () => {
      const { container } = render(Select, {
        options,
        value: 'opt1',
      });
      const valueSpan = container.querySelector('span.value');
      expect(valueSpan?.textContent).toBe('Option 1');
    });

    it('renders disabled state', () => {
      const { container } = render(Select, {
        options,
        disabled: true,
      });
      const button = container.querySelector('button.select');
      expect(button?.hasAttribute('disabled')).toBe(true);
    });

    it('renders error state', () => {
      const { container } = render(Select, {
        options,
        error: 'Error message',
      });
      const button = container.querySelector('button.select');
      expect(button?.classList.contains('error')).toBe(true);
    });

    it('renders fluid state', () => {
      const { container } = render(Select, {
        options,
        fluid: true,
      });
      const inner = container.querySelector('div.inner');
      expect(inner?.classList.contains('fluid')).toBe(true);
    });

    it('shows error icon when error is present', () => {
      const { container } = render(Select, {
        options,
        error: 'Error message',
      });
      const errorIcon = container.querySelector('span.error-icon.in');
      expect(errorIcon).toBeTruthy();
    });

    it('shows error message when error is present', () => {
      const { container } = render(Select, {
        options,
        error: 'This is an error',
      });
      const errorMsg = container.querySelector('span.error-msg');
      expect(errorMsg?.textContent).toBe('This is an error');
    });

    it('renders wrap element', () => {
      const { container } = render(Select, {
        options,
      });
      const wrap = container.querySelector('div.wrap');
      expect(wrap).toBeTruthy();
    });

    it('renders inner element', () => {
      const { container } = render(Select, {
        options,
      });
      const inner = container.querySelector('div.inner');
      expect(inner).toBeTruthy();
    });

    it('renders icon element', () => {
      const { container } = render(Select, {
        options,
      });
      const icon = container.querySelector('span.icon');
      expect(icon).toBeTruthy();
    });

    it('renders icon with SVG', () => {
      const { container } = render(Select, {
        options,
      });
      const iconSvg = container.querySelector('span.icon svg');
      expect(iconSvg).toBeTruthy();
    });

    it('renders hidden input element', () => {
      const { container } = render(Select, {
        options,
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
    });

    it('does not render options when closed', () => {
      const { container } = render(Select, {
        options,
      });
      const optionsDiv = container.querySelector('div.options');
      expect(optionsDiv).toBeFalsy();
    });

    it('renders options when open', async () => {
      const { container } = render(Select, {
        options,
      });
      const button = container.querySelector('button.select');
      await fireEvent.click(button!);

      await waitFor(() => {
        const optionsDiv = container.querySelector('div.options');
        expect(optionsDiv).toBeTruthy();
      });
    });

    it('renders correct number of options', async () => {
      const { container } = render(Select, {
        options,
      });
      const button = container.querySelector('button.select');
      await fireEvent.click(button!);

      await waitFor(() => {
        const optionItems = container.querySelectorAll('div.options > div');
        expect(optionItems.length).toBe(3);
      });
    });

    it('renders option names correctly', async () => {
      const { container } = render(Select, {
        options,
      });
      const button = container.querySelector('button.select');
      await fireEvent.click(button!);

      await waitFor(() => {
        const optionItems = container.querySelectorAll('div.options > div');
        expect(optionItems[0]?.textContent).toBe('Option 1');
        expect(optionItems[1]?.textContent).toBe('Option 2');
        expect(optionItems[2]?.textContent).toBe('Option 3');
      });
    });

    it('renders with boolean error', () => {
      const { container } = render(Select, {
        options,
        error: true,
      });
      const button = container.querySelector('button.select');
      expect(button?.classList.contains('error')).toBe(true);
    });

    it('renders error icon as disabled when select is disabled', () => {
      const { container } = render(Select, {
        options,
        error: 'Error',
        disabled: true,
      });
      const errorIcon = container.querySelector('span.error-icon.disabled');
      expect(errorIcon).toBeTruthy();
    });

    it('renders error message as disabled when select is disabled', () => {
      const { container } = render(Select, {
        options,
        error: 'Error',
        disabled: true,
      });
      const errorMsg = container.querySelector('span.error-msg.disabled');
      expect(errorMsg).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('calls onclick handler', async () => {
      const onclick = vi.fn();
      const { container } = render(Select, {
        options,
        onclick,
      });

      const button = container.querySelector('button.select');
      await fireEvent.click(button!);

      expect(onclick).toHaveBeenCalled();
    });

    it('opens dropdown on button click', async () => {
      const { container } = render(Select, {
        options,
      });

      const button = container.querySelector('button.select');
      await fireEvent.click(button!);

      await waitFor(() => {
        const optionsDiv = container.querySelector('div.options');
        expect(optionsDiv).toBeTruthy();
      });
    });

    it('focuses input on mousedown', async () => {
      const { container } = render(Select, {
        options,
      });

      const button = container.querySelector('button.select');
      await fireEvent.mouseDown(button!);

      const input = container.querySelector('input');
      expect(document.activeElement).toBe(input);
    });

    it('applies selected class to selected option', async () => {
      const { container } = render(Select, {
        options,
        value: 'opt2',
      });

      const button = container.querySelector('button.select');
      await fireEvent.click(button!);

      await waitFor(() => {
        const optionItems = container.querySelectorAll('div.options > div');
        expect(optionItems[1]?.classList.contains('selected')).toBe(true);
      });
    });

    it('applies active class on mouseenter', async () => {
      const { container } = render(Select, {
        options,
      });

      const button = container.querySelector('button.select');
      await fireEvent.click(button!);

      await waitFor(() => {
        const optionItems = container.querySelectorAll('div.options > div');
        return optionItems.length > 0;
      });

      const optionItems = container.querySelectorAll('div.options > div');
      await fireEvent.mouseEnter(optionItems[0]!);

      expect(optionItems[0]?.classList.contains('active')).toBe(true);
    });
  });

  describe('keyboard navigation', () => {
    it('opens dropdown with Enter key', async () => {
      const { container } = render(Select, {
        options,
      });

      const input = container.querySelector('input');
      input?.focus();
      await fireEvent.keyDown(input!, { key: 'Enter', code: 'Enter' });

      await waitFor(() => {
        const optionsDiv = container.querySelector('div.options');
        expect(optionsDiv).toBeTruthy();
      });
    });

    it('opens dropdown with Space key', async () => {
      const { container } = render(Select, {
        options,
      });

      const input = container.querySelector('input');
      input?.focus();
      await fireEvent.keyDown(input!, { key: ' ', code: 'Space' });

      await waitFor(() => {
        const optionsDiv = container.querySelector('div.options');
        expect(optionsDiv).toBeTruthy();
      });
    });

    it('navigates options with ArrowDown', async () => {
      const { container } = render(Select, {
        options,
      });

      const button = container.querySelector('button.select');
      await fireEvent.click(button!);

      await waitFor(() => {
        const optionItems = container.querySelectorAll('div.options > div');
        return optionItems.length > 0;
      });

      const input = container.querySelector('input');
      await fireEvent.keyDown(input!, { key: 'ArrowDown', code: 'ArrowDown' });

      await waitFor(() => {
        const optionItems = container.querySelectorAll('div.options > div');
        expect(optionItems[0]?.classList.contains('active')).toBe(true);
      });
    });

    it('navigates options with ArrowRight', async () => {
      const { container } = render(Select, {
        options,
      });

      const button = container.querySelector('button.select');
      await fireEvent.click(button!);

      await waitFor(() => {
        const optionItems = container.querySelectorAll('div.options > div');
        return optionItems.length > 0;
      });

      const input = container.querySelector('input');
      await fireEvent.keyDown(input!, { key: 'ArrowRight', code: 'ArrowRight' });

      await waitFor(() => {
        const optionItems = container.querySelectorAll('div.options > div');
        expect(optionItems[0]?.classList.contains('active')).toBe(true);
      });
    });

    it('ignores other keys', async () => {
      const { container } = render(Select, {
        options,
      });

      const input = container.querySelector('input');
      input?.focus();
      await fireEvent.keyDown(input!, { key: 'A', code: 'KeyA' });

      const optionsDiv = container.querySelector('div.options');
      expect(optionsDiv).toBeFalsy();
    });
  });

  describe('value binding', () => {
    it('displays correct value name', () => {
      const { container } = render(Select, {
        options,
        value: 'opt3',
      });
      const valueSpan = container.querySelector('span.value');
      expect(valueSpan?.textContent).toBe('Option 3');
    });

    it('handles unknown value', () => {
      const { container } = render(Select, {
        options,
        value: 'unknown',
      });
      const valueSpan = container.querySelector('span.value');
      expect(valueSpan?.textContent).toBe('unknown');
    });
  });

  describe('disabled state', () => {
    it('has disabled attribute on button', () => {
      const { container } = render(Select, {
        options,
        disabled: true,
      });

      const button = container.querySelector('button.select');
      expect(button?.hasAttribute('disabled')).toBe(true);
    });

    it('has disabled input', () => {
      const { container } = render(Select, {
        options,
        disabled: true,
      });

      const input = container.querySelector('input');
      expect(input?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('fluid layout', () => {
    it('applies fluid class to options', async () => {
      const { container } = render(Select, {
        options,
        fluid: true,
      });

      const button = container.querySelector('button.select');
      await fireEvent.click(button!);

      await waitFor(() => {
        const optionsDiv = container.querySelector('div.options.fluid');
        expect(optionsDiv).toBeTruthy();
      });
    });
  });

  describe('options with keys', () => {
    it('renders options with custom keys', async () => {
      const optionsWithKeys: Option[] = [
        { name: 'Option 1', value: 'opt1', key: 'key1' },
        { name: 'Option 2', value: 'opt2', key: 'key2' },
      ];

      const { container } = render(Select, {
        options: optionsWithKeys,
      });

      const button = container.querySelector('button.select');
      await fireEvent.click(button!);

      await waitFor(() => {
        const optionItems = container.querySelectorAll('div.options > div');
        expect(optionItems.length).toBe(2);
      });
    });
  });

  describe('empty options', () => {
    it('handles empty options array', async () => {
      const { container } = render(Select, {
        options: [],
      });

      const button = container.querySelector('button.select');
      await fireEvent.click(button!);

      await waitFor(() => {
        const optionsDiv = container.querySelector('div.options');
        expect(optionsDiv).toBeTruthy();
      });

      const optionItems = container.querySelectorAll('div.options > div');
      expect(optionItems.length).toBe(0);
    });
  });

  describe('icon rotation', () => {
    it('rotates icon when open', async () => {
      const { container } = render(Select, {
        options,
      });

      const button = container.querySelector('button.select');
      await fireEvent.click(button!);

      await waitFor(() => {
        const icon = container.querySelector('span.icon.open');
        expect(icon).toBeTruthy();
      });
    });
  });
});
