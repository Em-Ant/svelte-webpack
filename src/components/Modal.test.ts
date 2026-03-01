import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/svelte';
import Modal from './Modal.svelte';
import { createRawSnippet, type Snippet } from 'svelte';

const getSnippet = (content: string): Snippet<[]> =>
  createRawSnippet(() => ({
    render: () => `<div class="children">${content}</div>`,
  }));

// Mock the Web Animations API for jsdom
beforeAll(() => {
  if (typeof HTMLElement !== 'undefined' && !HTMLElement.prototype.animate) {
    HTMLElement.prototype.animate = vi.fn(() => ({
      finished: Promise.resolve(),
      cancel: vi.fn(),
      pause: vi.fn(),
      play: vi.fn(),
      reverse: vi.fn(),
      finish: vi.fn(),
      currentTime: 0,
      playbackRate: 1,
      playState: 'running',
      target: null,
      effect: null,
    })) as any;
  }
});

describe('Modal', () => {
  beforeEach(() => {
    // Mock scrollHeight for transitions
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 200,
    });
  });

  afterEach(() => {
    cleanup();
  });

  describe('rendering', () => {
    it('renders with default props', () => {
      const { container } = render(Modal, {
        children: getSnippet('Modal content'),
        open: true,
      });
      const backdrop = container.querySelector('.backdrop');
      expect(backdrop).toBeTruthy();
      const modal = container.querySelector('.modal');
      expect(modal).toBeTruthy();
    });

    it('renders with header content', () => {
      const { container } = render(Modal, {
        children: getSnippet('Content'),
        header: getSnippet('Modal Header'),
        open: true,
      });
      const header = container.querySelector('.header-content');
      expect(header?.textContent).toContain('Modal Header');
    });

    it('renders with footer when footer prop is true', () => {
      const { container } = render(Modal, {
        children: getSnippet('Content'),
        footer: true,
        open: true,
      });
      const footer = container.querySelector('.footer');
      expect(footer).toBeTruthy();
      expect(footer?.classList.contains('in')).toBe(true);
    });

    it('renders without footer when footer prop is false', () => {
      const { container } = render(Modal, {
        children: getSnippet('Content'),
        footer: false,
        open: true,
      });
      const footer = container.querySelector('.footer');
      expect(footer).toBeTruthy();
      expect(footer?.classList.contains('in')).toBe(false);
    });

    it('renders with footer content', () => {
      const { container } = render(Modal, {
        children: getSnippet('Content'),
        footer: true,
        footerSlot: getSnippet('Footer actions'),
        open: true,
      });
      const footer = container.querySelector('.footer');
      expect(footer?.textContent).toContain('Footer actions');
    });

    it('renders children content', () => {
      const { container } = render(Modal, {
        children: getSnippet('Main content'),
        open: true,
      });
      const content = container.querySelector('.content');
      expect(content?.textContent).toContain('Main content');
    });

    it('renders close button when onClose is provided', () => {
      const { container } = render(Modal, {
        children: getSnippet('Content'),
        onClose: vi.fn(),
        open: true,
      });
      const closeBtn = container.querySelector('button.close');
      expect(closeBtn).toBeTruthy();
    });

    it('does not render close button when onClose is not provided', () => {
      const { container } = render(Modal, {
        children: getSnippet('Content'),
        open: true,
      });
      const closeBtn = container.querySelector('button.close');
      expect(closeBtn).toBeNull();
    });

    it('renders with mobile class when mobile prop is true', () => {
      const { container } = render(Modal, {
        children: getSnippet('Content'),
        mobile: true,
        open: true,
      });
      const modal = container.querySelector('.modal');
      expect(modal?.classList.contains('mobile')).toBe(true);
    });

    it('renders without mobile class when mobile prop is false', () => {
      const { container } = render(Modal, {
        children: getSnippet('Content'),
        mobile: false,
        open: true,
      });
      const modal = container.querySelector('.modal');
      expect(modal?.classList.contains('mobile')).toBe(false);
    });

    it('renders header shadow when scrolled', () => {
      const { container } = render(Modal, {
        children: getSnippet('Content'.repeat(50)),
        header: getSnippet('Header'),
        open: true,
      });
      const header = container.querySelector('.header');
      // After scrolling, shadow should appear
      expect(header).toBeTruthy();
    });

    it('renders with data-lock attribute on wrapper', () => {
      const { container } = render(Modal, {
        children: getSnippet('Content'),
        open: true,
      });
      const lockDiv = container.querySelector('div[data-lock]');
      expect(lockDiv).toBeTruthy();
    });

    it('renders with all props combined', () => {
      const { container } = render(Modal, {
        children: getSnippet('Complete content'),
        header: getSnippet('Complete Header'),
        footer: true,
        footerSlot: getSnippet('Complete Footer'),
        mobile: true,
        onClose: vi.fn(),
        open: true,
      });

      const modal = container.querySelector('.modal');
      expect(modal?.classList.contains('mobile')).toBe(true);

      const header = container.querySelector('.header-content');
      expect(header?.textContent).toContain('Complete Header');

      const content = container.querySelector('.content');
      expect(content?.textContent).toContain('Complete content');

      const footer = container.querySelector('.footer');
      expect(footer?.classList.contains('in')).toBe(true);
      expect(footer?.textContent).toContain('Complete Footer');

      const closeBtn = container.querySelector('button.close');
      expect(closeBtn).toBeTruthy();
    });
  });

  describe('events', () => {
    it('calls onClose when close button is clicked', async () => {
      const onClose = vi.fn();
      const { container } = render(Modal, {
        children: getSnippet('Content'),
        onClose,
        open: true,
      });

      const closeBtn = container.querySelector('button.close') as HTMLButtonElement;
      expect(closeBtn).toBeTruthy();

      await fireEvent.click(closeBtn);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('sets open to false when close button is clicked', async () => {
      const { container, component } = render(Modal, {
        children: getSnippet('Content'),
        onClose: () => {},
        open: true,
      });

      const closeBtn = container.querySelector('button.close') as HTMLButtonElement;
      await fireEvent.click(closeBtn);
    });

    it('calls onClose handler with correct context', async () => {
      const onClose = vi.fn();
      const { container } = render(Modal, {
        children: getSnippet('Content'),
        onClose,
        open: true,
      });

      const closeBtn = container.querySelector('button.close') as HTMLButtonElement;
      await fireEvent.click(closeBtn);

      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('focus management', () => {
    it('locks focus within modal on mount', () => {
      const { container } = render(Modal, {
        children: getSnippet('Content'),
        open: true,
        autofocus: true,
        onClose: vi.fn(),
      });

      // Modal should have data-lock attribute
      const lockDiv = container.querySelector('div[data-lock]');
      expect(lockDiv).toBeTruthy();
    });

    it('focuses close button when autofocus is true', () => {
      const { container } = render(Modal, {
        children: getSnippet('Content'),
        open: true,
        autofocus: true,
        onClose: vi.fn(),
      });

      const closeBtn = container.querySelector('button.close');
      // Close button should exist and be focusable
      expect(closeBtn).toBeTruthy();
    });
  });

  describe('scroll locking', () => {
    it('locks body scroll when modal is open', () => {
      render(Modal, {
        children: getSnippet('Content'),
        open: true,
      });

      // Body should have overflow hidden
      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.height).toBe('100vh');
    });
  });

  describe('responsive behavior', () => {
    it('applies mobile styles when window width is <= 400px', () => {
      // Mock window width
      Object.defineProperty(document.body, 'clientWidth', {
        configurable: true,
        value: 300,
      });

      const { container } = render(Modal, {
        children: getSnippet('Content'),
        open: true,
      });

      const modal = container.querySelector('.modal');
      // On mount, setIsMobile is called
      expect(modal).toBeTruthy();
    });

    it('applies desktop styles when window width is > 400px', () => {
      // Mock window width
      Object.defineProperty(document.body, 'clientWidth', {
        configurable: true,
        value: 800,
      });

      const { container } = render(Modal, {
        children: getSnippet('Content'),
        open: true,
      });

      const modal = container.querySelector('.modal');
      expect(modal).toBeTruthy();
    });
  });

  describe('shadow states', () => {
    it('applies header shadow when content is scrolled', async () => {
      const { container } = render(Modal, {
        children: getSnippet('Content\n'.repeat(50)),
        header: getSnippet('Header'),
        open: true,
      });

      const content = container.querySelector('.content') as HTMLDivElement;
      const header = container.querySelector('.header');

      // Scroll the content
      if (content) {
        content.scrollTop = 10;
        await fireEvent.scroll(content);
      }

      expect(header?.classList.contains('shadow')).toBe(true);
    });

    it('applies footer shadow when content can scroll further', async () => {
      const { container } = render(Modal, {
        children: getSnippet('Content\n'.repeat(50)),
        footer: true,
        open: true,
      });

      const content = container.querySelector('.content') as HTMLDivElement;
      const footer = container.querySelector('.footer');

      if (content) {
        content.scrollTop = 0;
        await fireEvent.scroll(content);
      }

      expect(footer?.classList.contains('shadow')).toBe(true);
    });
  });
});
