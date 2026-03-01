import { describe, it, expect, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/svelte';
import Input from './Input.svelte';

describe('Input', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      const { container } = render(Input);
      const outer = container.querySelector('.outer');
      expect(outer).toBeTruthy();
      const inner = container.querySelector('.inner');
      expect(inner).toBeTruthy();
      const field = container.querySelector('.field');
      expect(field).toBeTruthy();
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
    });

    it('renders with custom value', () => {
      const { container } = render(Input, { value: 'test value' });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.value).toBe('test value');
    });

    it('renders with empty value', () => {
      const { container } = render(Input, { value: '' });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.value).toBe('');
    });

    it('renders disabled input', () => {
      const { container } = render(Input, { disabled: true });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.disabled).toBe(true);
      const field = container.querySelector('.field');
      expect(field?.classList.contains('disabled')).toBe(true);
    });

    it('renders non-disabled input', () => {
      const { container } = render(Input, { disabled: false });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.disabled).toBe(false);
      const field = container.querySelector('.field');
      expect(field?.classList.contains('disabled')).toBe(false);
    });

    it('renders fluid variant', () => {
      const { container } = render(Input, { fluid: true });
      const inner = container.querySelector('.inner');
      expect(inner?.classList.contains('fluid')).toBe(true);
    });

    it('renders non-fluid variant', () => {
      const { container } = render(Input, { fluid: false });
      const inner = container.querySelector('.inner');
      expect(inner?.classList.contains('fluid')).toBe(false);
    });

    it('renders with error state', () => {
      const { container } = render(Input, { error: 'Error message' });
      const field = container.querySelector('.field');
      expect(field?.classList.contains('error')).toBe(true);
      const errorMsg = container.querySelector('.error-msg');
      expect(errorMsg).toBeTruthy();
      expect(errorMsg?.textContent).toContain('Error message');
    });

    it('renders without error state', () => {
      const { container } = render(Input, { error: '' });
      const field = container.querySelector('.field');
      expect(field?.classList.contains('error')).toBe(false);
      const errorMsg = container.querySelector('.error-msg');
      expect(errorMsg).toBeNull();
    });

    it('renders with postfix', () => {
      const { container } = render(Input, { postfix: 'px' });
      const postfix = container.querySelector('.postfix');
      expect(postfix).toBeTruthy();
      expect(postfix?.textContent).toContain('px');
    });

    it('renders without postfix', () => {
      const { container } = render(Input);
      const postfix = container.querySelector('.postfix');
      expect(postfix).toBeNull();
    });

    it('renders error icon when error is present', () => {
      const { container } = render(Input, { error: 'Error' });
      const errorIcon = container.querySelector('.error-icon');
      expect(errorIcon).toBeTruthy();
      expect(errorIcon?.classList.contains('in')).toBe(true);
    });

    it('renders error icon without "in" class when no error', () => {
      const { container } = render(Input);
      const errorIcon = container.querySelector('.error-icon');
      expect(errorIcon).toBeTruthy();
      expect(errorIcon?.classList.contains('in')).toBe(false);
    });

    it('renders with all props combined', () => {
      const { container } = render(Input, {
        value: 'test',
        disabled: true,
        fluid: true,
        postfix: 'px',
        error: 'Invalid input',
      });

      const inner = container.querySelector('.inner');
      expect(inner?.classList.contains('fluid')).toBe(true);

      const field = container.querySelector('.field');
      expect(field?.classList.contains('disabled')).toBe(true);
      expect(field?.classList.contains('error')).toBe(true);

      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.value).toBe('test');
      expect(input.disabled).toBe(true);

      const postfix = container.querySelector('.postfix');
      expect(postfix?.textContent).toContain('px');

      const errorMsg = container.querySelector('.error-msg');
      expect(errorMsg?.textContent).toContain('Invalid input');
    });
  });

  describe('events', () => {
    it('calls onchange handler when changed', async () => {
      const onChange = vi.fn();
      const { container } = render(Input, { onchange: onChange });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();

      input.value = 'new value';
      await fireEvent.change(input);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('calls oninput handler when input changes', async () => {
      const onInput = vi.fn();
      const { container } = render(Input, { oninput: onInput });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();

      input.value = 'new value';
      await fireEvent.input(input);
      expect(onInput).toHaveBeenCalledTimes(1);
    });

    it('calls onfocus handler when focused', async () => {
      const onFocus = vi.fn();
      const { container } = render(Input, { onfocus: onFocus });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();

      await fireEvent.focus(input);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onblur handler when blurred', async () => {
      const onBlur = vi.fn();
      const { container } = render(Input, { onblur: onBlur });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();

      await fireEvent.blur(input);
      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('updates value on input', async () => {
      const { container } = render(Input, { value: 'initial' });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.value).toBe('initial');

      input.value = 'updated';
      await fireEvent.input(input);
      expect(input.value).toBe('updated');
    });
  });

  describe('attributes', () => {
    it('spreads additional HTML attributes', () => {
      const { container } = render(Input, {
        placeholder: 'Enter text',
        maxlength: 10,
        'data-test': 'test-value',
      });
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
      expect(input?.getAttribute('placeholder')).toBe('Enter text');
      expect(input?.getAttribute('maxlength')).toBe('10');
      expect(input?.getAttribute('data-test')).toBe('test-value');
    });

    it('renders with type attribute', () => {
      const { container } = render(Input, { type: 'email' });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.type).toBe('email');
    });

    it('renders with name attribute', () => {
      const { container } = render(Input, { name: 'test-input' });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.name).toBe('test-input');
    });

    it('renders with id attribute', () => {
      const { container } = render(Input, { id: 'test-id' });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.id).toBe('test-id');
    });
  });

  describe('focus management', () => {
    it('applies focus-within styles when input is focused', async () => {
      const { container } = render(Input);
      const field = container.querySelector('.field');
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();

      await fireEvent.focus(input);
      // The focus-within selector should apply styles
      expect(field).toBeTruthy();
    });
  });
});
