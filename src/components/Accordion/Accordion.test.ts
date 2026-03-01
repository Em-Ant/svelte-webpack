import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Accordion from './Accordion.svelte';
import { createRawSnippet, type Snippet } from 'svelte';

const getSnippet = (content: string): Snippet<[]> =>
  createRawSnippet(() => ({
    render: () => `<div class="children">${content}</div>`,
  }));

describe('Accordion', () => {
  describe('rendering', () => {
    it('renders Accordion component', () => {
      const { container } = render(Accordion, {});
      const paper = container.querySelector('div.paper');
      expect(paper).toBeTruthy();
    });

    it('renders with correct class', () => {
      const { container } = render(Accordion, {});
      const paper = container.querySelector('div.paper');
      expect(paper?.classList.contains('paper')).toBe(true);
    });

    it('renders with children content', () => {
      const { container } = render(Accordion, {
        children: getSnippet('Test Content'),
      });
      expect(container.textContent).toContain('Test Content');
    });

    it('renders with empty children', () => {
      const { container } = render(Accordion, {
        children: getSnippet(''),
      });
      const paper = container.querySelector('div.paper');
      expect(paper).toBeTruthy();
    });

    it('renders with multiple children elements', () => {
      const { container } = render(Accordion, {
        children: getSnippet('<div>Child 1</div><div>Child 2</div>'),
      });
      expect(container.textContent).toContain('Child 1');
      expect(container.textContent).toContain('Child 2');
    });
  });

  describe('styling', () => {
    it('applies paper styling', () => {
      const { container } = render(Accordion, {});
      const paper = container.querySelector('div.paper');
      expect(paper).toBeTruthy();
    });
  });
});
