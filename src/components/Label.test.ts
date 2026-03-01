import { describe, it, expect, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/svelte';
import Label from './Label.svelte';
import { createRawSnippet, type Snippet } from 'svelte';

const getSnippet = (content: string): Snippet<[]> =>
  createRawSnippet(() => ({
    render: () => `<div class="children">${content}</div>`,
  }));

describe('Label', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      const { container } = render(Label, {
        children: getSnippet('Label text'),
      });
      const wrap = container.querySelector('.wrap');
      expect(wrap).toBeTruthy();
      const label = container.querySelector('label');
      expect(label).toBeTruthy();
    });

    it('renders children content', () => {
      const { container } = render(Label, {
        children: getSnippet('Test label'),
      });
      const label = container.querySelector('label');
      expect(label?.textContent).toContain('Test label');
    });

    it('renders without info button when no info prop', () => {
      const { container } = render(Label, {
        children: getSnippet('Simple label'),
      });
      const button = container.querySelector('button');
      expect(button).toBeNull();
    });

    it('renders info button when info prop is provided', () => {
      const { container } = render(Label, {
        children: getSnippet('Label with info'),
        info: getSnippet('Info content'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.getAttribute('type')).toBe('button');
    });

    it('renders info icon inside button', () => {
      const { container } = render(Label, {
        children: getSnippet('Label with info'),
        info: getSnippet('Info content'),
      });
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      const svg = button?.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('renders with custom id via attrs', () => {
      const { container } = render(Label, {
        children: getSnippet('Label with id'),
        attrs: { for: 'test-input' },
      });
      const label = container.querySelector('label');
      expect(label?.getAttribute('for')).toBe('test-input');
    });

    it('renders with custom class via attrs', () => {
      const { container } = render(Label, {
        children: getSnippet('Label with class'),
        attrs: { class: 'custom-class' },
      });
      const label = container.querySelector('label');
      expect(label?.classList.contains('custom-class')).toBe(true);
    });

    it('renders info tooltip when infoOpen is true', () => {
      const { container } = render(Label, {
        children: getSnippet('Label with tooltip'),
        info: getSnippet('Tooltip content'),
        infoOpen: true,
      });
      const tooltip = container.querySelector('.tooltip');
      expect(tooltip).toBeTruthy();
    });

    it('does not render tooltip when infoOpen is false', () => {
      const { container } = render(Label, {
        children: getSnippet('Label without tooltip'),
        info: getSnippet('Tooltip content'),
        infoOpen: false,
      });
      const tooltip = container.querySelector('.tooltip');
      expect(tooltip).toBeNull();
    });

    it('renders tooltip with info content', () => {
      const { container } = render(Label, {
        children: getSnippet('Label'),
        info: getSnippet('Tooltip info'),
        infoOpen: true,
      });
      const tooltip = container.querySelector('.tooltip');
      expect(tooltip?.textContent).toContain('Tooltip info');
    });

    it('renders with infoAttrs applied to tooltip', () => {
      const { container } = render(Label, {
        children: getSnippet('Label'),
        info: getSnippet('Info'),
        infoOpen: true,
        infoAttrs: { 'data-test': 'tooltip-test' },
      });
      const tooltip = container.querySelector('.tooltip');
      expect(tooltip?.getAttribute('data-test')).toBe('tooltip-test');
    });

    it('renders with all props combined', () => {
      const { container } = render(Label, {
        children: getSnippet('Complete label'),
        info: getSnippet('Complete info'),
        infoOpen: true,
        attrs: { for: 'input-id' },
        infoAttrs: { 'data-info': 'test' },
      });

      const label = container.querySelector('label');
      expect(label?.getAttribute('for')).toBe('input-id');
      expect(label?.textContent).toContain('Complete label');

      const button = container.querySelector('button');
      expect(button).toBeTruthy();

      const tooltip = container.querySelector('.tooltip');
      expect(tooltip).toBeTruthy();
      expect(tooltip?.getAttribute('data-info')).toBe('test');
    });
  });

  describe('events', () => {
    it('toggles infoOpen on info button click', async () => {
      const { container } = render(Label, {
        children: getSnippet('Label'),
        info: getSnippet('Info'),
        infoOpen: false,
      });

      const button = container.querySelector('button') as HTMLButtonElement;
      expect(button).toBeTruthy();

      // Tooltip should not be visible initially
      let tooltip = container.querySelector('.tooltip');
      expect(tooltip).toBeNull();

      await fireEvent.click(button);
      // Tooltip should be visible after click
      tooltip = container.querySelector('.tooltip');
      expect(tooltip).toBeTruthy();
    });

    it('closes info on blur when closeInfoOnBlur is true', async () => {
      const { container } = render(Label, {
        children: getSnippet('Label'),
        info: getSnippet('Info'),
        infoOpen: true,
        closeInfoOnBlur: true,
      });

      const button = container.querySelector('button') as HTMLButtonElement;
      expect(button).toBeTruthy();

      // Tooltip should be visible initially
      let tooltip = container.querySelector('.tooltip');
      expect(tooltip).toBeTruthy();

      await fireEvent.blur(button);
      // Tooltip should be hidden after blur
      tooltip = container.querySelector('.tooltip');
      expect(tooltip).toBeNull();
    });

    it('does not close info on blur when closeInfoOnBlur is false', async () => {
      const { container } = render(Label, {
        children: getSnippet('Label'),
        info: getSnippet('Info'),
        infoOpen: true,
        closeInfoOnBlur: false,
      });

      const button = container.querySelector('button') as HTMLButtonElement;
      expect(button).toBeTruthy();

      // Tooltip should be visible initially
      let tooltip = container.querySelector('.tooltip');
      expect(tooltip).toBeTruthy();

      await fireEvent.blur(button);
      // Tooltip should still be visible after blur
      tooltip = container.querySelector('.tooltip');
      expect(tooltip).toBeTruthy();
    });

    it('calls onInfoClick handler when info button is clicked', async () => {
      const onInfoClick = vi.fn();
      const { container } = render(Label, {
        children: getSnippet('Label'),
        info: getSnippet('Info'),
        onInfoClick,
      });

      const button = container.querySelector('button') as HTMLButtonElement;
      expect(button).toBeTruthy();

      await fireEvent.click(button);
      expect(onInfoClick).toHaveBeenCalledTimes(1);
    });

    it('calls onInfoBlur handler when info button loses focus', async () => {
      const onInfoBlur = vi.fn();
      const { container } = render(Label, {
        children: getSnippet('Label'),
        info: getSnippet('Info'),
        infoOpen: true,
        onInfoBlur,
      });

      const button = container.querySelector('button') as HTMLButtonElement;
      expect(button).toBeTruthy();

      await fireEvent.blur(button);
      expect(onInfoBlur).toHaveBeenCalledTimes(1);
    });

    it('focuses button after clicking it', async () => {
      const { container } = render(Label, {
        children: getSnippet('Label'),
        info: getSnippet('Info'),
      });

      const button = container.querySelector('button') as HTMLButtonElement;
      expect(button).toBeTruthy();

      await fireEvent.click(button);
      expect(document.activeElement).toBe(button);
    });
  });

  describe('state management', () => {
    it('toggles infoOpen state on each click', async () => {
      const { container } = render(Label, {
        children: getSnippet('Label'),
        info: getSnippet('Info'),
        infoOpen: false,
      });

      const button = container.querySelector('button') as HTMLButtonElement;

      // Initially closed
      let tooltip = container.querySelector('.tooltip');
      expect(tooltip).toBeNull();

      // First click - opens
      await fireEvent.click(button);
      tooltip = container.querySelector('.tooltip');
      expect(tooltip).toBeTruthy();

      // Second click - closes
      await fireEvent.click(button);
      tooltip = container.querySelector('.tooltip');
      expect(tooltip).toBeNull();

      // Third click - opens again
      await fireEvent.click(button);
      tooltip = container.querySelector('.tooltip');
      expect(tooltip).toBeTruthy();
    });
  });
});
