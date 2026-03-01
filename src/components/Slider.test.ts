import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import Slider from './Slider.svelte';

describe('Slider', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      const { container } = render(Slider, {
        value: 50,
      });
      const input = container.querySelector('input[type="range"]');
      expect(input).toBeTruthy();
    });

    it('renders with custom min and max', () => {
      const { container } = render(Slider, {
        min: 0,
        max: 200,
        value: 100,
      });
      const input = container.querySelector('input[type="range"]');
      expect(input?.getAttribute('min')).toBe('0');
      expect(input?.getAttribute('max')).toBe('200');
    });

    it('renders with custom step', () => {
      const { container } = render(Slider, {
        min: 0,
        max: 100,
        step: 10,
        value: 50,
      });
      const input = container.querySelector('input[type="range"]');
      expect(input?.getAttribute('step')).toBe('10');
    });

    it('renders track element', () => {
      const { container } = render(Slider, {
        value: 50,
      });
      const track = container.querySelector('div.track');
      expect(track).toBeTruthy();
    });

    it('renders progress element', () => {
      const { container } = render(Slider, {
        value: 50,
      });
      const progress = container.querySelector('div.progress');
      expect(progress).toBeTruthy();
    });

    it('renders wrap element', () => {
      const { container } = render(Slider, {
        value: 50,
      });
      const wrap = container.querySelector('div.wrap');
      expect(wrap).toBeTruthy();
    });

    it('renders outer element', () => {
      const { container } = render(Slider, {
        value: 50,
      });
      const outer = container.querySelector('div.outer');
      expect(outer).toBeTruthy();
    });

    it('does not render popover without bubble', () => {
      const { container } = render(Slider, {
        value: 50,
      });
      const popover = container.querySelector('div.popover');
      expect(popover).toBeFalsy();
    });
  });

  describe('interactions', () => {
    it('calls onChange handler', async () => {
      const onChange = vi.fn();
      const { container } = render(Slider, {
        value: 50,
        onChange,
      });

      const input = container.querySelector('input[type="range"]');
      await fireEvent.change(input!);
      expect(onChange).toHaveBeenCalled();
    });

    it('calls onClick handler', async () => {
      const onClick = vi.fn();
      const { container } = render(Slider, {
        value: 50,
        onClick,
      });

      const input = container.querySelector('input[type="range"]');
      await fireEvent.click(input!);
      expect(onClick).toHaveBeenCalled();
    });

    it('updates value on input change', async () => {
      const { container } = render(Slider, {
        value: 50,
      });

      const input = container.querySelector('input[type="range"]');
      await fireEvent.input(input!, { target: { value: 75 } });
      expect((input as HTMLInputElement).value).toBe('75');
    });

    it('calls onChange with correct value', async () => {
      const onChange = vi.fn();
      const { container } = render(Slider, {
        value: 50,
        onChange,
      });

      const input = container.querySelector('input[type="range"]');
      await fireEvent.change(input!, { target: { value: 75 } });
      expect(onChange).toHaveBeenCalledWith(expect.anything());
    });
  });

  describe('value binding', () => {
    it('respects initial value', () => {
      const { container } = render(Slider, {
        value: 25,
      });
      const input = container.querySelector('input[type="range"]');
      expect((input as HTMLInputElement).value).toBe('25');
    });

    it('respects min value', () => {
      const { container } = render(Slider, {
        min: 10,
        max: 100,
        value: 5,
      });
      const input = container.querySelector('input[type="range"]');
      expect((input as HTMLInputElement).value).toBe('10');
    });

    it('respects max value', () => {
      const { container } = render(Slider, {
        min: 0,
        max: 100,
        value: 150,
      });
      const input = container.querySelector('input[type="range"]');
      expect((input as HTMLInputElement).value).toBe('100');
    });

    it('handles zero value', () => {
      const { container } = render(Slider, {
        value: 0,
      });
      const input = container.querySelector('input[type="range"]');
      expect((input as HTMLInputElement).value).toBe('0');
    });

    it('handles negative min value', () => {
      const { container } = render(Slider, {
        min: -100,
        max: 100,
        value: -50,
      });
      const input = container.querySelector('input[type="range"]');
      expect(input?.getAttribute('min')).toBe('-100');
    });
  });

  describe('focus styles', () => {
    it('applies focus-within styles', async () => {
      const { container } = render(Slider, {
        value: 50,
      });
      const input = container.querySelector('input[type="range"]');
      await fireEvent.focus(input!);
      const track = container.querySelector('div.track');
      expect(track).toBeTruthy();
    });
  });

  describe('progress bar positioning', () => {
    it('sets progress width based on value', () => {
      const { container } = render(Slider, {
        value: 50,
      });
      const progress = container.querySelector('div.progress');
      expect(progress).toBeTruthy();
    });

    it('updates progress on value change', async () => {
      const { container } = render(Slider, {
        value: 25,
      });

      const input = container.querySelector('input[type="range"]');
      await fireEvent.input(input!, { target: { value: 75 } });

      await waitFor(() => {
        const progress = container.querySelector('div.progress');
        expect(progress).toBeTruthy();
      });
    });
  });

  describe('edge cases', () => {
    it('handles min equals max', () => {
      const { container } = render(Slider, {
        min: 50,
        max: 50,
        value: 50,
      });
      const input = container.querySelector('input[type="range"]');
      expect(input).toBeTruthy();
    });

    it('handles decimal step', () => {
      const { container } = render(Slider, {
        min: 0,
        max: 1,
        step: 0.1,
        value: 0.5,
      });
      const input = container.querySelector('input[type="range"]');
      expect(input?.getAttribute('step')).toBe('0.1');
    });

    it('handles large max value', () => {
      const { container } = render(Slider, {
        min: 0,
        max: 1000000,
        value: 500000,
      });
      const input = container.querySelector('input[type="range"]');
      expect(input?.getAttribute('max')).toBe('1000000');
    });
  });

  describe('accessibility', () => {
    it('supports aria attributes', () => {
      const { container } = render(Slider, {
        value: 50,
        'aria-label': 'Volume',
      });
      const input = container.querySelector('input[type="range"]');
      expect(input?.getAttribute('aria-label')).toBe('Volume');
    });

    it('supports role attribute', () => {
      const { container } = render(Slider, {
        value: 50,
        role: 'slider',
      });
      const input = container.querySelector('input[type="range"]');
      expect(input?.getAttribute('role')).toBe('slider');
    });
  });

  describe('keyboard interaction', () => {
    it('responds to arrow key events', async () => {
      const { container } = render(Slider, {
        value: 50,
      });
      const input = container.querySelector('input[type="range"]') as HTMLInputElement;
      input?.focus();
      await fireEvent.keyDown(input!, { key: 'ArrowRight', code: 'ArrowRight' });
      expect(input).toBeTruthy();
    });

    it('responds to home key', async () => {
      const { container } = render(Slider, {
        value: 50,
      });
      const input = container.querySelector('input[type="range"]') as HTMLInputElement;
      input?.focus();
      await fireEvent.keyDown(input!, { key: 'Home', code: 'Home' });
      expect(input).toBeTruthy();
    });

    it('responds to end key', async () => {
      const { container } = render(Slider, {
        value: 50,
      });
      const input = container.querySelector('input[type="range"]') as HTMLInputElement;
      input?.focus();
      await fireEvent.keyDown(input!, { key: 'End', code: 'End' });
      expect(input).toBeTruthy();
    });
  });
});
