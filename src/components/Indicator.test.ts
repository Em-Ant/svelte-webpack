import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Indicator from './Indicator.svelte';

describe('Indicator', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      const { container } = render(Indicator);
      const indicator = container.querySelector('.indicator');
      expect(indicator).toBeTruthy();
      const active = container.querySelector('.active');
      expect(active).toBeTruthy();
      const line = container.querySelector('.line');
      expect(line).toBeTruthy();
    });

    it('renders with default left value', () => {
      const { container } = render(Indicator);
      const active = container.querySelector('.active') as HTMLSpanElement;
      expect(active).toBeTruthy();
      expect(active.style.left).toBe('0px');
    });

    it('renders with custom left value', () => {
      const { container } = render(Indicator, { left: 50 });
      const active = container.querySelector('.active') as HTMLSpanElement;
      expect(active).toBeTruthy();
      expect(active.style.left).toBe('50px');
    });

    it('renders with default width value', () => {
      const { container } = render(Indicator);
      const active = container.querySelector('.active') as HTMLSpanElement;
      expect(active).toBeTruthy();
      expect(active.style.transform).toBe('scaleX(1)');
    });

    it('renders with custom width value', () => {
      const { container } = render(Indicator, { width: 0.5 });
      const active = container.querySelector('.active') as HTMLSpanElement;
      expect(active).toBeTruthy();
      expect(active.style.transform).toBe('scaleX(0.5)');
    });

    it('renders with width of 0', () => {
      const { container } = render(Indicator, { width: 0 });
      const active = container.querySelector('.active') as HTMLSpanElement;
      expect(active).toBeTruthy();
      expect(active.style.transform).toBe('scaleX(0)');
    });

    it('renders with width greater than 1', () => {
      const { container } = render(Indicator, { width: 2 });
      const active = container.querySelector('.active') as HTMLSpanElement;
      expect(active).toBeTruthy();
      expect(active.style.transform).toBe('scaleX(2)');
    });

    it('renders with negative left value', () => {
      const { container } = render(Indicator, { left: -20 });
      const active = container.querySelector('.active') as HTMLSpanElement;
      expect(active).toBeTruthy();
      expect(active.style.left).toBe('-20px');
    });

    it('renders with both left and width props', () => {
      const { container } = render(Indicator, { left: 100, width: 0.75 });
      const active = container.querySelector('.active') as HTMLSpanElement;
      expect(active).toBeTruthy();
      expect(active.style.left).toBe('100px');
      expect(active.style.transform).toBe('scaleX(0.75)');
    });

    it('renders line element with correct class', () => {
      const { container } = render(Indicator);
      const line = container.querySelector('.line');
      expect(line).toBeTruthy();
      expect(line?.classList.contains('line')).toBe(true);
    });

    it('renders active element with correct class', () => {
      const { container } = render(Indicator);
      const active = container.querySelector('.active');
      expect(active).toBeTruthy();
      expect(active?.classList.contains('active')).toBe(true);
    });

    it('renders indicator container with correct structure', () => {
      const { container } = render(Indicator);
      const indicator = container.querySelector('.indicator');
      expect(indicator).toBeTruthy();
      expect(indicator?.querySelector('.active')).toBeTruthy();
      expect(indicator?.querySelector('.line')).toBeTruthy();
    });
  });
});
