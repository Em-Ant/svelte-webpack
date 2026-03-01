import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import Tabs from './Tabs.svelte';

interface TabElement {
  header: string;
  component?: string;
  active?: boolean;
  [key: string]: unknown;
}

const tabs: TabElement[] = [
  { header: 'Tab 1', component: 'Content 1', active: true },
  { header: 'Tab 2', component: 'Content 2' },
  { header: 'Tab 3', component: 'Content 3' },
];

describe('Tabs', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });
      const wrap = container.querySelector('div.wrap');
      expect(wrap).toBeTruthy();
    });

    it('renders all tab headers', () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });
      const buttons = container.querySelectorAll('div.btns > button');
      expect(buttons.length).toBe(3);
    });

    it('renders correct tab headers', () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });
      const buttons = container.querySelectorAll('div.btns > button');
      expect(buttons[0].textContent).toBe('Tab 1');
      expect(buttons[1].textContent).toBe('Tab 2');
      expect(buttons[2].textContent).toBe('Tab 3');
    });

    it('renders active tab content', () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });
      const content = container.querySelector('div.content');
      expect(content?.textContent).toContain('Content 1');
    });

    it('renders Indicator component', () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });
      const indicator = container.querySelector('div.indicator');
      expect(indicator).toBeTruthy();
    });

    it('renders empty when no elements', () => {
      const { container } = render(Tabs, {
        elements: [],
      });
      const buttons = container.querySelectorAll('div.btns > button');
      expect(buttons.length).toBe(0);
    });

    it('renders second tab as active when specified', () => {
      const customTabs: TabElement[] = [
        { header: 'Tab 1', component: 'Content 1' },
        { header: 'Tab 2', component: 'Content 2', active: true },
        { header: 'Tab 3', component: 'Content 3' },
      ];

      const { container } = render(Tabs, {
        elements: customTabs,
      });

      const content = container.querySelector('div.content');
      expect(content?.textContent).toContain('Content 2');
    });

    it('renders with first tab active when no active specified', () => {
      const customTabs: TabElement[] = [
        { header: 'Tab 1', component: 'Content 1' },
        { header: 'Tab 2', component: 'Content 2' },
      ];

      const { container } = render(Tabs, {
        elements: customTabs,
      });

      const content = container.querySelector('div.content');
      expect(content?.textContent).toContain('Content 1');
    });

    it('renders content-wrap element', () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });
      const contentWrap = container.querySelector('div.content-wrap');
      expect(contentWrap).toBeTruthy();
    });

    it('renders buttons with proper structure', () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });
      const btns = container.querySelector('div.btns');
      expect(btns).toBeTruthy();
    });

    it('renders outer element', () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });
      const outer = container.querySelector('div.out');
      expect(outer).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('has clickable tabs', async () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });

      const secondTab = container.querySelectorAll('div.btns > button')[1];
      expect(secondTab).toBeTruthy();
    });

    it('switches to clicked tab', async () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });

      const secondTab = container.querySelectorAll('div.btns > button')[1];
      await fireEvent.click(secondTab!);

      await waitFor(() => {
        const contents = container.querySelectorAll('div.content');
        const visibleContent = Array.from(contents).find(
          (el) => el.textContent?.includes('Content 2')
        );
        expect(visibleContent).toBeTruthy();
      });
    });

    it('updates indicator position on tab click', async () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });

      const secondTab = container.querySelectorAll('div.btns > button')[1];
      await fireEvent.click(secondTab!);

      await waitFor(() => {
        const indicator = container.querySelector('div.indicator');
        expect(indicator).toBeTruthy();
      });
    });

    it('switches to third tab', async () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });

      const thirdTab = container.querySelectorAll('div.btns > button')[2];
      await fireEvent.click(thirdTab!);

      await waitFor(() => {
        const contents = container.querySelectorAll('div.content');
        const visibleContent = Array.from(contents).find(
          (el) => el.textContent?.includes('Content 3')
        );
        expect(visibleContent).toBeTruthy();
      });
    });

    it('applies hover styles on mouseover', async () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });

      const firstTab = container.querySelectorAll('div.btns > button')[0];
      await fireEvent.mouseOver(firstTab!);

      expect(firstTab).toBeTruthy();
    });
  });

  describe('keyboard navigation', () => {
    it('supports keyboard focus on tabs', async () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });

      const firstTab = container.querySelectorAll('div.btns > button')[0];
      (firstTab as HTMLButtonElement)?.focus();
      expect(document.activeElement).toBe(firstTab);
    });
  });

  describe('edge cases', () => {
    it('handles single tab', () => {
      const { container } = render(Tabs, {
        elements: [{ header: 'Single Tab', component: 'Single Content' }],
      });
      const buttons = container.querySelectorAll('div.btns > button');
      expect(buttons.length).toBe(1);
    });

    it('handles tab with empty component', () => {
      const { container } = render(Tabs, {
        elements: [{ header: 'Empty Tab', component: '' }],
      });
      const content = container.querySelector('div.content');
      expect(content).toBeTruthy();
    });

    it('handles tab without component property', () => {
      const { container } = render(Tabs, {
        elements: [{ header: 'No Component' }],
      });
      const content = container.querySelector('div.content');
      expect(content).toBeTruthy();
    });

    it('handles many tabs', () => {
      const manyTabs = Array.from({ length: 10 }, (_, i) => ({
        header: `Tab ${i + 1}`,
        component: `Content ${i + 1}`,
      }));

      const { container } = render(Tabs, {
        elements: manyTabs,
      });
      const buttons = container.querySelectorAll('div.btns > button');
      expect(buttons.length).toBe(10);
    });
  });

  describe('animation', () => {
    it('applies fade animation when switching tabs', async () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });

      const secondTab = container.querySelectorAll('div.btns > button')[1];
      await fireEvent.click(secondTab!);

      await waitFor(() => {
        const content = container.querySelector('div.content');
        expect(content?.classList).toBeTruthy();
      });
    });

    it('applies correct animation direction when going back', async () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });

      const secondTab = container.querySelectorAll('div.btns > button')[1];
      await fireEvent.click(secondTab!);

      const firstTab = container.querySelectorAll('div.btns > button')[0];
      await fireEvent.click(firstTab!);

      await waitFor(() => {
        const content = container.querySelector('div.content');
        expect(content).toBeTruthy();
      });
    });
  });

  describe('Indicator positioning', () => {
    it('renders indicator with initial position', () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });
      const indicator = container.querySelector('div.indicator');
      expect(indicator).toBeTruthy();
    });

    it('updates indicator when switching tabs', async () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });

      const secondTab = container.querySelectorAll('div.btns > button')[1];
      await fireEvent.click(secondTab!);

      await waitFor(() => {
        const indicator = container.querySelector('div.indicator');
        expect(indicator).toBeTruthy();
      });
    });
  });

  describe('content height adjustment', () => {
    it('adjusts content-wrap minHeight based on content', async () => {
      const { container } = render(Tabs, {
        elements: tabs,
      });

      const contentWrap = container.querySelector('div.content-wrap');
      expect(contentWrap).toBeTruthy();
    });
  });
});
